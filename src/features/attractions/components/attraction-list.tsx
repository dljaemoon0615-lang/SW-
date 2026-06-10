"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/shared/ui/badge";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import { enrichAttractionsWithRatings } from "@/features/attractions/data/attraction-ratings";
import { CURATED_ATTRACTIONS_PER_REGION } from "@/features/attractions/data/curated-attractions";
import { isAttractionCatalogStale } from "@/features/attractions/lib/catalog-ready";
import {
  markCuratedDone,
  isSupplementalDone,
  markSupplementalDone,
  readRegionCatalogCache,
  resetSupplementalFetch,
  runCuratedFetch,
  runSupplementalFetch,
  shouldFetchCurated,
  shouldFetchSupplemental,
  patchRegionCatalogCache,
  totalPagesForCatalog,
  writeRegionCatalogCache,
  type RegionCatalogState,
} from "@/features/attractions/lib/attractions-client-catalog";
import { sortAttractionsByRating } from "@/features/attractions/lib/sort-attractions";
import type { AttractionResult } from "@/server/ai/types";
import { AttractionDetailModal } from "@/features/attractions/components/attraction-detail-modal";
import { AttractionListRows } from "@/features/attractions/components/attraction-list-rows";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  LayoutGrid,
  List,
  Map,
  Star,
  Ticket,
  Users,
} from "lucide-react";

const AttractionMap = dynamic(
  () =>
    import("@/features/attractions/components/attraction-map").then((m) => ({
      default: m.AttractionMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500 sm:min-h-[360px]">
        지도 불러오는 중…
      </div>
    ),
  },
);

type ViewMode = "split" | "map" | "list";

const CATEGORY_LABEL: Record<string, string> = {
  attraction: "명소",
  museum: "박물관",
  viewpoint: "전망대",
  theme_park: "테마파크",
  zoo: "동물원",
  aquarium: "수족관",
  gallery: "미술관",
  shrine: "신사",
  temple: "사찰",
  place_of_worship: "종교 시설",
  park: "공원",
  garden: "정원",
  historic_castle: "성·궁궐",
  historic_fort: "성·궁궐",
  historic_city_gate: "성문",
  historic_monument: "기념물",
  historic_memorial: "기념관",
  historic_ruins: "유적",
  historic_archaeological_site: "유적지",
  historic_tomb: "고분",
};

function initRegionCatalog(
  initial: Record<JapanRegionId, AttractionResult[]>,
): Record<JapanRegionId, RegionCatalogState> {
  const out = {} as Record<JapanRegionId, RegionCatalogState>;
  for (const r of JAPAN_REGIONS) {
    const cached = readRegionCatalogCache(r.id);
    const curated = sortAttractionsByRating(
      enrichAttractionsWithRatings(cached?.curated ?? initial[r.id] ?? []),
    );
    out[r.id] = {
      curated,
      supplemental: cached?.supplemental ?? [],
    };
    writeRegionCatalogCache(r.id, out[r.id]);
    if (!isAttractionCatalogStale(curated)) markCuratedDone(r.id);
    if (out[r.id].supplemental.length >= CURATED_ATTRACTIONS_PER_REGION) {
      markSupplementalDone(r.id);
    }
  }
  return out;
}

function AttractionPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 pt-2"
      aria-label="관광지 페이지"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
        aria-label="이전 페이지"
      >
        <ChevronLeft size={16} />
        이전
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
            p === page
              ? "bg-brand text-white"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
        aria-label="다음 페이지"
      >
        다음
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

function AttractionCard({
  attraction,
  rank,
  onSelect,
}: {
  attraction: AttractionResult;
  rank?: number;
  onSelect: () => void;
}) {
  const photos =
    attraction.imageUrls?.length
      ? attraction.imageUrls
      : attraction.imageUrl
        ? [attraction.imageUrl]
        : [];

  const crowdUi =
    attraction.crowdLevel === "HIGH"
      ? { label: "혼잡", cls: "bg-rose-500/90 text-white" }
      : attraction.crowdLevel === "MEDIUM"
        ? { label: "보통", cls: "bg-amber-400/90 text-slate-900" }
        : attraction.crowdLevel === "LOW"
          ? { label: "여유", cls: "bg-emerald-500/90 text-white" }
          : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition hover:scale-[1.01] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
    >
      <div className="relative cursor-zoom-in">
        {photos.length > 0 ? (
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
            <Image
              src={photos[0]}
              alt={attraction.name}
              fill
              className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-rose-100 to-sky-100 text-sm text-slate-500 sm:aspect-[16/10]">
            사진 준비 중
          </div>
        )}

        {photos.length > 1 ? (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            +{photos.length - 1}장 · 탭하여 확대
          </span>
        ) : (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 transition group-hover:opacity-100">
            탭하여 확대
          </span>
        )}

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-700 opacity-0 shadow transition group-hover:opacity-100">
          자세히 보기
        </span>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        {rank != null ? (
          <span className="pointer-events-none absolute left-3 top-3 z-10 flex h-7 min-w-7 items-center justify-center rounded-full bg-slate-900/90 px-1.5 text-[11px] font-bold text-white shadow">
            {rank}
          </span>
        ) : null}
        {attraction.category ? (
          <span
            className={`pointer-events-none absolute rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm ${rank != null ? "left-12 top-3" : "left-3 top-3"}`}
          >
            {CATEGORY_LABEL[attraction.category] ?? attraction.category}
          </span>
        ) : null}
        {crowdUi ? (
          <span
            className={`pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${crowdUi.cls}`}
          >
            <Users size={12} />
            {crowdUi.label}
          </span>
        ) : null}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-end justify-between gap-2">
            <h3 className="text-lg font-bold leading-tight drop-shadow-sm">{attraction.name}</h3>
            {attraction.rating ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-sm font-semibold backdrop-blur-sm">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {attraction.rating}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-2 px-3 py-2.5">
        {attraction.description ? (
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
            {attraction.description}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
          {attraction.fee ? (
            <span className="inline-flex items-center gap-1">
              <Ticket size={13} className="text-brand" />
              {attraction.fee}
            </span>
          ) : null}
          {attraction.hours ? (
            <span className="inline-flex items-center gap-1">
              <Clock size={13} className="text-slate-400" />
              {attraction.hours}
            </span>
          ) : null}
          {typeof attraction.estimatedWaitMinutes === "number" ? (
            <span className="inline-flex items-center gap-1">
              <Users size={13} className="text-indigo-500" />
              대기 약 {attraction.estimatedWaitMinutes}분
            </span>
          ) : null}
        </div>
        {attraction.bestVisitTags?.length ? (
          <div className="flex flex-wrap gap-1">
            {attraction.bestVisitTags.map((tag) => (
              <Badge key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}

type AttractionListProps = {
  /** 서버 프리로드된 지역별 관광지 (지역 변경 시 즉시 표시) */
  initialByRegion: Record<JapanRegionId, AttractionResult[]>;
};

export function AttractionList({ initialByRegion }: AttractionListProps) {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region") as JapanRegionId | null;
  const initialRegion =
    regionParam && JAPAN_REGIONS.some((r) => r.id === regionParam)
      ? regionParam
      : "OSAKA_KYOTO";

  const [catalog, setCatalog] = useState(() => initRegionCatalog(initialByRegion));
  const [pickedRegion, setPickedRegion] = useState<JapanRegionId>(initialRegion);
  const region = regionParam && JAPAN_REGIONS.some((r) => r.id === regionParam) ? regionParam : pickedRegion;
  const [selected, setSelected] = useState<AttractionResult | null>(null);
  const [view, setView] = useState<ViewMode>("split");
  const [page, setPage] = useState(1);
  const [loadingCurated, setLoadingCurated] = useState<Set<JapanRegionId>>(() => new Set());
  const [loadingSupplemental, setLoadingSupplemental] = useState<Set<JapanRegionId>>(
    () => new Set(),
  );
  const [supplementalFailed, setSupplementalFailed] = useState<Set<JapanRegionId>>(
    () => new Set(),
  );
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const applyCatalogPatch = useCallback(
    (target: JapanRegionId, patch: Partial<RegionCatalogState>) => {
      patchRegionCatalogCache(target, patch);
      if (!mountedRef.current) return;
      setCatalog((prev) => ({
        ...prev,
        [target]: { ...prev[target], ...patch },
      }));
    },
    [],
  );

  const fetchCuratedPage = useCallback(
    (target: JapanRegionId, curated: AttractionResult[]) => {
      if (!shouldFetchCurated(target, curated)) return Promise.resolve();

      return runCuratedFetch(target, async () => {
        setLoadingCurated((prev) => new Set(prev).add(target));
        try {
          const res = await fetch(
            `/api/ai/attractions?region=${target}&page=1&preload=1`,
            { cache: "no-store" },
          );
          const d = await res.json();
          const next = (d.attractions ?? d.items) as AttractionResult[] | undefined;
          if (!Array.isArray(next) || next.length === 0) return;
          applyCatalogPatch(target, {
            curated: sortAttractionsByRating(next),
          });
          markCuratedDone(target);
        } catch {
          /* ignore */
        } finally {
          if (mountedRef.current) {
            setLoadingCurated((prev) => {
              const next = new Set(prev);
              next.delete(target);
              return next;
            });
          }
        }
      });
    },
    [applyCatalogPatch],
  );

  const fetchSupplementalPool = useCallback(
    (target: JapanRegionId) => {
      if (!shouldFetchSupplemental(target)) return Promise.resolve();

      return runSupplementalFetch(target, async () => {
        setLoadingSupplemental((prev) => new Set(prev).add(target));
        setSupplementalFailed((prev) => {
          const next = new Set(prev);
          next.delete(target);
          return next;
        });
        try {
          const res = await fetch(
            `/api/ai/attractions?region=${target}&supplemental=1`,
            { cache: "no-store", signal: AbortSignal.timeout(90_000) },
          );
          if (!res.ok) throw new Error(`supplemental ${res.status}`);
          const d = await res.json();
          const pool = (d.supplemental ?? d.items) as AttractionResult[] | undefined;
          if (!Array.isArray(pool)) throw new Error("invalid supplemental payload");
          applyCatalogPatch(target, {
            supplemental: sortAttractionsByRating(pool),
          });
          markSupplementalDone(target);
        } catch {
          if (mountedRef.current) {
            setSupplementalFailed((prev) => new Set(prev).add(target));
          }
        } finally {
          if (mountedRef.current) {
            setLoadingSupplemental((prev) => {
              const next = new Set(prev);
              next.delete(target);
              return next;
            });
          }
        }
      });
    },
    [applyCatalogPatch],
  );

  const refreshRegion = useCallback(
    (target: JapanRegionId, curated: AttractionResult[]) => {
      void fetchCuratedPage(target, curated);
      void fetchSupplementalPool(target);
    },
    [fetchCuratedPage, fetchSupplementalPool],
  );

  /** 재방문 시 캐시 사용 — 현재 지역만 즉시, 나머지는 순차 */
  useEffect(() => {
    const current = catalog[region]?.curated ?? [];
    void fetchCuratedPage(region, current);
    void fetchSupplementalPool(region);

    const timers: number[] = [];
    let delay = 3_000;
    for (const r of JAPAN_REGIONS) {
      if (r.id === region) continue;
      timers.push(
        window.setTimeout(() => {
          const curated = catalog[r.id]?.curated ?? [];
          refreshRegion(r.id, curated);
        }, delay),
      );
      delay += 4_000;
    }

    return () => {
      for (const id of timers) window.clearTimeout(id);
    };
    // catalog는 캐시 복원 직후 1회만 — 값 변경마다 재요청하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, fetchCuratedPage, fetchSupplementalPool, refreshRegion]);

  useEffect(() => {
    setPage(1);
    setSelected(null);
  }, [region]);

  const regionCatalog = catalog[region];
  const totalPages = regionCatalog ? totalPagesForCatalog(regionCatalog) : 1;

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);
  const isCuratedPage = page === 1;
  const isRefreshingCurated = loadingCurated.has(region);
  const isRefreshingSupplemental = loadingSupplemental.has(region);

  const items = useMemo(() => {
    const cat = catalog[region];
    if (!cat) return [];
    if (page === 1) return cat.curated;
    const start = (page - 2) * CURATED_ATTRACTIONS_PER_REGION;
    return cat.supplemental.slice(start, start + CURATED_ATTRACTIONS_PER_REGION);
  }, [catalog, region, page]);

  const allRegionItems = useMemo(() => {
    const cat = catalog[region];
    if (!cat) return [];
    return [...cat.curated, ...cat.supplemental];
  }, [catalog, region]);

  useEffect(() => {
    const selectedId = selected?.id;
    if (!selectedId) return;
    const updated = allRegionItems.find((a) => a.id === selectedId);
    if (!updated) return;
    setSelected((prev) => {
      if (!prev || prev.id !== selectedId) return prev;
      if (
        prev.imageUrl === updated.imageUrl &&
        prev.rating === updated.rating &&
        prev.wikiUrl === updated.wikiUrl
      ) {
        return prev;
      }
      return updated;
    });
  }, [allRegionItems, selected?.id]);

  const selectedId = selected?.id ?? null;
  const rankOffset = isCuratedPage ? 0 : (page - 2) * CURATED_ATTRACTIONS_PER_REGION;
  const supplementalCount = regionCatalog?.supplemental.length ?? 0;
  const totalAttractionCount = (regionCatalog?.curated.length ?? 0) + supplementalCount;
  const supplementalLoadFailed = supplementalFailed.has(region);
  const supplementalSettled =
    isSupplementalDone(region) && !isRefreshingSupplemental && supplementalCount === 0;

  function retrySupplemental() {
    resetSupplementalFetch(region);
    setCatalog((prev) => ({
      ...prev,
      [region]: { ...prev[region], supplemental: [] },
    }));
    void fetchSupplementalPool(region);
  }

  function handleSelect(a: AttractionResult) {
    setSelected(a);
  }

  const viewButtons: { id: ViewMode; label: string; icon: typeof Map }[] = [
    { id: "split", label: "지도+리스트", icon: LayoutGrid },
    { id: "map", label: "지도", icon: Map },
    { id: "list", label: "리스트", icon: List },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={region}
          onChange={(e) => {
            setPickedRegion(e.target.value as JapanRegionId);
          }}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm sm:max-w-xs"
        >
          {JAPAN_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>

        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {viewButtons.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition sm:flex-none sm:text-sm ${
                view === id ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {supplementalCount > 0 ? (
          <>
            지역 전체 <span className="font-medium text-slate-700">{totalAttractionCount}곳</span>
            {" · "}
            {page}/{totalPages}페이지 (이 페이지 {items.length}곳)
          </>
        ) : (
          <>
            {page}페이지 · {items.length}곳
            {isCuratedPage ? " · 대표 큐레이션 명소" : " · Google·OSM 추가 관광지"}
          </>
        )}
        {isCuratedPage && isRefreshingCurated ? (
          <span className="ml-2 text-[var(--primary)]">사진·평점 불러오는 중…</span>
        ) : null}
        {isCuratedPage && isRefreshingSupplemental && supplementalCount === 0 ? (
          <span className="ml-2 text-[var(--primary)]">
            추가 관광지 불러오는 중… (2페이지부터 표시)
          </span>
        ) : null}
        {!isCuratedPage && isRefreshingSupplemental ? (
          <span className="ml-2 text-[var(--primary)]">추가 목록 불러오는 중…</span>
        ) : null}
        {supplementalLoadFailed ? (
          <span className="ml-2 text-rose-600">
            추가 관광지를 불러오지 못했습니다.
            <button
              type="button"
              onClick={retrySupplemental}
              className="ml-1 underline hover:text-rose-700"
            >
              다시 시도
            </button>
          </span>
        ) : null}
        {supplementalSettled && !supplementalLoadFailed ? (
          <span className="ml-2 text-slate-400">추가 관광지가 더 없습니다 (1페이지만).</span>
        ) : null}
      </p>

      {items.length === 0 && !isCuratedPage && isRefreshingSupplemental ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">이 페이지에 표시할 관광지가 없습니다.</p>
      ) : view === "list" ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, index) => (
            <li key={a.id}>
              <AttractionCard
                rank={rankOffset + index + 1}
                attraction={a}
                onSelect={() => handleSelect(a)}
              />
            </li>
          ))}
        </ul>
      ) : view === "map" ? (
        <AttractionMap
          items={items}
          region={region}
          selectedId={selectedId}
          onSelect={handleSelect}
          className="h-[min(70vh,560px)]"
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-stretch">
          <AttractionMap
            items={items}
            region={region}
            selectedId={selectedId}
            onSelect={handleSelect}
            className="h-[min(50vh,480px)] lg:h-auto lg:min-h-[480px]"
          />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-3 py-2.5">
              <h2 className="text-sm font-semibold text-slate-800">관광지 목록</h2>
            </div>
            <div className="max-h-[min(50vh,480px)] overflow-y-auto lg:max-h-[480px]">
              <AttractionListRows
                items={items}
                selectedId={selectedId}
                onSelect={handleSelect}
                rankOffset={rankOffset}
              />
            </div>
          </div>
        </div>
      )}

      {totalPages > 1 ? (
        <p className="text-center text-xs text-slate-500">
          아래 번호를 눌러 2페이지 이후 추가 관광지를 보세요.
        </p>
      ) : null}

      <AttractionPagination page={page} totalPages={totalPages} onChange={setPage} />

      <AttractionDetailModal attraction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
