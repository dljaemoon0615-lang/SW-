import { APP_NAME } from "@/shared/lib/constants";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

function emailFrom(): string {
  return process.env.EMAIL_FROM ?? `${APP_NAME} <onboarding@resend.dev>`;
}
async function sendViaResend(input: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: emailFrom(),
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    let message = body;
    try {
      const parsed = JSON.parse(body) as { message?: string };
      if (parsed.message) message = parsed.message;
    } catch {
      /* keep raw body */
    }
    const err = new Error(`Resend error ${res.status}: ${message}`) as Error & {
      resendStatus?: number;
      resendMessage?: string;
    };
    err.resendStatus = res.status;
    err.resendMessage = message;
    throw err;
  }
}

export class ResendTestModeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResendTestModeError";
  }
}

function isResendTestModeError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message.toLowerCase();
  return msg.includes("only send testing emails") || msg.includes("verify a domain");
}

/** Resend API 또는 개발 환경 콘솔로 메일 발송 */
export async function sendEmail(input: SendEmailInput): Promise<{ delivered: boolean }> {
  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend(input);
      return { delivered: true };
    } catch (err) {
      if (process.env.NODE_ENV === "development" && isResendTestModeError(err)) {
        console.info("[email:dev-fallback]", {
          to: input.to,
          subject: input.subject,
          text: input.text ?? input.html.replace(/<[^>]+>/g, " "),
          reason: "Resend 테스트 모드 — 등록 이메일 외 수신 불가. 위 링크를 사용하세요.",
        });
        return { delivered: false };
      }
      if (isResendTestModeError(err)) {
        throw new ResendTestModeError(
          "메일 서버가 테스트 모드입니다. Resend에 가입한 이메일로만 발송할 수 있습니다. 도메인 인증 후 다른 주소로도 발송 가능합니다.",
        );
      }
      throw err;
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[email:dev]", {
      to: input.to,
      subject: input.subject,
      text: input.text ?? input.html.replace(/<[^>]+>/g, " "),
    });
    return { delivered: false };
  }

  throw new Error(
    "메일 발송이 설정되지 않았습니다. RESEND_API_KEY와 EMAIL_FROM을 .env에 추가하세요.",
  );
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY) || process.env.NODE_ENV === "development";
}
