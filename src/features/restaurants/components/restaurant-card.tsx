"use client";

import Image from "next/image";
import type { RestaurantResult } from "@/server/ai/types";
import { Clock, MapPin, Star, UtensilsCrossed, Wallet } from "lucide-react";

type Props = {
  restaurant: RestaurantResult;
  onSelect: () => void;
};

export function RestaurantCard({ restaurant, onSelect }: Props) {
  const photo = restaurant.imageUrl;
  const menuPreview = restaurant.menuItems?.slice(0, 3) ?? [];

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition hover:scale-[1.01] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
    >
      <div className="relative">
        {photo ? (
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
            <Image
              src={photo}
              alt={restaurant.name}
              fill
              className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-amber-100 to-rose-100 text-sm text-slate-500 sm:aspect-[16/10]">
            사진 준비 중
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
          {restaurant.cuisine}
        </span>

        <span
          className={`pointer-events-none absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
            restaurant.reservationRequired
              ? "bg-amber-400/90 text-slate-900"
              : "bg-emerald-500/90 text-white"
          }`}
        >
          {restaurant.reservationRequired ? "예약 권장" : "워크인"}
        </span>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-end justify-between gap-2">
            <h3 className="text-lg font-bold leading-tight drop-shadow-sm">{restaurant.name}</h3>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-sm font-semibold backdrop-blur-sm">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 px-3 py-2.5">
        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1">
            <Wallet size={13} className="text-brand" />약 {restaurant.avgPriceKrw.toLocaleString()}원
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={13} className="text-slate-400" />
            {restaurant.distanceKm}km
          </span>
          {restaurant.reviewCount ? (
            <span className="inline-flex items-center gap-1">
              <Star size={13} className="text-amber-400" />
              리뷰 {restaurant.reviewCount.toLocaleString()}건
            </span>
          ) : null}
        </div>
        {menuPreview.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <UtensilsCrossed size={12} className="shrink-0 text-brand" />
            {menuPreview.map((item) => (
              <span
                key={item}
                className="rounded-full bg-[var(--primary-light)] px-2 py-0.5 text-[11px] font-medium text-[var(--dark)]"
              >
                {item}
              </span>
            ))}
            {(restaurant.menuItems?.length ?? 0) > menuPreview.length ? (
              <span className="text-[11px] text-slate-400">
                +{(restaurant.menuItems?.length ?? 0) - menuPreview.length}
              </span>
            ) : null}
          </div>
        ) : null}
        <p className="line-clamp-1 text-xs text-slate-500">
          <Clock size={12} className="mr-1 inline" />
          {restaurant.hours}
        </p>
      </div>
    </button>
  );
}
