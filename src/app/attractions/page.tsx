import { Suspense } from "react";
import { AppShell } from "@/shared/layout/app-shell";
import { AttractionList } from "@/features/attractions/components/attraction-list";
import { getAttractionsCatalog } from "@/server/preload/catalog";

export default async function AttractionsPage() {
  const initialByRegion = getAttractionsCatalog();

  return (
    <AppShell title="관광지 정보">
      <Suspense fallback={<p className="text-sm text-slate-500">불러오는 중...</p>}>
        <AttractionList initialByRegion={initialByRegion} />
      </Suspense>
    </AppShell>
  );
}
