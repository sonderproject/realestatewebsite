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
    default: "Sonder Studio — Done-For-You Property Media for Real Estate",
    template: "%s — Sonder Studio",
  },
  description:
    "We produce immersive 4D AI property tours and premium animated property pages that help real estate agents sell listings faster and capture buyer leads. Done for you, per property.",
  keywords: [
    "4D AI property tour",
    "real estate video",
    "property landing page",
    "virtual staging",
    "real estate marketing",
    "listing media",
    "buyer lead capture",
    "real estate agents",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Sonder Studio",
    title: "Sonder Studio — Done-For-You Property Media",
    description:
      "Immersive 4D AI property tours and premium animated property pages that sell listings faster and capture buyer leads.",
    url: "https://sonderstudio.space",
    images: [
      { url: "/media/og-image.jpg", width: 1200, height: 630, alt: "Sonder Studio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonder Studio — Done-For-You Property Media",
    description:
      "Immersive 4D AI property tours and premium animated property pages that sell listings faster and capture buyer leads.",
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
