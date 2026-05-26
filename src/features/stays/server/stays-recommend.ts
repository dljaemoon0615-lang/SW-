import type {
  AccommodationAmenity,
  AccommodationResult,
  AccommodationSearchRequest,
} from "@/server/ai/types";

type ScoreBreakdown = {
  score: number;
  reasons: string[];
};

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 1;
  return Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24)));
}

function budgetFit(price: number, budget: number): { score: number; status: "under" | "fit" | "over" } {
  if (budget <= 0) return { score: 0.5, status: "fit" };
  if (price <= budget * 0.6) return { score: 0.85, status: "under" };
  if (price <= budget) return { score: 1, status: "fit" };
  if (price <= budget * 1.2) return { score: 0.55, status: "over" };
  return { score: 0.2, status: "over" };
}

function ratingScore(rating: number): number {
  return Math.max(0, Math.min(rating / 5, 1));
}

function amenityScore(
  stayAmenities: AccommodationAmenity[] | undefined,
  requested: AccommodationAmenity[] | undefined,
): { score: number; matched: AccommodationAmenity[] } {
  if (!requested?.length) return { score: 0, matched: [] };
  if (!stayAmenities?.length) return { score: 0, matched: [] };
  const matched = requested.filter((a) => stayAmenities.includes(a));
  return { score: matched.length / requested.length, matched };
}

function typeScore(stayType: string, requested?: string[]): number {
  if (!requested?.length) return 1;
  return requested.includes(stayType) ? 1 : 0.3;
}

const AMENITY_LABEL: Record<AccommodationAmenity, string> = {
  WIFI: "Wi-Fi",
  BREAKFAST: "조식",
  ONSEN: "온천",
  KITCHEN: "주방",
  PARKING: "주차",
  AIRPORT_BUS: "공항 셔틀",
  FAMILY: "패밀리",
  NON_SMOKING: "금연",
};

export function scoreStay(stay: AccommodationResult, req: AccommodationSearchRequest): ScoreBreakdown {
  const nights = nightsBetween(req.checkIn, req.checkOut);
  const totalBudget = req.budgetKrw * nights;
  const stayTotal = stay.priceKrw * nights;

  const budget = budgetFit(stayTotal, totalBudget);
  const rating = ratingScore(stay.rating);
  const amenity = amenityScore(stay.amenities, req.amenities);
  const tScore = typeScore(stay.type, req.types);

  const score = +(
    budget.score * 0.45 +
    rating * 0.3 +
    amenity.score * 0.15 +
    tScore * 0.1
  ).toFixed(3);

  const reasons: string[] = [];
  if (budget.status === "under") reasons.push("예산 대비 저렴");
  if (budget.status === "fit") reasons.push("예산에 딱 맞음");
  if (budget.status === "over" && budget.score > 0.4) reasons.push("예산 조금 초과");
  if (stay.rating >= 4.5) reasons.push(`평점 ${stay.rating} 우수`);
  if (amenity.matched.length > 0) {
    reasons.push(`${amenity.matched.map((a) => AMENITY_LABEL[a]).join("·")} 보유`);
  }
  if (stay.walkMinutes != null && stay.walkMinutes <= 5) reasons.push("역 5분 이내");

  return { score, reasons };
}

export function rankStays(
  stays: AccommodationResult[],
  req: AccommodationSearchRequest,
): AccommodationResult[] {
  const scored = stays.map((s) => {
    const { score, reasons } = scoreStay(s, req);
    return {
      ...s,
      score,
      recommendReason: reasons.length ? reasons.slice(0, 2).join(" · ") : undefined,
    };
  });

  const sort = req.sort ?? "recommended";
  switch (sort) {
    case "price-asc":
      return scored.sort((a, b) => a.priceKrw - b.priceKrw);
    case "price-desc":
      return scored.sort((a, b) => b.priceKrw - a.priceKrw);
    case "rating-desc":
      return scored.sort((a, b) => b.rating - a.rating);
    case "recommended":
    default:
      return scored.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }
}

export function pickRecommended(
  ranked: AccommodationResult[],
  limit = 3,
): AccommodationResult[] {
  return [...ranked]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

export { AMENITY_LABEL };
