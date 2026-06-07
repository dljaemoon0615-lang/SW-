import { buildMenuItems } from "@/features/restaurants/lib/menu-items";
import type { RestaurantResult, RestaurantSearchRequest } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import { hasGooglePlacesKey, searchNearbyPlaces } from "@/server/google-places/client";
import type { GooglePlaceSummary } from "@/server/google-places/client";

const REGION_CENTERS: Record<
  JapanRegionId,
  { lat: number; lng: number; radius: number }[]
> = {
  TOKYO: [{ lat: 35.6812, lng: 139.7671, radius: 6000 }],
  OSAKA_KYOTO: [
    { lat: 34.6937, lng: 135.5023, radius: 6000 },
    { lat: 35.0116, lng: 135.7681, radius: 6000 },
  ],
  FUKUOKA: [{ lat: 33.5902, lng: 130.4017, radius: 7000 }],
  SAPPORO: [{ lat: 43.0686, lng: 141.3508, radius: 7000 }],
};

const PRICE_LEVEL_KRW: Record<string, number> = {
  PRICE_LEVEL_FREE: 0,
  PRICE_LEVEL_INEXPENSIVE: 15000,
  PRICE_LEVEL_MODERATE: 30000,
  PRICE_LEVEL_EXPENSIVE: 55000,
  PRICE_LEVEL_VERY_EXPENSIVE: 90000,
};

function cuisineFromTypes(types: string[] | undefined): string {
  if (!types?.length) return "맛집";
  const map: Record<string, string> = {
    ramen_restaurant: "라멘",
    sushi_restaurant: "스시",
    japanese_restaurant: "일식",
    chinese_restaurant: "중식",
    italian_restaurant: "이탈리안",
    cafe: "카페",
    bakery: "베이커리",
    bar: "바",
    meal_takeaway: "테이크아웃",
  };
  for (const t of types) {
    if (map[t]) return map[t];
  }
  return "맛집";
}

function distanceKm(
  center: { lat: number; lng: number },
  point: { lat: number; lng: number },
): number {
  const dLat = (point.lat - center.lat) * 111;
  const dLng =
    (point.lng - center.lng) * 111 * Math.cos((center.lat * Math.PI) / 180);
  return Math.round(Math.hypot(dLat, dLng) * 10) / 10;
}

export async function searchGoogleRestaurants(
  req: RestaurantSearchRequest,
): Promise<RestaurantResult[] | null> {
  if (!hasGooglePlacesKey()) return null;

  const centers = REGION_CENTERS[req.region];
  if (!centers?.length) return null;

  const lists = await Promise.all(
    centers.map((center) =>
      searchNearbyPlaces({
        center: { latitude: center.lat, longitude: center.lng },
        radiusMeters: center.radius,
        includedTypes: ["restaurant", "cafe"],
        maxResultCount: 20,
        languageCode: "ko",
      }),
    ),
  );

  const merged = new Map<string, RestaurantResult>();
  for (const list of lists) {
    for (const place of list) {
      if (merged.has(place.id)) continue;

      const center = centers[0]!;
      const rating = place.rating ?? 0;
      if (req.minRating && rating < req.minRating) continue;

      const avgPriceKrw = PRICE_LEVEL_KRW[place.priceLevel ?? ""] ?? 25000;
      if (req.maxBudgetKrw && avgPriceKrw > req.maxBudgetKrw) continue;

      const dist = distanceKm(center, place);
      if (req.maxDistanceKm && dist > req.maxDistanceKm) continue;

      const cuisine = cuisineFromTypes(place.types);
      merged.set(place.id, mapPlaceToRestaurant(place, {
        cuisine,
        rating,
        distanceKm: dist,
        avgPriceKrw,
      }));
    }
  }

  const results = Array.from(merged.values()).sort((a, b) => b.rating - a.rating);
  return results.length > 0 ? results.slice(0, 40) : null;
}

function mapPlaceToRestaurant(
  place: GooglePlaceSummary,
  extra: { cuisine: string; rating: number; distanceKm: number; avgPriceKrw: number },
): RestaurantResult {
  const menuItems = buildMenuItems({
    types: place.types,
    primaryType: place.primaryType,
    cuisine: extra.cuisine,
    editorialSummary: place.editorialSummary,
    flags: {
      servesBreakfast: place.servesBreakfast,
      servesLunch: place.servesLunch,
      servesDinner: place.servesDinner,
      servesCoffee: place.servesCoffee,
      servesDessert: place.servesDessert,
      servesBeer: place.servesBeer,
      servesWine: place.servesWine,
      servesVegetarianFood: place.servesVegetarianFood,
    },
  });

  return {
    id: place.id,
    name: place.name,
    cuisine: extra.cuisine,
    menuItems,
    menuSummary: place.editorialSummary,
    rating: extra.rating,
    reviewCount: place.reviewCount,
    distanceKm: extra.distanceKm,
    avgPriceKrw: extra.avgPriceKrw,
    hours: place.hours ?? "영업시간 정보 없음",
    reservationRequired: extra.rating >= 4.3,
    address: place.address,
    imageUrl: place.imageUrl,
  };
}
