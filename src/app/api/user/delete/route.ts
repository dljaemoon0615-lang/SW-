import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/server/db/prisma";

const schema = z.object({
  password: z.string().optional(),
  confirm: z.literal("탈퇴"),
});

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "확인 문구를 정확히 입력해 주세요." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true },
  });

  if (!user) {
    return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 404 });
  }

  if (user.passwordHash) {
    if (!body.password) {
      return NextResponse.json({ error: "비밀번호를 입력해 주세요." }, { status: 400 });
    }
    const valid = await bcrypt.compare(body.password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }
  }

  await prisma.user.delete({ where: { id: session.user.id } });
  return NextResponse.json({ ok: true });
}
