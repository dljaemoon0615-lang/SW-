"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/shared/ui/card";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import type { RestaurantResult } from "@/server/ai/types";
import { RestaurantCard } from "@/features/restaurants/components/restaurant-card";
import { RestaurantDetailModal } from "@/features/restaurants/components/restaurant-detail-modal";
import { isRestaurantCatalogStale } from "@/features/restaurants/lib/catalog-ready";
import { DEFAULT_RESTAURANT_SEARCH } from "@/features/restaurants/lib/search-defaults";

type RestaurantListProps = {
  initialByRegion: Record<JapanRegionId, RestaurantResult[]>;
  initialRegion?: JapanRegionId;
};

export function RestaurantList({ initialByRegion, initialRegion = "TOKYO" }: RestaurantListProps) {
  const [byRegion, setByRegion] = useState(initialByRegion);
  const [region, setRegion] = useState<JapanRegionId>(initialRegion);
  const [selected, setSelected] = useState<RestaurantResult | null>(null);
  const [maxBudget, setMaxBudget] = useState<number>(DEFAULT_RESTAURANT_SEARCH.maxBudgetKrw);
  const [maxDistance, setMaxDistance] = useState<number>(DEFAULT_RESTAURANT_SEARCH.maxDistanceKm);
  const [minRating, setMinRating] = useState<number>(DEFAULT_RESTAURANT_SEARCH.minRating);
  const [filterLoading, setFilterLoading] = useState(false);
  const [warming, setWarming] = useState(() =>
    JAPAN_REGIONS.some((r) => isRestaurantCatalogStale(initialByRegion[r.id] ?? [])),
  );
  const filtersMatchDefault =
    maxBudget === DEFAULT_RESTAURANT_SEARCH.maxBudgetKrw &&
    maxDistance === DEFAULT_RESTAURANT_SEARCH.maxDistanceKm &&
    minRating === DEFAULT_RESTAURANT_SEARCH.minRating;
  const fetchGen = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchRegion(target: JapanRegionId) {
      const res = await fetch(`/api/ai/restaurants?region=${target}&preload=1`, {
        cache: "no-store",
      });
      const d = await res.json();
      const next = d.items as RestaurantResult[] | undefined;
      if (!Array.isArray(next) || next.length === 0) return;
      setByRegion((prev) => ({ ...prev, [target]: next }));
    }

    void (async () => {
      const staleRegions = JAPAN_REGIONS.filter((r) =>
        isRestaurantCatalogStale(initialByRegion[r.id] ?? []),
      );
      if (staleRegions.length === 0) {
        setWarming(false);
        return;
      }

      try {
        await Promise.all(staleRegions.map((r) => fetchRegion(r.id)));
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setWarming(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initialByRegion]);

  useEffect(() => {
    if (filtersMatchDefault) return;

    const gen = ++fetchGen.current;
    let cancelled = false;

    const q = new URLSearchParams({
      region,
      maxBudgetKrw: String(maxBudget),
      maxDistanceKm: String(maxDistance),
      minRating: String(minRating),
    });

    void fetch(`/api/ai/restaurants?${q}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || gen !== fetchGen.current) return;
        setByRegion((prev) => ({ ...prev, [region]: d.items ?? [] }));
      })
      .finally(() => {
        if (!cancelled && gen === fetchGen.current) setFilterLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [region, maxBudget, maxDistance, minRating, filtersMatchDefault]);

  const cachedItems = byRegion[region] ?? [];
  const upgrading = warming || isRestaurantCatalogStale(cachedItems);
  const loading = filterLoading || (cachedItems.length === 0 && upgrading);
  const items = cachedItems;

  function handleRegionChange(next: JapanRegionId) {
    setRegion(next);
    setSelected(null);
    if (!filtersMatchDefault) setFilterLoading(true);
  }

  function handleMaxBudgetChange(value: number) {
    setMaxBudget(value);
    setFilterLoading(true);
  }

  function handleMaxDistanceChange(value: number) {
    setMaxDistance(value);
    setFilterLoading(true);
  }

  function handleMinRatingChange(value: number) {
    setMinRating(value);
    setFilterLoading(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={region}
          onChange={(e) => handleRegionChange(e.target.value as JapanRegionId)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm sm:max-w-xs"
        >
          {JAPAN_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <Card className="grid gap-3 p-4">
        <label className="text-xs font-medium text-slate-600">
          최대 예산 {maxBudget.toLocaleString()}원
        </label>
        <input
          type="range"
          min={10000}
          max={100000}
          step={5000}
          value={maxBudget}
          onChange={(e) => handleMaxBudgetChange(Number(e.target.value))}
          className="w-full"
        />
        <label className="text-xs font-medium text-slate-600">거리 {maxDistance}km 이내</label>
        <input
          type="range"
          min={1}
          max={15}
          step={0.5}
          value={maxDistance}
          onChange={(e) => handleMaxDistanceChange(Number(e.target.value))}
          className="w-full"
        />
        <label className="text-xs font-medium text-slate-600">최소 평점 {minRating}</label>
        <input
          type="range"
          min={3}
          max={5}
          step={0.1}
          value={minRating}
          onChange={(e) => handleMinRatingChange(Number(e.target.value))}
          className="w-full"
        />
      </Card>

      <p className="text-xs text-slate-500">
        {loading ? "맛집 불러오는 중…" : `${items.length}곳 · 카드를 누르면 상세 정보를 볼 수 있습니다.`}
        {upgrading && items.length > 0 ? (
          <span className="ml-2 text-brand">Google Places 불러오는 중…</span>
        ) : null}
      </p>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">
          조건에 맞는 맛집이 없습니다. 필터를 넓혀 보세요.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <li key={r.id}>
              <RestaurantCard restaurant={r} onSelect={() => setSelected(r)} />
            </li>
          ))}
        </ul>
      )}

      <RestaurantDetailModal restaurant={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
