import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getEditableTrip } from "@/features/trips/server/trip-access";
import { prisma } from "@/server/db/prisma";

type TripItemPatch = {
  id: string;
  sortOrder: number;
  startTime?: string | null;
  endTime?: string | null;
  transport?: string | null;
};

type PatchBody = {
  days: { dayId: string; items: TripItemPatch[] }[];
};

function normalizeTime(value: string | null | undefined): string | null {
  if (value == null || value === "") return null;
  return value.slice(0, 5);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: tripId } = await params;
  const trip = await getEditableTrip(session.user.id, tripId);
  if (!trip) {
    return NextResponse.json({ error: "편집 권한이 없습니다." }, { status: 403 });
  }

  const { days } = (await req.json()) as PatchBody;
  if (!Array.isArray(days)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const dayById = new Map(trip.days.map((d) => [d.id, d]));
  const updates: ReturnType<typeof prisma.tripItem.update>[] = [];

  for (const { dayId, items } of days) {
    const day = dayById.get(dayId);
    if (!day || !Array.isArray(items)) continue;

    const validIds = new Set(day.items.map((it) => it.id));

    for (const row of items) {
      if (!validIds.has(row.id)) continue;
      updates.push(
        prisma.tripItem.update({
          where: { id: row.id },
          data: {
            sortOrder: row.sortOrder,
            startTime: normalizeTime(row.startTime),
            endTime: normalizeTime(row.endTime),
            transport: row.transport?.trim() || null,
          },
        }),
      );
    }
  }

  if (updates.length) {
    await prisma.$transaction(updates);
  }

  return NextResponse.json({ ok: true });
}
