"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/shared/ui/badge";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import type { AttractionResult } from "@/server/ai/types";
import { AttractionDetailModal } from "@/features/attractions/components/attraction-detail-modal";
import { AttractionListRows } from "@/features/attractions/components/attraction-list-rows";
import { Clock, LayoutGrid, List, Map, Star, Ticket, Users } from "lucide-react";

const AttractionMap = dynamic(
  () =>
    import("@/features/attractions/components/attraction-map").then((m) => ({
      default: m.AttractionMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500 sm:min-h-[360px]">
        지도 불러오는 중…
      </div>
    ),
  },
);

type ViewMode = "split" | "map" | "list";

const CATEGORY_LABEL: Record<string, string> = {
  attraction: "명소",
  museum: "박물관",
  viewpoint: "전망대",
  theme_park: "테마파크",
  zoo: "동물원",
  aquarium: "수족관",
  gallery: "미술관",
  shrine: "신사",
  temple: "사찰",
  place_of_worship: "종교 시설",
  park: "공원",
  garden: "정원",
  historic_castle: "성·궁궐",
  historic_fort: "성·궁궐",
  historic_city_gate: "성문",
  historic_monument: "기념물",
  historic_memorial: "기념관",
  historic_ruins: "유적",
  historic_archaeological_site: "유적지",
  historic_tomb: "고분",
};

function AttractionCard({
  attraction,
  onSelect,
}: {
  attraction: AttractionResult;
  onSelect: () => void;
}) {
  const photos =
    attraction.imageUrls?.length
      ? attraction.imageUrls
      : attraction.imageUrl
        ? [attraction.imageUrl]
        : [];

  const crowdUi =
    attraction.crowdLevel === "HIGH"
      ? { label: "혼잡", cls: "bg-rose-500/90 text-white" }
      : attraction.crowdLevel === "MEDIUM"
        ? { label: "보통", cls: "bg-amber-400/90 text-slate-900" }
        : attraction.crowdLevel === "LOW"
          ? { label: "여유", cls: "bg-emerald-500/90 text-white" }
          : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition hover:scale-[1.01] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
    >
      <div className="relative cursor-zoom-in">
        {photos.length > 0 ? (
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
            <Image
              src={photos[0]}
              alt={attraction.name}
              fill
              className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
              unoptimized
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-rose-100 to-sky-100 text-sm text-slate-500 sm:aspect-[16/10]">
            사진 준비 중
          </div>
        )}

        {photos.length > 1 ? (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            +{photos.length - 1}장 · 탭하여 확대
          </span>
        ) : (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 transition group-hover:opacity-100">
            탭하여 확대
          </span>
        )}

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-700 opacity-0 shadow transition group-hover:opacity-100">
          자세히 보기
        </span>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        {attraction.category ? (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
            {CATEGORY_LABEL[attraction.category] ?? attraction.category}
          </span>
        ) : null}
        {crowdUi ? (
          <span
            className={`pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${crowdUi.cls}`}
          >
            <Users size={12} />
            {crowdUi.label}
          </span>
        ) : null}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-end justify-between gap-2">
            <h3 className="text-lg font-bold leading-tight drop-shadow-sm">{attraction.name}</h3>
            {attraction.rating ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-sm font-semibold backdrop-blur-sm">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {attraction.rating}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-2 px-3 py-2.5">
        {attraction.description ? (
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
            {attraction.description}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
          {attraction.fee ? (
            <span className="inline-flex items-center gap-1">
              <Ticket size={13} className="text-rose-500" />
              {attraction.fee}
            </span>
          ) : null}
          {attraction.hours ? (
            <span className="inline-flex items-center gap-1">
              <Clock size={13} className="text-slate-400" />
              {attraction.hours}
            </span>
          ) : null}
          {typeof attraction.estimatedWaitMinutes === "number" ? (
            <span className="inline-flex items-center gap-1">
              <Users size={13} className="text-indigo-500" />
              대기 약 {attraction.estimatedWaitMinutes}분
            </span>
          ) : null}
        </div>
        {attraction.bestVisitTags?.length ? (
          <div className="flex flex-wrap gap-1">
            {attraction.bestVisitTags.map((tag) => (
              <Badge key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}

type AttractionListProps = {
  /** 서버 프리로드된 지역별 관광지 (지역 변경 시 즉시 표시) */
  initialByRegion: Record<JapanRegionId, AttractionResult[]>;
};

export function AttractionList({ initialByRegion }: AttractionListProps) {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region") as JapanRegionId | null;
  const initialRegion =
    regionParam && JAPAN_REGIONS.some((r) => r.id === regionParam)
      ? regionParam
      : "OSAKA_KYOTO";

  const [region, setRegion] = useState<JapanRegionId>(initialRegion);
  const [selected, setSelected] = useState<AttractionResult | null>(null);
  const [view, setView] = useState<ViewMode>("split");

  useEffect(() => {
    if (regionParam && JAPAN_REGIONS.some((r) => r.id === regionParam)) {
      setRegion(regionParam);
    }
  }, [regionParam]);

  const items = initialByRegion[region] ?? [];
  const selectedId = selected?.id ?? null;

  function handleSelect(a: AttractionResult) {
    setSelected(a);
  }

  const viewButtons: { id: ViewMode; label: string; icon: typeof Map }[] = [
    { id: "split", label: "지도+리스트", icon: LayoutGrid },
    { id: "map", label: "지도", icon: Map },
    { id: "list", label: "리스트", icon: List },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value as JapanRegionId);
            setSelected(null);
          }}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm sm:max-w-xs"
        >
          {JAPAN_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>

        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {viewButtons.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition sm:flex-none sm:text-sm ${
                view === id ? "bg-rose-600 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {items.length}곳 추출 · 지도 마커 또는 리스트 항목을 누르면 상세 정보를 볼 수 있습니다.
      </p>

      {items.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">이 지역 관광지가 없습니다.</p>
      ) : view === "list" ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <li key={a.id}>
              <AttractionCard attraction={a} onSelect={() => handleSelect(a)} />
            </li>
          ))}
        </ul>
      ) : view === "map" ? (
        <AttractionMap
          items={items}
          region={region}
          selectedId={selectedId}
          onSelect={handleSelect}
          className="h-[min(70vh,560px)]"
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-stretch">
          <AttractionMap
            items={items}
            region={region}
            selectedId={selectedId}
            onSelect={handleSelect}
            className="h-[min(50vh,480px)] lg:h-auto lg:min-h-[480px]"
          />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-3 py-2.5">
              <h2 className="text-sm font-semibold text-slate-800">관광지 목록</h2>
            </div>
            <div className="max-h-[min(50vh,480px)] overflow-y-auto lg:max-h-[480px]">
              <AttractionListRows
                items={items}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      )}

      <AttractionDetailModal attraction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
