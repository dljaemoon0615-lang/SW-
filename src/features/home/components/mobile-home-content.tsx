"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_TAGLINE,
  APP_TAGLINE_JA,
  JAPAN_REGIONS,
} from "@/shared/lib/constants";
import { POPULAR_DESTINATIONS } from "@/features/home/lib/home-data";
import { defaultTripRange, type TripDateRange } from "@/shared/lib/trip-dates";
import { TripDateRangePicker } from "@/shared/ui/trip-date-range-picker";
import { MobileAppHeader } from "@/shared/layout/mobile-app-header";
import { BottomNav } from "@/shared/layout/bottom-nav";
import { Calendar, ChevronDown, Hotel, MapPin, Utensils } from "lucide-react";

const QUICK_ACTIONS = [
  { href: "/planner", label: "일정 만들기", icon: Calendar, color: "#7ba7e8" },
  { href: "/attractions", label: "관광지", icon: MapPin, color: "#9b8fe8" },
  { href: "/restaurants", label: "맛집", icon: Utensils, color: "#6dc5e8" },
  { href: "/stays", label: "숙박", icon: Hotel, color: "#5a7fd4" },
] as const;

export function MobileHomeContent() {
  const router = useRouter();
  const [region, setRegion] = useState("TOKYO");
  const [dateRange, setDateRange] = useState<TripDateRange>(() => defaultTripRange());
  const [guests, setGuests] = useState(1);

  const regionLabel = JAPAN_REGIONS.find((r) => r.id === region)?.label ?? "도쿄";

  useEffect(() => {
    const params = new URLSearchParams({
      region,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      guests: String(guests),
    });
    router.prefetch(`/planner?${params.toString()}`);
    router.prefetch(`/attractions?region=${region}`);
    for (const dest of POPULAR_DESTINATIONS) {
      router.prefetch(dest.href);
    }
  }, [region, dateRange.startDate, dateRange.endDate, guests, router]);

  function startPlan() {
    const params = new URLSearchParams({
      region,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      guests: String(guests),
    });
    router.push(`/planner?${params.toString()}`);
  }

  return (
    <div className="mobile-app-root">
      <section className="mobile-home-hero">
        <MobileAppHeader transparent />
        <div className="mobile-home-hero__body">
          <p className="mobile-home-hero__kr">{APP_TAGLINE}</p>
          <h1 className="mobile-home-hero__title font-montserrat">{APP_NAME}</h1>
          <p className="mobile-home-hero__ja">{APP_TAGLINE_JA}</p>
          <p className="mobile-home-hero__desc">{APP_DESCRIPTION}</p>

          <div className="mobile-search-card">
            <div className="mobile-search-field">
              <span className="mobile-search-label">여행지</span>
              <label className="mobile-search-value">
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="mobile-search-native"
                  aria-label="여행지"
                >
                  {JAPAN_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <span>{regionLabel}</span>
                <ChevronDown size={16} />
              </label>
            </div>

            <div className="mobile-search-field">
              <TripDateRangePicker
                variant="hero"
                label="날짜"
                value={dateRange}
                onChange={setDateRange}
              />
            </div>

            <div className="mobile-search-field mobile-search-field--row">
              <div>
                <span className="mobile-search-label">인원</span>
                <input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="mobile-search-guests"
                  aria-label="인원"
                />
              </div>
              <button type="button" onClick={startPlan} className="mobile-search-cta">
                플랜 시작
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-home-section">
        <h2 className="mobile-home-section__title">빠른 시작</h2>
        <div className="mobile-quick-grid">
          {QUICK_ACTIONS.map(({ href, label, icon: Icon, color }) => (
            <Link key={href} href={href} className="mobile-quick-card">
              <span className="mobile-quick-card__icon" style={{ background: `${color}22`, color }}>
                <Icon size={22} />
              </span>
              <span className="mobile-quick-card__label">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mobile-home-section">
        <div className="mobile-home-section__head">
          <h2 className="mobile-home-section__title">인기 여행지</h2>
          <Link href="/attractions" className="mobile-home-section__link">
            전체 보기
          </Link>
        </div>
        <div className="mobile-dest-scroll">
          {POPULAR_DESTINATIONS.map((dest) => (
            <Link key={dest.id} href={dest.href} className="mobile-dest-card">
              <div
                className="mobile-dest-card__img"
                style={{ backgroundImage: `url('${dest.image}')` }}
              />
              <div className="mobile-dest-card__body">
                <h3>{dest.title}</h3>
                <p>{dest.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
