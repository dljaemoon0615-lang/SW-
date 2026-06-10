"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { BrandLogo } from "@/shared/ui/brand-logo";
import { useViewMode } from "@/shared/hooks/use-view-mode";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/attractions", label: "여행지" },
  { href: "/planner", label: "여행 코스" },
  { href: "/trips", label: "내 일정" },
];

function displayName(name?: string | null, email?: string | null) {
  if (name?.trim()) return name.trim();
  if (email) return email.split("@")[0] ?? "회원";
  return "회원";
}

function HeaderUserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-28 animate-pulse rounded-full bg-white/50" aria-hidden />;
  }

  if (!session?.user) {
    return (
      <Link href="/login" className="btn-outline text-sm">
        로그인
      </Link>
    );
  }

  const name = displayName(session.user.name, session.user.email);
  const image = session.user.image;

  return (
    <Link
      href="/profile"
      className="flex max-w-[200px] items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition hover:bg-white/40"
      title="내 프로필"
    >
      {image ? (
        <Image
          src={image}
          alt=""
          width={34}
          height={34}
          unoptimized
          className="h-[34px] w-[34px] shrink-0 rounded-full object-cover ring-2 ring-white/80"
        />
      ) : (
        <span className="header-avatar shrink-0" aria-hidden>
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="truncate text-[13px] font-semibold text-[#3d528f]">{name}</span>
    </Link>
  );
}

export function SiteHeader({ tone = "default" }: { tone?: "default" | "sky" }) {
  const pathname = usePathname();
  const viewMode = useViewMode();
  const isMobile = viewMode === "mobile";
  const isSky = tone === "sky";

  return (
    <header
      className={`site-header sticky top-0 z-[1000] ${
        isSky ? "site-header--sky" : "border-b border-[var(--border)] bg-white/90 backdrop-blur-xl"
      } px-5 py-4 md:px-8`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
        <BrandLogo variant="header" showViewSwitcher />

        {!isMobile ? (
          <nav>
            <ul className="flex list-none gap-7">
              {NAV.map(({ href, label }) => {
                const active =
                  pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative text-sm font-semibold transition ${
                        active
                          ? "text-[#5a7fd4]"
                          : "text-[#3d528f] hover:text-[#5a7fd4]"
                      }`}
                    >
                      {label}
                      {active ? <span className="nav-active-line" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <div className="flex items-center gap-3">
          <HeaderUserMenu />
          {!isMobile ? (
            <Link href="/planner" className="btn-primary hidden px-[18px] py-2.5 text-[13px] sm:inline-flex">
              나믿고 떠나기
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
