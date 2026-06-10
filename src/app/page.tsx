import { HomePageContent } from "@/features/home/components/home-page-content";
import { MobileHomeContent } from "@/features/home/components/mobile-home-content";
import { getViewMode } from "@/shared/lib/view-mode-server";

export default async function HomePage() {
  const viewMode = await getViewMode();
  if (viewMode === "mobile") return <MobileHomeContent />;
  return <HomePageContent />;
}
