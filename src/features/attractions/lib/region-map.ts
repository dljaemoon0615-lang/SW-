import type { JapanRegionId } from "@/shared/lib/constants";

export const REGION_MAP_VIEW: Record<
  JapanRegionId,
  { lat: number; lng: number; zoom: number }
> = {
  TOKYO: { lat: 35.6812, lng: 139.7671, zoom: 11 },
  OSAKA_KYOTO: { lat: 34.9858, lng: 135.7588, zoom: 11 },
  FUKUOKA: { lat: 33.5904, lng: 130.4017, zoom: 12 },
  SAPPORO: { lat: 43.0618, lng: 141.3545, zoom: 11 },
};

export function hasValidCoords(lat: number, lng: number) {
  return Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);
}
