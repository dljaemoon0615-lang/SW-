"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TripDateRangePicker } from "@/shared/ui/trip-date-range-picker";
import { SortableDayItems, type SortablePlaceItem } from "@/features/itinerary/components/sortable-day-items";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import { defaultTripRange, type TripDateRange } from "@/shared/lib/trip-dates";
import type { ItineraryDay } from "@/server/ai/types";

type PlannerItem = SortablePlaceItem & {
  placeId?: string;
};

type PlannerDay = {
  dayIndex: number;
  date: string;
  items: PlannerItem[];
};

function withStableIds(days: ItineraryDay[]): PlannerDay[] {
  return days.map((day) => ({
    dayIndex: day.dayIndex,
    date: day.date,
    items: day.items.map((item) => ({
      id: crypto.randomUUID(),
      placeName: item.placeName,
      startTime: item.startTime,
      endTime: item.endTime,
      transport: item.transport,
      placeId: item.placeId,
    })),
  }));
}

export function PlannerPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const regionFromUrl = useMemo(() => {
    const regionParam = searchParams.get("region");
    return regionParam && JAPAN_REGIONS.some((r) => r.id === regionParam)
      ? (regionParam as JapanRegionId)
      : null;
  }, [searchParams]);
  const dateRangeFromUrl = useMemo(() => {
    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");
    return start && end ? { startDate: start, endDate: end } : null;
  }, [searchParams]);
  const travelersFromUrl = useMemo(() => {
    const guests = searchParams.get("guests");
    if (!guests) return null;
    const n = Number(guests);
    return n >= 1 ? n : null;
  }, [searchParams]);
  const budgetFromUrl = useMemo(() => {
    const raw = searchParams.get("budgetKrw");
    if (!raw) return null;
    const n = Number(raw);
    return n > 0 ? n : null;
  }, [searchParams]);

  const [pickedRegion, setPickedRegion] = useState<JapanRegionId>("OSAKA_KYOTO");
  const [origin, setOrigin] = useState("인천공항");
  const [pickedDateRange, setPickedDateRange] = useState<TripDateRange>(() => defaultTripRange());
  const [pickedTravelers, setPickedTravelers] = useState(2);
  const [pickedBudget, setPickedBudget] = useState(1_000_000);
  const region = regionFromUrl ?? pickedRegion;
  const dateRange = dateRangeFromUrl ?? pickedDateRange;
  const travelers = travelersFromUrl ?? pickedTravelers;
  const budgetKrw = budgetFromUrl ?? pickedBudget;
  const [title, setTitle] = useState("");
  const [days, setDays] = useState<PlannerDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/ai/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        region,
        origin,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        budgetKrw,
        travelers,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setSaveError(data.error ?? "일정 생성에 실패했습니다. 로그인 후 다시 시도해 주세요.");
      setLoading(false);
      return;
    }
    setDays(withStableIds(data.days ?? []));
    if (data.title) setTitle(data.title);
    setSaveError("");
    setLoading(false);
  }

  async function saveTrip() {
    if (days.length === 0) return;
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || undefined,
          region,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          totalBudget: budgetKrw,
          days: days.map((day) => ({
            dayIndex: day.dayIndex,
            date: day.date,
            items: day.items.map(({ placeName, startTime, endTime, transport, placeId }) => ({
              placeName,
              startTime,
              endTime,
              transport,
              placeId,
            })),
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "일정 저장에 실패했습니다.");
      }
      router.push(`/trips/${data.id}`);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "일정 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  function updateDayItems(dayIndex: number, items: SortablePlaceItem[]) {
    setDays((prev) =>
      prev.map((day) => (day.dayIndex === dayIndex ? { ...day, items } : day)),
    );
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <label className="block text-sm font-medium">지역</label>
        <select
          value={region}
          onChange={(e) => setPickedRegion(e.target.value as JapanRegionId)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          {JAPAN_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
        <input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="출발지"
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <TripDateRangePicker value={dateRange} onChange={setPickedDateRange} label="여행 기간" />
        <label className="block text-sm font-medium">인원</label>
        <input
          type="number"
          min={1}
          value={travelers}
          onChange={(e) => setPickedTravelers(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <label className="block text-sm font-medium">예산 (원)</label>
        <input
          type="number"
          min={100000}
          step={100000}
          value={budgetKrw}
          onChange={(e) => setPickedBudget(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          placeholder="예산 (원)"
        />
        <Button type="button" className="w-full" onClick={generate} disabled={loading}>
          {loading ? "일정 생성 중..." : "AI 일정 생성"}
        </Button>
        <p className="text-xs text-slate-500">
          AI 일정 생성은{" "}
          <Link href="/login" className="text-brand underline">
            로그인
          </Link>
          후 이용할 수 있습니다.
        </p>
      </Card>

      {saveError ? <p className="text-sm text-rose-600">{saveError}</p> : null}

      {days.length > 0 ? (
        <Card className="space-y-3">
          <label className="block text-sm font-medium">일정 제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 후쿠오카 3박 4일"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          <p className="text-sm text-slate-600">
            각 일차에서 ≡으로 순서를 바꾸고, 시간·이동 수단을 입력한 뒤 저장하세요.
          </p>
          <Button type="button" className="w-full" onClick={saveTrip} disabled={saving}>
            {saving ? "저장 중…" : "내 일정에 저장"}
          </Button>
        </Card>
      ) : null}

      {days.map((day) => (
        <Card key={day.dayIndex}>
          <h3 className="mb-2 font-semibold">
            {day.dayIndex}일차 · {day.date}
          </h3>
          <SortableDayItems
            items={day.items}
            region={region}
            editable
            onChange={(items) => updateDayItems(day.dayIndex, items)}
            emptyMessage="이 날짜에 배정된 장소가 없습니다."
          />
        </Card>
      ))}
    </div>
  );
}
