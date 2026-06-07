"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import type { RestaurantResult } from "@/server/ai/types";
import { Clock, MapPin, Star, UtensilsCrossed, Wallet, X } from "lucide-react";

type Props = {
  restaurant: RestaurantResult | null;
  onClose: () => void;
};

export function RestaurantDetailModal({ restaurant, onClose }: Props) {
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    setLightbox(false);
  }, [restaurant?.id]);

  useEffect(() => {
    if (!restaurant) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (lightbox) {
        setLightbox(false);
        return;
      }
      onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [restaurant, onClose, lightbox]);

  if (!restaurant) return null;

  const mapsUrl = restaurant.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}`;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${restaurant.name} 상세 정보`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="닫기"
        onClick={onClose}
      />

      <div
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-2xl md:flex-row md:max-h-[min(88vh,720px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0 md:flex md:min-h-0 md:w-[min(46%,400px)] md:flex-col md:self-stretch">
          {restaurant.imageUrl ? (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="relative block aspect-[4/3] w-full cursor-zoom-in bg-slate-100 md:aspect-auto md:min-h-[280px] md:flex-1"
              aria-label="사진 크게 보기"
            >
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
                unoptimized
              />
              <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                탭하여 확대
              </span>
            </button>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-amber-100 to-rose-100 text-slate-500 md:min-h-[280px] md:flex-1">
              사진 없음
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/65 md:right-auto md:left-3"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100 px-4 pb-6 pt-4 sm:px-6 md:border-l md:border-t-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <Badge>{restaurant.cuisine}</Badge>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{restaurant.name}</h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-800">
              <Star size={15} className="fill-amber-500 text-amber-500" />
              {restaurant.rating.toFixed(1)}
              {restaurant.reviewCount
                ? ` · ${restaurant.reviewCount.toLocaleString()}개 평가`
                : ""}
            </span>
          </div>

          <div className="mt-4 grid gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
            <p className="flex items-center gap-2">
              <Wallet size={16} className="shrink-0 text-rose-500" />
              예상 1인 {restaurant.avgPriceKrw.toLocaleString()}원
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-slate-400" />
              거리 약 {restaurant.distanceKm}km
            </p>
            <p className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-slate-400" />
              {restaurant.hours}
            </p>
            {restaurant.address ? (
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                {restaurant.address}
              </p>
            ) : null}
          </div>

          {restaurant.menuItems?.length ? (
            <div className="mt-4">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <UtensilsCrossed size={16} className="text-rose-500" />
                대표 메뉴
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {restaurant.menuItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-sm font-medium text-rose-900"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {restaurant.menuSummary ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {restaurant.menuSummary}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-4">
            <Badge tone={restaurant.reservationRequired ? "warning" : "success"}>
              {restaurant.reservationRequired
                ? "인기 맛집 — 예약을 권장합니다"
                : "워크인 방문 가능"}
            </Badge>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
              닫기
            </Button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-600"
            >
              <MapPin size={16} />
              지도에서 보기
            </a>
          </div>
        </div>
      </div>

      {lightbox && restaurant.imageUrl ? (
        <div
          className="fixed inset-0 z-[510] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-label="사진 확대 보기"
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="닫기"
            onClick={() => setLightbox(false)}
          />
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            width={1600}
            height={1200}
            className="relative z-10 max-h-[85vh] w-auto max-w-full object-contain"
            unoptimized
          />
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
            aria-label="닫기"
          >
            <X size={24} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
