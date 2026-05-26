"use client";

import Image from "next/image";
import { MapPin, Star, Train, Sparkles, ExternalLink } from "lucide-react";
import type { AccommodationAmenity, AccommodationResult } from "@/server/ai/types";

const TYPE_LABEL: Record<string, string> = {
  HOTEL: "호텔",
  RYOKAN: "료칸",
  GUESTHOUSE: "게하",
};

const AMENITY_LABEL: Record<AccommodationAmenity, string> = {
  WIFI: "Wi-Fi",
  BREAKFAST: "조식",
  ONSEN: "온천",
  KITCHEN: "주방",
  PARKING: "주차",
  AIRPORT_BUS: "공항 셔틀",
  FAMILY: "패밀리",
  NON_SMOKING: "금연",
};

type Props = {
  stay: AccommodationResult;
  nights?: number;
  recommended?: boolean;
};

export function StayCard({ stay, nights = 1, recommended = false }: Props) {
  const totalPrice = stay.priceKrw * nights;
  const photos = stay.imageUrls?.length
    ? stay.imageUrls
    : stay.imageUrl
      ? [stay.imageUrl]
      : [];

  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${
        recommended ? "border-rose-300 ring-1 ring-rose-200" : "border-slate-200/80"
      }`}
    >
      <div className="relative aspect-[16/10] w-full">
        {photos.length > 0 ? (
          <Image
            src={photos[0]}
            alt={stay.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-rose-100 to-sky-100 text-xs text-slate-500">
            사진 준비 중
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {recommended ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-rose-500 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow">
            <Sparkles size={12} />
            AI 추천
          </span>
        ) : null}

        {stay.highlight ? (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 shadow-sm">
            {stay.highlight}
          </span>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 p-3 text-white">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-white/80">
              {TYPE_LABEL[stay.type] ?? stay.type}
              {stay.area ? ` · ${stay.area}` : ""}
            </p>
            <h3 className="truncate text-base font-bold drop-shadow-sm">{stay.name}</h3>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {stay.rating}
          </span>
        </div>
      </div>

      <div className="space-y-3 px-3 py-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
          {stay.nearestStation ? (
            <span className="inline-flex items-center gap-1">
              <Train size={12} className="text-sky-500" />
              {stay.nearestStation}
              {stay.walkMinutes != null ? ` · 도보 ${stay.walkMinutes}분` : ""}
            </span>
          ) : null}
          {stay.reviewCount ? (
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} className="text-slate-400" />
              리뷰 {stay.reviewCount.toLocaleString()}건
            </span>
          ) : null}
        </div>

        {stay.amenities?.length ? (
          <div className="flex flex-wrap gap-1">
            {stay.amenities.map((a) => (
              <span
                key={a}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {AMENITY_LABEL[a]}
              </span>
            ))}
          </div>
        ) : null}

        {stay.recommendReason ? (
          <p className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-[11px] font-medium text-rose-700">
            {stay.recommendReason}
          </p>
        ) : null}

        <div className="flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-xs text-slate-500">1박 {stay.priceKrw.toLocaleString()}원</p>
            {nights > 1 ? (
              <p className="text-sm font-semibold text-slate-800">
                총 {totalPrice.toLocaleString()}원
                <span className="ml-1 text-xs font-normal text-slate-500">({nights}박)</span>
              </p>
            ) : (
              <p className="text-base font-bold text-rose-600">
                {stay.priceKrw.toLocaleString()}원
              </p>
            )}
          </div>
          <a
            href={stay.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-rose-700"
          >
            예약
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}
