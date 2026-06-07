import { NextResponse } from "next/server";
import { z } from "zod";
import { resetPasswordWithToken } from "@/features/auth/server/password-reset";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const result = await resetPasswordWithToken(body.token, body.password);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "비밀번호 변경에 실패했습니다." }, { status: 500 });
  }
}
