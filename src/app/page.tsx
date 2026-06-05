"use client";

import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import GlobeSection from "@/components/GlobeSection";
import ServicesSection from "@/components/ServicesSection";
import CredibilitySection from "@/components/CredibilitySection";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  // Lenis smooth scroll setup
  useEffect(() => {
    let lenis: unknown;

    async function initLenis() {
      // Skip Lenis on touch devices. Its RAF wheel-smoothing fights native
      // touch momentum and desyncs the scroll position that the hero frame
      // scrub + globe carousel read via useScroll — which breaks those
      // scroll-driven animations on mobile. Native touch scroll is already
      // smooth and Framer tracks it reliably.
      const isTouch =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches;
      if (isTouch) return;

      try {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default;
        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
        });

        function raf(time: number) {
          (lenis as { raf: (t: number) => void }).raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
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
    <main className="bg-obsidian">
      {/* 1 — Hero: pinned coastal image that zooms as you scroll, then releases */}
      <HeroSection />

      {/* 2 — Services: clean editorial list layout */}
      <ServicesSection />

      {/* 3 — Globe: image zooms in, becomes a spinning Earth, pulls back
              into a computer screen, then the page continues */}
      <GlobeSection />

      {/* 4 — Credibility: stats + testimonials + value prop */}
      <CredibilitySection />

      {/* 4 — Final CTA: close the sale */}
      <FinalCTA />
    </main>
  );
}
