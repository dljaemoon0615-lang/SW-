import type { Metadata, Viewport } from "next";
import { Montserrat, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { Providers } from "@/shared/providers";
import { getViewMode } from "@/shared/lib/view-mode-server";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/shared/lib/constants";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} · ${APP_TAGLINE} — 일본 여행 플래너`,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: "/brand-icon.svg",
    apple: "/brand-icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7ba7e8",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [viewMode, session] = await Promise.all([getViewMode(), auth()]);

  return (
    <html
      lang="ko"
      data-view-mode={viewMode}
      className={`${notoSans.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <Providers viewMode={viewMode} session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
