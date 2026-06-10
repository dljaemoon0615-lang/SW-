import { formatOpeningHours } from "./format-opening-hours";

const HANGUL_RE = /[가-힣]/;
const JAPANESE_RE = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/;

/** @deprecated formatOpeningHours 사용 */
export function localizeOpeningHours(text: string | undefined | null): string | undefined {
  return formatOpeningHours(text);
}

export function isAlreadyKorean(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  const hangul = (t.match(HANGUL_RE) ?? []).length;
  const japanese = (t.match(JAPANESE_RE) ?? []).length;
  const latin = (t.match(/[A-Za-z]/g) ?? []).length;
  return hangul > 0 && hangul >= japanese && hangul >= latin * 0.3;
}

/** 원문이 이미 한국어 위주면 재번역하지 않음 (MyMemory 오역 방지) */
export function isPredominantlyKorean(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  const hangul = (t.match(HANGUL_RE) ?? []).length;
  const japanese = (t.match(JAPANESE_RE) ?? []).length;
  const latin = (t.match(/[A-Za-z]/g) ?? []).length;
  return hangul >= 12 && hangul > japanese * 2 && hangul > latin;
}

/** 번역 결과가 쓸 만한지 (깨진 문자·물음표 범벅 제외) */
export function isGoodKoTranslation(orig: string, ko: string): boolean {
  if (!ko || ko === orig) return false;
  if (!HANGUL_RE.test(ko)) return false;
  if ((ko.match(/\?/g)?.length ?? 0) >= 5) return false;
  if (/미안해|QUERY LENGTH|MYMEMORY WARNING|©\s*&/i.test(ko)) return false;
  if (isPredominantlyKorean(orig) && !JAPANESE_RE.test(orig)) return false;
  return true;
}
