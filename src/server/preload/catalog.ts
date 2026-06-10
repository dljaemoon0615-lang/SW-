import { getAttractionsByRegion } from "@/features/attractions/server/attractions.service";
import { MOCK_ATTRACTIONS } from "@/features/attractions/server/mock-data";
import { enrichAttractionsWithRatings } from "@/features/attractions/data/attraction-ratings";
import { sortAttractionsByRating } from "@/features/attractions/lib/sort-attractions";
import {
  searchStays,
  type StaySearchResponse,
} from "@/features/stays/server/stays.service";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import { defaultTripRange } from "@/shared/lib/trip-dates";
import { DEFAULT_RESTAURANT_SEARCH } from "@/features/restaurants/lib/search-defaults";
import { searchRestaurants } from "@/features/restaurants/server";
import type {
  AccommodationSearchRequest,
  AttractionResult,
  RestaurantResult,
  RestaurantSearchRequest,
} from "@/server/ai/types";

const REGION_IDS = JAPAN_REGIONS.map((r) => r.id);

const defaultRange = defaultTripRange();

export const DEFAULT_STAY_SEARCH: Omit<AccommodationSearchRequest, "region"> = {
  checkIn: defaultRange.startDate,
  checkOut: defaultRange.endDate,
  guests: 2,
  budgetKrw: 150000,
  types: ["HOTEL", "RYOKAN", "GUESTHOUSE"],
  sort: "recommended",
};

const EMPTY_STAYS: StaySearchResponse = {
  items: [],
  recommended: [],
  areas: [],
  total: 0,
};

type CatalogState = {
  attractions: Partial<Record<JapanRegionId, AttractionResult[]>>;
  stays: Partial<Record<JapanRegionId, StaySearchResponse>>;
  restaurants: Partial<Record<JapanRegionId, RestaurantResult[]>>;
  attractionsWarmedAt: number | null;
  staysWarmedAt: number | null;
  restaurantsWarmedAt: number | null;
};

const state: CatalogState = {
  attractions: {},
  stays: {},
  restaurants: {},
  attractionsWarmedAt: null,
  staysWarmedAt: null,
  restaurantsWarmedAt: null,
};

let attractionsWarmPromise: Promise<void> | null = null;
let staysWarmPromise: Promise<void> | null = null;
let restaurantsWarmPromise: Promise<void> | null = null;
const attractionsLoading = new Map<JapanRegionId, Promise<void>>();
const staysLoading = new Map<JapanRegionId, Promise<void>>();
const restaurantsLoading = new Map<JapanRegionId, Promise<void>>();

function stayRequestFor(region: JapanRegionId): AccommodationSearchRequest {
  return { region, ...DEFAULT_STAY_SEARCH };
}

function restaurantRequestFor(region: JapanRegionId): RestaurantSearchRequest {
  return { region, ...DEFAULT_RESTAURANT_SEARCH };
}

function hasLoadedAttractions(region: JapanRegionId): boolean {
  return (state.attractions[region]?.length ?? 0) > 0;
}

function hasLoadedStays(region: JapanRegionId): boolean {
  return (state.stays[region]?.items.length ?? 0) > 0;
}

function allAttractionsLoaded(): boolean {
  return REGION_IDS.every(hasLoadedAttractions);
}

function allStaysLoaded(): boolean {
  return REGION_IDS.every(hasLoadedStays);
}

function hasLoadedRestaurants(region: JapanRegionId): boolean {
  return (state.restaurants[region]?.length ?? 0) > 0;
}

function allRestaurantsLoaded(): boolean {
  return REGION_IDS.every(hasLoadedRestaurants);
}

async function loadAttractionsForRegion(region: JapanRegionId): Promise<void> {
  if (hasLoadedAttractions(region)) return;

  const inFlight = attractionsLoading.get(region);
  if (inFlight) {
    await inFlight;
    return;
  }

  const promise = (async () => {
    const data = await getAttractionsByRegion(region).catch(
      () => MOCK_ATTRACTIONS[region] ?? [],
    );
    state.attractions[region] = data.length > 0 ? data : (MOCK_ATTRACTIONS[region] ?? []);
  })();

  attractionsLoading.set(region, promise);
  try {
    await promise;
  } finally {
    attractionsLoading.delete(region);
  }
}

async function loadStaysForRegion(region: JapanRegionId): Promise<void> {
  if (hasLoadedStays(region)) return;

  const inFlight = staysLoading.get(region);
  if (inFlight) {
    await inFlight;
    return;
  }

  const promise = (async () => {
    state.stays[region] = await searchStays(stayRequestFor(region)).catch(() => EMPTY_STAYS);
  })();

  staysLoading.set(region, promise);
  try {
    await promise;
  } finally {
    staysLoading.delete(region);
  }
}

async function warmupAllAttractions(): Promise<void> {
  console.info("[catalog] warming attractions for all regions…");
  const started = Date.now();

  await Promise.all(REGION_IDS.map((region) => loadAttractionsForRegion(region)));

  state.attractionsWarmedAt = Date.now();
  console.info(`[catalog] attractions warmup done in ${Date.now() - started}ms`);
}

async function warmupAllStays(): Promise<void> {
  console.info("[catalog] warming stays for all regions…");
  const started = Date.now();

  await Promise.all(REGION_IDS.map((region) => loadStaysForRegion(region)));

  state.staysWarmedAt = Date.now();
  console.info(`[catalog] stays warmup done in ${Date.now() - started}ms`);
}

async function loadRestaurantsForRegion(region: JapanRegionId): Promise<void> {
  if (hasLoadedRestaurants(region)) return;

  const inFlight = restaurantsLoading.get(region);
  if (inFlight) {
    await inFlight;
    return;
  }

  const promise = (async () => {
    state.restaurants[region] = await searchRestaurants(restaurantRequestFor(region)).catch(
      () => [],
    );
  })();

  restaurantsLoading.set(region, promise);
  try {
    await promise;
  } finally {
    restaurantsLoading.delete(region);
  }
}

async function warmupAllRestaurants(): Promise<void> {
  console.info("[catalog] warming restaurants for all regions…");
  const started = Date.now();

  await Promise.all(REGION_IDS.map((region) => loadRestaurantsForRegion(region)));

  state.restaurantsWarmedAt = Date.now();
  console.info(`[catalog] restaurants warmup done in ${Date.now() - started}ms`);
}

/** 서버 기동 시 전 지역 관광지·숙박·맛집 데이터를 백그라운드에서 로드 */
export async function warmupCatalog(): Promise<void> {
  await Promise.all([warmupAllAttractions(), warmupAllStays(), warmupAllRestaurants()]);
}

/** 선택 지역 관광지 1개만 우선 로드 (API·지연 갱신용) */
export async function ensureRegionAttractions(
  region: JapanRegionId,
): Promise<AttractionResult[]> {
  await loadAttractionsForRegion(region);
  return state.attractions[region] ?? MOCK_ATTRACTIONS[region] ?? [];
}

/** 관광지 카탈로그 — 캐시 없으면 즉시 mock으로 채워 페이지를 막지 않음 */
export function ensureAttractionsWarm(priorityRegion?: JapanRegionId): Promise<void> {
  if (priorityRegion && !hasLoadedAttractions(priorityRegion)) {
    void loadAttractionsForRegion(priorityRegion);
  }

  if (allAttractionsLoaded()) return Promise.resolve();

  if (!attractionsWarmPromise) {
    attractionsWarmPromise = warmupAllAttractions().catch((err) => {
      attractionsWarmPromise = null;
      console.error("[catalog] attractions warmup failed", err);
      throw err;
    });
  }

  return attractionsWarmPromise;
}

export function ensureStaysWarm(priorityRegion?: JapanRegionId): Promise<void> {
  if (priorityRegion && !hasLoadedStays(priorityRegion)) {
    void loadStaysForRegion(priorityRegion);
  }

  if (allStaysLoaded()) return Promise.resolve();

  if (!staysWarmPromise) {
    staysWarmPromise = warmupAllStays().catch((err) => {
      staysWarmPromise = null;
      console.error("[catalog] stays warmup failed", err);
      throw err;
    });
  }

  return staysWarmPromise;
}

export function ensureRestaurantsWarm(priorityRegion?: JapanRegionId): Promise<void> {
  if (priorityRegion && !hasLoadedRestaurants(priorityRegion)) {
    void loadRestaurantsForRegion(priorityRegion);
  }

  if (allRestaurantsLoaded()) return Promise.resolve();

  if (!restaurantsWarmPromise) {
    restaurantsWarmPromise = warmupAllRestaurants().catch((err) => {
      restaurantsWarmPromise = null;
      console.error("[catalog] restaurants warmup failed", err);
      throw err;
    });
  }

  return restaurantsWarmPromise;
}

export async function ensureRegionRestaurants(
  region: JapanRegionId,
): Promise<RestaurantResult[]> {
  await loadRestaurantsForRegion(region);
  return state.restaurants[region] ?? [];
}

/** @deprecated attractions·stays 모두 — 가능하면 ensureAttractionsWarm / ensureStaysWarm 사용 */
export function ensureCatalogWarm(): Promise<void> {
  return Promise.all([
    ensureAttractionsWarm(),
    ensureStaysWarm(),
    ensureRestaurantsWarm(),
  ]).then(() => undefined);
}

export function isCatalogWarm(): boolean {
  return (
    state.attractionsWarmedAt !== null &&
    state.staysWarmedAt !== null &&
    state.restaurantsWarmedAt !== null
  );
}

export function getAttractionsCatalog(): Record<JapanRegionId, AttractionResult[]> {
  const out = {} as Record<JapanRegionId, AttractionResult[]>;
  for (const id of REGION_IDS) {
    const cached = state.attractions[id];
    const items = cached?.length ? cached : (MOCK_ATTRACTIONS[id] ?? []);
    out[id] = sortAttractionsByRating(enrichAttractionsWithRatings(items));
  }
  return out;
}

export function getAttractionsForRegion(region: JapanRegionId): AttractionResult[] | undefined {
  const cached = state.attractions[region];
  if (cached?.length) return sortAttractionsByRating(cached);
  const mock = MOCK_ATTRACTIONS[region];
  return mock?.length ? sortAttractionsByRating(mock) : undefined;
}

export function getStaysCatalog(): Record<JapanRegionId, StaySearchResponse> {
  const out = {} as Record<JapanRegionId, StaySearchResponse>;
  for (const id of REGION_IDS) {
    out[id] = state.stays[id] ?? EMPTY_STAYS;
  }
  return out;
}

export function getStaysForRegion(region: JapanRegionId): StaySearchResponse | undefined {
  return state.stays[region];
}

export function getRestaurantsCatalog(): Record<JapanRegionId, RestaurantResult[]> {
  const out = {} as Record<JapanRegionId, RestaurantResult[]>;
  for (const id of REGION_IDS) {
    out[id] = state.restaurants[id] ?? [];
  }
  return out;
}

export function getRestaurantsForRegion(region: JapanRegionId): RestaurantResult[] | undefined {
  const cached = state.restaurants[region];
  return cached?.length ? cached : undefined;
}

export { stayRequestFor, restaurantRequestFor };
