import { Suspense } from "react";
import { AppShell } from "@/shared/layout/app-shell";
import { AttractionList } from "@/features/attractions/components/attraction-list";
import { getAttractionsCatalog, ensureAttractionsWarm } from "@/server/preload/catalog";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";

function parseRegion(value: string | undefined): JapanRegionId | undefined {
  if (value && JAPAN_REGIONS.some((r) => r.id === value)) {
    return value as JapanRegionId;
  }
  return undefined;
}

export default async function AttractionsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region: regionParam } = await searchParams;
  const priorityRegion = parseRegion(regionParam);

  void ensureAttractionsWarm(priorityRegion);
  const initialByRegion = getAttractionsCatalog();

  return (
    <AppShell title="관광지 정보">
      <p className="mb-4 text-sm text-slate-600">
        지역별 대표 명소(도톤보리·USJ 등)를 우선 표시하고, 지도와 리스트로 확인할 수 있습니다.
      </p>
      <Suspense fallback={<p className="text-sm text-slate-500">불러오는 중...</p>}>
        <AttractionList initialByRegion={initialByRegion} />
      </Suspense>
    </AppShell>
  );
}
