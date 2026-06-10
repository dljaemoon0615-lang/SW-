import { enrichAttractionsWithRatings } from "@/features/attractions/data/attraction-ratings";
import { getFamousLandmarksForRegion } from "@/features/attractions/data/famous-landmarks";
import { sortAttractionsByRating } from "@/features/attractions/lib/sort-attractions";
import type { AttractionResult } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";

/** 지역당 기본 노출 개수 */
export const CURATED_ATTRACTIONS_PER_REGION = 15;

const DEFAULT_FEE: Record<string, string | undefined> = {
  shrine: "무료",
  temple: "300~500엔",
  park: "무료",
  museum: "500~1,000엔",
  theme_park: "8,000엔~",
  aquarium: "2,000엔~",
  zoo: "600~800엔",
  viewpoint: "1,000~2,500엔",
  historic_castle: "600엔",
  attraction: "무료",
};

function getTokyoNow() {
  const now = new Date();
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Tokyo",
    }).format(now),
  );
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Asia/Tokyo",
  }).format(now);
  const isWeekend = weekday === "Sat" || weekday === "Sun";
  return { hour, isWeekend };
}

function attachCrowd(item: AttractionResult): AttractionResult {
  const { hour, isWeekend } = getTokyoNow();
  const c = item.category ?? "attraction";
  const isThemeLike = c === "theme_park" || c === "zoo" || c === "aquarium";
  const isMuseumLike = c === "museum" || c === "gallery";
  const isShrineLike = c === "shrine" || c === "temple" || c === "place_of_worship";
  const isParkLike = c === "park" || c === "garden";

  let score = 35;
  if (isThemeLike) score += 30;
  else if (isMuseumLike) score += 20;
  else if (isShrineLike) score += 10;
  else if (isParkLike) score += 5;
  if (isWeekend) score += 20;
  if (hour >= 11 && hour <= 15) score += 25;
  else if ((hour >= 9 && hour <= 10) || (hour >= 16 && hour <= 18)) score += 10;
  else if (hour >= 19 || hour <= 8) score -= 15;
  score = Math.max(5, Math.min(95, score));

  const crowdLevel = score >= 70 ? "HIGH" : score >= 45 ? "MEDIUM" : "LOW";
  const estimatedWaitMinutes =
    crowdLevel === "HIGH" ? (isThemeLike ? 55 : 35) : crowdLevel === "MEDIUM" ? 15 : 5;

  const recommendedTimeSlots = isThemeLike
    ? ["08:30-10:30", "18:00-20:00"]
    : isMuseumLike
      ? ["09:00-11:00", "16:30-18:00"]
      : isShrineLike
        ? ["07:00-09:30", "17:00-19:00"]
        : isParkLike
          ? ["07:00-10:00", "17:00-19:30"]
          : ["08:00-10:00", "17:00-19:00"];

  const baseTag = crowdLevel === "HIGH" ? "혼잡 시간대 주의" : crowdLevel === "MEDIUM" ? "보통 혼잡" : "비교적 여유";

  return {
    ...item,
    crowdLevel,
    estimatedWaitMinutes,
    crowdReason: `도착지 현지시간(${hour}시)·${isWeekend ? "주말" : "평일"} 기준 추정`,
    recommendedTimeSlots,
    bestVisitTags: [baseTag, `추천 ${recommendedTimeSlots[0]}`, isWeekend ? "주말 기준" : "평일 기준"],
  };
}

/**
 * 지역별 큐레이션 관광지 (~15곳).
 * 사진은 포함하지 않음 — `enrichCuratedAttractionsWithGoogle`에서 Google Places로 채웁니다.
 */
export function getCuratedAttractionsForRegion(region: JapanRegionId): AttractionResult[] {
  const landmarks = getFamousLandmarksForRegion(region).slice(0, CURATED_ATTRACTIONS_PER_REGION);

  const items: AttractionResult[] = landmarks.map((l) => ({
    id: l.id,
    name: l.nameKo,
    nameKo: l.nameKo,
    lat: l.lat,
    lng: l.lng,
    category: l.category,
    description: l.fallbackDescription,
    fee: DEFAULT_FEE[l.category] ?? DEFAULT_FEE.attraction,
    hours:
      l.category === "shrine" || l.category === "temple"
        ? "06:00–17:00"
        : l.category === "park"
          ? "24시간"
          : l.category === "theme_park"
            ? "09:00–21:00"
            : "10:00–18:00",
  }));

  return sortAttractionsByRating(
    enrichAttractionsWithRatings(items.map(attachCrowd)),
  );
}

/** 전 지역 큐레이션 카탈로그 (SSR·프리로드용, 사진 없음) */
export function getCuratedAttractionsCatalog(): Record<JapanRegionId, AttractionResult[]> {
  const regions: JapanRegionId[] = ["TOKYO", "OSAKA_KYOTO", "FUKUOKA", "SAPPORO"];
  return Object.fromEntries(
    regions.map((r) => [r, getCuratedAttractionsForRegion(r)]),
  ) as Record<JapanRegionId, AttractionResult[]>;
}
