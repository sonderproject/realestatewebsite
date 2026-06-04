"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ImageZoomSection from "@/components/ImageZoomSection";
import ServicesSection from "@/components/ServicesSection";
import CredibilitySection from "@/components/CredibilitySection";
import FinalCTA from "@/components/FinalCTA";
import SafeBoundary from "@/components/SafeBoundary";

// React Three Fiber requires client-side rendering only
const CinematicScroll = dynamic(() => import("@/components/CinematicScroll"), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-obsidian" style={{ height: "300vh" }} />
  ),
});

// Shown if the 3D scene fails for any reason — keeps the page alive.
const CinematicFallback = (
  <section className="relative w-full h-screen flex flex-col items-center justify-center bg-obsidian overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-obsidian to-charcoal" />
    <div className="relative z-10 text-center px-8">
      <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4 font-light">
        Curated Living
      </p>
      <p
        className="text-warm-100 text-4xl md:text-5xl font-light leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Spaces Designed
        <br />
        <em>for Intention</em>
      </p>
    </div>
  </section>
);

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
      <SafeBoundary fallback={CinematicFallback}>
        <CinematicScroll />
      </SafeBoundary>

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
