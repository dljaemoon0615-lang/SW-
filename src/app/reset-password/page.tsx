import { Suspense } from "react";
import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AppShell title="비밀번호 재설정">
      <Card>
        <Suspense fallback={<p className="text-sm text-slate-500">불러오는 중...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </Card>
    </AppShell>
  );
}
