import { NextResponse } from "next/server";
import {
  getAttractionsPage,
  getCuratedPageAttractions,
  getSupplementalAttractionsPool,
  ATTRACTIONS_PAGE_SIZE,
} from "@/features/attractions/server/attractions.service";
import { getAttractionsCatalog } from "@/server/preload/catalog";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";

export const revalidate = 3600;

function parseRegion(value: string | null): JapanRegionId {
  if (value && JAPAN_REGIONS.some((r) => r.id === value)) {
    return value as JapanRegionId;
  }
  return "OSAKA_KYOTO";
}

function parsePage(value: string | null): number {
  const n = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const preload = searchParams.get("preload");
  const region = parseRegion(searchParams.get("region"));
  const page = parsePage(searchParams.get("page"));
  const supplementalOnly = searchParams.get("supplemental") === "1";

  if (preload === "all") {
    const catalog = getAttractionsCatalog();
    return NextResponse.json({
      started: true,
      regions: JAPAN_REGIONS.map((r) => ({
        id: r.id,
        count: catalog[r.id]?.length ?? 0,
      })),
    });
  }

  if (supplementalOnly) {
    const pool = await getSupplementalAttractionsPool(region).catch(() => []);
    const totalPages = 1 + (pool.length > 0 ? Math.ceil(pool.length / ATTRACTIONS_PAGE_SIZE) : 0);
    return NextResponse.json({
      supplemental: pool,
      count: pool.length,
      pageSize: ATTRACTIONS_PAGE_SIZE,
      totalPages,
    });
  }

  if (preload === "1") {
    const result = await getAttractionsPage(region, page);
    return NextResponse.json({
      attractions: result.items,
      items: result.items,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      isCuratedPage: result.isCuratedPage,
      preloaded: true,
    });
  }

  if (page === 1 && searchParams.get("curated") === "1") {
    const items = await getCuratedPageAttractions(region);
    return NextResponse.json({
      attractions: items,
      items,
      page: 1,
      pageSize: ATTRACTIONS_PAGE_SIZE,
      totalPages: 1,
      isCuratedPage: true,
    });
  }

  const result = await getAttractionsPage(region, page);
  return NextResponse.json({
    attractions: result.items,
    items: result.items,
    page: result.page,
    pageSize: result.pageSize,
    totalPages: result.totalPages,
    isCuratedPage: result.isCuratedPage,
  });
}
