import {
  fetchAttractions,
  fetchWikiDetailsBatch,
  type OverpassPlace,
  type WikiDetail,
} from "@/server/attractions/travel-client";
import { enrichAttractionsWithRatings } from "@/features/attractions/data/attraction-ratings";
import { searchGoogleAttractions } from "@/server/google-places/attractions";
import { hasGooglePlacesKey } from "@/server/google-places/client";
import {
  getFamousLandmarksForRegion,
  getLandmarkFallbackDescription,
  landmarkToOverpassPlace,
} from "@/features/attractions/data/famous-landmarks";
import type { AttractionResult } from "@/server/ai/types";
import { applyFromMap, buildKoTranslationMap } from "@/server/translate/ko-map";
import type { JapanRegionId } from "@/shared/lib/constants";

const CACHE_VERSION = 5;

type RegionSpot = { lat: number; lon: number; radius: number };

/**
 * 지역별 검색 거점. Overpass POST 는 Next fetch 캐시가 적용되지 않아
 * 거점이 많을수록 rate-limit/timeout 위험이 커집니다.
 * 그래서 도시별로 1~2 거점에 충분히 큰 반경을 쓰고, 결과는 메모리 캐시합니다.
 */
const REGION_SPOTS: Record<JapanRegionId, RegionSpot[]> = {
  TOKYO: [{ lat: 35.6812, lon: 139.7671, radius: 8000 }],
  OSAKA_KYOTO: [
    { lat: 34.6937, lon: 135.5023, radius: 8000 }, // 오사카 중심
    { lat: 35.0116, lon: 135.7681, radius: 8000 }, // 교토 중심
  ],
  FUKUOKA: [{ lat: 33.5902, lon: 130.4017, radius: 9000 }],
  SAPPORO: [{ lat: 43.0686, lon: 141.3508, radius: 10000 }],
};

const CACHE_TTL_MS = 60 * 60 * 1000;
/** 한 지역에서 카드로 보일 최대 개수 (대표 명소 + Overpass 보충) */
const MAX_RESULTS_PER_REGION = 50;
const MAX_OVERPASS_POOL = 70;
type CacheEntry = { expires: number; data: AttractionResult[]; version: number };
const memoryCache = new Map<JapanRegionId, CacheEntry>();

function isCuratedId(id: string) {
  return id.startsWith("curated-");
}

/** 같은 장소가 Overpass와 중복되면 대표 명소 쪽을 남깁니다 */
function mergePlaces(curated: OverpassPlace[], fromOverpass: OverpassPlace[]): OverpassPlace[] {
  const out = [...curated];
  const near = (a: OverpassPlace, b: OverpassPlace) => {
    const dLat = Math.abs(a.lat - b.lat);
    const dLng = Math.abs(a.lng - b.lng);
    return dLat < 0.008 && dLng < 0.008;
  };
  const sameName = (a: OverpassPlace, b: OverpassPlace) => {
    const ak = (a.nameKo ?? a.nameJa ?? a.name).toLowerCase();
    const bk = (b.nameKo ?? b.nameJa ?? b.name).toLowerCase();
    return ak === bk || ak.includes(bk) || bk.includes(ak);
  };

  for (const p of fromOverpass) {
    if (out.some((c) => c.id === p.id)) continue;
    if (out.some((c) => near(c, p) || sameName(c, p))) continue;
    out.push(p);
  }
  return out;
}

function dedupe<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of items) {
    if (seen.has(it.id)) continue;
    seen.add(it.id);
    out.push(it);
  }
  return out;
}

const HANGUL_RE = /[가-힣]/;

function pickDisplayName(place: OverpassPlace, detail: WikiDetail): string {
  if (detail.lang === "ko") return detail.title;
  if (place.nameKo) return place.nameKo;
  return detail.title || place.name;
}

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

function estimateCrowd(
  category: string | undefined,
): Pick<
  AttractionResult,
  "crowdLevel" | "estimatedWaitMinutes" | "crowdReason" | "recommendedTimeSlots" | "bestVisitTags"
> {
  const { hour, isWeekend } = getTokyoNow();
  const c = category ?? "attraction";
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
  const timeTag = `추천 ${recommendedTimeSlots[0]}`;
  const dayTag = isWeekend ? "주말 기준" : "평일 기준";

  return {
    crowdLevel,
    estimatedWaitMinutes,
    crowdReason: `도착지 현지시간(${hour}시)·${isWeekend ? "주말" : "평일"}·카테고리(${c}) 기준 추정`,
    recommendedTimeSlots,
    bestVisitTags: [baseTag, timeTag, dayTag],
  };
}

function toResult(place: OverpassPlace, detail: WikiDetail): AttractionResult {
  const displayName = pickDisplayName(place, detail);
  const crowd = estimateCrowd(place.category);
  return {
    id: place.id,
    name: displayName,
    nameKo: HANGUL_RE.test(displayName) ? displayName : place.nameKo,
    lat: place.lat,
    lng: place.lng,
    category: place.category,
    description: detail.description,
    imageUrl: detail.imageUrl,
    wikiUrl: detail.wikiUrl,
    crowdLevel: crowd.crowdLevel,
    estimatedWaitMinutes: crowd.estimatedWaitMinutes,
    crowdReason: crowd.crowdReason,
    recommendedTimeSlots: crowd.recommendedTimeSlots,
    bestVisitTags: crowd.bestVisitTags,
  };
}

function rankKoreanFirst(a: AttractionResult, b: AttractionResult): number {
  const ak = HANGUL_RE.test(a.name) ? 0 : 1;
  const bk = HANGUL_RE.test(b.name) ? 0 : 1;
  return ak - bk;
}

/** DeepL로 이름·설명·태그 등 일·영 잔여 문구를 한국어로 통일 */
async function applyKoTranslations(
  items: AttractionResult[],
): Promise<AttractionResult[]> {
  if (items.length === 0) return items;

  const texts = items.flatMap((i) => [
    i.name,
    i.description,
    i.crowdReason,
    i.tips,
    i.address,
    ...(i.bestVisitTags ?? []),
    ...(i.highlights ?? []),
    ...(i.reviews?.map((r) => r.text) ?? []),
  ]);

  const map = await buildKoTranslationMap(texts);

  return items.map((i) => {
    const name = applyFromMap(i.name, map) ?? i.name;
    return {
      ...i,
      name,
      nameKo: HANGUL_RE.test(name) ? name : i.nameKo,
      description: applyFromMap(i.description, map),
      crowdReason: applyFromMap(i.crowdReason, map),
      tips: applyFromMap(i.tips, map),
      address: applyFromMap(i.address, map),
      bestVisitTags: i.bestVisitTags?.map((t) => applyFromMap(t, map) ?? t),
      highlights: i.highlights?.map((h) => applyFromMap(h, map) ?? h),
      reviews: i.reviews?.map((r) => ({
        ...r,
        text: applyFromMap(r.text, map) ?? r.text,
      })),
    };
  });
}

function attachCrowdEstimates(items: AttractionResult[]): AttractionResult[] {
  return items.map((item) => {
    const crowd = estimateCrowd(item.category);
    return { ...item, ...crowd };
  });
}

async function fetchFromGoogle(region: JapanRegionId): Promise<AttractionResult[] | null> {
  const fromGoogle = await searchGoogleAttractions(region);
  if (!fromGoogle?.length) return null;
  const withCrowd = attachCrowdEstimates(fromGoogle);
  return applyKoTranslations(withCrowd);
}

/**
 * 카테고리 우선순위 — 박물관·테마파크·역사 사적 같은 "확실한 관광지"를 앞에 두어
 * Wikipedia 배치 상한(50개)에 잘려도 핵심이 빠지지 않도록 정렬합니다.
 */
const CATEGORY_PRIORITY: Record<string, number> = {
  museum: 0,
  theme_park: 0,
  zoo: 0,
  aquarium: 0,
  gallery: 0,
  historic_castle: 1,
  historic_monument: 1,
  historic_memorial: 1,
  shrine: 1,
  temple: 1,
  garden: 2,
  park: 2,
  viewpoint: 3,
  attraction: 4,
};

function rankPlaceForEnrichment(a: OverpassPlace, b: OverpassPlace): number {
  const ca = isCuratedId(a.id) ? -10 : 0;
  const cb = isCuratedId(b.id) ? -10 : 0;
  if (ca !== cb) return ca - cb;
  const pa = CATEGORY_PRIORITY[a.category] ?? 5;
  const pb = CATEGORY_PRIORITY[b.category] ?? 5;
  if (pa !== pb) return pa - pb;
  const wa = a.wikipediaTag ? 0 : 1;
  const wb = b.wikipediaTag ? 0 : 1;
  return wa - wb;
}

function rankFinalResults(a: AttractionResult, b: AttractionResult): number {
  const ca = isCuratedId(a.id) ? 0 : 1;
  const cb = isCuratedId(b.id) ? 0 : 1;
  if (ca !== cb) return ca - cb;
  return rankKoreanFirst(a, b);
}

/**
 * 지정 지역의 관광지를 가져옵니다.
 * - GOOGLE_PLACES_API_KEY 있으면 Google Places nearby 검색 (맛집과 동일)
 * - 없거나 실패 시 Overpass(OSM) + Wikipedia 폴백
 */
export async function getAttractionsByRegion(
  region: JapanRegionId,
): Promise<AttractionResult[]> {
  const now = Date.now();
  const cached = memoryCache.get(region);
  if (
    cached &&
    cached.version === CACHE_VERSION &&
    cached.expires > now &&
    cached.data.length > 0
  ) {
    return cached.data;
  }

  if (hasGooglePlacesKey()) {
    const fromGoogle = await fetchFromGoogle(region);
    if (fromGoogle?.length) {
      memoryCache.set(region, {
        expires: now + CACHE_TTL_MS,
        data: fromGoogle,
        version: CACHE_VERSION,
      });
      return fromGoogle;
    }
  }

  const spots = REGION_SPOTS[region];
  if (!spots?.length) return [];

  const curatedPlaces = getFamousLandmarksForRegion(region).map(landmarkToOverpassPlace);

  const lists = await Promise.all(
    spots.map((spot) => fetchAttractions(spot.lat, spot.lon, spot.radius, MAX_OVERPASS_POOL)),
  );
  const overpassPlaces = dedupe(lists.flat());
  const mergedPlaces = mergePlaces(curatedPlaces, overpassPlaces).sort(rankPlaceForEnrichment);
  if (mergedPlaces.length === 0) return [];

  const candidates = mergedPlaces.slice(0, MAX_RESULTS_PER_REGION + curatedPlaces.length);
  const detailMap = await fetchWikiDetailsBatch(candidates);

  const items: AttractionResult[] = [];
  for (const place of candidates) {
    const detail = detailMap.get(place.id);
    const fallback = getLandmarkFallbackDescription(place.id);
    if (detail?.description) {
      items.push(toResult(place, detail));
    } else if (fallback) {
      items.push(
        toResult(place, {
          title: place.nameKo ?? place.nameJa ?? place.name,
          description: fallback,
          lang: "ko",
        }),
      );
    }
  }
  items.sort(rankFinalResults);
  const translated = await applyKoTranslations(items);
  const withRatings = enrichAttractionsWithRatings(translated);

  if (withRatings.length >= 5) {
    memoryCache.set(region, {
      expires: now + CACHE_TTL_MS,
      data: withRatings,
      version: CACHE_VERSION,
    });
  }
  return withRatings;
}

/** 기존 호출처 호환용 별칭 */
export async function listAttractions(region: JapanRegionId) {
  return getAttractionsByRegion(region);
}
