"use client";

import { SessionProvider } from "next-auth/react";
import { AttractionsCatalogWarmup } from "@/features/attractions/components/attractions-catalog-warmup";
import { RestaurantsCatalogWarmup } from "@/features/restaurants/components/restaurants-catalog-warmup";
import { AiChatWidget } from "@/features/chat/components/ai-chat-widget";
import type { ViewMode } from "@/shared/lib/view-mode";
import { ViewModeProvider } from "@/shared/providers/view-mode-provider";

export function Providers({
  children,
  viewMode = "desktop",
}: {
  children: React.ReactNode;
  viewMode?: ViewMode;
}) {
  return (
    <ViewModeProvider initialMode={viewMode}>
      <SessionProvider refetchOnWindowFocus refetchWhenOffline={false}>
        <AttractionsCatalogWarmup />
        <RestaurantsCatalogWarmup />
        {children}
        <AiChatWidget />
      </SessionProvider>
    </ViewModeProvider>
  );
}
