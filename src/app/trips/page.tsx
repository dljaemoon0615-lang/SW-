import Link from "next/link";
import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { JAPAN_REGIONS } from "@/shared/lib/constants";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function TripsPage() {
  const session = await auth();
  const trips = session?.user?.id
    ? await prisma.trip.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  return (
    <AppShell title="내 일정">
      <Link href="/planner" className="mb-4 block text-center text-sm text-rose-600">
        + 새 일정 만들기
      </Link>
      <ul className="space-y-3">
        {trips.length === 0 ? (
          <Card>
            <p className="text-sm text-slate-500">저장된 일정이 없습니다. 플래너에서 일정을 생성해 보세요.</p>
          </Card>
        ) : (
          trips.map((trip) => {
            const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
            return (
              <li key={trip.id}>
                <Link href={`/trips/${trip.id}`}>
                  <Card className="hover:border-rose-200">
                    <p className="font-semibold">{trip.title}</p>
                    <p className="text-sm text-slate-500">
                      {region?.label} · {format(trip.startDate, "yyyy.MM.dd")} -{" "}
                      {format(trip.endDate, "yyyy.MM.dd")}
                    </p>
                  </Card>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </AppShell>
  );
}
