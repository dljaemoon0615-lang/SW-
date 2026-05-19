import { notFound } from "next/navigation";
import { Card } from "@/shared/ui/card";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";

export default async function SharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const trip = await prisma.trip.findUnique({
    where: { shareToken: token },
    include: { days: { include: { items: true }, orderBy: { dayIndex: "asc" } } },
  });

  if (!trip) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-4 p-4">
      <h1 className="text-2xl font-bold">{trip.title}</h1>
      <p className="text-sm text-slate-500">공유된 여행 일정</p>
      {trip.days.map((day) => (
        <Card key={day.id}>
          <h2 className="font-semibold">{day.dayIndex + 1}일차</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {day.items.map((item) => (
              <li key={item.id}>
                {item.placeName}
                {item.startTime ? ` · ${item.startTime}` : ""}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
