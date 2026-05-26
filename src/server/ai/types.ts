import type { JapanRegionId } from "@/shared/lib/constants";

export type ItineraryGenerateRequest = {
  region: JapanRegionId;
  origin: string;
  startDate: string;
  endDate: string;
  budgetKrw: number;
  travelers: number;
  preferences?: string[];
};

export type ItineraryDay = {
  dayIndex: number;
  date: string;
  items: {
    placeId?: string;
    placeName: string;
    startTime?: string;
    endTime?: string;
    transport?: string;
    lat?: number;
    lng?: number;
  }[];
};

export type ItineraryGenerateResponse = {
  title: string;
  days: ItineraryDay[];
  attractions: AttractionResult[];
};

export type AttractionResult = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  fee?: string;
  hours?: string;
  bestVisitTags?: string[];
  imageUrl?: string;
  imageUrls?: string[];
  description?: string;
  highlights?: string[];
  address?: string;
  tips?: string;
};

export type AccommodationType = "HOTEL" | "RYOKAN" | "GUESTHOUSE";
export type AccommodationAmenity =
  | "WIFI"
  | "BREAKFAST"
  | "ONSEN"
  | "KITCHEN"
  | "PARKING"
  | "AIRPORT_BUS"
  | "FAMILY"
  | "NON_SMOKING";

export type AccommodationSearchRequest = {
  region: JapanRegionId;
  checkIn: string;
  checkOut: string;
  guests: number;
  budgetKrw: number;
  types?: AccommodationType[];
  amenities?: AccommodationAmenity[];
  area?: string;
  sort?: "recommended" | "price-asc" | "price-desc" | "rating-desc";
};

export type AccommodationResult = {
  id: string;
  name: string;
  type: AccommodationType;
  priceKrw: number;
  rating: number;
  reviewCount?: number;
  bookingUrl: string;
  imageUrl?: string;
  imageUrls?: string[];
  area?: string;
  nearestStation?: string;
  walkMinutes?: number;
  amenities?: AccommodationAmenity[];
  highlight?: string;
  score?: number;
  recommendReason?: string;
};

export type ChatRequest = {
  sessionId?: string;
  message: string;
  region?: JapanRegionId;
  tripContext?: Record<string, unknown>;
};

export type ChatResponse = {
  sessionId: string;
  reply: string;
  suggestedQuestions?: string[];
  itineraryPatch?: Partial<ItineraryGenerateResponse>;
};

export type RestaurantSearchRequest = {
  region: JapanRegionId;
  maxBudgetKrw?: number;
  maxDistanceKm?: number;
  minRating?: number;
};

export type RestaurantResult = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distanceKm: number;
  avgPriceKrw: number;
  hours: string;
  reservationRequired: boolean;
  imageUrl?: string;
};
