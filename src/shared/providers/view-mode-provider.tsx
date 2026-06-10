"use client";

import { createContext, useContext, useMemo } from "react";
import type { ViewMode } from "@/shared/lib/view-mode";

const ViewModeContext = createContext<ViewMode>("desktop");

export function ViewModeProvider({
  initialMode,
  children,
}: {
  initialMode: ViewMode;
  children: React.ReactNode;
}) {
  const value = useMemo(() => initialMode, [initialMode]);
  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
}

export function useViewModeContext(): ViewMode {
  return useContext(ViewModeContext);
}
