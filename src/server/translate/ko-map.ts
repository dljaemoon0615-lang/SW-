import { translateToKoBatch } from "@/server/translate/deepl-client";

function pick(
  text: string,
  apiMap: Map<string, string>,
  fallback?: (text: string) => string,
): string {
  const trimmed = text.trim();
  return apiMap.get(trimmed) ?? fallback?.(trimmed) ?? trimmed;
}

/**
 * 여러 문자열을 DeepL(일·영→한)로 일괄 번역한 Map을 만듭니다.
 * API 미설정·실패 시 fallback 함수로 보완하고, 없으면 원문을 유지합니다.
 */
export async function buildKoTranslationMap(
  texts: Array<string | undefined | null>,
  fallback?: (text: string) => string,
): Promise<Map<string, string>> {
  const unique = [
    ...new Set(texts.map((t) => t?.trim()).filter((t): t is string => !!t)),
  ];
  const apiMap = await translateToKoBatch(unique);
  const out = new Map<string, string>();
  for (const text of unique) {
    out.set(text, pick(text, apiMap, fallback));
  }
  return out;
}

/** Map에서 번역문을 가져오거나 원문 반환 */
export function applyFromMap(
  text: string | undefined | null,
  map: Map<string, string>,
): string | undefined {
  if (!text) return undefined;
  const trimmed = text.trim();
  return map.get(trimmed) ?? trimmed;
}
