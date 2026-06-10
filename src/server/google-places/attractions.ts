import { getFamousLandmarksForRegion } from "@/features/attractions/data/famous-landmarks";
import { ratingToDistribution } from "@/features/attractions/data/attraction-ratings";
import { sortAttractionsByRating } from "@/features/attractions/lib/sort-attractions";
import type { AttractionResult } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import {
  getPlaceDetails,
  hasGooglePlacesKey,
  mapInBatches,
  searchNearbyPlaces,
  searchTextPlace,
  type GooglePlaceDetails,
  type GooglePlaceSummary,
} from "@/server/google-places/client";

const REGION_CENTERS: Record<
  JapanRegionId,
  { lat: number; lng: number; radius: number }[]
> = {
  TOKYO: [
    { lat: 35.6812, lng: 139.7671, radius: 8000 },
    { lat: 35.6896, lng: 139.6917, radius: 8000 },
  ],
  OSAKA_KYOTO: [
    { lat: 34.6937, lng: 135.5023, radius: 8000 },
    { lat: 35.0116, lng: 135.7681, radius: 8000 },
  ],
  FUKUOKA: [
    { lat: 33.5902, lng: 130.4017, radius: 9000 },
    { lat: 33.5212, lng: 130.5349, radius: 8000 },
  ],
  SAPPORO: [{ lat: 43.0686, lng: 141.3508, radius: 10000 }],
};

/** supplemental 전용 — 대표 명소와 겹치지 않는 주변 POI를 더 모으기 위한 추가 거점 */
const SUPPLEMENTAL_EXTRA_CENTERS: Record<
  JapanRegionId,
  { lat: number; lng: number; radius: number }[]
> = {
  TOKYO: [{ lat: 35.7148, lng: 139.7967, radius: 9000 }],
  OSAKA_KYOTO: [
    { lat: 34.6851, lng: 135.8048, radius: 10000 },
    { lat: 34.6901, lng: 135.1956, radius: 9000 },
  ],
  FUKUOKA: [{ lat: 33.2494, lng: 130.2998, radius: 10000 }],
  SAPPORO: [{ lat: 42.9851, lng: 141.2672, radius: 10000 }],
};

const ATTRACTION_TYPES = [
  "tourist_attraction",
  "museum",
  "art_gallery",
  "park",
  "amusement_park",
  "aquarium",
  "zoo",
];

const TOURIST_TYPES = new Set([
  ...ATTRACTION_TYPES,
  "botanical_garden",
  "historical_landmark",
  "monument",
  "church",
  "hindu_temple",
  "buddhist_temple",
  "place_of_worship",
  "cultural_center",
  "performing_arts_theater",
  "observation_deck",
  "art_museum",
  "planetarium",
  "national_park",
  "hiking_area",
  "visitor_center",
  "wildlife_park",
  "water_park",
  "stadium",
]);

const EXCLUDE_PRIMARY = new Set([
  "restaurant",
  "cafe",
  "coffee_shop",
  "bar",
  "bakery",
  "meal_takeaway",
  "fast_food_restaurant",
  "lodging",
  "hotel",
  "store",
  "shopping_mall",
  "supermarket",
  "convenience_store",
  "department_store",
  "gas_station",
  "parking",
  "bus_station",
  "train_station",
  "subway_station",
]);

const MAX_RESULTS = 40;
const MAX_DETAILS = 25;
const HANGUL_RE = /[가-힣]/;

function categoryFromTypes(types?: string[], primaryType?: string): string {
  const candidates = [primaryType, ...(types ?? [])].filter(Boolean) as string[];
  const map: Record<string, string> = {
    museum: "museum",
    art_gallery: "gallery",
    amusement_park: "theme_park",
    aquarium: "aquarium",
    zoo: "zoo",
    park: "park",
    botanical_garden: "garden",
    tourist_attraction: "attraction",
    historical_landmark: "historic_monument",
    monument: "historic_monument",
    church: "place_of_worship",
    hindu_temple: "temple",
    buddhist_temple: "temple",
    place_of_worship: "shrine",
    cultural_center: "museum",
    performing_arts_theater: "attraction",
    observation_deck: "viewpoint",
    art_museum: "museum",
    planetarium: "museum",
    national_park: "park",
    hiking_area: "park",
    visitor_center: "attraction",
    wildlife_park: "zoo",
    water_park: "theme_park",
    stadium: "attraction",
  };
  for (const t of candidates) {
    if (map[t]) return map[t];
  }
  return "attraction";
}

function isAttractionPlace(place: GooglePlaceSummary): boolean {
  const types = new Set(
    [place.primaryType, ...(place.types ?? [])].filter(Boolean) as string[],
  );
  if (place.primaryType && EXCLUDE_PRIMARY.has(place.primaryType)) {
    if (![...types].some((t) => TOURIST_TYPES.has(t))) return false;
  }
  return [...types].some((t) => TOURIST_TYPES.has(t));
}

function mapsUrl(placeId: string): string {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

function isGooglePlaceId(id: string): boolean {
  return id.startsWith("ChIJ") || id.length > 20;
}

function toAttraction(
  place: GooglePlaceSummary,
  displayName?: string,
): AttractionResult {
  const category = categoryFromTypes(place.types, place.primaryType);
  const rating = place.rating;
  const name = displayName ?? place.name;

  return {
    id: place.id,
    name,
    nameKo: HANGUL_RE.test(name) ? name : displayName,
    lat: place.lat,
    lng: place.lng,
    category,
    description: place.editorialSummary,
    imageUrl: place.imageUrl,
    imageUrls: place.imageUrl ? [place.imageUrl] : undefined,
    address: place.address,
    hours: place.hours,
    rating,
    reviewCount: place.reviewCount,
    ratingDistribution: rating ? ratingToDistribution(rating) : undefined,
    wikiUrl: mapsUrl(place.id),
  };
}

function applyDetails(
  item: AttractionResult,
  details: GooglePlaceDetails,
): AttractionResult {
  const reviews = details.reviews.slice(0, 5).map((r, i) => ({
    id: `${item.id}-g-review-${i}`,
    author: r.author,
    rating: r.rating,
    createdAt: r.createdAt,
    text: r.text,
  }));

  const rating = details.rating ?? item.rating;

  return {
    ...item,
    rating,
    reviewCount: details.reviewCount ?? item.reviewCount,
    ratingDistribution: rating ? ratingToDistribution(rating) : item.ratingDistribution,
    description: item.description ?? details.editorialSummary,
    address: item.address ?? details.address,
    hours: item.hours ?? details.hours,
    imageUrl: item.imageUrl ?? details.imageUrl,
    imageUrls: item.imageUrls?.length
      ? item.imageUrls
      : details.imageUrl
        ? [details.imageUrl]
        : item.imageUrls,
    reviews: reviews.length ? reviews : item.reviews,
  };
}

function isNear(latA: number, lngA: number, latB: number, lngB: number, delta = 0.02): boolean {
  return Math.abs(latA - latB) < delta && Math.abs(lngA - lngB) < delta;
}

async function mergeLandmarksFromGoogle(
  region: JapanRegionId,
  merged: Map<string, AttractionResult>,
): Promise<void> {
  const landmarks = getFamousLandmarksForRegion(region);
  const found = await mapInBatches(landmarks, 3, async (landmark) => {
    const place = await searchTextPlace({
      textQuery: landmark.nameKo,
      center: { latitude: landmark.lat, longitude: landmark.lng },
      radiusMeters: 5000,
      languageCode: "ko",
    });
    if (!place || !isAttractionPlace(place)) return null;
    return toAttraction(place, landmark.nameKo);
  });

  for (const item of found) {
    if (!item) continue;
    const duplicate = [...merged.values()].some((existing) =>
      isNear(existing.lat, existing.lng, item.lat, item.lng),
    );
    if (duplicate) continue;
    merged.set(item.id, item);
  }
}

/** OSM·mock 목록에 Google Places 실평점을 붙여 다시 정렬 */
export async function applyGoogleRatingsFromPlaces(
  region: JapanRegionId,
  items: AttractionResult[],
): Promise<AttractionResult[]> {
  if (!hasGooglePlacesKey() || items.length === 0) return items;

  const center = REGION_CENTERS[region]?.[0];
  if (!center) return items;

  const updated = await mapInBatches(items, 3, async (item) => {
    if (isGooglePlaceId(item.id) && item.rating) return item;

    const query = item.nameKo ?? item.name;
    const place = await searchTextPlace({
      textQuery: query,
      center: { latitude: item.lat, longitude: item.lng },
      radiusMeters: Math.max(center.radius, 8000),
      languageCode: "ko",
    });
    if (!place?.rating) return item;

    return {
      ...item,
      rating: place.rating,
      reviewCount: place.reviewCount ?? item.reviewCount,
      ratingDistribution: ratingToDistribution(place.rating),
      wikiUrl: mapsUrl(place.id),
      address: item.address ?? place.address,
      imageUrl: item.imageUrl ?? place.imageUrl,
      imageUrls: item.imageUrls?.length
        ? item.imageUrls
        : place.imageUrl
          ? [place.imageUrl]
          : item.imageUrls,
    };
  });

  return sortAttractionsByRating(updated);
}

/** Google Places — 대표 명소 text search + nearby, Google 실평점순 */
export async function searchGoogleAttractions(
  region: JapanRegionId,
): Promise<AttractionResult[] | null> {
  if (!hasGooglePlacesKey()) return null;

  const centers = REGION_CENTERS[region];
  if (!centers?.length) return null;

  const merged = new Map<string, AttractionResult>();

  await mergeLandmarksFromGoogle(region, merged);

  const lists = await Promise.all(
    centers.map((center) =>
      searchNearbyPlaces({
        center: { latitude: center.lat, longitude: center.lng },
        radiusMeters: center.radius,
        includedTypes: ATTRACTION_TYPES,
        maxResultCount: 20,
        languageCode: "ko",
      }),
    ),
  );

  for (const list of lists) {
    for (const place of list) {
      if (merged.has(place.id)) continue;
      if (!isAttractionPlace(place)) continue;
      const duplicate = [...merged.values()].some((existing) =>
        isNear(existing.lat, existing.lng, place.lat, place.lng),
      );
      if (duplicate) continue;
      merged.set(place.id, toAttraction(place));
    }
  }

  if (merged.size === 0) return null;

  const results = sortAttractionsByRating([...merged.values()]).slice(0, MAX_RESULTS);

  const detailed = await mapInBatches(results.slice(0, MAX_DETAILS), 4, async (item) => {
    const details = await getPlaceDetails(item.id);
    return details ? applyDetails(item, details) : item;
  });

  const byId = new Map(detailed.map((item) => [item.id, item]));
  const final = results.map((item) => byId.get(item.id) ?? item);

  return final.length > 0 ? sortAttractionsByRating(final) : null;
}

/**
 * 2페이지용 빠른 Google 목록 — 랜드마크 text search·상세 API 없이 nearby만 병렬 호출
 */
export async function searchGoogleSupplementalAttractions(
  region: JapanRegionId,
): Promise<AttractionResult[] | null> {
  if (!hasGooglePlacesKey()) return null;

  const centers = [
    ...(REGION_CENTERS[region] ?? []),
    ...(SUPPLEMENTAL_EXTRA_CENTERS[region] ?? []),
  ];
  if (!centers.length) return null;

  const lists = await Promise.all(
    centers.map((center) =>
      searchNearbyPlaces({
        center: { latitude: center.lat, longitude: center.lng },
        radiusMeters: center.radius,
        includedTypes: ATTRACTION_TYPES,
        maxResultCount: 20,
        languageCode: "ko",
        resolvePhotos: false,
      }),
    ),
  );

  const merged = new Map<string, AttractionResult>();
  for (const list of lists) {
    for (const place of list) {
      if (merged.has(place.id)) continue;
      if (!isAttractionPlace(place)) continue;
      const duplicate = [...merged.values()].some((existing) =>
        isNear(existing.lat, existing.lng, place.lat, place.lng),
      );
      if (duplicate) continue;
      merged.set(place.id, toAttraction(place));
    }
  }

  if (merged.size === 0) return null;
  return sortAttractionsByRating([...merged.values()]);
}
