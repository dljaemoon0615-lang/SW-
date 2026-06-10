import { AppShell } from "@/shared/layout/app-shell";
import { StaySearch } from "@/features/stays/components/stay-search";
import {
  DEFAULT_STAY_SEARCH,
  ensureStaysWarm,
  getStaysCatalog,
} from "@/server/preload/catalog";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";

function parseRegion(value: string | undefined): JapanRegionId | undefined {
  if (value && JAPAN_REGIONS.some((r) => r.id === value)) {
    return value as JapanRegionId;
  }
  return undefined;
}

export default async function StaysPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region: regionParam } = await searchParams;
  const priorityRegion = parseRegion(regionParam);

  void ensureStaysWarm(priorityRegion);
  const initialByRegion = getStaysCatalog();

  return (
    <AppShell title="숙박 검색·추천">
      <StaySearch
        initialByRegion={initialByRegion}
        defaultSearch={DEFAULT_STAY_SEARCH}
        initialRegion={priorityRegion}
      />
    </AppShell>
  );
}
