import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Opener from "@/components/Opener";

// Self-hosted via next/font — no external Google Fonts request at runtime.
// The variable prop wires these directly into the --font-display / --font-body
// CSS custom properties used site-wide.
//
// Fraunces (serif) drives every headline — the editorial Sonder voice.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sonderstudio.space"),
  title: {
    default: "Sonder Studio — AI Property Experiences for Luxury Real Estate",
    template: "%s — Sonder Studio",
  },
  description:
    "Sonder Studio turns a single listing into an immersive AI property experience — a cinematic AI tour, an interactive walkthrough, and a dedicated landing page with lead capture. Not agent websites. One experience per property.",
  keywords: [
    "AI property tour",
    "AI property experience",
    "interactive property walkthrough",
    "property landing page",
    "luxury real estate marketing",
    "listing marketing",
    "buyer lead capture",
    "luxury real estate agents",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Sonder Studio",
    title: "Sonder Studio — AI Property Experiences",
    description:
      "An immersive AI property experience for every listing — cinematic AI tour, interactive walkthrough, and a dedicated landing page that captures buyer leads.",
    url: "https://sonderstudio.space",
    images: [
      { url: "/media/og-image.jpg", width: 1200, height: 630, alt: "Sonder Studio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonder Studio — AI Property Experiences",
    description:
      "An immersive AI property experience for every listing — cinematic AI tour, interactive walkthrough, and a dedicated landing page that captures buyer leads.",
    images: ["/media/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Opener />
        {children}
      </body>
    </html>
  );
}
