"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { persistViewMode } from "@/shared/lib/view-mode-client";
import type { ViewMode } from "@/shared/lib/view-mode";

type ViewModeContextValue = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
};

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

export function ViewModeProvider({
  initialMode,
  children,
}: {
  initialMode: ViewMode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mode, setModeState] = useState(initialMode);

  useEffect(() => {
    setModeState(initialMode);
  }, [initialMode]);

  const setMode = useCallback(
    (next: ViewMode) => {
      if (next === mode) return;
      persistViewMode(next);
      setModeState(next);
      router.refresh();
    },
    [mode, router],
  );

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
}

export function useViewModeContext(): ViewMode {
  const ctx = useContext(ViewModeContext);
  return ctx?.mode ?? "desktop";
}

export function useViewModeActions() {
  const ctx = useContext(ViewModeContext);
  return { setMode: ctx?.setMode ?? (() => {}) };
}
