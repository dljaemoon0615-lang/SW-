"use client";

import { useEffect, useState } from "react";
import { Card } from "@/shared/ui/card";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import type { RestaurantResult } from "@/server/ai/types";
import { RestaurantCard } from "@/features/restaurants/components/restaurant-card";
import { RestaurantDetailModal } from "@/features/restaurants/components/restaurant-detail-modal";

export function RestaurantList() {
  const [region, setRegion] = useState<JapanRegionId>("TOKYO");
  const [items, setItems] = useState<RestaurantResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<RestaurantResult | null>(null);
  const [maxBudget, setMaxBudget] = useState(50000);
  const [maxDistance, setMaxDistance] = useState(5);
  const [minRating, setMinRating] = useState(3.5);

  useEffect(() => {
    setLoading(true);
    const q = new URLSearchParams({
      region,
      maxBudgetKrw: String(maxBudget),
      maxDistanceKm: String(maxDistance),
      minRating: String(minRating),
    });
    fetch(`/api/ai/restaurants?${q}`)
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .finally(() => setLoading(false));
  }, [region, maxBudget, maxDistance, minRating]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value as JapanRegionId);
            setSelected(null);
          }}
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
          onChange={(e) => setMaxBudget(Number(e.target.value))}
          className="w-full"
        />
        <label className="text-xs font-medium text-slate-600">거리 {maxDistance}km 이내</label>
        <input
          type="range"
          min={1}
          max={15}
          step={0.5}
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full"
        />
        <label className="text-xs font-medium text-slate-600">최소 평점 {minRating}</label>
        <input
          type="range"
          min={3}
          max={5}
          step={0.1}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full"
        />
      </Card>

      <p className="text-xs text-slate-500">
        {loading ? "맛집 불러오는 중…" : `${items.length}곳 · 카드를 누르면 상세 정보를 볼 수 있습니다.`}
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
