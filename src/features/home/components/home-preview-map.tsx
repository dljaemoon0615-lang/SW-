"use client";

import { useEffect, useRef, useState } from "react";
import { REGION_MAP_VIEW } from "@/features/attractions/lib/region-map";
import { HOME_PREVIEW_MAP_MARKERS } from "@/features/home/lib/home-data";
import { fetchGoogleMapsApiKey, loadGoogleMaps } from "@/shared/lib/load-google-maps";

export function HomePreviewMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const markers: google.maps.Marker[] = [];

    async function init() {
      if (!containerRef.current || mapRef.current) return;

      const apiKey = await fetchGoogleMapsApiKey();
      if (!apiKey) {
        if (!cancelled) {
          setLoadError("Google Maps API 키가 설정되지 않았습니다.");
        }
        return;
      }

      try {
        await loadGoogleMaps(apiKey);
      } catch (error) {
        if (!cancelled) {
          const detail =
            error instanceof Error ? error.message : "알 수 없는 오류";
          setLoadError(
            `Google Maps를 불러오지 못했습니다. (${detail}) Maps JavaScript API 활성화·키 제한(localhost)을 확인하세요.`,
          );
        }
        return;
      }

      if (cancelled || !containerRef.current) return;

      const view = REGION_MAP_VIEW.TOKYO;
      const map = new google.maps.Map(containerRef.current, {
        center: { lat: view.lat, lng: view.lng },
        zoom: view.zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        clickableIcons: false,
      });

      mapRef.current = map;

      const bounds = new google.maps.LatLngBounds();
      for (const spot of HOME_PREVIEW_MAP_MARKERS) {
        const position = { lat: spot.lat, lng: spot.lng };
        bounds.extend(position);
        const marker = new google.maps.Marker({
          map,
          position,
          title: spot.label,
          label: {
            text: spot.label,
            color: "#2a3f7a",
            fontSize: "11px",
            fontWeight: "600",
          },
        });
        markers.push(marker);
      }

      if (HOME_PREVIEW_MAP_MARKERS.length > 1) {
        map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
        google.maps.event.addListenerOnce(map, "bounds_changed", () => {
          const zoom = map.getZoom();
          if (zoom != null && zoom > 13) map.setZoom(13);
        });
      }

      setLoadError(null);
    }

    void init();

    return () => {
      cancelled = true;
      for (const marker of markers) marker.setMap(null);
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="home-preview-map attraction-map-root">
      <div ref={containerRef} className="home-preview-map__canvas" />
      {loadError ? (
        <div className="home-preview-map__error">{loadError}</div>
      ) : (
        <p className="home-preview-map__badge">예시 일정 · Google Maps</p>
      )}
    </div>
  );
}
