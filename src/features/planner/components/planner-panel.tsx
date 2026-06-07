"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [region, setRegion] = useState<JapanRegionId>("OSAKA_KYOTO");
  const [origin, setOrigin] = useState("인천공항");
  const [dateRange, setDateRange] = useState<TripDateRange>(() => defaultTripRange());
  const [travelers, setTravelers] = useState(2);
  const [budgetKrw, setBudgetKrw] = useState(1500000);
  const [days, setDays] = useState<PlannerDay[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const regionParam = searchParams.get("region");
    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");
    const guests = searchParams.get("guests");

    if (regionParam && JAPAN_REGIONS.some((r) => r.id === regionParam)) {
      setRegion(regionParam as JapanRegionId);
    }
    if (start && end) {
      setDateRange({ startDate: start, endDate: end });
    }
    if (guests) {
      const n = Number(guests);
      if (n >= 1) setTravelers(n);
    }
  }, [searchParams]);

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
    setDays(withStableIds(data.days ?? []));
    setLoading(false);
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
          onChange={(e) => setRegion(e.target.value as JapanRegionId)}
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
        <TripDateRangePicker value={dateRange} onChange={setDateRange} label="여행 기간" />
        <label className="block text-sm font-medium">인원</label>
        <input
          type="number"
          min={1}
          value={travelers}
          onChange={(e) => setTravelers(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <input
          type="number"
          value={budgetKrw}
          onChange={(e) => setBudgetKrw(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          placeholder="예산 (원)"
        />
        <Button type="button" className="w-full" onClick={generate} disabled={loading}>
          {loading ? "일정 생성 중..." : "AI 일정 생성"}
        </Button>
      </Card>

      {days.length > 0 ? (
        <p className="text-sm text-slate-600">
          각 일차에서 ≡으로 순서를 바꾸고, 시간·이동 수단을 입력할 수 있습니다. (플래너 미리보기 —
          저장된 일정에 반영하려면 일정 저장 후 trips에서 확인)
        </p>
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
