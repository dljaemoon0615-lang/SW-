/**
 * 라쿠텐 응답(일본어)의 호텔명·지역·특색 등을 한국어로 변환합니다.
 *
 * 1) 사전·프리로드 번역 우선 (DeepL 한도 소진 대비)
 * 2) DEEPL_API_KEY 가 있으면 DeepL API (일·영→한)
 * 3) 없거나 실패 시 JA_KO 사전 치환
 * 4) 사전에도 없으면 원문 유지
 */
import { buildKoTranslationMap } from "@/server/translate/ko-map";
import {
  normalizeFullWidth,
  spaceOutAddress,
  translateJa,
} from "@/server/translate/ja-ko-utils";

export { isMostlyJapanese, translateJa } from "@/server/translate/ja-ko-utils";

/** 호텔명을 한글화하되 원문이 이미 영어/한글이면 그대로 둠 */
export function translateHotelName(name: string): string {
  if (!name) return name;
  const normalized = normalizeFullWidth(name);
  if (/^[\sA-Za-z0-9.,&'!\-_:]+$/.test(normalized)) return normalized;
  return translateJa(name);
}

/** 주소(영역)에서 첫 동네 이름만 추출해 한글화 */
export function translateArea(address: string | undefined): string | undefined {
  if (!address) return undefined;
  const translated = translateJa(address);
  return spaceOutAddress(translated);
}

/** access 텍스트에서 가장 가까운 역을 추출해 한글화 */
export function translateStation(station: string | undefined): string | undefined {
  if (!station) return undefined;
  return translateJa(station);
}

function pickTranslated(
  text: string | undefined | null,
  map: Map<string, string>,
): string {
  if (!text) return "";
  const trimmed = text.trim();
  return map.get(trimmed) ?? translateJa(trimmed);
}

/**
 * 여러 문자열을 DeepL(일·영→한)로 일괄 번역한 뒤, 실패분은 사전 치환으로 보완한 Map을 만듭니다.
 */
export async function buildJaKoTranslationMap(
  texts: Array<string | undefined | null>,
): Promise<Map<string, string>> {
  return buildKoTranslationMap(texts, (text) => translateJa(text));
}

/** @deprecated buildJaKoTranslationMap 과 동일 */
export const buildKoTranslationMapForRakuten = buildJaKoTranslationMap;

export function translateHotelNameWithMap(
  name: string,
  map: Map<string, string>,
): string {
  if (!name) return name;
  const normalized = normalizeFullWidth(name);
  if (/^[\sA-Za-z0-9.,&'!\-_:]+$/.test(normalized)) return normalized;
  return pickTranslated(name, map) || translateHotelName(name);
}

export function translateAreaWithMap(
  address: string | undefined,
  map: Map<string, string>,
): string | undefined {
  if (!address) return undefined;
  return spaceOutAddress(pickTranslated(address, map));
}

export function translateStationWithMap(
  station: string | undefined,
  map: Map<string, string>,
): string | undefined {
  if (!station) return undefined;
  return pickTranslated(station, map);
}
