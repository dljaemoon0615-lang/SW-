"use client";

import { Star, MapPin } from "lucide-react";
import type { AttractionResult } from "@/server/ai/types";

const CATEGORY_LABEL: Record<string, string> = {
  attraction: "명소",
  museum: "박물관",
  viewpoint: "전망대",
  theme_park: "테마파크",
  shrine: "신사",
  temple: "사찰",
  park: "공원",
};

type Props = {
  items: AttractionResult[];
  selectedId: string | null;
  onSelect: (attraction: AttractionResult) => void;
  rankOffset?: number;
};

export function AttractionListRows({
  items,
  selectedId,
  onSelect,
  rankOffset = 0,
}: Props) {
  if (items.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-500">표시할 관광지가 없습니다.</p>;
  }

  return (
    <ul className="divide-y divide-slate-100">
      {items.map((a, index) => {
        const selected = a.id === selectedId;
        const thumb = a.imageUrls?.[0] ?? a.imageUrl;
        return (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => onSelect(a)}
              className={`flex w-full gap-3 px-2 py-3 text-left transition hover:bg-slate-50 ${
                selected ? "bg-[var(--primary-light)] ring-1 ring-inset ring-brand/30" : ""
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-white">
                {rankOffset + index + 1}
              </span>
              {thumb ? (
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb} alt="" className="h-full w-full object-cover" />
                </span>
              ) : (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-sky-100 text-[10px] text-slate-500">
                  N/A
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="line-clamp-1 font-medium text-slate-900">{a.name}</span>
                <span className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  {a.category ? (
                    <span>{CATEGORY_LABEL[a.category] ?? a.category}</span>
                  ) : null}
                  {a.rating ? (
                    <span className="inline-flex items-center gap-0.5">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      {a.rating}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-0.5">
                    <MapPin size={11} />
                    {a.lat.toFixed(2)}, {a.lng.toFixed(2)}
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
