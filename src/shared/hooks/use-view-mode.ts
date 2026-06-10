"use client";

import type { ViewMode } from "@/shared/lib/view-mode";
import { useViewModeContext } from "@/shared/providers/view-mode-provider";

export function useViewMode(): ViewMode {
  return useViewModeContext();
}

/** 추후 모바일 전용 주소용 링크 prefix */
export function mobilePath(path: string, mode: ViewMode) {
  if (mode !== "mobile") return path;
  if (path.startsWith("/m")) return path;
  return path === "/" ? "/m" : `/m${path}`;
}
