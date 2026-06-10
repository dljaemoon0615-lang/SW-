"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import type { AttractionResult } from "@/server/ai/types";
import { AttractionRatingSection } from "@/features/attractions/components/attraction-rating-section";
import { StarRatingDisplay } from "@/features/attractions/components/star-rating-display";
import { Clock, ExternalLink, MapPin, Ticket, Users, X } from "lucide-react";

type Props = {
  attraction: AttractionResult | null;
  onClose: () => void;
};

export function AttractionDetailModal({ attraction, onClose }: Props) {
  if (!attraction) return null;
  return <AttractionDetailModalBody key={attraction.id} attraction={attraction} onClose={onClose} />;
}

function AttractionDetailModalBody({
  attraction,
  onClose,
}: {
  attraction: AttractionResult;
  onClose: () => void;
}) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const photos =
    attraction.imageUrls?.length
      ? attraction.imageUrls
      : attraction.imageUrl
        ? [attraction.imageUrl]
        : [];

  useEffect(() => {
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
  }, [onClose, lightbox]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${attraction.lat},${attraction.lng}`;
  const crowdLabel =
    attraction.crowdLevel === "HIGH"
      ? "현재 혼잡"
      : attraction.crowdLevel === "MEDIUM"
        ? "현재 보통"
        : attraction.crowdLevel === "LOW"
          ? "현재 여유"
          : null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${attraction.name} 상세 정보`}
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
          {photos.length > 0 ? (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="relative block aspect-[4/3] w-full cursor-zoom-in bg-slate-100 md:aspect-auto md:min-h-[280px] md:flex-1"
              aria-label="사진 크게 보기"
            >
              <Image
                src={photos[photoIndex]}
                alt={attraction.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
                unoptimized
              />
              <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                탭하여 확대
              </span>
              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1 text-lg text-white backdrop-blur-sm hover:bg-black/55"
                    aria-label="이전 사진"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoIndex((i) => (i + 1) % photos.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2.5 py-1 text-lg text-white backdrop-blur-sm hover:bg-black/55"
                    aria-label="다음 사진"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPhotoIndex(i);
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          i === photoIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                        }`}
                        aria-label={`사진 ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </button>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center bg-slate-100 text-slate-500 md:min-h-[280px] md:flex-1">
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
          <h2 className="text-xl font-bold text-slate-900">{attraction.name}</h2>

          <AttractionRatingSection attraction={attraction} />

          {attraction.bestVisitTags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {attraction.bestVisitTags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-4 grid gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
            {attraction.fee ? (
              <p className="flex items-center gap-2">
                <Ticket size={16} className="shrink-0 text-brand" />
                입장료 {attraction.fee}
              </p>
            ) : null}
            {attraction.hours ? (
              <p className="flex items-center gap-2">
                <Clock size={16} className="shrink-0 text-slate-400" />
                운영 {attraction.hours}
              </p>
            ) : null}
            {attraction.address ? (
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                {attraction.address}
              </p>
            ) : null}
            {crowdLabel ? (
              <p className="flex items-center gap-2">
                <Users size={16} className="shrink-0 text-indigo-500" />
                {crowdLabel}
                {typeof attraction.estimatedWaitMinutes === "number"
                  ? ` · 예상 대기 ${attraction.estimatedWaitMinutes}분`
                  : ""}
              </p>
            ) : null}
          </div>

          {attraction.description ? (
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{attraction.description}</p>
          ) : null}

          {attraction.highlights?.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-900">볼거리</h3>
              <ul className="mt-2 space-y-1.5">
                {attraction.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-rose-400">·</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {attraction.tips ? (
            <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/80 px-3 py-2.5">
              <p className="text-xs font-medium text-amber-900">여행 팁</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-950/90">{attraction.tips}</p>
            </div>
          ) : null}

          {attraction.recommendedTimeSlots?.length ? (
            <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2.5">
              <p className="text-xs font-medium text-indigo-900">추천 방문 시간대</p>
              <p className="mt-1 text-sm text-indigo-950">
                {attraction.recommendedTimeSlots.join(" · ")}
              </p>
              {attraction.crowdReason ? (
                <p className="mt-1 text-xs text-indigo-900/80">{attraction.crowdReason}</p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
              닫기
            </Button>
            {attraction.wikiUrl ? (
              <a
                href={attraction.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <ExternalLink size={16} />
                위키백과
              </a>
            ) : null}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium"
            >
              <ExternalLink size={16} />
              지도에서 보기
            </a>
          </div>
        </div>
      </div>

      {lightbox && photos.length > 0 ? (
        <div
          className="fixed inset-0 z-[510] flex flex-col bg-black/95 md:flex-row"
          role="dialog"
          aria-label="사진 확대 보기"
        >
          <button
            type="button"
            className="absolute inset-0 md:hidden"
            aria-label="닫기"
            onClick={() => setLightbox(false)}
          />
          <div className="relative z-10 flex min-h-0 min-w-0 flex-1 items-center justify-center p-4 pt-14 md:p-6 md:pt-6">
            <Image
              src={photos[photoIndex]}
              alt={attraction.name}
              width={1600}
              height={1200}
              className="relative z-10 max-h-[50vh] w-auto max-w-full object-contain md:max-h-[88vh]"
              unoptimized
            />
            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
                  }}
                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-2xl text-white hover:bg-white/25 md:left-4"
                  aria-label="이전"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex((i) => (i + 1) % photos.length);
                  }}
                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-2xl text-white hover:bg-white/25 md:right-4"
                  aria-label="다음"
                >
                  ›
                </button>
                <p className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-sm text-white/80 md:bottom-8">
                  {photoIndex + 1} / {photos.length}
                </p>
              </>
            ) : null}
          </div>
          <aside className="relative z-10 hidden min-h-0 w-full max-w-md flex-col overflow-y-auto border-l border-white/10 bg-slate-950/90 p-5 text-white md:flex">
            <h2 className="text-lg font-bold">{attraction.name}</h2>
            {attraction.rating ? (
              <div className="mt-2">
                <StarRatingDisplay
                  value={attraction.rating}
                  size="sm"
                  reviewCount={attraction.reviewCount}
                  tone="dark"
                  className="text-white"
                />
              </div>
            ) : null}
            {attraction.description ? (
              <p className="mt-3 text-sm leading-relaxed text-white/85">{attraction.description}</p>
            ) : null}
            <div className="mt-4 space-y-2 text-sm text-white/75">
              {attraction.fee ? <p>입장료 {attraction.fee}</p> : null}
              {attraction.hours ? <p>운영 {attraction.hours}</p> : null}
              {crowdLabel ? (
                <p>
                  {crowdLabel}
                  {typeof attraction.estimatedWaitMinutes === "number"
                    ? ` · 대기 약 ${attraction.estimatedWaitMinutes}분`
                    : ""}
                </p>
              ) : null}
            </div>
          </aside>
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
