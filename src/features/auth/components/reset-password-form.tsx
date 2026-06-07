"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("유효하지 않은 링크입니다. 비밀번호 찾기를 다시 시도해 주세요.");
      return;
    }
    if (password !== confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "비밀번호 변경에 실패했습니다.");
      return;
    }
    router.push("/login?reset=1");
  }

  if (!token) {
    return (
      <div className="space-y-3 text-sm text-slate-600">
        <p>재설정 링크가 올바르지 않습니다.</p>
        <Link href="/forgot-password" className="font-medium text-rose-600">
          비밀번호 찾기 다시 하기
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="password"
        required
        minLength={8}
        placeholder="새 비밀번호 (8자 이상)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
      <input
        type="password"
        required
        minLength={8}
        placeholder="새 비밀번호 확인"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "변경 중..." : "비밀번호 변경"}
      </Button>
    </form>
  );
}
