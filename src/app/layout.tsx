import GlobalStyles from "@/components/Style/GlobalStyles";
import AppProviders from "@/context/AppProviders";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";

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
      </body>
    </html>
  );
}
