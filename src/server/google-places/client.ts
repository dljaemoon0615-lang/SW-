/**
 * Google Places API (New)
 * https://developers.google.com/maps/documentation/places/web-service
 *
 * .env: GOOGLE_PLACES_API_KEY=AIza...
 * 서버에서만 호출하세요 (클라이언트 노출 금지).
 */

const BASE = "https://places.googleapis.com/v1";

export type GoogleLatLng = { latitude: number; longitude: number };

export type GooglePlaceSummary = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating?: number;
  reviewCount?: number;
  address?: string;
  types?: string[];
  primaryType?: string;
  editorialSummary?: string;
  servesBreakfast?: boolean;
  servesLunch?: boolean;
  servesDinner?: boolean;
  servesCoffee?: boolean;
  servesDessert?: boolean;
  servesBeer?: boolean;
  servesWine?: boolean;
  servesVegetarianFood?: boolean;
  hours?: string;
  priceLevel?: string;
  imageUrl?: string;
};

export type GooglePlaceReview = {
  author: string;
  rating: number;
  createdAt: string;
  text: string;
};

export type GooglePlaceDetails = GooglePlaceSummary & {
  reviews: GooglePlaceReview[];
};

function apiKey(): string | null {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  return key || null;
}

export function hasGooglePlacesKey(): boolean {
  return Boolean(apiKey());
}

async function request<T>(
  path: string,
  init: RequestInit & { fieldMask: string },
): Promise<T | null> {
  const key = apiKey();
  if (!key) return null;

  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": init.fieldMask,
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn("[google-places]", res.status, text.slice(0, 300));
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.warn("[google-places] fetch failed", err);
    return null;
  }
}

type ApiPlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: GoogleLatLng;
  rating?: number;
  userRatingCount?: number;
  types?: string[];
  primaryType?: string;
  editorialSummary?: { text?: string };
  servesBreakfast?: boolean;
  servesLunch?: boolean;
  servesDinner?: boolean;
  servesCoffee?: boolean;
  servesDessert?: boolean;
  servesBeer?: boolean;
  servesWine?: boolean;
  servesVegetarianFood?: boolean;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  priceLevel?: string;
  photos?: { name?: string }[];
  reviews?: {
    rating?: number;
    text?: { text?: string };
    authorAttribution?: { displayName?: string };
    publishTime?: string;
  }[];
};

function mapSummary(place: ApiPlace, imageUrl?: string): GooglePlaceSummary | null {
  if (!place.id || !place.location) return null;
  const name = place.displayName?.text?.trim();
  if (!name) return null;

  return {
    id: place.id,
    name,
    lat: place.location.latitude,
    lng: place.location.longitude,
    rating: place.rating,
    reviewCount: place.userRatingCount,
    address: place.formattedAddress,
    types: place.types,
    primaryType: place.primaryType,
    editorialSummary: place.editorialSummary?.text?.trim(),
    servesBreakfast: place.servesBreakfast,
    servesLunch: place.servesLunch,
    servesDinner: place.servesDinner,
    servesCoffee: place.servesCoffee,
    servesDessert: place.servesDessert,
    servesBeer: place.servesBeer,
    servesWine: place.servesWine,
    servesVegetarianFood: place.servesVegetarianFood,
    hours: place.regularOpeningHours?.weekdayDescriptions?.join(" · "),
    priceLevel: place.priceLevel,
    imageUrl,
  };
}

function mapReviews(place: ApiPlace): GooglePlaceReview[] {
  return (place.reviews ?? [])
    .filter((r) => r.text?.text?.trim())
    .map((r) => ({
      author: r.authorAttribution?.displayName?.trim() || "익명",
      rating: r.rating ?? 0,
      createdAt: r.publishTime?.slice(0, 10) ?? "",
      text: r.text!.text!.trim(),
    }));
}

export async function resolvePhotoUrl(photoName: string): Promise<string | undefined> {
  const key = apiKey();
  if (!key) return undefined;

  try {
    const res = await fetch(
      `${BASE}/${photoName}/media?maxHeightPx=800&maxWidthPx=800&skipHttpRedirect=true`,
      {
        headers: { "X-Goog-Api-Key": key },
        cache: "no-store",
      },
    );
    if (!res.ok) return undefined;
    const json = (await res.json()) as { photoUri?: string };
    return json.photoUri;
  } catch {
    return undefined;
  }
}

async function firstPhotoUrl(place: ApiPlace): Promise<string | undefined> {
  const photoName = place.photos?.[0]?.name;
  if (!photoName) return undefined;
  return resolvePhotoUrl(photoName);
}

export async function searchNearbyPlaces(options: {
  center: GoogleLatLng;
  radiusMeters: number;
  includedTypes: string[];
  maxResultCount?: number;
  languageCode?: string;
}): Promise<GooglePlaceSummary[]> {
  const json = await request<{ places?: ApiPlace[] }>("/places:searchNearby", {
    method: "POST",
    fieldMask:
      "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.primaryType,places.editorialSummary,places.servesBreakfast,places.servesLunch,places.servesDinner,places.servesCoffee,places.servesDessert,places.servesBeer,places.servesWine,places.servesVegetarianFood,places.regularOpeningHours,places.priceLevel,places.photos",
    body: JSON.stringify({
      includedTypes: options.includedTypes,
      maxResultCount: options.maxResultCount ?? 20,
      locationRestriction: {
        circle: {
          center: options.center,
          radius: options.radiusMeters,
        },
      },
      languageCode: options.languageCode ?? "ko",
    }),
  });

  if (!json?.places?.length) return [];

  const out: GooglePlaceSummary[] = [];
  for (const place of json.places) {
    const imageUrl = await firstPhotoUrl(place);
    const summary = mapSummary(place, imageUrl);
    if (summary) out.push(summary);
  }
  return out;
}

export async function searchTextPlace(options: {
  textQuery: string;
  center: GoogleLatLng;
  radiusMeters?: number;
  languageCode?: string;
}): Promise<GooglePlaceSummary | null> {
  const json = await request<{ places?: ApiPlace[] }>("/places:searchText", {
    method: "POST",
    fieldMask:
      "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.photos",
    body: JSON.stringify({
      textQuery: options.textQuery,
      maxResultCount: 1,
      languageCode: options.languageCode ?? "ko",
      locationBias: {
        circle: {
          center: options.center,
          radius: options.radiusMeters ?? 800,
        },
      },
    }),
  });

  const place = json?.places?.[0];
  if (!place) return null;
  const imageUrl = await firstPhotoUrl(place);
  return mapSummary(place, imageUrl);
}

export async function getPlaceDetails(placeId: string): Promise<GooglePlaceDetails | null> {
  const json = await request<ApiPlace>(`/places/${placeId}`, {
    method: "GET",
    fieldMask:
      "id,displayName,formattedAddress,location,rating,userRatingCount,types,primaryType,editorialSummary,regularOpeningHours,priceLevel,photos,reviews",
  });

  if (!json?.id) return null;
  const imageUrl = await firstPhotoUrl(json);
  const summary = mapSummary(json, imageUrl);
  if (!summary) return null;

  return {
    ...summary,
    reviews: mapReviews(json),
  };
}

/** API 호출 폭주 방지용 간단 배치 */
export async function mapInBatches<T, R>(
  items: T[],
  batchSize: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    const results = await Promise.all(chunk.map(fn));
    out.push(...results);
  }
  return out;
}
