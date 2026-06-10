import { CURATED_ATTRACTIONS_PER_REGION } from "@/features/attractions/data/curated-attractions";
import { isAttractionCatalogStale } from "@/features/attractions/lib/catalog-ready";
import type { AttractionResult } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";

export type RegionCatalogState = {
  curated: AttractionResult[];
  supplemental: AttractionResult[];
};

export function totalPagesForCatalog(state: RegionCatalogState): number {
  const extra =
    state.supplemental.length > 0
      ? Math.ceil(state.supplemental.length / CURATED_ATTRACTIONS_PER_REGION)
      : 0;
  return 1 + extra;
}

/** 서버 supplemental 로직 변경 시 올려 이전 브라우저 캐시를 비웁니다 */
const CLIENT_CACHE_VERSION = 3;

const regionCache = new Map<JapanRegionId, RegionCatalogState>();
const curatedDone = new Set<JapanRegionId>();
const supplementalDone = new Set<JapanRegionId>();
const curatedInflight = new Map<JapanRegionId, Promise<void>>();
const supplementalInflight = new Map<JapanRegionId, Promise<void>>();
let activeClientCacheVersion: number | null = null;

function ensureClientCacheFresh() {
  if (activeClientCacheVersion === CLIENT_CACHE_VERSION) return;
  regionCache.clear();
  curatedDone.clear();
  supplementalDone.clear();
  curatedInflight.clear();
  supplementalInflight.clear();
  activeClientCacheVersion = CLIENT_CACHE_VERSION;
}

export function readRegionCatalogCache(
  region: JapanRegionId,
): RegionCatalogState | undefined {
  ensureClientCacheFresh();
  return regionCache.get(region);
}

export function writeRegionCatalogCache(region: JapanRegionId, state: RegionCatalogState) {
  regionCache.set(region, state);
}

export function patchRegionCatalogCache(
  region: JapanRegionId,
  patch: Partial<RegionCatalogState>,
) {
  const prev = regionCache.get(region);
  if (!prev) return;
  regionCache.set(region, { ...prev, ...patch });
}

export function shouldFetchCurated(region: JapanRegionId, curated: AttractionResult[]): boolean {
  if (curatedDone.has(region)) return false;
  return isAttractionCatalogStale(curated);
}

export function shouldFetchSupplemental(region: JapanRegionId): boolean {
  return !supplementalDone.has(region);
}

export function markCuratedDone(region: JapanRegionId) {
  curatedDone.add(region);
}

export function markSupplementalDone(region: JapanRegionId) {
  supplementalDone.add(region);
}

export function isSupplementalDone(region: JapanRegionId): boolean {
  return supplementalDone.has(region);
}

export function resetSupplementalFetch(region: JapanRegionId) {
  supplementalDone.delete(region);
  supplementalInflight.delete(region);
  const prev = regionCache.get(region);
  if (prev) {
    regionCache.set(region, { ...prev, supplemental: [] });
  }
}

export function runCuratedFetch(
  region: JapanRegionId,
  fn: () => Promise<void>,
): Promise<void> {
  const existing = curatedInflight.get(region);
  if (existing) return existing;

  const promise = fn().finally(() => {
    curatedInflight.delete(region);
  });
  curatedInflight.set(region, promise);
  return promise;
}

export function runSupplementalFetch(
  region: JapanRegionId,
  fn: () => Promise<void>,
): Promise<void> {
  const existing = supplementalInflight.get(region);
  if (existing) return existing;

  const promise = fn().finally(() => {
    supplementalInflight.delete(region);
  });
  supplementalInflight.set(region, promise);
  return promise;
}
