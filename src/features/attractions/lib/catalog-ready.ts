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

/** mock 폴백만 있는지 — Google Places 워밍업이 아직 안 된 상태 */
export function isAttractionCatalogStale(items: AttractionResult[]): boolean {
  if (items.length === 0) return true;
  const fromGoogle = items.some(
    (i) => i.id.startsWith("ChIJ") || (i.reviewCount ?? 0) > 200,
  );
  if (fromGoogle) return false;
  return items.every((i) => MOCK_IDS.has(i.id));
}
