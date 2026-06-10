import Link from "next/link";
import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { JAPAN_REGIONS } from "@/shared/lib/constants";
import { TripCard } from "@/features/trips/components/trip-card";

export const dynamic = "force-dynamic";

export default async function TripsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const trips = userId
    ? await prisma.trip.findMany({
        where: {
          OR: [{ userId }, { collaborators: { some: { userId } } }],
        },
        orderBy: { updatedAt: "desc" },
        include: {
          days: {
            include: { items: { select: { placeName: true } } },
            orderBy: { dayIndex: "asc" },
          },
        },
      })
    : [];

  const owned = trips.filter((t) => t.userId === userId);
  const shared = trips.filter((t) => t.userId !== userId);

  return (
    <AppShell title="내 일정">
      <p className="mb-4 text-center text-sm text-slate-500">
        내가 만든 일정과 동행자로 참여한 일정을 확인할 수 있습니다
      </p>
      <Link
        href="/planner"
        className="mb-6 block rounded-xl border border-dashed border-brand/30 bg-[var(--primary-light)] py-3 text-center text-sm font-medium text-brand transition hover:bg-[var(--primary-light)]"
      >
        + 새 일정 만들기
      </Link>
      {trips.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-500">저장된 일정이 없습니다. 플래너에서 일정을 생성해 보세요.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {owned.length > 0 ? (
            <section>
              <h2 className="mb-3 text-sm font-semibold text-slate-700">내가 만든 일정</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {owned.map((trip) => {
                  const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
                  return (
                    <li key={trip.id}>
                      <TripCard
                        id={trip.id}
                        title={trip.title}
                        region={trip.region}
                        regionLabel={region?.label ?? trip.region}
                        startDate={trip.startDate}
                        endDate={trip.endDate}
                        days={trip.days}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
          {shared.length > 0 ? (
            <section>
              <h2 className="mb-3 text-sm font-semibold text-slate-700">동행 중인 일정</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {shared.map((trip) => {
                  const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
                  return (
                    <li key={trip.id}>
                      <TripCard
                        id={trip.id}
                        title={trip.title}
                        region={trip.region}
                        regionLabel={region?.label ?? trip.region}
                        startDate={trip.startDate}
                        endDate={trip.endDate}
                        days={trip.days}
                        badge="동행"
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </AppShell>
  );
}
