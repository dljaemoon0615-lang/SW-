import { ratingToDistribution } from "@/features/attractions/data/attraction-ratings";
import { sortAttractionsByRating } from "@/features/attractions/lib/sort-attractions";
import type { AttractionResult } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import {
  hasGooglePlacesKey,
  mapInBatches,
  searchTextPlace,
} from "@/server/google-places/client";

const ENRICH_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const enrichCache = new Map<string, { expires: number; data: AttractionResult }>();

function mapsUrl(placeId: string): string {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

function isNear(latA: number, lngA: number, latB: number, lngB: number, delta = 0.03): boolean {
  return Math.abs(latA - latB) < delta && Math.abs(lngA - lngB) < delta;
}

async function enrichOne(item: AttractionResult): Promise<AttractionResult> {
  const cached = enrichCache.get(item.id);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  const query = item.nameKo ?? item.name;
  const place = await searchTextPlace({
    textQuery: query,
    center: { latitude: item.lat, longitude: item.lng },
    radiusMeters: 4000,
    languageCode: "ko",
  });

  if (!place || !isNear(item.lat, item.lng, place.lat, place.lng)) {
    return item;
  }

  const rating = place.rating ?? item.rating;

  const enriched: AttractionResult = {
    ...item,
    name: item.nameKo ?? item.name,
    imageUrl: place.imageUrl,
    imageUrls: place.imageUrl ? [place.imageUrl] : item.imageUrls,
    rating,
    reviewCount: place.reviewCount ?? item.reviewCount,
    ratingDistribution: rating ? ratingToDistribution(rating) : item.ratingDistribution,
    address: place.address ?? item.address,
    wikiUrl: mapsUrl(place.id),
  };

  enrichCache.set(item.id, {
    expires: Date.now() + ENRICH_CACHE_TTL_MS,
    data: enriched,
  });

  return enriched;
}

/** 큐레이션 명소에 Google Places 사진·평점·리뷰를 붙입니다 (배치·캐시) */
export async function enrichCuratedAttractionsWithGoogle(
  _region: JapanRegionId,
  items: AttractionResult[],
): Promise<AttractionResult[]> {
  if (!hasGooglePlacesKey() || items.length === 0) return items;

  const enriched = await mapInBatches(items, 3, enrichOne);
  return sortAttractionsByRating(enriched);
}
