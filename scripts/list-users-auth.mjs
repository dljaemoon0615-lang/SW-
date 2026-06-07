import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = await prisma.user.findMany({
  select: { email: true, passwordHash: true, accounts: { select: { provider: true } } },
  take: 20,
});

console.log("\n=== 가입 계정 (비밀번호 재설정 가능 여부) ===\n");
for (const u of users) {
  const providers = u.accounts.map((a) => a.provider).join(", ") || "(없음)";
  console.log({
    email: u.email,
    passwordSignup: Boolean(u.passwordHash),
    providers,
  });
}

await prisma.$disconnect();
