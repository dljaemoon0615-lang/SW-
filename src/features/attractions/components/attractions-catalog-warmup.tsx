"use client";

import { useEffect } from "react";

let started = false;

/**
 * 앱 최초 로드 시 전 지역 Google Places 관광지 데이터를 백그라운드로 요청합니다.
 * 관광지 페이지 진입 전에 서버 캐시를 채워 두어 지역 선택 시 즉시 표시됩니다.
 */
export function AttractionsCatalogWarmup() {
  useEffect(() => {
    if (started) return;
    started = true;

    const run = () => {
      void fetch("/api/ai/attractions?preload=all", { cache: "no-store" }).catch(() => {});
    };

    if (typeof requestIdleCallback === "function") {
      const idleId = requestIdleCallback(run, { timeout: 2500 });
      return () => cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(run, 300);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
