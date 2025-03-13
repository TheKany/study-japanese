import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import GlobalStyles from "@/components/Style/GlobalStyles";
import AppProviders from "@/context/AppProviders";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";

import "swiper/css";
import "swiper/css/pagination";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Study-Japanese",
  description: "Study Japanese word",
  manifest: "/manifest.json",
  other: {
    "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_PUB as string,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKR.variable}`}>
        <AppProviders>
          <GlobalStyles />
          {children}
        </AppProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
