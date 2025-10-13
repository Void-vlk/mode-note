import type { Metadata } from "next";
import { Geist, Geist_Mono, Cookie } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";

import CookiesBanner from "@/components/cookies/CookiesBanner";
import MetronomeMenu from "@/components/metronome/MetronomeMenu";
import Sidebar from "@/components/settings/Sidebar";
import Nav from "@/components/settings/Nav";
import MicrosoftClarity from "@/components/cookies/Clarity";
import ScaleInfoPopup from "@/components/learning/ScaleInfoPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cookie = Cookie({
  variable: "--font-cookie",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Mode Note",
  description:
    "Your resource for learning musical Scales, Modes & Notes on extended range guitars & basses, in alternate & customisable tunings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cookie.variable} antialiased overflow-hidden bg-black`}
      >
        <Sidebar />
        <MetronomeMenu />
        <Nav />
        <ScaleInfoPopup />
        {children}
        <Suspense fallback={null}>
          {" "}
          <CookiesBanner />{" "}
        </Suspense>
        <MicrosoftClarity projectId={process.env.NEXT_PUBLIC_CLARITY_ID!} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
