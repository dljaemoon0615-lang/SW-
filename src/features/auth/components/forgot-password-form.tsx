"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setResetUrl("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "요청에 실패했습니다.");
      return;
    }
    if (data.kind === "oauth") {
      setMessage(data.message);
      return;
    }
    if (data.kind === "dev_fallback") {
      setMessage(data.message);
      setResetUrl(data.resetUrl ?? "");
      return;
    }
    setMessage(data.message ?? "이메일을 확인해 주세요.");
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        이메일·비밀번호로 가입한 계정만 재설정할 수 있습니다. Google·카카오로만 가입했다면 해당
        방법으로 로그인해 주세요.
      </p>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="가입한 이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
        />
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        {message ? (
          <p
            className={`text-sm ${
              message.includes("소셜") ? "text-amber-800" : "text-emerald-700"
            }`}
          >
            {message}
          </p>
        ) : null}
        {resetUrl ? (
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 space-y-2">
            <p className="text-xs font-medium text-sky-900">개발용 재설정 링크</p>
            <Link
              href={resetUrl}
              className="inline-flex w-full items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
            >
              비밀번호 재설정 페이지로 이동
            </Link>
            <p className="break-all text-[11px] text-sky-800/80">{resetUrl}</p>
          </div>
        ) : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "발송 중..." : "재설정 링크 보내기"}
        </Button>
      </form>
      <p className="text-center text-sm">
        <Link href="/login" className="text-rose-600">
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  );
}
