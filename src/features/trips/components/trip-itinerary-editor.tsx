"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { SortableDayItems, type SortablePlaceItem } from "@/features/itinerary/components/sortable-day-items";
import type { TripDayData } from "@/features/trips/components/trip-itinerary-gallery";
import type { JapanRegionId } from "@/shared/lib/constants";
import { GripVertical } from "lucide-react";

type DayState = {
  id: string;
  dayIndex: number;
  date: Date;
  items: SortablePlaceItem[];
};

type Props = {
  tripId: string;
  region: JapanRegionId;
  days: TripDayData[];
};

function toDayState(days: TripDayData[]): DayState[] {
  return days.map((day) => ({
    id: day.id,
    dayIndex: day.dayIndex,
    date: day.date,
    items: day.items.map((item) => ({
      id: item.id,
      placeName: item.placeName,
      startTime: item.startTime,
      endTime: item.endTime,
      transport: item.transport,
    })),
  }));
}

export function TripItineraryEditor({ tripId, region, days: initialDays }: Props) {
  const [days, setDays] = useState<DayState[]>(() => toDayState(initialDays));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function updateDayItems(dayId: string, items: SortablePlaceItem[]) {
    setDays((prev) => prev.map((d) => (d.id === dayId ? { ...d, items } : d)));
    setSaved(false);
    setError("");
  }

  async function saveOrder() {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch(`/api/trips/${tripId}/itinerary`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days: days.map((d) => ({
            dayId: d.id,
            items: d.items.map((it, index) => ({
              id: it.id,
              sortOrder: index,
              startTime: it.startTime ?? null,
              endTime: it.endTime ?? null,
              transport: it.transport ?? null,
            })),
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "save failed");
      }
      setSaved(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "순서 저장에 실패했습니다. 로그인·권한을 확인해 주세요.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-4">
      <Card className="border-brand/20 bg-gradient-to-br from-[var(--primary-light)] to-white">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--dark)]">
              <GripVertical size={16} />
              일정 편집
            </p>
            <p className="mt-1 text-sm text-slate-600">
              <strong>≡</strong>으로 순서 변경 · <strong>시간·이동 수단</strong> 직접 입력 후{" "}
              <strong>저장</strong>하세요.
            </p>
          </div>
          <Button type="button" onClick={saveOrder} disabled={saving}>
            {saving ? "저장 중..." : saved ? "저장됨 ✓" : "일정 저장"}
          </Button>
        </div>
        {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
      </Card>

      {days.map((day) => (
        <Card key={day.id}>
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h3 className="font-semibold text-slate-900">{day.dayIndex + 1}일차</h3>
            <span className="text-sm text-slate-500">{format(day.date, "M월 d일")}</span>
          </div>
          <SortableDayItems
            items={day.items}
            region={region}
            editable
            onChange={(items) => updateDayItems(day.id, items)}
            emptyMessage="이 날짜에 등록된 관광지가 없습니다."
          />
        </Card>
      ))}
    </section>
  );
}
