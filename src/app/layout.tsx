import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Opener from "@/components/Opener";

// Self-hosted via next/font — no external Google Fonts request at runtime.
// The variable prop wires these directly into the --font-display / --font-body
// CSS custom properties used site-wide.
//
// dock.cool-style product voice: one tight-tracked sans (Inter, the closest
// open substitute for SF Pro) carries both headlines and body — headlines get
// their character from weight and tracking, not a second family. A single
// instance defines --font-body; globals.css aliases --font-display to it
// (two next/font calls with identical options dedupe into one class, so the
// second variable would silently never be set).
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sonderstudio.space"),
  title: {
    default: "Sonder Studio — Premium Property Experiences for Real Estate",
    template: "%s — Sonder Studio",
  },
  description:
    "Sonder Studio gives every listing its own premium, scroll-animated property website — with a cinematic video walkthrough, an interactive virtual tour, and professional property photos and information. One package, one price, per property.",
  keywords: [
    "property website",
    "property experience",
    "cinematic video walkthrough",
    "interactive virtual tour",
    "real estate marketing",
    "listing marketing",
    "luxury real estate agents",
    "single property website",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Sonder Studio",
    title: "Sonder Studio — Premium Property Experiences",
    description:
      "A premium, scroll-animated property website for every listing — with a cinematic video walkthrough, an interactive virtual tour, and professional photos. One package, one price.",
    url: "https://sonderstudio.space",
    images: [
      { url: "/media/og-image.jpg", width: 1200, height: 630, alt: "Sonder Studio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonder Studio — Premium Property Experiences",
    description:
      "A premium, scroll-animated property website for every listing — with a cinematic video walkthrough, an interactive virtual tour, and professional photos. One package, one price.",
    images: ["/media/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Opener />
        {children}
      </body>
    </html>
  );
}
