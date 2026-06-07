"use client";

import Link from "next/link";
import { useId } from "react";
import { APP_NAME, APP_TAGLINE } from "@/shared/lib/constants";
import { BrandHandsGraphic } from "@/shared/ui/brand-hands-icon";

type Variant = "header" | "hero" | "compact" | "footer";

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
};

export function BrandMark({ size }: { size: number }) {
  const gradId = useId().replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <BrandHandsGraphic gradId={gradId} />
    </svg>
  );
}

export function BrandLogo({ variant = "header", href = "/", className = "" }: Props) {
  const isHero = variant === "hero";
  const isCompact = variant === "compact";
  const isFooter = variant === "footer";

  const markSize = isHero ? 64 : isCompact ? 32 : isFooter ? 28 : 38;

  const content = (
    <div className={`brand-logo inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark size={markSize} />
      <div className="flex flex-col leading-tight">
        <span
          className={`brand-logo-en font-montserrat font-bold tracking-wide ${
            isHero
              ? "text-[length:var(--hero-title-size)] text-[var(--foreground)]"
              : isFooter
                ? "text-base text-white"
                : "text-[13px] text-[var(--logo-en)]"
          }`}
        >
          {APP_NAME}
        </span>
        {!isCompact ? (
          <span
            className={`brand-logo-kr font-medium ${
              isHero
                ? "text-xl text-[var(--primary)]"
                : isFooter
                  ? "text-xs text-[var(--primary-light-text)]"
                  : "text-[11px] text-[var(--logo-kr)]"
            }`}
          >
            {APP_TAGLINE}
          </span>
        ) : null}
      </div>
    </div>
  );

  if (href && !isFooter) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
