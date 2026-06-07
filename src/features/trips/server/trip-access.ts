import type { CollaboratorRole } from "@prisma/client";
import { prisma } from "@/server/db/prisma";

const userSelect = { id: true, name: true, email: true, image: true } as const;

export type TripMember = {
  userId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: CollaboratorRole;
  invitedAt: Date;
};

export type TripAccess = {
  tripId: string;
  ownerId: string;
  role: CollaboratorRole;
  canEdit: boolean;
  canManageCollaborators: boolean;
  members: TripMember[];
};

export async function getTripAccess(
  userId: string | undefined,
  tripId: string,
): Promise<TripAccess | null> {
  if (!userId) return null;

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      OR: [{ userId }, { collaborators: { some: { userId } } }],
    },
    select: {
      id: true,
      userId: true,
      user: { select: userSelect },
      collaborators: {
        include: { user: { select: userSelect } },
        orderBy: { invitedAt: "asc" },
      },
    },
  });

  if (!trip) return null;

  const isOwner = trip.userId === userId;
  const collab = trip.collaborators.find((c) => c.userId === userId);
  const role: CollaboratorRole = isOwner ? "OWNER" : (collab?.role ?? "VIEWER");

  const members: TripMember[] = [
    {
      userId: trip.user.id,
      name: trip.user.name,
      email: trip.user.email,
      image: trip.user.image,
      role: "OWNER",
      invitedAt: new Date(0),
    },
    ...trip.collaborators.map((c) => ({
      userId: c.user.id,
      name: c.user.name,
      email: c.user.email,
      image: c.user.image,
      role: c.role,
      invitedAt: c.invitedAt,
    })),
  ];

  return {
    tripId: trip.id,
    ownerId: trip.userId,
    role,
    canEdit: role === "OWNER" || role === "EDITOR",
    canManageCollaborators: isOwner,
    members,
  };
}

export async function getEditableTrip(userId: string, tripId: string) {
  const access = await getTripAccess(userId, tripId);
  if (!access?.canEdit) return null;

  return prisma.trip.findFirst({
    where: { id: tripId },
    include: {
      days: { include: { items: { select: { id: true } } } },
    },
  });
}

export async function assertTripOwner(userId: string, tripId: string) {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: { id: true },
  });
  return Boolean(trip);
}
