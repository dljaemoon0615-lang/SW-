import { SiteHeader } from "@/shared/layout/site-header";
import { SiteFooter } from "@/shared/layout/site-footer";
import { HOME_HERO_BACKGROUND } from "@/features/home/lib/home-data";
import { NihonHero } from "./nihon-hero";
import { PopularDestinations } from "./popular-destinations";
import { PlannerPreviewSection } from "./planner-preview-section";

export function HomePageContent() {
  return (
    <div className="min-h-full bg-[var(--background)]">
      <div className="home-sky-wrap">
        <div
          className="home-sky-photo"
          aria-hidden
          style={{ backgroundImage: `url('${HOME_HERO_BACKGROUND}')` }}
        />
        <div className="home-sky-overlay" aria-hidden />
        <div className="home-sky-deco" aria-hidden>
          <div className="home-sky-noise" />
          <div className="home-sky-blob home-sky-blob--1" />
          <div className="home-sky-blob home-sky-blob--2" />
          <div className="home-sky-blob home-sky-blob--3" />
        </div>
        <SiteHeader tone="sky" />
        <NihonHero />
      </div>
      <main className="mx-auto max-w-[1200px] px-5 py-14 md:px-5">
        <PopularDestinations />
        <PlannerPreviewSection />
      </main>
      <SiteFooter />
    </div>
  );
}
