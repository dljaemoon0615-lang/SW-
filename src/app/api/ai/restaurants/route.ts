import { NextResponse } from "next/server";
import { searchRestaurants } from "@/features/restaurants/server";
import { DEFAULT_RESTAURANT_SEARCH } from "@/features/restaurants/lib/search-defaults";
import {
  ensureRegionRestaurants,
  ensureRestaurantsWarm,
  getRestaurantsCatalog,
  getRestaurantsForRegion,
} from "@/server/preload/catalog";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";

export const revalidate = 3600;

function parseRegion(value: string | null): JapanRegionId {
  if (value && JAPAN_REGIONS.some((r) => r.id === value)) {
    return value as JapanRegionId;
  }
  return "TOKYO";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const preload = searchParams.get("preload");
  const region = parseRegion(searchParams.get("region"));

  if (preload === "all") {
    void ensureRestaurantsWarm();
    const catalog = getRestaurantsCatalog();
    return NextResponse.json({
      started: true,
      regions: JAPAN_REGIONS.map((r) => ({
        id: r.id,
        count: catalog[r.id]?.length ?? 0,
      })),
    });
  }

  if (preload === "1") {
    await ensureRegionRestaurants(region);
    const cached = getRestaurantsForRegion(region);
    const items = cached ?? (await ensureRegionRestaurants(region));
    return NextResponse.json({ items, preloaded: true });
  }

  const items = await searchRestaurants({
    region,
    maxBudgetKrw: Number(searchParams.get("maxBudgetKrw") ?? DEFAULT_RESTAURANT_SEARCH.maxBudgetKrw),
    maxDistanceKm: Number(
      searchParams.get("maxDistanceKm") ?? DEFAULT_RESTAURANT_SEARCH.maxDistanceKm,
    ),
    minRating: Number(searchParams.get("minRating") ?? DEFAULT_RESTAURANT_SEARCH.minRating),
  });

  return NextResponse.json({ items });
}
