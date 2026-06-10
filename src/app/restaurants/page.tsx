import { Suspense } from "react";
import { AppShell } from "@/shared/layout/app-shell";
import { RestaurantList } from "@/features/restaurants/components/restaurant-list";
import { ensureRestaurantsWarm, getRestaurantsCatalog } from "@/server/preload/catalog";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";

function parseRegion(value: string | undefined): JapanRegionId | undefined {
  if (value && JAPAN_REGIONS.some((r) => r.id === value)) {
    return value as JapanRegionId;
  }
  return undefined;
}

export default async function RestaurantsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region: regionParam } = await searchParams;
  const priorityRegion = parseRegion(regionParam) ?? "TOKYO";

  void ensureRestaurantsWarm(priorityRegion);
  const initialByRegion = getRestaurantsCatalog();

  return (
    <AppShell title="맛집 추천">
      <Suspense fallback={<p className="text-sm text-slate-500">불러오는 중...</p>}>
        <RestaurantList initialByRegion={initialByRegion} initialRegion={priorityRegion} />
      </Suspense>
    </AppShell>
  );
}
