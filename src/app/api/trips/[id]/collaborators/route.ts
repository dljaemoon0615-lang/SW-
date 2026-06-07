import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { assertTripOwner, getTripAccess } from "@/features/trips/server/trip-access";
import { prisma } from "@/server/db/prisma";
import type { CollaboratorRole } from "@prisma/client";

const inviteSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해 주세요."),
  role: z.enum(["EDITOR", "VIEWER"]).default("EDITOR"),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const access = await getTripAccess(session.user.id, id);
  if (!access) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    members: access.members.map((m) => ({
      ...m,
      invitedAt: m.invitedAt.toISOString(),
    })),
    role: access.role,
    canManageCollaborators: access.canManageCollaborators,
    canEdit: access.canEdit,
  });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: tripId } = await params;
  const isOwner = await assertTripOwner(session.user.id, tripId);
  if (!isOwner) return NextResponse.json({ error: "일정 소유자만 초대할 수 있습니다." }, { status: 403 });

  try {
    const body = inviteSchema.parse(await req.json());
    const normalized = body.email.trim().toLowerCase();

    const invitee = await prisma.user.findFirst({
      where: { email: { equals: normalized, mode: "insensitive" } },
      select: { id: true, email: true, name: true },
    });
    if (!invitee) {
      return NextResponse.json(
        { error: "해당 이메일로 가입한 회원이 없습니다. 회원가입 후 다시 초대해 주세요." },
        { status: 404 },
      );
    }

    const trip = await prisma.trip.findUnique({ where: { id: tripId }, select: { userId: true } });
    if (trip?.userId === invitee.id) {
      return NextResponse.json({ error: "일정 소유자는 초대할 수 없습니다." }, { status: 400 });
    }

    await prisma.tripCollaborator.upsert({
      where: { tripId_userId: { tripId, userId: invitee.id } },
      create: {
        tripId,
        userId: invitee.id,
        role: body.role as CollaboratorRole,
      },
      update: { role: body.role as CollaboratorRole },
    });

    return NextResponse.json({
      ok: true,
      message: `${invitee.name ?? invitee.email}님을 동행자로 추가했습니다.`,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "초대 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: tripId } = await params;
  const isOwner = await assertTripOwner(session.user.id, tripId);
  if (!isOwner) return NextResponse.json({ error: "일정 소유자만 내보낼 수 있습니다." }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId가 필요합니다." }, { status: 400 });

  await prisma.tripCollaborator.deleteMany({ where: { tripId, userId } });
  return NextResponse.json({ ok: true });
}
