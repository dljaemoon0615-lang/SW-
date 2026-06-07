"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/shared/ui/brand-logo";
import { TripDateRangePicker } from "@/shared/ui/trip-date-range-picker";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_TAGLINE,
  APP_TAGLINE_JA,
  JAPAN_REGIONS,
} from "@/shared/lib/constants";
import { defaultTripRange, type TripDateRange } from "@/shared/lib/trip-dates";
import { ChevronDown, MapPin } from "lucide-react";

const TRUST_PILLS = [
  { label: "검증된 여행 코스", dot: "tp-blue" },
  { label: "실시간 날씨 연동", dot: "tp-purple" },
  { label: "AI 맞춤 일정 추천", dot: "tp-sky" },
  { label: "5만+ 여행자의 선택", dot: "tp-blue" },
] as const;

export function NihonHero() {
  const router = useRouter();
  const [region, setRegion] = useState("TOKYO");
  const [dateRange, setDateRange] = useState<TripDateRange>(() => defaultTripRange());
  const [guests, setGuests] = useState(1);

  const regionLabel = JAPAN_REGIONS.find((r) => r.id === region)?.label ?? "도쿄";

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
    <>
      <section className="brand-hero">
        <div className="brand-hero-content">
          <div className="hero-badge">
            <span className="hero-badge-star">✦</span>
            일본 여행, 이제 나믿고
          </div>

          <div className="hero-app-logo">
            <BrandMark size={64} />
          </div>

          <p className="hero-kr">{APP_TAGLINE}</p>
          <h1 className="hero-title font-montserrat">{APP_NAME}</h1>
          <p className="hero-ja">{APP_TAGLINE_JA}</p>
          <p className="hero-sub">{APP_DESCRIPTION}</p>
          <p className="hero-cities">
            <MapPin size={14} />
            도쿄 · 오사카 · 교토 · 후쿠오카 · 삿포로
          </p>

          <div className="search-box">
            <div className="sb-section">
              <div className="sb-label">여행지</div>
              <label className="city-select">
                <select
                  id="hero-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="city-select-native"
                  aria-label="여행지"
                >
                  {JAPAN_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <span>{regionLabel}</span>
                <ChevronDown size={14} />
              </label>
            </div>

            <div className="sb-divider" />

            <div className="sb-section sb-section--dates">
              <TripDateRangePicker
                variant="hero"
                label="날짜 선택"
                value={dateRange}
                onChange={setDateRange}
              />
            </div>

            <div className="sb-divider" />

            <div className="sb-section">
              <label htmlFor="hero-guests" className="sb-label">
                인원
              </label>
              <input
                id="hero-guests"
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="sb-value-input"
              />
            </div>

            <button type="button" onClick={startPlan} className="sb-btn">
              믿음의 플랜시작
            </button>
          </div>
        </div>
      </section>

      <div className="trust-row">
        {TRUST_PILLS.map((pill) => (
          <div key={pill.label} className="trust-pill">
            <span className={`tp-dot ${pill.dot}`} />
            {pill.label}
          </div>
        ))}
      </div>
    </>
  );
}
