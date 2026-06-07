import { AppShell } from "@/shared/layout/app-shell";
import { Card } from "@/shared/ui/card";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AppShell title="비밀번호 찾기">
      <Card>
        <ForgotPasswordForm />
      </Card>
    </AppShell>
  );
}
