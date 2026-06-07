import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { APP_NAME, APP_TAGLINE } from "@/shared/lib/constants";
import { sendEmail } from "@/server/email/send-email";
import { prisma } from "@/server/db/prisma";

const RESET_PREFIX = "password-reset:";
const TOKEN_TTL_MS = 60 * 60 * 1000; // 1시간

function resetIdentifier(email: string) {
  return `${RESET_PREFIX}${email.toLowerCase()}`;
}

function appOrigin(): string {
  return (process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

export type PasswordResetResult =
  | { status: "sent" }
  | { status: "dev_fallback"; resetUrl?: string }
  | { status: "skipped_oauth" }
  | { status: "skipped_unknown" };

export async function requestPasswordReset(email: string): Promise<PasswordResetResult> {
  const normalized = email.trim().toLowerCase();
  const user = await prisma.user.findFirst({
    where: { email: { equals: normalized, mode: "insensitive" } },
    select: { id: true, passwordHash: true, email: true },
  });

  if (!user?.email) {
    return { status: "skipped_unknown" };
  }

  if (!user.passwordHash) {
    return { status: "skipped_oauth" };
  }

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_TTL_MS);
  const identifier = resetIdentifier(user.email.toLowerCase());

  await prisma.verificationToken.deleteMany({ where: { identifier } });
  await prisma.verificationToken.create({
    data: { identifier, token, expires },
  });

  const resetUrl = `${appOrigin()}/reset-password?token=${encodeURIComponent(token)}`;
  const subject = `[${APP_NAME}] 비밀번호 재설정`;
  const text = `비밀번호를 재설정하려면 아래 링크를 열어주세요 (1시간 유효):\n\n${resetUrl}`;
  const html = `
    <p>안녕하세요, ${APP_NAME}(${APP_TAGLINE})입니다.</p>
    <p>비밀번호 재설정을 요청하셨습니다. 아래 버튼을 눌러 새 비밀번호를 설정해 주세요.</p>
    <p><a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:linear-gradient(135deg,#7BA7E8,#9B8FE8);color:#fff;text-decoration:none;border-radius:999px;font-weight:700;">비밀번호 재설정</a></p>
    <p style="color:#64748b;font-size:13px;">링크는 1시간 동안만 유효합니다. 요청하지 않으셨다면 이 메일을 무시하세요.</p>
    <p style="color:#94a3b8;font-size:12px;">${resetUrl}</p>
  `.trim();

  if (process.env.NODE_ENV === "development") {
    console.info("[password-reset]", { to: user.email, resetUrl });
  }

  const { delivered } = await sendEmail({ to: user.email, subject, html, text });
  if (delivered) return { status: "sent" };
  return {
    status: "dev_fallback",
    resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined,
  };
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || !record.identifier.startsWith(RESET_PREFIX)) {
    return { ok: false, error: "유효하지 않거나 만료된 링크입니다." };
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } }).catch(() => undefined);
    return { ok: false, error: "링크가 만료되었습니다. 비밀번호 찾기를 다시 시도해 주세요." };
  }

  const email = record.identifier.slice(RESET_PREFIX.length);
  const user = await prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
    select: { id: true, passwordHash: true },
  });

  if (!user?.passwordHash) {
    return { ok: false, error: "비밀번호로 가입한 계정이 아닙니다." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
    prisma.verificationToken.delete({ where: { token } }),
  ]);

  return { ok: true };
}
