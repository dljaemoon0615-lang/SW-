import { getAttractionsByRegion } from "@/features/attractions/server/attractions.service";
import {
  searchStays,
  type StaySearchResponse,
} from "@/features/stays/server/stays.service";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import { defaultTripRange } from "@/shared/lib/trip-dates";
import type { AccommodationSearchRequest, AttractionResult } from "@/server/ai/types";

const REGION_IDS = JAPAN_REGIONS.map((r) => r.id);

export const DEFAULT_STAY_SEARCH: Omit<AccommodationSearchRequest, "region"> = {
  ...defaultTripRange(),
  guests: 2,
  budgetKrw: 150000,
  types: ["HOTEL", "RYOKAN", "GUESTHOUSE"],
  sort: "recommended",
};

type CatalogState = {
  attractions: Partial<Record<JapanRegionId, AttractionResult[]>>;
  stays: Partial<Record<JapanRegionId, StaySearchResponse>>;
  warmedAt: number | null;
};

const state: CatalogState = {
  attractions: {},
  stays: {},
  warmedAt: null,
};

let warmupPromise: Promise<void> | null = null;

function stayRequestFor(region: JapanRegionId): AccommodationSearchRequest {
  return { region, ...DEFAULT_STAY_SEARCH };
}

/** 서버 기동 시·최초 페이지 접근 시 전 지역 관광지·숙박 데이터를 미리 로드 */
export async function warmupCatalog(): Promise<void> {
  console.info("[catalog] warming attractions & stays for all regions…");
  const started = Date.now();

  await Promise.all(
    REGION_IDS.map(async (region) => {
      const [attractions, stays] = await Promise.all([
        getAttractionsByRegion(region).catch(() => [] as AttractionResult[]),
        searchStays(stayRequestFor(region)).catch(
          (): StaySearchResponse => ({
            items: [],
            recommended: [],
            areas: [],
            total: 0,
          }),
        ),
      ]);
      state.attractions[region] = attractions;
      state.stays[region] = stays;
    }),
  );

  state.warmedAt = Date.now();
  console.info(`[catalog] warmup done in ${Date.now() - started}ms`);
}

export function ensureCatalogWarm(): Promise<void> {
  if (state.warmedAt) return Promise.resolve();
  if (!warmupPromise) {
    warmupPromise = warmupCatalog().catch((err) => {
      warmupPromise = null;
      console.error("[catalog] warmup failed", err);
      throw err;
    });
  }
  return warmupPromise;
}

export function isCatalogWarm(): boolean {
  return state.warmedAt !== null;
}

export function getAttractionsCatalog(): Record<JapanRegionId, AttractionResult[]> {
  const out = {} as Record<JapanRegionId, AttractionResult[]>;
  for (const id of REGION_IDS) {
    out[id] = state.attractions[id] ?? [];
  }
  return out;
}

export function getAttractionsForRegion(region: JapanRegionId): AttractionResult[] | undefined {
  return state.attractions[region];
}

export function getStaysCatalog(): Record<JapanRegionId, StaySearchResponse> {
  const out = {} as Record<JapanRegionId, StaySearchResponse>;
  for (const id of REGION_IDS) {
    out[id] =
      state.stays[id] ??
      ({ items: [], recommended: [], areas: [], total: 0 } satisfies StaySearchResponse);
  }
  return out;
}

export function getStaysForRegion(region: JapanRegionId): StaySearchResponse | undefined {
  return state.stays[region];
}

export { stayRequestFor };
