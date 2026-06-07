import type {
  AccommodationAmenity,
  AccommodationResult,
  AccommodationSearchRequest,
  AccommodationType,
} from "@/server/ai/types";
import { pickRecommended, rankStays } from "@/features/stays/server/stays-recommend";
import type { StaySearchResponse } from "@/features/stays/server/stays.service";

function deriveAreas(items: AccommodationResult[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of items) {
    if (!s.area) continue;
    const match = s.area.match(/^([가-힣]+(?:구|군|동|쵸|마치))/);
    const head = match ? match[1] : s.area.split(/\s/)[0];
    if (head && !seen.has(head)) {
      seen.add(head);
      out.push(head);
    }
  }
  return out.slice(0, 10);
}

/** 프리로드된 숙박 풀에 검색 조건(필터·정렬)만 클라이언트에서 적용 */
export function applyStayFilters(
  pool: AccommodationResult[],
  req: Pick<
    AccommodationSearchRequest,
    "types" | "amenities" | "area" | "sort" | "budgetKrw" | "checkIn" | "checkOut" | "guests"
  >,
): StaySearchResponse {
  let filtered = [...pool];

  if (req.area) {
    filtered = filtered.filter((s) => (s.area ?? "").includes(req.area!));
  }

  if (req.types?.length) {
    filtered = filtered.filter((s) => req.types!.includes(s.type as AccommodationType));
  }

  if (req.amenities?.length) {
    filtered = filtered.filter((s) =>
      req.amenities!.every((a) => s.amenities?.includes(a as AccommodationAmenity)),
    );
  }

  const ranked = rankStays(filtered, req as AccommodationSearchRequest);
  const recommended = pickRecommended(ranked);

  return {
    items: ranked,
    recommended,
    areas: deriveAreas(ranked),
    total: ranked.length,
  };
}
