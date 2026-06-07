import { AppShell } from "@/shared/layout/app-shell";
import { StaySearch } from "@/features/stays/components/stay-search";
import {
  DEFAULT_STAY_SEARCH,
  ensureCatalogWarm,
  getStaysCatalog,
} from "@/server/preload/catalog";

export default async function StaysPage() {
  await ensureCatalogWarm();
  const initialByRegion = getStaysCatalog();

  return (
    <AppShell title="숙박 검색·추천">
      <p className="mb-4 text-sm text-slate-600">
        숙소 목록은 서버 시작 시 미리 불러옵니다. 지역 변경은 즉시 반영되며, 날짜·예산을
        바꾼 뒤에는 검색 버튼으로 다시 조회할 수 있습니다.
      </p>
      <StaySearch initialByRegion={initialByRegion} defaultSearch={DEFAULT_STAY_SEARCH} />
    </AppShell>
  );
}
