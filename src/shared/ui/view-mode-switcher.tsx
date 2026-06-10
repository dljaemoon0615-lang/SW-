"use client";

import { Monitor, Smartphone } from "lucide-react";
import { useViewMode, useViewModeActions } from "@/shared/hooks/use-view-mode";

type Props = {
  className?: string;
  /** 모바일 헤더 등 좁은 영역 */
  compact?: boolean;
};

export function ViewModeSwitcher({ className = "", compact = false }: Props) {
  const mode = useViewMode();
  const { setMode } = useViewModeActions();

  return (
    <div
      className={`view-mode-switcher ${compact ? "view-mode-switcher--compact" : ""} ${className}`}
      role="group"
      aria-label="화면 보기 방식"
    >
      <button
        type="button"
        className={`view-mode-switcher__btn ${mode === "mobile" ? "view-mode-switcher__btn--active" : ""}`}
        aria-pressed={mode === "mobile"}
        onClick={() => setMode("mobile")}
      >
        <Smartphone size={compact ? 11 : 12} aria-hidden />
        앱처럼 보기
      </button>
      <button
        type="button"
        className={`view-mode-switcher__btn ${mode === "desktop" ? "view-mode-switcher__btn--active" : ""}`}
        aria-pressed={mode === "desktop"}
        onClick={() => setMode("desktop")}
      >
        <Monitor size={compact ? 11 : 12} aria-hidden />
        웹처럼 보기
      </button>
    </div>
  );
}
