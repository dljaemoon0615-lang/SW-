/**
 * DeepL API — 일본어·영어 → 한국어 번역
 * https://www.deepl.com/pro-api
 *
 * .env: DEEPL_API_KEY=xxxxxxxx:fx
 * DEEPL_SKIP=1 — API 호출 완전 비활성 (프리로드·사전만 사용)
 *
 * source_lang 을 생략하면 DeepL이 원문 언어를 자동 감지합니다 (JA/EN 혼합 배치 가능).
 */

import { isPredominantlyKorean } from "./localize-text";
import { lookupPreloadedKo } from "./preloaded-ko";
import { isMyMemoryEnabled, translateMyMemoryBatch } from "./mymemory-client";

const DEEPL_FREE = "https://api-free.deepl.com/v2/translate";
const DEEPL_PRO = "https://api.deepl.com/v2/translate";
const CHUNK_SIZE = 50;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type CacheEntry = { value: string; expires: number };
const memoryCache = new Map<string, CacheEntry>();

/** DeepL 456(한도 초과) 감지 시 세션 동안 API 스킵 */
let quotaExceeded = false;

export function isDeepLQuotaExceeded(): boolean {
  return quotaExceeded;
}

function shouldSkipDeepLApi(): boolean {
  if (process.env.DEEPL_SKIP === "1") return true;
  if (quotaExceeded) return true;
  return false;
}

function deeplEndpoint(apiKey: string): string {
  if (process.env.DEEPL_API_URL) return process.env.DEEPL_API_URL;
  if (process.env.DEEPL_PLAN === "pro") return DEEPL_PRO;
  if (apiKey.endsWith(":fx")) return DEEPL_FREE;
  return DEEPL_PRO;
}

function getCached(text: string): string | undefined {
  const hit = memoryCache.get(text);
  if (!hit || hit.expires < Date.now()) return undefined;
  return hit.value;
}

function setCached(text: string, value: string) {
  memoryCache.set(text, { value, expires: Date.now() + CACHE_TTL_MS });
}

const HANGUL_RE = /[가-힣]/;
const JAPANESE_RE = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/;
const LATIN_WORD_RE = /[A-Za-z]{3,}/;

/**
 * 한국어로 번역이 필요한 문자열인지 판별.
 * - 이미 한글만이면 제외
 * - 일본어(가나·한자) 또는 영어 단어(3자 이상)가 있으면 포함
 */
export function needsTranslation(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  if (HANGUL_RE.test(t) && !JAPANESE_RE.test(t) && !LATIN_WORD_RE.test(t)) return false;
  if (JAPANESE_RE.test(t)) return true;
  if (LATIN_WORD_RE.test(t)) return true;
  return false;
}

/** @deprecated needsTranslation 사용 */
export const needsJaTranslation = needsTranslation;

type DeepLResponse = {
  translations?: Array<{ detected_source_language?: string; text: string }>;
};

async function callDeepLChunk(
  texts: string[],
  apiKey: string,
): Promise<string[] | null> {
  const endpoint = deeplEndpoint(apiKey);
  try {
    const body = new URLSearchParams();
    for (const t of texts) body.append("text", t);
    body.set("target_lang", "KO");
    // source_lang 생략 → JA/EN 자동 감지

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      if (res.status === 456 || body.includes("Quota exceeded")) {
        quotaExceeded = true;
        console.warn("[deepl] quota exceeded — preloaded/dictionary translations only");
      } else {
        console.warn("[deepl] translate failed", res.status, body);
      }
      return null;
    }

    const data = (await res.json()) as DeepLResponse;
    const out = data.translations?.map((t) => t.text) ?? [];
    if (out.length !== texts.length) return null;
    return out;
  } catch (err) {
    console.warn("[deepl] translate error", err);
    return null;
  }
}

/**
 * 여러 문자열을 일괄 번역 (일본어·영어 → 한국어).
 * 반환 Map: 원문 → 번역문 (API 성공분만)
 */
export async function translateToKoBatch(
  texts: string[],
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  const apiKey = process.env.DEEPL_API_KEY?.trim();
  const skipApi = shouldSkipDeepLApi();

  const unique = [...new Set(texts.map((t) => t.trim()).filter(Boolean))];
  const pending: string[] = [];

  for (const text of unique) {
    if (!needsTranslation(text) || isPredominantlyKorean(text)) continue;

    const preloaded = lookupPreloadedKo(text);
    if (preloaded) {
      result.set(text, preloaded);
      continue;
    }

    const cached = getCached(text);
    if (cached) {
      result.set(text, cached);
      continue;
    }
    pending.push(text);
  }

  if (apiKey && !skipApi && pending.length > 0) {
    for (let i = 0; i < pending.length; i += CHUNK_SIZE) {
      if (shouldSkipDeepLApi()) break;
      const chunk = pending.slice(i, i + CHUNK_SIZE);
      const translated = await callDeepLChunk(chunk, apiKey);
      if (!translated) continue;
      chunk.forEach((orig, idx) => {
        const value = translated[idx];
        if (!value) return;
        result.set(orig, value);
        setCached(orig, value);
      });
    }
  }

  const stillPending = pending.filter((t) => !result.has(t));
  if (stillPending.length > 0 && isMyMemoryEnabled()) {
    const fromMemory = await translateMyMemoryBatch(stillPending);
    for (const [orig, value] of fromMemory) {
      result.set(orig, value);
      setCached(orig, value);
    }
  }

  return result;
}

/** @deprecated translateToKoBatch 사용 */
export const translateJaToKoBatch = translateToKoBatch;

export async function translateToKo(text: string): Promise<string | null> {
  const map = await translateToKoBatch([text]);
  return map.get(text.trim()) ?? null;
}

/** @deprecated translateToKo 사용 */
export const translateJaToKo = translateToKo;

export function isDeepLConfigured(): boolean {
  return Boolean(process.env.DEEPL_API_KEY?.trim());
}
