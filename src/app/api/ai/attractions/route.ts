import { NextResponse } from "next/server";
import {
  ensureAttractionsWarm,
  ensureRegionAttractions,
  getAttractionsCatalog,
  getAttractionsForRegion,
} from "@/server/preload/catalog";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";

export const revalidate = 3600;

function parseRegion(value: string | null): JapanRegionId {
  if (value && JAPAN_REGIONS.some((r) => r.id === value)) {
    return value as JapanRegionId;
  }
  return "OSAKA_KYOTO";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const preload = searchParams.get("preload");
  const region = parseRegion(searchParams.get("region"));

  if (preload === "all") {
    void ensureAttractionsWarm();
    const catalog = getAttractionsCatalog();
    return NextResponse.json({
      started: true,
      regions: JAPAN_REGIONS.map((r) => ({
        id: r.id,
        count: catalog[r.id]?.length ?? 0,
      })),
    });
  }

  if (preload === "1") {
    await ensureRegionAttractions(region);
    const cached = getAttractionsForRegion(region);
    const attractions = cached ?? (await ensureRegionAttractions(region));
    return NextResponse.json({ attractions, items: attractions, preloaded: true });
  }

  const attractions = await ensureRegionAttractions(region);
  return NextResponse.json({ attractions, items: attractions });
}
