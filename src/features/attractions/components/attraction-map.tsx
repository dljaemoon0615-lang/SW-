"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AttractionResult } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import { REGION_MAP_VIEW, hasValidCoords } from "@/features/attractions/lib/region-map";
import { fetchGoogleMapsApiKey, loadGoogleMaps } from "@/shared/lib/load-google-maps";

type Props = {
  items: AttractionResult[];
  region: JapanRegionId;
  selectedId: string | null;
  onSelect: (attraction: AttractionResult) => void;
  className?: string;
};

const MARKER_SIZE = 52;
const MARKER_SIZE_SELECTED = 58;

function photoUrl(a: AttractionResult): string | null {
  return a.imageUrls?.[0] ?? a.imageUrl ?? null;
}

function fallbackIconDataUrl(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
    <rect width="52" height="52" rx="12" fill="#fecdd3"/>
    <text x="26" y="34" text-anchor="middle" font-size="22">📍</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function markerIcon(
  googleMaps: typeof google,
  a: AttractionResult,
  selected: boolean,
): google.maps.Icon {
  const size = selected ? MARKER_SIZE_SELECTED : MARKER_SIZE;
  const url = photoUrl(a) ?? fallbackIconDataUrl();
  return {
    url,
    scaledSize: new googleMaps.maps.Size(size, size),
    anchor: new googleMaps.maps.Point(size / 2, size / 2),
  };
}

export function AttractionMap({
  items,
  region,
  selectedId,
  onSelect,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersByIdRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const onSelectRef = useRef(onSelect);
  const selectedIdRef = useRef(selectedId);
  const mappableKeyRef = useRef("");

  useEffect(() => {
    onSelectRef.current = onSelect;
    selectedIdRef.current = selectedId;
  });

  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const mappable = useMemo(
    () => items.filter((a) => hasValidCoords(a.lat, a.lng)),
    [items],
  );

  const mappableKey = useMemo(() => mappable.map((a) => a.id).join("|"), [mappable]);

  const fitToMarkers = useCallback(
    (map: google.maps.Map) => {
      if (mappable.length === 0) return;

      if (mappable.length === 1) {
        map.setCenter({ lat: mappable[0].lat, lng: mappable[0].lng });
        map.setZoom(14);
        return;
      }

      const bounds = new google.maps.LatLngBounds();
      for (const a of mappable) {
        bounds.extend({ lat: a.lat, lng: a.lng });
      }
      map.fitBounds(bounds, { top: 48, right: 48, bottom: 48, left: 48 });
      const listener = google.maps.event.addListenerOnce(map, "bounds_changed", () => {
        const zoom = map.getZoom();
        if (zoom != null && zoom > 14) map.setZoom(14);
      });
      return () => google.maps.event.removeListener(listener);
    },
    [mappable],
  );

  const syncMarkers = useCallback(
    (map: google.maps.Map) => {
      const nextIds = new Set(mappable.map((a) => a.id));
      const existing = markersByIdRef.current;

      for (const [id, marker] of existing) {
        if (!nextIds.has(id)) {
          marker.setMap(null);
          existing.delete(id);
        }
      }

      for (const a of mappable) {
        const selected = a.id === selectedIdRef.current;
        let marker = existing.get(a.id);

        if (marker) {
          marker.setPosition({ lat: a.lat, lng: a.lng });
          marker.setIcon(markerIcon(google, a, selected));
          marker.setZIndex(selected ? 1000 : 1);
        } else {
          marker = new google.maps.Marker({
            map,
            position: { lat: a.lat, lng: a.lng },
            icon: markerIcon(google, a, selected),
            zIndex: selected ? 1000 : 1,
            title: a.name,
          });

          marker.addListener("click", () => {
            onSelectRef.current(a);
          });

          existing.set(a.id, marker);
        }
      }
    },
    [mappable],
  );

  useEffect(() => {
    let cancelled = false;

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
            `Google Maps를 불러오지 못했습니다. (${detail}) Maps JavaScript API 활성화·키 제한을 확인하세요.`,
          );
        }
        return;
      }

      if (cancelled || !containerRef.current) return;

      const view = REGION_MAP_VIEW[region];
      const map = new google.maps.Map(containerRef.current, {
        center: { lat: view.lat, lng: view.lng },
        zoom: view.zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        clickableIcons: false,
      });

      mapRef.current = map;
      setMapReady(true);
      setLoadError(null);
    }

    void init();

    return () => {
      cancelled = true;
      setMapReady(false);
      const markers = markersByIdRef.current;
      markers.forEach((m) => m.setMap(null));
      markers.clear();
      mapRef.current = null;
    };
  }, [region]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const map = mapRef.current;
    const regionChanged = mappableKeyRef.current !== `${region}:${mappableKey}`;
    mappableKeyRef.current = `${region}:${mappableKey}`;

    if (regionChanged) {
      const view = REGION_MAP_VIEW[region];
      map.setCenter({ lat: view.lat, lng: view.lng });
      map.setZoom(view.zoom);
    }

    syncMarkers(map);
    if (regionChanged) {
      fitToMarkers(map);
    }
  }, [mapReady, region, mappableKey, syncMarkers, fitToMarkers]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    syncMarkers(mapRef.current);
  }, [selectedId, mapReady, syncMarkers]);

  useEffect(() => {
    if (!mapReady || !mapRef.current || !selectedId) return;
    const target = mappable.find((a) => a.id === selectedId);
    if (!target) return;
    mapRef.current.panTo({ lat: target.lat, lng: target.lng });
  }, [selectedId, mappable, mapReady]);

  return (
    <div
      className={`attraction-map-root relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 ${className}`}
    >
      <div ref={containerRef} className="z-0 h-full min-h-[280px] w-full sm:min-h-[360px]" />
      {loadError ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 px-4 text-center text-sm text-slate-600">
          {loadError}
        </div>
      ) : null}
      {!loadError && mappable.length === 0 ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-sm text-slate-500">
          지도에 표시할 좌표가 없습니다
        </div>
      ) : !loadError ? (
        <p className="pointer-events-none absolute bottom-2 left-2 z-10 rounded-md bg-white/90 px-2 py-1 text-[10px] text-slate-600 shadow-sm">
          {mappable.length}곳 · 사진을 눌러 상세 보기 · Google Maps
        </p>
      ) : null}
    </div>
  );
}
