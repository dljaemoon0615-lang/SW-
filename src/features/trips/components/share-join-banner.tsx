"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

type Props = {
  shareToken: string;
  tripId: string;
  isLoggedIn: boolean;
  isOwner: boolean;
  isCollaborator: boolean;
};

export function ShareJoinBanner({
  shareToken,
  tripId,
  isLoggedIn,
  isOwner,
  isCollaborator,
}: Props) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function joinTrip() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/trips/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shareToken }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "참여에 실패했습니다.");
      return;
    }
    setMessage(data.message ?? "참여했습니다.");
    router.push(`/trips/${data.tripId ?? tripId}`);
  }

  if (isOwner) {
    return (
      <div className="mb-4 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
        내가 만든 일정입니다.{" "}
        <Link href={`/trips/${tripId}`} className="font-medium underline">
          편집 페이지로 이동
        </Link>
      </div>
    );
  }

  if (isCollaborator) {
    return (
      <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        이미 동행자로 참여 중입니다.{" "}
        <Link href={`/trips/${tripId}`} className="font-medium underline">
          함께 편집하기
        </Link>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        로그인하면 이 일정에 동행자로 참여해 함께 편집할 수 있습니다.{" "}
        <Link href={`/login?callbackUrl=/share/${shareToken}`} className="font-medium underline">
          로그인
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-4 space-y-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
      <p className="text-sm text-rose-950">동행자로 참여하면 일정 순서를 함께 편집할 수 있습니다.</p>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      <Button type="button" onClick={joinTrip} disabled={loading}>
        {loading ? "참여 중..." : "동행자로 참여하기"}
      </Button>
    </div>
  );
}
