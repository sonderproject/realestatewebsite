"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { hero, media } from "@/config/site";

// ── 1 — HERO ───────────────────────────────────────────────────────────────
// Full-bleed cinematic hero: the property video plays behind the headline and
// scrolls with a 3D parallax. As you scroll past, the footage drifts down and
// scales (moving slower than the page — the parallax depth cue) while the
// headline lifts, fades, and tilts back in perspective for a subtle 3D feel.
// Honors prefers-reduced-motion by holding everything still.
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Video: drifts down + scales up as you scroll (parallax depth).
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.32]);
  // Content: lifts up, fades, and tilts back in 3D.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentRotateX = useTransform(scrollYProgress, [0, 1], [0, 12]);

  const videoStyle = reduce ? undefined : { y: videoY, scale: videoScale };
  const contentStyle = reduce
    ? undefined
    : { y: contentY, opacity: contentOpacity, rotateX: contentRotateX };

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden px-5 md:px-8"
    >
      {/* Parallax video layer */}
      <motion.div
        style={videoStyle}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.heroPoster}
          aria-hidden
        >
          <source src={media.walkthrough} type="video/mp4" />
        </video>
      </motion.div>

      {/* Legibility overlay: darken under the nav + fade the base into the page */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,17,29,0.74) 0%, rgba(10,25,41,0.34) 38%, rgba(10,25,41,0.58) 72%, #0a1929 100%)",
        }}
        aria-hidden
      />
      {/* Soft brand aurora tint over the footage */}
      <div className="aurora opacity-25" />

      {/* Content — tilted in 3D */}
      <div
        className="relative z-10 mx-auto w-full max-w-3xl text-center"
        style={{ perspective: 1200 }}
      >
        <motion.div style={contentStyle} className="[transform-style:preserve-3d]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-[10px] font-medium uppercase tracking-[0.4em] text-teal md:text-xs"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-balance text-4xl font-light leading-[1.05] text-cream drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] md:text-6xl lg:text-7xl"
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
            className="mx-auto mt-7 max-w-xl text-pretty text-sm font-light leading-relaxed text-cream-dim drop-shadow-[0_1px_12px_rgba(0,0,0,0.55)] md:text-base"
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
              className="glass-btn rounded-full px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] text-cream"
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          {/* Two reassurance lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-light text-cream-dim"
          >
            {hero.reassurances.map((line, i) => (
              <span key={line} className="flex items-center gap-5">
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full bg-teal/60" aria-hidden />
                )}
                <span className="flex items-center gap-2">
                  <span className="text-teal">✓</span>
                  {line}
                </span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={reduce ? undefined : { opacity: contentOpacity }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-cream/40 p-1">
          <motion.span
            className="block h-1.5 w-1 rounded-full bg-cream/80"
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
