import { notFound } from "next/navigation";
import Image from "next/image";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";
import { JAPAN_REGIONS } from "@/shared/lib/constants";
import { BrandLogo } from "@/shared/ui/brand-logo";
import { TripItineraryGallery } from "@/features/trips/components/trip-itinerary-gallery";
import { ShareJoinBanner } from "@/features/trips/components/share-join-banner";
import { getTripCoverImage } from "@/features/trips/server/trip-images";

export const dynamic = "force-dynamic";

export default async function SharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const session = await auth();

  const trip = await prisma.trip.findUnique({
    where: { shareToken: token },
    include: {
      days: { include: { items: true }, orderBy: { dayIndex: "asc" } },
      ...(session?.user?.id
        ? {
            collaborators: {
              where: { userId: session.user.id },
              select: { userId: true },
            },
          }
        : {}),
    },
  });

  if (!trip) notFound();

  const region = JAPAN_REGIONS.find((r) => r.id === trip.region);
  const hero = getTripCoverImage({ region: trip.region, days: trip.days });
  const isOwner = session?.user?.id === trip.userId;
  const isCollaborator = Boolean(
    session?.user?.id &&
      "collaborators" in trip &&
      Array.isArray(trip.collaborators) &&
      trip.collaborators.length > 0,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="relative h-28 overflow-hidden sm:h-36">
        <Image src={hero} alt="" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative flex h-full flex-col justify-end gap-1 px-4 pb-4 sm:px-6">
          <BrandLogo variant="compact" href="/" className="[&_.brand-logo-en]:!text-white [&_.brand-logo-kr]:hidden" />
          <p className="text-lg font-bold text-white">공유된 여행 일정</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <ShareJoinBanner
          shareToken={token}
          tripId={trip.id}
          isLoggedIn={Boolean(session?.user)}
          isOwner={isOwner}
          isCollaborator={isCollaborator}
        />
        <TripItineraryGallery
          title={trip.title}
          region={trip.region}
          regionLabel={region?.label}
          startDate={trip.startDate}
          endDate={trip.endDate}
          days={trip.days}
        />
      </main>
    </div>
  );
}
