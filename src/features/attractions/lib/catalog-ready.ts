import type { AttractionResult } from "@/server/ai/types";

const MOCK_IDS = new Set([
  "osaka-castle",
  "fushimi-inari",
  "kiyomizu",
  "arashiyama",
  "ohori",
  "dazaifu",
  "canal-city",
  "sensoji",
  "shibuya-sky",
  "meiji",
  "clock-tower",
  "odori",
  "susukino",
]);

/** 지역당 이 개수 미만이면 아직 보강이 필요한 상태로 간주 */
export const MIN_ATTRACTIONS_PER_REGION = 15;

/** 사진·평점 워밍업이 아직 안 된 상태 */
export function isAttractionCatalogStale(items: AttractionResult[]): boolean {
  if (items.length === 0) return true;
  if (items.length < MIN_ATTRACTIONS_PER_REGION) return true;
  const hasGooglePhotos = items.some((i) => Boolean(i.imageUrl) && i.wikiUrl?.includes("place_id"));
  if (hasGooglePhotos) return false;
  if (items.some((i) => i.id.startsWith("curated-"))) return true;
  const fromGoogle = items.some(
    (i) => i.id.startsWith("ChIJ") || (i.reviewCount ?? 0) > 200,
  );
  if (fromGoogle) return false;
  return items.every((i) => MOCK_IDS.has(i.id));
}
