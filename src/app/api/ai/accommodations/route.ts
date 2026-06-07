import { NextResponse } from "next/server";
import { applyStayFilters } from "@/features/stays/lib/apply-stay-filters";
import { searchStays } from "@/features/stays/server";
import {
  ensureCatalogWarm,
  getStaysForRegion,
} from "@/server/preload/catalog";
import type { JapanRegionId } from "@/shared/lib/constants";
import type {
  AccommodationAmenity,
  AccommodationType,
} from "@/server/ai/types";

const VALID_TYPES: AccommodationType[] = ["HOTEL", "RYOKAN", "GUESTHOUSE"];
const VALID_AMENITIES: AccommodationAmenity[] = [
  "WIFI",
  "BREAKFAST",
  "ONSEN",
  "KITCHEN",
  "PARKING",
  "AIRPORT_BUS",
  "FAMILY",
  "NON_SMOKING",
];

function parseList<T extends string>(value: string | null, allowed: T[]): T[] | undefined {
  if (!value) return undefined;
  const parts = value
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter((s): s is T => (allowed as readonly string[]).includes(s));
  return parts.length ? parts : undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = (searchParams.get("region") ?? "TOKYO") as JapanRegionId;
  const sortParam = searchParams.get("sort") ?? "recommended";
  const sort = (
    ["recommended", "price-asc", "price-desc", "rating-desc"].includes(sortParam)
      ? sortParam
      : "recommended"
  ) as "recommended" | "price-asc" | "price-desc" | "rating-desc";

  const req = {
    region,
    checkIn: searchParams.get("checkIn") ?? "",
    checkOut: searchParams.get("checkOut") ?? "",
    guests: Number(searchParams.get("guests") ?? 2),
    budgetKrw: Number(searchParams.get("budgetKrw") ?? 200000),
    types: parseList(searchParams.get("types"), VALID_TYPES),
    amenities: parseList(searchParams.get("amenities"), VALID_AMENITIES),
    area: searchParams.get("area") ?? undefined,
    sort,
  };

  const usePreload =
    searchParams.get("preload") === "1" ||
    (!req.checkIn && !req.checkOut && searchParams.get("live") !== "1");

  if (usePreload) {
    await ensureCatalogWarm();
    const cached = getStaysForRegion(region);
    if (cached?.items.length) {
      const pool = cached.items;
      return NextResponse.json(applyStayFilters(pool, req));
    }
  }

  const result = await searchStays(req);
  return NextResponse.json(result);
}
