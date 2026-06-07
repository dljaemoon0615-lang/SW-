import { NextResponse } from "next/server";
import { getAttractionsByRegion } from "@/features/attractions/server";
import {
  ensureCatalogWarm,
  getAttractionsForRegion,
} from "@/server/preload/catalog";
import type { JapanRegionId } from "@/shared/lib/constants";

export const revalidate = 3600;

export async function GET(req: Request) {
  const region = (new URL(req.url).searchParams.get("region") ?? "TOKYO") as JapanRegionId;
  await ensureCatalogWarm();
  const attractions =
    getAttractionsForRegion(region) ?? (await getAttractionsByRegion(region));
  return NextResponse.json({ attractions, items: attractions });
}
