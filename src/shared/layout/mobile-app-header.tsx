"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { BrandMark } from "@/shared/ui/brand-logo";
import { APP_TAGLINE } from "@/shared/lib/constants";

function displayName(name?: string | null, email?: string | null) {
  if (name?.trim()) return name.trim();
  if (email) return email.split("@")[0] ?? "회원";
  return "회원";
}

export function MobileAppHeader({
  title,
  transparent = false,
  showLogo = true,
}: {
  title?: string;
  transparent?: boolean;
  showLogo?: boolean;
}) {
  const { data: session, status } = useSession();
  const name = displayName(session?.user?.name, session?.user?.email);

  return (
    <header
      className={`mobile-app-header ${transparent ? "mobile-app-header--transparent" : ""}`}
    >
      <div className="mobile-app-header__left">
        {showLogo ? (
          <Link href="/" className="mobile-app-header__brand" aria-label="홈">
            <BrandMark size={32} />
            <span className="mobile-app-header__tagline">{APP_TAGLINE}</span>
          </Link>
        ) : (
          <span className="mobile-app-header__title">{title}</span>
        )}
      </div>

      {showLogo && title ? <h1 className="mobile-app-header__center">{title}</h1> : null}

      <div className="mobile-app-header__right">
        {status === "loading" ? (
          <div className="h-8 w-8 animate-pulse rounded-full bg-white/60" aria-hidden />
        ) : session?.user ? (
          <Link href="/profile" className="mobile-app-header__avatar" title="마이페이지">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt=""
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white/80"
              />
            ) : (
              <span aria-hidden>{name.charAt(0).toUpperCase()}</span>
            )}
          </Link>
        ) : (
          <Link href="/login" className="mobile-app-header__login">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
