import type { RestaurantResult } from "@/server/ai/types";

const MOCK_IDS = new Set(["r1", "r2"]);

/** mock 폴백만 있는지 — Google Places 워밍업이 아직 안 된 상태 */
export function isRestaurantCatalogStale(items: RestaurantResult[]): boolean {
  if (items.length === 0) return true;
  const fromGoogle = items.some((i) => i.id.startsWith("ChIJ"));
  if (fromGoogle) return false;
  return items.every((i) => MOCK_IDS.has(i.id));
}
