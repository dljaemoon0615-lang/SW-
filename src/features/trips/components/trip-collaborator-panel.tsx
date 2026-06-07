"use client";

import { useCallback, useState } from "react";
import { Users, Link2, Copy, UserPlus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export type CollaboratorMember = {
  userId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "OWNER" | "EDITOR" | "VIEWER";
  invitedAt: string;
};

const ROLE_LABEL = {
  OWNER: "소유자",
  EDITOR: "편집 가능",
  VIEWER: "보기만",
} as const;

type Props = {
  tripId: string;
  shareToken: string | null;
  canManageCollaborators: boolean;
  initialMembers: CollaboratorMember[];
};

function displayName(m: CollaboratorMember) {
  return m.name ?? m.email?.split("@")[0] ?? "회원";
}

export function TripCollaboratorPanel({
  tripId,
  shareToken: initialToken,
  canManageCollaborators,
  initialMembers,
}: Props) {
  const [token, setToken] = useState(initialToken);
  const [members, setMembers] = useState(initialMembers);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"EDITOR" | "VIEWER">("EDITOR");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const refreshMembers = useCallback(async () => {
    const res = await fetch(`/api/trips/${tripId}/collaborators`);
    if (!res.ok) return;
    const data = await res.json();
    setMembers(data.members ?? []);
  }, [tripId]);

  async function createShareLink() {
    setError("");
    const res = await fetch(`/api/trips/${tripId}/share`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "링크 생성에 실패했습니다.");
      return;
    }
    setToken(data.shareToken);
    setMessage("공유 링크가 준비되었습니다. 동행자에게 보내면 로그인 후 참여·편집할 수 있습니다.");
  }

  async function copyShareLink() {
    if (!token) return;
    const url = `${window.location.origin}/share/${token}`;
    await navigator.clipboard.writeText(url);
    setMessage("링크를 복사했습니다.");
  }

  async function inviteByEmail() {
    setLoading(true);
    setError("");
    setMessage("");
    const res = await fetch(`/api/trips/${tripId}/collaborators`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "초대에 실패했습니다.");
      return;
    }
    setInviteEmail("");
    setMessage(data.message ?? "동행자를 추가했습니다.");
    await refreshMembers();
  }

  async function removeMember(userId: string) {
    if (!confirm("이 동행자를 일정에서 내보낼까요?")) return;
    const res = await fetch(`/api/trips/${tripId}/collaborators?userId=${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "제거에 실패했습니다.");
      return;
    }
    setMessage("동행자를 내보냈습니다.");
    await refreshMembers();
  }

  const shareUrl = token ? `${typeof window !== "undefined" ? window.location.origin : ""}/share/${token}` : "";

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-2">
        <Users size={18} className="text-rose-600" />
        <h2 className="font-semibold text-slate-900">동행자 · 공동 편집</h2>
      </div>
      <p className="text-sm text-slate-600">
        이메일로 초대하거나 공유 링크를 보내 동행자가 일정 순서를 함께 편집할 수 있습니다.
      </p>

      {canManageCollaborators ? (
        <>
          <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <Link2 size={13} />
              공유 링크
            </p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={createShareLink}>
                {token ? "링크 다시 생성" : "공유 링크 만들기"}
              </Button>
              {token ? (
                <Button type="button" variant="outline" onClick={copyShareLink}>
                  <Copy size={13} className="mr-1" />
                  복사
                </Button>
              ) : null}
            </div>
            {shareUrl ? (
              <p className="break-all text-xs text-slate-500">{shareUrl}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <UserPlus size={13} />
              이메일로 초대 (가입된 회원)
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="동행자 이메일"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as "EDITOR" | "VIEWER")}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="EDITOR">편집 가능</option>
                <option value="VIEWER">보기만</option>
              </select>
              <Button type="button" onClick={inviteByEmail} disabled={loading || !inviteEmail}>
                초대
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-slate-500">동행자로 참여 중입니다. 순서 편집은 편집 권한이 있을 때 가능합니다.</p>
      )}

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

      <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">
        {members.map((m) => (
          <li key={m.userId} className="flex items-center justify-between gap-2 px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{displayName(m)}</p>
              <p className="truncate text-xs text-slate-500">{m.email}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                {ROLE_LABEL[m.role]}
              </span>
              {canManageCollaborators && m.role !== "OWNER" ? (
                <button
                  type="button"
                  onClick={() => removeMember(m.userId)}
                  className="text-xs text-rose-600 hover:underline"
                >
                  내보내기
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
