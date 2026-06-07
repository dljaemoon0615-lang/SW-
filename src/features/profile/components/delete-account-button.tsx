"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

type DeleteAccountSectionProps = {
  hasPassword: boolean;
  oauthProviders: string[];
};

const PROVIDER_LABEL: Record<string, string> = {
  google: "Google",
  kakao: "카카오",
};

export function DeleteAccountSection({ hasPassword, oauthProviders }: DeleteAccountSectionProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    setError("");
    if (confirm !== "탈퇴") {
      setError('확인란에 "탈퇴"를 입력해 주세요.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: hasPassword ? password : undefined,
          confirm: "탈퇴",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "탈퇴 처리에 실패했습니다.");
        return;
      }
      await signOut({ callbackUrl: "/" });
    } finally {
      setLoading(false);
    }
  }

  const oauthLabel = oauthProviders
    .map((p) => PROVIDER_LABEL[p] ?? p)
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="mt-8 border-rose-100 bg-rose-50/40">
      <p className="text-sm font-medium text-rose-900">계정 탈퇴</p>
      <p className="mt-1 text-sm text-slate-600">
        탈퇴 시 여행·체크리스트·예산·채팅 등 모든 데이터가 삭제되며 복구할 수 없습니다.
      </p>
      {oauthLabel ? (
        <p className="mt-2 text-xs text-slate-500">연동 로그인: {oauthLabel}</p>
      ) : null}

      {!open ? (
        <Button
          type="button"
          variant="ghost"
          className="mt-4 text-rose-600 hover:bg-rose-100"
          onClick={() => setOpen(true)}
        >
          계정 탈퇴하기
        </Button>
      ) : (
        <div className="mt-4 space-y-3">
          {hasPassword ? (
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
            />
          ) : null}
          <input
            placeholder='확인을 위해 "탈퇴" 입력'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ghost"
              className="text-rose-600"
              disabled={loading}
              onClick={onDelete}
            >
              {loading ? "처리 중..." : "탈퇴 확정"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => {
                setOpen(false);
                setPassword("");
                setConfirm("");
                setError("");
              }}
            >
              취소
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
