"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { hero } from "@/config/site";

// ── 1 — HERO ───────────────────────────────────────────────────────────────
// dock.cool structure: centered hero, generous whitespace. Sonder skin: deep
// navy, Fraunces serif headline with a teal-accented phrase, calm subhead,
// single primary CTA, and two short reassurance lines.
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pt-36 pb-20 md:px-8 md:pt-44 md:pb-28">
      {/* Living aurora glow behind the headline */}
      <div className="aurora opacity-60" />

      {/* Soft teal halo, centered */}
      <div
        className="pointer-events-none absolute left-1/2 top-24 -z-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7dd3fc, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] text-teal"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-balance text-4xl font-light leading-[1.05] text-cream md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {hero.headlineLead}
          <em className="not-italic text-teal">{hero.headlineEm}</em>
          {hero.headlineTail}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mx-auto mt-7 max-w-xl text-pretty text-sm font-light leading-relaxed text-cream-dim md:text-base"
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={hero.primaryCta.href}
            className="cta-shine glass-btn-accent rounded-full px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-navy-deep"
          >
            {hero.primaryCta.label} →
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="rounded-full px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] text-cream-dim transition-colors duration-300 hover:text-teal"
          >
            {hero.secondaryCta.label}
          </Link>
        </motion.div>

        {/* Two reassurance lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-light text-cream-faint"
        >
          {hero.reassurances.map((line, i) => (
            <span key={line} className="flex items-center gap-5">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-teal/50" aria-hidden />}
              <span className="flex items-center gap-2">
                <span className="text-teal">✓</span>
                {line}
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
