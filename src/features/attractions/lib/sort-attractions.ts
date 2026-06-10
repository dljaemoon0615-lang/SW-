import type { AttractionResult } from "@/server/ai/types";

/** Google Places와 동일 — 평점 ↓, 리뷰 수 ↓, 이름(가나다) */
export function sortAttractionsByRating(items: AttractionResult[]): AttractionResult[] {
  return [...items].sort(
    (a, b) =>
      (b.rating ?? 0) - (a.rating ?? 0) ||
      (b.reviewCount ?? 0) - (a.reviewCount ?? 0) ||
      a.name.localeCompare(b.name, "ko"),
  );
}
