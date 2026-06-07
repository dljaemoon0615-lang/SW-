import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { assertTripOwner } from "@/features/trips/server/trip-access";
import { prisma } from "@/server/db/prisma";

/** @deprecated /api/trips/[id]/collaborators POST 사용 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, role = "EDITOR" } = await req.json();
  const { id: tripId } = await params;

  const isOwner = await assertTripOwner(session.user.id, tripId);
  if (!isOwner) return NextResponse.json({ error: "일정 소유자만 초대할 수 있습니다." }, { status: 403 });

  const user = await prisma.user.findFirst({
    where: { email: { equals: String(email).trim(), mode: "insensitive" } },
  });
  if (!user) return NextResponse.json({ error: "해당 이메일의 회원을 찾을 수 없습니다." }, { status: 404 });

  const trip = await prisma.trip.findUnique({ where: { id: tripId }, select: { userId: true } });
  if (trip?.userId === user.id) {
    return NextResponse.json({ error: "일정 소유자는 초대할 수 없습니다." }, { status: 400 });
  }

  await prisma.tripCollaborator.upsert({
    where: { tripId_userId: { tripId, userId: user.id } },
    create: { tripId, userId: user.id, role: role === "VIEWER" ? "VIEWER" : "EDITOR" },
    update: { role: role === "VIEWER" ? "VIEWER" : "EDITOR" },
  });

  return NextResponse.json({ ok: true });
}
