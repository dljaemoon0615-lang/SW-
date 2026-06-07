import { NextResponse } from "next/server";
import { z } from "zod";
import { requestPasswordReset } from "@/features/auth/server/password-reset";
import { isEmailConfigured, ResendTestModeError } from "@/server/email/send-email";

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력해 주세요."),
});

const GENERIC_MESSAGE =
  "등록된 이메일이면 비밀번호 재설정 링크를 보냈습니다. 메일함과 스팸함을 확인해 주세요.";

const OAUTH_MESSAGE =
  "이 이메일은 Google·카카오 등 소셜 로그인으로 가입된 계정입니다. 비밀번호 재설정 대신 해당 방법으로 로그인해 주세요.";

const DEV_FALLBACK_MESSAGE =
  "테스트 메일 서버 제한으로 이메일은 보내지 못했습니다. 아래 재설정 링크를 사용해 주세요.";

export async function POST(req: Request) {
  try {
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          error:
            "메일 발송이 설정되지 않았습니다. RESEND_API_KEY를 설정하거나 개발 환경에서 서버 콘솔의 링크를 확인하세요.",
        },
        { status: 503 },
      );
    }

    const body = schema.parse(await req.json());
    const result = await requestPasswordReset(body.email);

    if (result.status === "skipped_oauth") {
      return NextResponse.json({ ok: true, message: OAUTH_MESSAGE, kind: "oauth" });
    }

    if (result.status === "dev_fallback") {
      return NextResponse.json({
        ok: true,
        message: DEV_FALLBACK_MESSAGE,
        kind: "dev_fallback",
        resetUrl: result.resetUrl,
      });
    }

    return NextResponse.json({ ok: true, message: GENERIC_MESSAGE, kind: "sent" });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 });
    }
    if (e instanceof ResendTestModeError) {
      return NextResponse.json({ error: e.message }, { status: 503 });
    }
    console.error("[forgot-password]", e);
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
