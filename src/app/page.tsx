"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ImageZoomSection from "@/components/ImageZoomSection";
import ServicesSection from "@/components/ServicesSection";
import CredibilitySection from "@/components/CredibilitySection";
import FinalCTA from "@/components/FinalCTA";

// React Three Fiber requires client-side rendering only
const CinematicScroll = dynamic(() => import("@/components/CinematicScroll"), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-obsidian" style={{ height: "300vh" }} />
  ),
});

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
      {/* 1 — Hero: full-screen video */}
      <HeroSection />

      {/* 2 — Cinematic 3D scroll: camera moves through architectural scene */}
      <CinematicScroll />

      {/* 3 — Image zoom: provided coastal aerial zooms in, panels reveal */}
      <ImageZoomSection />

      {/* 4 — Services: clean editorial list layout */}
      <ServicesSection />

      {/* 5 — Credibility: stats + testimonials + value prop */}
      <CredibilitySection />

      {/* 6 — Final CTA: close the sale */}
      <FinalCTA />
    </main>
  );
}
