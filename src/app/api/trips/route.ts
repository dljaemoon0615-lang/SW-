import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { JAPAN_REGIONS, type JapanRegionId } from "@/shared/lib/constants";
import { getTripCoverImage, getTripGalleryImages } from "@/features/trips/server/trip-images";

type CreateTripItem = {
  placeName: string;
  startTime?: string | null;
  endTime?: string | null;
  transport?: string | null;
  placeId?: string | null;
};

type CreateTripDay = {
  dayIndex: number;
  date: string;
  items?: CreateTripItem[];
};

type CreateTripBody = {
  title?: string;
  region: JapanRegionId;
  startDate: string;
  endDate: string;
  totalBudget?: number;
  days?: CreateTripDay[];
};

function parseRegion(value: unknown): JapanRegionId | null {
  if (typeof value !== "string") return null;
  return JAPAN_REGIONS.some((r) => r.id === value) ? (value as JapanRegionId) : null;
}

function parseDate(value: string): Date | null {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      days: {
        orderBy: { dayIndex: "asc" },
        include: { items: { select: { placeName: true } } },
      },
    },
  });

  return NextResponse.json({
    trips: trips.map((trip) => {
      const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
      const tripLike = { region: trip.region, days: trip.days };
      const coverImage = getTripCoverImage(tripLike);
      const galleryImages = getTripGalleryImages(tripLike, 4);

      return {
        id: trip.id,
        title: trip.title,
        region: trip.region,
        regionLabel: region?.label ?? trip.region,
        startDate: trip.startDate.toISOString(),
        endDate: trip.endDate.toISOString(),
        totalBudget: trip.totalBudget,
        dayCount: trip.days.length,
        itemCount: trip.days.reduce((n, d) => n + d.items.length, 0),
        coverImage,
        galleryImages,
      };
    }),
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = (await req.json()) as CreateTripBody;
  const region = parseRegion(body.region);
  if (!region) {
    return NextResponse.json({ error: "유효하지 않은 지역입니다." }, { status: 400 });
  }

  const startDate = parseDate(body.startDate);
  const endDate = parseDate(body.endDate);
  if (!startDate || !endDate || endDate < startDate) {
    return NextResponse.json({ error: "유효하지 않은 여행 기간입니다." }, { status: 400 });
  }

  const regionLabel = JAPAN_REGIONS.find((r) => r.id === region)?.label ?? region;
  const title = body.title?.trim() || `${regionLabel} 여행`;
  const totalBudget =
    body.totalBudget != null && Number(body.totalBudget) > 0
      ? Math.round(Number(body.totalBudget))
      : null;
  const days = Array.isArray(body.days) ? body.days : [];

  const trip = await prisma.trip.create({
    data: {
      userId: session.user.id,
      title,
      region,
      startDate,
      endDate,
      totalBudget,
      days: {
        create: days.map((day) => ({
          dayIndex: day.dayIndex,
          date: parseDate(day.date) ?? startDate,
          items: {
            create: (day.items ?? []).map((item, index) => ({
              sortOrder: index,
              placeName: item.placeName,
              startTime: item.startTime?.slice(0, 5) ?? null,
              endTime: item.endTime?.slice(0, 5) ?? null,
              transport: item.transport?.trim() || null,
              placeId: item.placeId ?? null,
            })),
          },
        })),
      },
    },
    select: { id: true, title: true },
  });

  return NextResponse.json({ id: trip.id, title: trip.title });
}
