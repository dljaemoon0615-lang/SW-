"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AttractionsCatalogWarmup } from "@/features/attractions/components/attractions-catalog-warmup";
import { RestaurantsCatalogWarmup } from "@/features/restaurants/components/restaurants-catalog-warmup";
import { AiChatWidget } from "@/features/chat/components/ai-chat-widget";
import type { ViewMode } from "@/shared/lib/view-mode";
import { ViewModeProvider } from "@/shared/providers/view-mode-provider";

export function Providers({
  children,
  viewMode = "desktop",
  session = null,
}: {
  children: React.ReactNode;
  viewMode?: ViewMode;
  session?: Session | null;
}) {
  return (
    <ViewModeProvider initialMode={viewMode}>
      <SessionProvider
        session={session}
        refetchOnWindowFocus={false}
        refetchWhenOffline={false}
      >
        <AttractionsCatalogWarmup />
        <RestaurantsCatalogWarmup />
        {children}
        <AiChatWidget />
      </SessionProvider>
    </ViewModeProvider>
  );
}
