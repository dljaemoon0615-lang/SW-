"use client";

import type { AttractionResult } from "@/server/ai/types";
import { StarRatingDisplay } from "@/features/attractions/components/star-rating-display";
import { MessageSquareQuote, Star } from "lucide-react";

type Props = {
  attraction: AttractionResult;
  variant?: "default" | "compact" | "dark";
};

export function AttractionRatingSection({ attraction, variant = "default" }: Props) {
  const rating = attraction.rating;
  if (rating == null) return null;

  const distribution = attraction.ratingDistribution ?? [];
  const reviews = attraction.reviews ?? [];
  const isDark = variant === "dark";
  const isCompact = variant === "compact";

  const cardBg = isDark
    ? "border-white/10 bg-white/5"
    : "border-slate-200/80 bg-gradient-to-br from-amber-50/60 to-white";
  const barTrack = isDark ? "bg-white/15" : "bg-slate-200";
  const barFill = isDark ? "bg-amber-400" : "bg-amber-400";
  const textMuted = isDark ? "text-white/60" : "text-slate-500";
  const textMain = isDark ? "text-white" : "text-slate-900";
  const reviewCard = isDark
    ? "border-white/10 bg-white/5"
    : "border-slate-100 bg-white";

  return (
    <section className={isCompact ? "mt-3" : "mt-4"} aria-label="평점 및 리뷰">
      <div className={`rounded-xl border p-4 ${cardBg}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="shrink-0">
            <p className={`text-xs font-medium ${textMuted}`}>여행자 평점</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-3xl font-bold tabular-nums ${textMain}`}>
                {rating.toFixed(1)}
              </span>
              <span className={`text-sm ${textMuted}`}>/ 5</span>
            </div>
            <StarRatingDisplay
              value={rating}
              size="md"
              showValue={false}
              reviewCount={attraction.reviewCount}
              className="mt-2"
            />
          </div>

          {distribution.length > 0 && !isCompact ? (
            <div className="min-w-0 flex-1 sm:max-w-[220px]">
              <p className={`mb-2 text-xs font-medium ${textMuted}`}>별점 분포</p>
              <ul className="space-y-1.5">
                {distribution.map(({ stars, percent }) => (
                  <li key={stars} className="flex items-center gap-2 text-xs">
                    <span
                      className={`inline-flex w-8 shrink-0 items-center gap-0.5 font-medium ${textMain}`}
                    >
                      {stars}
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </span>
                    <div className={`h-2 min-w-0 flex-1 overflow-hidden rounded-full ${barTrack}`}>
                      <div
                        className={`h-full rounded-full transition-all ${barFill}`}
                        style={{ width: `${percent}%` }}
                        role="presentation"
                      />
                    </div>
                    <span className={`w-9 shrink-0 text-right tabular-nums ${textMuted}`}>
                      {percent}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <p className={`mt-3 text-[10px] leading-snug ${textMuted}`}>
          Google Places 사용자 평점·리뷰를 기반으로 표시합니다. 시기·날씨에 따라 체험은 달라질
          수 있습니다.
        </p>
      </div>

      {reviews.length > 0 && !isCompact ? (
        <div className="mt-4">
          <h3
            className={`flex items-center gap-1.5 text-sm font-semibold ${textMain}`}
          >
            <MessageSquareQuote size={16} className="text-brand" />
            여행자 리뷰
            <span className={`font-normal ${textMuted}`}>
              ({Math.min(reviews.length, 3)}건 미리보기)
            </span>
          </h3>
          <ul className="mt-2 space-y-2">
            {reviews.slice(0, 3).map((review) => (
              <li
                key={review.id}
                className={`rounded-xl border px-3 py-2.5 shadow-sm ${reviewCard}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-light)] text-xs font-bold text-brand"
                      aria-hidden
                    >
                      {review.author.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{review.author}</p>
                      <p className="text-[10px] text-slate-500">{review.createdAt}</p>
                    </div>
                  </div>
                  <StarRatingDisplay value={review.rating} size="sm" showValue />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{review.text}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
