import { AppShell } from "@/shared/layout/app-shell";
import { StaySearch } from "@/features/stays/components/stay-search";

export default function StaysPage() {
  return (
    <AppShell title="숙박 검색·추천">
      <p className="mb-4 text-sm text-slate-600">
        내 일정·예산·취향에 맞춰 호텔·료칸·게스트하우스를 추천해 드립니다.
      </p>
      <StaySearch />
    </AppShell>
  );
}
