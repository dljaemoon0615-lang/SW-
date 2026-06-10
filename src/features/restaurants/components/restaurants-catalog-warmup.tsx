"use client";

import { useEffect } from "react";

let started = false;

/** 앱 최초 로드 시 전 지역 맛집 데이터를 백그라운드로 요청합니다. */
export function RestaurantsCatalogWarmup() {
  useEffect(() => {
    if (started) return;
    started = true;

    const run = () => {
      void fetch("/api/ai/restaurants?preload=all", { cache: "no-store" }).catch(() => {});
    };

    if (typeof requestIdleCallback === "function") {
      const idleId = requestIdleCallback(run, { timeout: 4000 });
      return () => cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(run, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
