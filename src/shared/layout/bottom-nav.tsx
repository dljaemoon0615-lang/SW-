"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Compass, Home, User } from "lucide-react";

const NAV = [
  { href: "/", label: "홈", icon: Home },
  { href: "/attractions", label: "탐색", icon: Compass },
  { href: "/planner", label: "일정", icon: Calendar },
  { href: "/trips", label: "MY", icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-bottom-nav" aria-label="앱 메인 메뉴">
      <ul className="mobile-bottom-nav__list">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`mobile-bottom-nav__item ${active ? "mobile-bottom-nav__item--active" : ""}`}
              >
                <Icon size={22} strokeWidth={active ? 2.25 : 2} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
