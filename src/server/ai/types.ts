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

export type AttractionReview = {
  id: string;
  author: string;
  rating: number;
  /** ISO 날짜 YYYY-MM-DD */
  createdAt: string;
  text: string;
};

export type AttractionResult = {
  id: string;
  name: string;
  nameKo?: string;
  lat: number;
  lng: number;
  /** 혼잡도: LOW(여유) / MEDIUM(보통) / HIGH(혼잡) */
  crowdLevel?: "LOW" | "MEDIUM" | "HIGH";
  /** 현재 추정 대기시간(분) */
  estimatedWaitMinutes?: number;
  /** 혼잡도 산정 근거 요약 */
  crowdReason?: string;
  /** 추천 방문 시간대 예: ["08:00-10:00", "17:00-19:00"] */
  recommendedTimeSlots?: string[];
  /** 여행자 평점 (5점 만점) */
  rating?: number;
  /** 리뷰·평가 건수 */
  reviewCount?: number;
  /** 별점별 비율(%) — 시각화용 */
  ratingDistribution?: { stars: 1 | 2 | 3 | 4 | 5; percent: number }[];
  /** 참고용 리뷰 요약 (공개 여행 정보·카테고리 기반) */
  reviews?: AttractionReview[];
  category?: string;
  fee?: string;
  hours?: string;
  bestVisitTags?: string[];
  imageUrl?: string;
  imageUrls?: string[];
  description?: string;
  highlights?: string[];
  address?: string;
  tips?: string;
  wikiUrl?: string;
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
  /** 대표·추천 메뉴 (업종·Google 요약 기반) */
  menuItems?: string[];
  /** Google editorialSummary 등 메뉴 맥락 요약 */
  menuSummary?: string;
  rating: number;
  reviewCount?: number;
  distanceKm: number;
  avgPriceKrw: number;
  hours: string;
  reservationRequired: boolean;
  address?: string;
  imageUrl?: string;
};
