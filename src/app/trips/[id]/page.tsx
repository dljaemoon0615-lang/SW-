import { notFound } from "next/navigation";
import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { TripActions } from "@/features/trips/components/trip-actions";

export const dynamic = "force-dynamic";

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  const trip = await prisma.trip.findFirst({
    where: {
      id,
      OR: [
        { userId: session?.user?.id },
        { collaborators: { some: { userId: session?.user?.id } } },
      ],
    },
    include: { days: { include: { items: true }, orderBy: { dayIndex: "asc" } } },
  });

  if (!trip) notFound();

  return (
    <AppShell title={trip.title}>
      <TripActions tripId={trip.id} shareToken={trip.shareToken} />
      <ul className="mt-4 space-y-3">
        {trip.days.map((day) => (
          <li key={day.id}>
            <Card>
              <h3 className="font-semibold">{day.dayIndex + 1}일차</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {day.items.map((item) => (
                  <li key={item.id}>
                    {item.startTime ? `${item.startTime} · ` : ""}
                    {item.placeName}
                    {item.transport ? ` (${item.transport})` : ""}
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
