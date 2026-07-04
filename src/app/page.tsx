"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ServicesSection from "@/components/ServicesSection";

// Below-fold sections — code-split so their JS only downloads after the
// above-fold content is interactive.
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const CredibilitySection = dynamic(() => import("@/components/CredibilitySection"));
const SamplesSection = dynamic(() => import("@/components/SamplesSection"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const FinalCTA = dynamic(() => import("@/components/FinalCTA"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"));

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
          // lerp gives frame-rate-independent smoothing — a consistent silky
          // glide across the whole site. Lower = floatier/smoother.
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

        // Allow other components to pause/resume Lenis via custom events
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
    <main className="bg-obsidian">
      {/* Fixed nav: transparent over the hero, frosts to glass on scroll */}
      <Navbar />

      {/* 1 — Hero: property footage that scrubs frame-by-frame as you scroll */}
      <HeroSection />

      {/* 2 — The Sonder Experience: core-product spotlight + problem framing */}
      <ExperienceSection />

      {/* 3 — Services: what we do + what's included + what we don't offer */}
      <ServicesSection />

      {/* 4 — Process: from property to launch */}
      <ProcessSection />

      {/* 5 — Why Sonder Studio: the four principles */}
      <CredibilitySection />

      {/* 6 — The Work: sample property experiences */}
      <SamplesSection />

      {/* 7 — Pricing: one value-based experience */}
      <PricingSection />

      {/* 8 — Contact: book a call (Cal embed) */}
      <FinalCTA />

      {/* 9 — Footer */}
      <Footer />
    </main>
  );
}
