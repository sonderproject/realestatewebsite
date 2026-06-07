"use client";

import { useRef, useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, useInView } from "framer-motion";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  // Own ref so the animation fires when THIS block enters the viewport,
  // not when the top of the 1000px+ section does.
  const secondaryRef = useRef<HTMLDivElement>(null);
  const secondaryInView = useInView(secondaryRef, { once: true, amount: 0 });

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "sonder-studio" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-gradient-to-b from-ocean-deep via-obsidian to-obsidian py-16 px-5 md:py-28 md:px-16 overflow-hidden"
    >
      {/* Subtle ocean-diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 60px,
            rgba(74,143,168,0.6) 60px,
            rgba(74,143,168,0.6) 61px
          )`,
        }}
      />

      {/* Top gradient: bleeds in from the section above */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ocean-dark/40 to-transparent" />

      {/* Large background word */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[22vw] font-light text-ocean/5 whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Sonder
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light text-center"
        >
          Book a Call
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-4xl md:text-6xl font-light text-warm-50 leading-[0.95] mb-4 md:mb-6 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let&apos;s talk.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-warm-400 text-sm font-light text-center max-w-lg mx-auto leading-relaxed mb-10 md:mb-14"
        >
          Book a free intro call — we&apos;ll scope your site and answer anything.
        </motion.p>

        {/* Primary: Cal.com inline embed
            min-h instead of fixed h so it auto-expands on mobile.
            No overflow:scroll on the Cal component — that traps touch
            scroll on iOS and prevents users from scrolling past the embed. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 mb-12 md:mb-16 min-h-[600px] md:min-h-[720px]"
        >
          <Cal
            namespace="sonder-studio"
            calLink="dante-valentino/sonder-studio"
            style={{ width: "100%", height: "100%" }}
            config={{ layout: "month_view" }}
          />
        </motion.div>

        {/* Secondary: Ready to start now
            Uses its own inView ref (amount:0) so the animation triggers
            the moment this block scrolls into view on any screen size. */}
        <motion.div
          ref={secondaryRef}
          initial={{ opacity: 0, y: 16 }}
          animate={secondaryInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center border-t border-white/10 pt-10 md:pt-12"
        >
          <p
            className="text-warm-200 text-xl md:text-2xl font-light mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Already know what you need?
          </p>
          <p className="text-warm-500 text-sm font-light mb-6 max-w-xs mx-auto leading-relaxed">
            Configure your plan and get started instantly.
          </p>
          <a
            href="/#pricing"
            className="glass-btn inline-block text-warm-50 text-xs tracking-[0.15em] uppercase rounded-full px-6 py-2.5 font-medium"
          >
            Build Your Plan
          </a>
        </motion.div>
      </div>
    </section>
  );
}
