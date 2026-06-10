"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AttractionResult } from "@/server/ai/types";
import type { JapanRegionId } from "@/shared/lib/constants";
import {
  getPinMarkerDataUrl,
  getPinMarkerDataUrlSync,
  toGoogleMarkerIcon,
} from "@/features/attractions/lib/pin-marker-icon";
import { REGION_MAP_VIEW, hasValidCoords } from "@/features/attractions/lib/region-map";
import { fetchGoogleMapsApiKey, loadGoogleMaps } from "@/shared/lib/load-google-maps";

type Props = {
  items: AttractionResult[];
  region: JapanRegionId;
  selectedId: string | null;
  onSelect: (attraction: AttractionResult) => void;
  className?: string;
};

function photoUrl(a: AttractionResult): string | null {
  return a.imageUrls?.[0] ?? a.imageUrl ?? null;
}

function truncateName(name: string, max = 9): string {
  const trimmed = name.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max)}…`;
}

function markerLabel(
  name: string,
  selected: boolean,
): google.maps.MarkerLabel | null {
  if (!selected) return null;
  return {
    text: truncateName(name, 12),
    className: "attraction-map-marker-label",
    color: "#2a3f7a",
    fontSize: "11px",
    fontWeight: "600",
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
  const iconGenRef = useRef(0);

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

  const rankById = useMemo(() => {
    const map = new Map<string, number>();
    mappable.forEach((a, index) => map.set(a.id, index + 1));
    return map;
  }, [mappable]);

  const mappableKey = useMemo(() => mappable.map((a) => a.id).join("|"), [mappable]);

  const applyMarkerIcon = useCallback(
    async (
      marker: google.maps.Marker,
      a: AttractionResult,
      rank: number,
      selected: boolean,
      gen: number,
    ) => {
      const fallback = getPinMarkerDataUrlSync(rank, selected);
      marker.setIcon(toGoogleMarkerIcon(google, fallback, selected));

      const url = photoUrl(a);
      if (!url) return;

      try {
        const dataUrl = await getPinMarkerDataUrl(rank, selected, url);
        if (gen !== iconGenRef.current) return;
        if (markersByIdRef.current.get(a.id) !== marker) return;
        marker.setIcon(toGoogleMarkerIcon(google, dataUrl, selected));
      } catch {
        /* 폴백 아이콘 유지 */
      }
    },
    [],
  );

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
      map.fitBounds(bounds, { top: 56, right: 56, bottom: 56, left: 56 });
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
      const gen = ++iconGenRef.current;
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
        const rank = rankById.get(a.id) ?? 0;
        let marker = existing.get(a.id);

        if (marker) {
          marker.setPosition({ lat: a.lat, lng: a.lng });
          marker.setLabel(markerLabel(a.name, selected));
          marker.setZIndex(selected ? 1000 : rank);
          marker.setTitle(a.name);
          void applyMarkerIcon(marker, a, rank, selected, gen);
        } else {
          marker = new google.maps.Marker({
            map,
            position: { lat: a.lat, lng: a.lng },
            icon: toGoogleMarkerIcon(google, getPinMarkerDataUrlSync(rank, selected), selected),
            label: markerLabel(a.name, selected),
            zIndex: selected ? 1000 : rank,
            title: a.name,
          });

          marker.addListener("click", () => {
            onSelectRef.current(a);
          });

          existing.set(a.id, marker);
          void applyMarkerIcon(marker, a, rank, selected, gen);
        }
      }
    },
    [mappable, rankById, applyMarkerIcon],
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
      className={`attraction-map-root relative isolate z-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 ${className} ${mapReady ? "" : "pointer-events-none"}`}
    >
      <div ref={containerRef} className="z-0 h-full min-h-[280px] w-full sm:min-h-[360px]" />
      {!mapReady && !loadError ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-slate-50/90 text-sm text-slate-500">
          지도 불러오는 중…
        </div>
      ) : null}
      {loadError ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/90 px-4 text-center text-sm text-slate-600">
          {loadError}
        </div>
      ) : null}
      {!loadError && mappable.length === 0 ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-sm text-slate-500">
          지도에 표시할 좌표가 없습니다
        </div>
      ) : !loadError ? (
        <p className="pointer-events-none absolute bottom-2 left-2 z-10 rounded-md bg-white/90 px-2 py-1 text-[10px] text-slate-600 shadow-sm">
          {mappable.length}곳 · 핀을 눌러 상세 보기
        </p>
      ) : null}
    </div>
  );
}
