"use client";

import Link from "next/link";
import { useId } from "react";
import { APP_NAME, APP_TAGLINE } from "@/shared/lib/constants";
import { BrandHandsGraphic } from "@/shared/ui/brand-hands-icon";
import { ViewModeSwitcher } from "@/shared/ui/view-mode-switcher";

type Variant = "header" | "hero" | "compact" | "footer";

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  /** 헤더에서 앱/웹 보기 전환 */
  showViewSwitcher?: boolean;
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

export function BrandLogo({
  variant = "header",
  href = "/",
  className = "",
  showViewSwitcher = false,
}: Props) {
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

  const brandBlock =
    href && !isFooter ? (
      <Link href={href} className="transition-opacity hover:opacity-90">
        {content}
      </Link>
    ) : (
      content
    );

  if (showViewSwitcher && variant === "header") {
    return (
      <div className={`brand-logo-stack ${className}`}>
        {brandBlock}
        <ViewModeSwitcher className="mt-1.5" />
      </div>
    );
  }

  return brandBlock;
}
