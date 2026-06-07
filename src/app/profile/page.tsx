import { redirect } from "next/navigation";
import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { auth } from "@/auth";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { DeleteAccountSection } from "@/features/profile/components/delete-account-button";
import { prisma } from "@/server/db/prisma";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      passwordHash: true,
      accounts: { select: { provider: true } },
    },
  });

  const hasPassword = Boolean(user?.passwordHash);
  const oauthProviders =
    user?.accounts.map((a) => a.provider).filter((p) => p !== "credentials") ?? [];

  return (
    <AppShell title="마이페이지">
      <Card className="mb-4">
        <p className="text-sm text-slate-500">로그인 계정</p>
        <p className="font-medium">{session.user.email}</p>
        <p className="text-sm">{session.user.name}</p>
      </Card>
      <ProfileForm />
      <div className="mt-4">
        <SignOutButton />
      </div>
      <DeleteAccountSection hasPassword={hasPassword} oauthProviders={oauthProviders} />
    </AppShell>
  );
}
