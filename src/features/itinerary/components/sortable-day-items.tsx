"use client";

import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Card } from "@/shared/ui/card";
import type { JapanRegionId } from "@/shared/lib/constants";
import { resolvePlaceImage } from "@/features/trips/server/trip-images";
import { Clock, GripVertical, Train } from "lucide-react";
import { useState } from "react";

export type SortablePlaceItem = {
  id: string;
  placeName: string;
  startTime?: string | null;
  endTime?: string | null;
  transport?: string | null;
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20";

function stopDragPointer(e: React.PointerEvent) {
  e.stopPropagation();
}

function ItemRowContent({
  item,
  region,
  dragHandle,
  elevated,
  editable,
  onPatch,
}: {
  item: SortablePlaceItem;
  region?: JapanRegionId;
  dragHandle?: React.ReactNode;
  elevated?: boolean;
  editable?: boolean;
  onPatch?: (patch: Partial<Pick<SortablePlaceItem, "startTime" | "endTime" | "transport">>) => void;
}) {
  const thumb = region ? resolvePlaceImage(item.placeName, region) : null;

  return (
    <Card
      className={`mb-2 flex items-start gap-2 !py-2.5 ${elevated ? "shadow-lg ring-2 ring-brand/40" : ""}`}
    >
      {dragHandle}
      {thumb ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image src={thumb} alt="" fill className="object-cover" sizes="56px" />
        </div>
      ) : null}
      <div className="min-w-0 flex-1 space-y-2">
        <p className="text-sm font-medium text-slate-900">{item.placeName}</p>

        {editable && onPatch ? (
          <>
            <div className="flex items-center gap-2">
              <Clock size={14} className="shrink-0 text-slate-400" aria-hidden />
              <input
                type="time"
                value={item.startTime ?? ""}
                onChange={(e) => onPatch({ startTime: e.target.value || null })}
                onPointerDown={stopDragPointer}
                className={`${inputClass} flex-1`}
                aria-label={`${item.placeName} 시작 시간`}
              />
              <span className="text-xs text-slate-400">~</span>
              <input
                type="time"
                value={item.endTime ?? ""}
                onChange={(e) => onPatch({ endTime: e.target.value || null })}
                onPointerDown={stopDragPointer}
                className={`${inputClass} flex-1`}
                aria-label={`${item.placeName} 종료 시간`}
              />
            </div>
            <div className="flex items-center gap-2">
              <Train size={14} className="shrink-0 text-slate-400" aria-hidden />
              <input
                type="text"
                value={item.transport ?? ""}
                onChange={(e) => onPatch({ transport: e.target.value || null })}
                onPointerDown={stopDragPointer}
                placeholder="이동 수단 (예: 지하철, 도보, 택시)"
                className={inputClass}
                aria-label={`${item.placeName} 이동 수단`}
              />
            </div>
          </>
        ) : (
          <>
            {item.startTime || item.endTime ? (
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} />
                {item.startTime ?? "—"}
                {item.endTime ? ` – ${item.endTime}` : ""}
              </p>
            ) : null}
            {item.transport ? (
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <Train size={12} />
                {item.transport}
              </p>
            ) : null}
          </>
        )}
      </div>
    </Card>
  );
}

function SortableRow({
  item,
  dragHandleLabel,
  region,
  editable,
  onPatch,
}: {
  item: SortablePlaceItem;
  dragHandleLabel: string;
  region?: JapanRegionId;
  editable?: boolean;
  onPatch?: (patch: Partial<Pick<SortablePlaceItem, "startTime" | "endTime" | "transport">>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <li ref={setNodeRef} style={style} className="list-none">
      <ItemRowContent
        item={item}
        region={region}
        editable={editable}
        onPatch={onPatch}
        dragHandle={
          <button
            type="button"
            className="touch-none shrink-0 cursor-grab rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing active:bg-slate-200"
            aria-label={dragHandleLabel}
            {...attributes}
            {...listeners}
          >
            <GripVertical size={20} />
          </button>
        }
      />
    </li>
  );
}

type Props = {
  items: SortablePlaceItem[];
  /** 순서·시간·이동 수단 변경 시 호출 */
  onChange: (items: SortablePlaceItem[]) => void;
  emptyMessage?: string;
  region?: JapanRegionId;
  /** true면 시간·이동 수단 입력 필드 표시 */
  editable?: boolean;
};

/** 하루 일정 안의 관광지 순서·시간·이동 수단 편집 */
export function SortableDayItems({
  items,
  onChange,
  emptyMessage = "등록된 장소가 없습니다.",
  region,
  editable = false,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = activeId ? items.find((it) => it.id === activeId) : null;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function patchItem(
    itemId: string,
    patch: Partial<Pick<SortablePlaceItem, "startTime" | "endTime" | "transport">>,
  ) {
    onChange(items.map((it) => (it.id === itemId ? { ...it, ...patch } : it)));
  }

  function onDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((it) => it.id === active.id);
    const newIndex = items.findIndex((it) => it.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onChange(arrayMove(items, oldIndex, newIndex));
  }

  if (items.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={items.map((it) => it.id)} strategy={verticalListSortingStrategy}>
        <ul className="m-0 p-0">
          {items.map((item) => (
            <SortableRow
              key={item.id}
              item={item}
              region={region}
              editable={editable}
              onPatch={(patch) => patchItem(item.id, patch)}
              dragHandleLabel={`${item.placeName} 순서 변경`}
            />
          ))}
        </ul>
      </SortableContext>
      <DragOverlay dropAnimation={{ duration: 180 }}>
        {activeItem ? (
          <div className="w-[min(100vw-2rem,420px)]">
            <ItemRowContent
              item={activeItem}
              region={region}
              elevated
              dragHandle={
                <span className="shrink-0 rounded-lg p-1.5 text-slate-400">
                  <GripVertical size={20} />
                </span>
              }
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
