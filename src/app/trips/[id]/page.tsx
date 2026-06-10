import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { auth } from "@/auth";
import { AppShell } from "@/shared/layout/app-shell";
import { JAPAN_REGIONS } from "@/shared/lib/constants";
import { getTripAccess } from "@/features/trips/server/trip-access";
import { TripItineraryGallery } from "@/features/trips/components/trip-itinerary-gallery";
import { TripItineraryEditor } from "@/features/trips/components/trip-itinerary-editor";
import {
  TripCollaboratorPanel,
  type CollaboratorMember,
} from "@/features/trips/components/trip-collaborator-panel";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect(`/login?callbackUrl=/trips/${id}`);

  const access = await getTripAccess(session.user.id, id);
  if (!access) notFound();

  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      days: {
        orderBy: { dayIndex: "asc" },
        include: { items: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  if (!trip) notFound();

  const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
  const initialMembers: CollaboratorMember[] = access.members.map((m) => ({
    ...m,
    invitedAt: m.invitedAt.toISOString(),
  }));

  return (
    <AppShell>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {region?.label ?? trip.region}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">{trip.title}</h1>
        <p className="mt-1 text-sm text-slate-600">
          {format(trip.startDate, "yyyy.MM.dd")} – {format(trip.endDate, "yyyy.MM.dd")}
          {trip.totalBudget ? (
            <span className="ml-2 text-brand">· 예산 {trip.totalBudget.toLocaleString()}원</span>
          ) : null}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href={`/attractions?region=${trip.region}`}
            className="rounded-full border border-brand/30 bg-[var(--primary-light)] px-3 py-1 text-xs font-medium text-brand"
          >
            관광지
          </Link>
          <Link
            href={`/stays?region=${trip.region}`}
            className="rounded-full border border-brand/30 bg-[var(--primary-light)] px-3 py-1 text-xs font-medium text-brand"
          >
            숙박
          </Link>
          <Link
            href={`/restaurants?region=${trip.region}`}
            className="rounded-full border border-brand/30 bg-[var(--primary-light)] px-3 py-1 text-xs font-medium text-brand"
          >
            맛집
          </Link>
          <Link
            href="/budget"
            className="rounded-full border border-brand/30 bg-[var(--primary-light)] px-3 py-1 text-xs font-medium text-brand"
          >
            예산
          </Link>
        </div>
      </header>

      {access.canEdit ? (
        <TripItineraryEditor tripId={trip.id} region={trip.region} days={trip.days} />
      ) : (
        <TripItineraryGallery
          title={trip.title}
          region={trip.region}
          regionLabel={region?.label}
          startDate={trip.startDate}
          endDate={trip.endDate}
          days={trip.days}
          headerExtra={
            access.role !== "OWNER" ? (
              <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-800">
                동행 일정 · 보기만
              </span>
            ) : null
          }
        />
      )}

      <div className="mt-8">
        <TripCollaboratorPanel
          tripId={trip.id}
          shareToken={trip.shareToken}
          canManageCollaborators={access.canManageCollaborators}
          initialMembers={initialMembers}
        />
      </div>
    </AppShell>
  );
}
