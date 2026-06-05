"use client";

import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import GlobeSection from "@/components/GlobeSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
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
      {/* 1 — Hero: coastal footage that scrubs frame-by-frame as you scroll */}
      <HeroSection />

      {/* 2 — Services: what we do */}
      <ServicesSection />

      {/* 3 — Work: portfolio proof (fixes the #work links) */}
      <WorkSection />

      {/* 4 — Globe: animated "your market" interlude */}
      <GlobeSection />

      {/* 5 — Process: how a project runs, first call to launch */}
      <ProcessSection />

      {/* 6 — Credibility: stats + testimonials + value prop */}
      <CredibilitySection />

      {/* 7 — Pricing: packages that scale */}
      <PricingSection />

      {/* 8 — Contact: lead-capture form + footer */}
      <FinalCTA />
    </main>
  );
}
