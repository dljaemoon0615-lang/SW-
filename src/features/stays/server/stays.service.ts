import { aiAdapter } from "@/server/ai/adapter";
import type {
  AccommodationResult,
  AccommodationSearchRequest,
} from "@/server/ai/types";
import { pickRecommended, rankStays } from "./stays-recommend";

export type StaySearchResponse = {
  items: AccommodationResult[];
  recommended: AccommodationResult[];
  areas: string[];
  total: number;
};

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

export async function searchStays(req: AccommodationSearchRequest): Promise<StaySearchResponse> {
  let pool: AccommodationResult[] = [];

  try {
    const fromAi = await aiAdapter.searchAccommodations(req);
    pool = Array.isArray(fromAi) ? fromAi : [];
  } catch {
    pool = [];
  }

  if (req.area) {
    pool = pool.filter((s) => (s.area ?? "").includes(req.area!));
  }

  if (req.types?.length) {
    pool = pool.filter((s) => req.types!.includes(s.type));
  }

  const ranked = rankStays(pool, req);
  const recommended = pickRecommended(ranked);
  const areas = deriveAreas(ranked);

  return {
    items: ranked,
    recommended,
    areas,
    total: ranked.length,
  };
}
