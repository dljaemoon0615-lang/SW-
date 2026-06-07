"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { applyStayFilters } from "@/features/stays/lib/apply-stay-filters";
import type { StaySearchResponse } from "@/features/stays/server/stays.service";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import type {
  AccommodationAmenity,
  AccommodationResult,
  AccommodationSearchRequest,
  AccommodationType,
} from "@/server/ai/types";
import { Calendar, CalendarCheck, Search, Sparkles, SlidersHorizontal } from "lucide-react";
import { StayCard } from "./stay-card";

type SortOption = "recommended" | "price-asc" | "price-desc" | "rating-desc";

type TripOption = {
  id: string;
  title: string;
  region: JapanRegionId;
  regionLabel: string;
  startDate: string;
  endDate: string;
  totalBudget: number | null;
  coverImage: string;
};

const TYPE_OPTIONS: { id: AccommodationType; label: string }[] = [
  { id: "HOTEL", label: "호텔" },
  { id: "RYOKAN", label: "료칸" },
  { id: "GUESTHOUSE", label: "게스트하우스" },
];

const AMENITY_OPTIONS: { id: AccommodationAmenity; label: string }[] = [
  { id: "WIFI", label: "Wi-Fi" },
  { id: "BREAKFAST", label: "조식" },
  { id: "ONSEN", label: "온천" },
  { id: "KITCHEN", label: "주방" },
  { id: "PARKING", label: "주차" },
  { id: "AIRPORT_BUS", label: "공항 셔틀" },
  { id: "FAMILY", label: "패밀리" },
  { id: "NON_SMOKING", label: "금연" },
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "recommended", label: "AI 추천순" },
  { id: "price-asc", label: "가격 낮은순" },
  { id: "price-desc", label: "가격 높은순" },
  { id: "rating-desc", label: "평점 높은순" },
];

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 1;
  return Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24)));
}

type StaySearchProps = {
  initialByRegion: Record<JapanRegionId, StaySearchResponse>;
  defaultSearch: Omit<AccommodationSearchRequest, "region">;
};

export function StaySearch({ initialByRegion, defaultSearch }: StaySearchProps) {
  const [region, setRegion] = useState<JapanRegionId>("TOKYO");
  const [checkIn, setCheckIn] = useState(defaultSearch.checkIn);
  const [checkOut, setCheckOut] = useState(defaultSearch.checkOut);
  const [guests, setGuests] = useState(defaultSearch.guests);
  const [budgetKrw, setBudgetKrw] = useState(defaultSearch.budgetKrw);
  const [types, setTypes] = useState<AccommodationType[]>(
    defaultSearch.types ?? ["HOTEL", "RYOKAN", "GUESTHOUSE"],
  );
  const [amenities, setAmenities] = useState<AccommodationAmenity[]>(
    defaultSearch.amenities ?? [],
  );
  const [area, setArea] = useState<string>(defaultSearch.area ?? "");
  const [sort, setSort] = useState<SortOption>(defaultSearch.sort ?? "recommended");

  const [trips, setTrips] = useState<TripOption[]>([]);
  const [linkedTripId, setLinkedTripId] = useState<string | null>(null);

  /** 날짜 등을 바꿔 API로 다시 받은 풀 (없으면 프리로드 풀 사용) */
  const [livePool, setLivePool] = useState<AccommodationResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const poolsByRegion = useMemo(() => {
    const out = {} as Record<JapanRegionId, AccommodationResult[]>;
    for (const r of JAPAN_REGIONS) {
      out[r.id] = initialByRegion[r.id]?.items ?? [];
    }
    return out;
  }, [initialByRegion]);

  const filterReq = useMemo(
    (): Omit<AccommodationSearchRequest, "region"> => ({
      checkIn,
      checkOut,
      guests,
      budgetKrw,
      types,
      amenities,
      area: area || undefined,
      sort,
    }),
    [checkIn, checkOut, guests, budgetKrw, types, amenities, area, sort],
  );

  const display = useMemo(() => {
    const pool = livePool ?? poolsByRegion[region] ?? [];
    return applyStayFilters(pool, { region, ...filterReq });
  }, [livePool, poolsByRegion, region, filterReq]);

  const { items, recommended, areas } = display;

  useEffect(() => {
    fetch("/api/trips")
      .then((r) => r.json())
      .then((d) => setTrips(d.trips ?? []))
      .catch(() => {});
  }, []);

  function toggleType(t: AccommodationType) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function toggleAmenity(a: AccommodationAmenity) {
    setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  function applyTrip(trip: TripOption) {
    setLinkedTripId(trip.id);
    setRegion(trip.region);
    if (trip.startDate) setCheckIn(trip.startDate.slice(0, 10));
    if (trip.endDate) setCheckOut(trip.endDate.slice(0, 10));
    if (trip.totalBudget && trip.totalBudget > 0) {
      const nights = nightsBetween(
        trip.startDate.slice(0, 10),
        trip.endDate.slice(0, 10),
      );
      const accommodationShare = Math.round((trip.totalBudget * 0.35) / nights);
      if (accommodationShare > 0) setBudgetKrw(accommodationShare);
    }
  }

  async function search() {
    const datesMatchDefault =
      checkIn === defaultSearch.checkIn && checkOut === defaultSearch.checkOut;

    if (datesMatchDefault) {
      setLivePool(null);
      return;
    }

    setLoading(true);
    const q = new URLSearchParams({
      region,
      checkIn,
      checkOut,
      guests: String(guests),
      budgetKrw: String(budgetKrw),
      types: types.join(","),
      sort,
      live: "1",
    });
    if (amenities.length) q.set("amenities", amenities.join(","));
    if (area) q.set("area", area);

    try {
      const res = await fetch(`/api/ai/accommodations?${q}`);
      const data = await res.json();
      setLivePool(data.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  function onRegionChange(next: JapanRegionId) {
    setRegion(next);
    setLivePool(null);
    setArea("");
  }

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const linkedTrip = trips.find((t) => t.id === linkedTripId);

  return (
    <div className="space-y-4">
      {trips.length > 0 ? (
        <Card className="space-y-3">
          <div className="flex items-center gap-2">
            <CalendarCheck size={16} className="text-rose-500" />
            <p className="text-sm font-medium text-slate-700">내 일정에서 가져오기</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {trips.map((trip) => {
              const selected = trip.id === linkedTripId;
              return (
                <button
                  key={trip.id}
                  type="button"
                  onClick={() => applyTrip(trip)}
                  className={`shrink-0 rounded-xl border px-3 py-2 text-left text-xs transition ${
                    selected
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-rose-200"
                  }`}
                >
                  <p className="font-semibold">{trip.title}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {trip.regionLabel} · {trip.startDate.slice(5, 10)} – {trip.endDate.slice(5, 10)}
                  </p>
                </button>
              );
            })}
          </div>
          {linkedTrip ? (
            <p className="text-[11px] text-slate-500">
              일정 예산의 35%를 1박 숙박 예산으로 자동 설정했습니다. 필요 시 수정하세요.
            </p>
          ) : null}
        </Card>
      ) : null}

      <Card className="space-y-3">
        <select
          value={region}
          onChange={(e) => onRegionChange(e.target.value as JapanRegionId)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          {JAPAN_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-2 py-2 text-xs text-slate-500">
            <Calendar size={14} />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-800 outline-none"
            />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-2 py-2 text-xs text-slate-500">
            <Calendar size={14} />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-800 outline-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="rounded-xl border border-slate-200 px-3 py-2">
            <span className="block text-[10px] text-slate-500">인원</span>
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-medium outline-none"
            />
          </label>
          <label className="rounded-xl border border-slate-200 px-3 py-2">
            <span className="block text-[10px] text-slate-500">1박 예산(원)</span>
            <input
              type="number"
              min={0}
              step={10000}
              value={budgetKrw}
              onChange={(e) => setBudgetKrw(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-medium outline-none"
            />
          </label>
        </div>

        <div>
          <p className="mb-1 text-[11px] font-medium text-slate-500">숙소 유형</p>
          <div className="flex flex-wrap gap-1.5">
            {TYPE_OPTIONS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleType(t.id)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  types.includes(t.id)
                    ? "bg-rose-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <SlidersHorizontal size={11} />
            편의시설 (선택)
          </p>
          <div className="flex flex-wrap gap-1.5">
            {AMENITY_OPTIONS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => toggleAmenity(a.id)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  amenities.includes(a.id)
                    ? "bg-sky-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {areas.length > 0 ? (
          <div>
            <p className="mb-1 text-[11px] font-medium text-slate-500">지역</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setArea("")}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  area === "" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                전체
              </button>
              {areas.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setArea(a)}
                  className={`rounded-full px-3 py-1 text-xs transition ${
                    area === a ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <Button type="button" className="w-full" onClick={search} disabled={loading}>
          <Search size={14} className="mr-1.5" />
          {loading ? "조회 중..." : "날짜·예산 변경 후 재검색"}
        </Button>
      </Card>

      {loading ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li
              key={n}
              className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white"
            >
              <div className="aspect-[16/10] bg-slate-200" />
              <div className="space-y-2 p-3">
                <div className="h-3 w-2/3 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-100" />
              </div>
            </li>
          ))}
        </ul>
      ) : items.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm text-slate-500">조건에 맞는 숙소가 없습니다. 필터를 조정해 주세요.</p>
        </Card>
      ) : (
        <>
          {recommended.length > 0 ? (
            <section className="space-y-2">
              <div className="flex items-center gap-1.5 px-1">
                <Sparkles size={14} className="text-rose-500" />
                <h2 className="text-sm font-semibold text-slate-800">
                  AI 추천 TOP {recommended.length}
                </h2>
                {nights > 1 ? (
                  <span className="ml-auto text-[11px] text-slate-500">{nights}박 기준</span>
                ) : null}
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {recommended.map((stay) => (
                  <li key={`rec-${stay.id}`}>
                    <StayCard stay={stay} nights={nights} recommended />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-slate-800">전체 결과 {items.length}곳</h2>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((stay) => (
                <li key={stay.id}>
                  <StayCard stay={stay} nights={nights} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
