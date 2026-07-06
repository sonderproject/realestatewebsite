import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Opener from "@/components/Opener";

// Self-hosted via next/font — no external Google Fonts request at runtime.
// The variable prop wires these directly into the --font-display / --font-body
// CSS custom properties already used site-wide.
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    default: "Sonder Studio — Premium Property Visualization",
    template: "%s — Sonder Studio",
  },
  description:
    "Sonder Studio is a property visualization studio. We create immersive digital experiences — a cinematic property film, an interactive 3D floor plan, and a luxury property story — that build emotional connection before a buyer ever steps inside.",
  keywords: [
    "property visualization",
    "cinematic property film",
    "interactive 3D floor plan",
    "premium digital property experience",
    "luxury real estate marketing",
    "luxury property story",
    "immersive property experience",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Sonder Studio",
    title: "Sonder Studio — Premium Property Visualization",
    description:
      "We make properties unforgettable online — a cinematic film, an interactive 3D floor plan, and a luxury property story for exceptional properties.",
    url: "https://sonderstudio.space",
    images: [
      { url: "/media/og-image.jpg", width: 1200, height: 630, alt: "Sonder Studio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonder Studio — Premium Property Visualization",
    description:
      "We make properties unforgettable online — a cinematic film, an interactive 3D floor plan, and a luxury property story for exceptional properties.",
    images: ["/media/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <Opener />
        {children}
      </body>
    </html>
  );
}
