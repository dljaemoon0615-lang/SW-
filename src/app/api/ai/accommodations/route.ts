import { NextResponse } from "next/server";
import { searchStays } from "@/features/stays/server";
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const region = (searchParams.get("region") ?? "TOKYO") as JapanRegionId;
  const sortParam = searchParams.get("sort") ?? "recommended";
  const sort = (
    ["recommended", "price-asc", "price-desc", "rating-desc"].includes(sortParam)
      ? sortParam
      : "recommended"
  ) as "recommended" | "price-asc" | "price-desc" | "rating-desc";

  const result = await searchStays({
    region,
    checkIn: searchParams.get("checkIn") ?? "",
    checkOut: searchParams.get("checkOut") ?? "",
    guests: Number(searchParams.get("guests") ?? 2),
    budgetKrw: Number(searchParams.get("budgetKrw") ?? 200000),
    types: parseList(searchParams.get("types"), VALID_TYPES),
    amenities: parseList(searchParams.get("amenities"), VALID_AMENITIES),
    area: searchParams.get("area") ?? undefined,
    sort,
  });

  return NextResponse.json(result);
}
