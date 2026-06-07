import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { assertTripOwner } from "@/features/trips/server/trip-access";
import { prisma } from "@/server/db/prisma";
import { randomBytes } from "crypto";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const isOwner = await assertTripOwner(session.user.id, id);
  if (!isOwner) return NextResponse.json({ error: "일정 소유자만 공유 링크를 만들 수 있습니다." }, { status: 403 });

  const existing = await prisma.trip.findUnique({
    where: { id },
    select: { shareToken: true },
  });
  const token = existing?.shareToken ?? randomBytes(16).toString("hex");

  if (!existing?.shareToken) {
    await prisma.trip.update({ where: { id }, data: { shareToken: token } });
  }

  return NextResponse.json({ shareToken: token });
}
