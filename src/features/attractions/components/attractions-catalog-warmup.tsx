"use client";

import { useEffect } from "react";

let started = false;

/**
 * 앱 최초 로드 시 기본 지역(오사카·교토) 큐레이션만 가볍게 워밍합니다.
 * 전 지역 supplemental은 관광지 페이지에서만 순차 로드합니다.
 */
export function AttractionsCatalogWarmup() {
  useEffect(() => {
    if (started) return;
    started = true;

    const run = () => {
      void fetch(
        "/api/ai/attractions?region=OSAKA_KYOTO&page=1&preload=1",
        { cache: "no-store" },
      ).catch(() => {});
    };

    if (typeof requestIdleCallback === "function") {
      const idleId = requestIdleCallback(run, { timeout: 15_000 });
      return () => cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(run, 10_000);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
