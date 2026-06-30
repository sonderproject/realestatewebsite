"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FloatingShowcase from "@/components/FloatingShowcase";

// Below-fold sections — code-split so their JS only downloads after the
// above-fold hero is interactive.
const PillCloud = dynamic(() => import("@/components/PillCloud"));
const FeatureBlocks = dynamic(() => import("@/components/FeatureBlocks"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const FinalCTA = dynamic(() => import("@/components/FinalCTA"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"));

export default function HomePage() {
  // Lenis smooth scroll — desktop only (touch keeps native momentum).
  useEffect(() => {
    let lenis: unknown;

    async function initLenis() {
      const isTouch =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches;
      if (isTouch) return;

      try {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default;
        lenis = new Lenis({
          lerp: 0.085,
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        });

        function raf(time: number) {
          (lenis as { raf: (t: number) => void }).raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const onPause = () => (lenis as { stop: () => void }).stop();
        const onResume = () => (lenis as { start: () => void }).start();
        window.addEventListener("sonder:scroll-lock", onPause);
        window.addEventListener("sonder:scroll-unlock", onResume);
      } catch {
        // Lenis unavailable — native scroll works fine
      }
    }

    initLenis();

    return () => {
      if (lenis && typeof (lenis as { destroy?: () => void }).destroy === "function") {
        (lenis as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return (
    <main className="bg-navy">
      {/* Fixed nav: transparent over the hero, frosts to glass on scroll */}
      <Navbar />

      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Floating showcase: 4D tour + animated property page placeholders */}
      <FloatingShowcase />

      {/* 3 — Pill cloud: "Everything to sell the listing" */}
      <PillCloud />

      {/* 4 — Feature blocks: 4D Tour, Property Page, Virtual Staging, Everything Else */}
      <FeatureBlocks />

      {/* 5 — Pricing: Listing $497 · Flagship $997 (per property, one-time) */}
      <PricingSection />

      {/* 6 — FAQ accordion */}
      <FAQSection />

      {/* 7 — Booking / contact: Cal.com embed + intake nudge */}
      <FinalCTA />

      {/* 8 — Footer */}
      <Footer />
    </main>
  );
}
