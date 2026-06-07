import { aiAdapter } from "@/server/ai/adapter";
import type { RestaurantResult, RestaurantSearchRequest } from "@/server/ai/types";
import { searchGoogleRestaurants } from "@/server/google-places/restaurants";
import { applyFromMap, buildKoTranslationMap } from "@/server/translate/ko-map";

async function applyKoToRestaurants(
  items: RestaurantResult[],
): Promise<RestaurantResult[]> {
  if (items.length === 0) return items;

  const map = await buildKoTranslationMap(
    items.flatMap((r) => [
      r.name,
      r.cuisine,
      r.hours,
      r.menuSummary,
      ...(r.menuItems ?? []),
    ]),
  );

  return items.map((r) => ({
    ...r,
    name: applyFromMap(r.name, map) ?? r.name,
    cuisine: applyFromMap(r.cuisine, map) ?? r.cuisine,
    hours: applyFromMap(r.hours, map) ?? r.hours,
    menuSummary: r.menuSummary ? (applyFromMap(r.menuSummary, map) ?? r.menuSummary) : undefined,
    menuItems: r.menuItems?.map((item) => applyFromMap(item, map) ?? item),
  }));
}

export async function searchRestaurants(
  req: RestaurantSearchRequest,
): Promise<RestaurantResult[]> {
  const fromGoogle = await searchGoogleRestaurants(req);
  if (fromGoogle?.length) return applyKoToRestaurants(fromGoogle);

  const items = await aiAdapter.searchRestaurants(req);
  return applyKoToRestaurants(items);
}
