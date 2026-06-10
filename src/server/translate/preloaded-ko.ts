import { getLandmarkKoMap } from "@/features/attractions/data/famous-landmarks";
import { JA_KO_DICTIONARY } from "./ja-ko-dictionary";
import generated from "./preloaded-ko.generated.json";

/** 스크립트로 생성·병합되는 추가 번역 (호텔명·Google 설명 등) */
type GeneratedMap = Record<string, string>;

let lookupMap: Map<string, string> | null = null;

function buildLookupMap(): Map<string, string> {
  const merged: Record<string, string> = {
    ...JA_KO_DICTIONARY,
    ...getLandmarkKoMap(),
    ...(generated as GeneratedMap),
  };
  return new Map(Object.entries(merged));
}

function getLookupMap(): Map<string, string> {
  if (!lookupMap) lookupMap = buildLookupMap();
  return lookupMap;
}

/** 사전·프리로드에 등록된 한국어 번역 (없으면 undefined) */
export function lookupPreloadedKo(text: string): string | undefined {
  const trimmed = text.trim();
  if (!trimmed) return undefined;
  return getLookupMap().get(trimmed);
}

/** 디버그·스크립트용 — 현재 등록된 항목 수 */
export function preloadedKoEntryCount(): number {
  return getLookupMap().size;
}
