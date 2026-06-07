"use client";

import { Star } from "lucide-react";

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, { star: string; text: string; gap: string }> = {
  sm: { star: "h-3 w-3", text: "text-xs", gap: "gap-0.5" },
  md: { star: "h-4 w-4", text: "text-sm", gap: "gap-0.5" },
  lg: { star: "h-5 w-5", text: "text-base", gap: "gap-1" },
};

type Props = {
  value: number;
  max?: number;
  size?: Size;
  showValue?: boolean;
  reviewCount?: number;
  /** 어두운 배경(카드 오버레이·라이트박스)용 */
  tone?: "light" | "dark";
  className?: string;
};

export function StarRatingDisplay({
  value,
  max = 5,
  size = "md",
  showValue = true,
  reviewCount,
  tone = "light",
  className = "",
}: Props) {
  const clamped = Math.max(0, Math.min(max, value));
  const { star, text, gap } = SIZE_CLASS[size];
  const valueClass = tone === "dark" ? "text-amber-300" : "text-amber-800";
  const countClass = tone === "dark" ? "text-white/75" : "text-slate-500";
  const emptyStarClass = tone === "dark" ? "text-white/25" : "text-slate-200";

  return (
    <div className={`inline-flex flex-wrap items-center gap-x-2 ${className}`}>
      <span className={`inline-flex items-center ${gap}`} aria-label={`평점 ${clamped}점 만점 ${max}점`}>
        {Array.from({ length: max }, (_, i) => {
          const fill = clamped >= i + 1 ? 1 : clamped >= i + 0.5 ? 0.5 : 0;
          return (
            <span key={i} className="relative inline-block">
              <Star className={`${star} ${emptyStarClass}`} aria-hidden />
              {fill > 0 ? (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: fill === 1 ? "100%" : "50%" }}
                >
                  <Star className={`${star} fill-amber-400 text-amber-400`} aria-hidden />
                </span>
              ) : null}
            </span>
          );
        })}
      </span>
      {showValue ? (
        <span className={`font-semibold ${valueClass} ${text}`}>{clamped.toFixed(1)}</span>
      ) : null}
      {reviewCount != null && reviewCount > 0 ? (
        <span className={`${countClass} ${text}`}>({reviewCount.toLocaleString()}개 평가)</span>
      ) : null}
    </div>
  );
}
