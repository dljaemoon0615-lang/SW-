import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";

const schema = z.object({
  shareToken: z.string().min(1),
});

/** 공유 링크로 로그인한 사용자가 동행자(편집자)로 참여 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const { shareToken } = schema.parse(await req.json());
    const trip = await prisma.trip.findUnique({
      where: { shareToken },
      select: { id: true, userId: true, title: true },
    });
    if (!trip) return NextResponse.json({ error: "유효하지 않은 공유 링크입니다." }, { status: 404 });

    if (trip.userId === session.user.id) {
      return NextResponse.json({ ok: true, tripId: trip.id, message: "내 일정입니다." });
    }

    await prisma.tripCollaborator.upsert({
      where: { tripId_userId: { tripId: trip.id, userId: session.user.id } },
      create: { tripId: trip.id, userId: session.user.id, role: "EDITOR" },
      update: {},
    });

    return NextResponse.json({
      ok: true,
      tripId: trip.id,
      message: `「${trip.title}」 일정에 동행자로 참여했습니다. 함께 편집할 수 있습니다.`,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "참여 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
