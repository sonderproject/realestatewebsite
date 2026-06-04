"use client";

import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CredibilitySection from "@/components/CredibilitySection";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  // Lenis smooth scroll setup
  useEffect(() => {
    let lenis: unknown;

    async function initLenis() {
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

      {/* 3 — Credibility: stats + testimonials + value prop */}
      <CredibilitySection />

      {/* 4 — Final CTA: close the sale */}
      <FinalCTA />
    </main>
  );
}
