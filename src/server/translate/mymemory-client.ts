/**
 * MyMemory 무료 번역 API — DeepL 한도 소진 시 폴백
 * https://mymemory.translated.net/doc/spec.php
 *
 * 선택: MYMEMORY_EMAIL=... (일일 한도 확대)
 */

const ENDPOINT = "https://api.mymemory.translated.net/get";
const MAX_CHARS = 480;
const CONCURRENCY = 4;
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type CacheEntry = { value: string; expires: number };
const memoryCache = new Map<string, CacheEntry>();

import { isGoodKoTranslation, isPredominantlyKorean } from "./localize-text";

const JAPANESE_RE = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/;

function getCached(text: string): string | undefined {
  const hit = memoryCache.get(text);
  if (!hit || hit.expires < Date.now()) return undefined;
  return hit.value;
}

function setCached(text: string, value: string) {
  memoryCache.set(text, { value, expires: Date.now() + CACHE_TTL_MS });
}

function langPair(text: string): string {
  if (JAPANESE_RE.test(text)) return "ja|ko";
  return "en|ko";
}

function splitChunks(text: string): string[] {
  if (text.length <= MAX_CHARS) return [text];
  const parts: string[] = [];
  let buf = "";
  for (const piece of text.split(/(?<=[.!?。！？\n])\s*/)) {
    const next = buf ? `${buf} ${piece}` : piece;
    if (next.length > MAX_CHARS) {
      if (buf.trim()) parts.push(buf.trim());
      if (piece.length > MAX_CHARS) {
        for (let i = 0; i < piece.length; i += MAX_CHARS) {
          parts.push(piece.slice(i, i + MAX_CHARS));
        }
        buf = "";
      } else {
        buf = piece;
      }
    } else {
      buf = next;
    }
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts.filter(Boolean);
}

async function callSegment(text: string): Promise<string | null> {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const cached = getCached(trimmed);
  if (cached) return cached;

  const params = new URLSearchParams({
    q: trimmed,
    langpair: langPair(trimmed),
  });
  const email = process.env.MYMEMORY_EMAIL?.trim();
  if (email) params.set("de", email);

  try {
    const res = await fetch(`${ENDPOINT}?${params}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      responseStatus?: number;
      responseData?: { translatedText?: string };
    };
    if (data.responseStatus && data.responseStatus !== 200) return null;
    const translated = data.responseData?.translatedText?.trim();
    if (!translated || translated === trimmed) return null;
    if (/QUERY LENGTH LIMIT|MYMEMORY WARNING/i.test(translated)) return null;
    setCached(trimmed, translated);
    return translated;
  } catch {
    return null;
  }
}

async function callOne(text: string): Promise<string | null> {
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (isPredominantlyKorean(trimmed)) return trimmed;

  const cached = getCached(trimmed);
  if (cached) return cached;

  const chunks = splitChunks(trimmed);
  const translated: string[] = [];
  for (const chunk of chunks) {
    const part = await callSegment(chunk);
    if (!part) return null;
    translated.push(part);
  }
  const joined = translated.join(" ").trim();
  if (!isGoodKoTranslation(trimmed, joined)) return null;
  setCached(trimmed, joined);
  return joined;
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return out;
}

/** MyMemory로 일괄 번역 (원문 → 번역문 Map) */
export async function translateMyMemoryBatch(
  texts: string[],
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  const unique = [...new Set(texts.map((t) => t.trim()).filter(Boolean))];
  const pending = unique.filter((t) => !getCached(t));

  const translated = await mapPool(pending, CONCURRENCY, callOne);
  pending.forEach((orig, idx) => {
    const value = translated[idx];
    if (value) result.set(orig, value);
  });

  for (const t of unique) {
    const cached = getCached(t);
    if (cached) result.set(t, cached);
  }

  return result;
}

export function isMyMemoryEnabled(): boolean {
  return process.env.MYMEMORY_DISABLE !== "1";
}
