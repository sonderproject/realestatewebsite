"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

// The property walkthrough film — uploaded to /public/media. Autoplays muted
// on a loop inside the browser mockup below.
const EXPERIENCE_VIDEO = "/media/Create_property_walkthrough_video_202607022205.mp4";

// The three pillars of every Sonder Experience.
const PILLARS = [
  {
    icon: "✦",
    label: "Cinematic AI film",
    body: "A directed property film that moves through the home like a piece of cinema — built to make buyers feel it.",
  },
  {
    icon: "◎",
    label: "Interactive walkthrough",
    body: "An immersive experience buyers explore at their own pace, room by room, on any device.",
  },
  {
    icon: "✓",
    label: "Premium microsite",
    body: "A dedicated site for one property — gallery, features, neighborhood, and lead capture, under one shareable link.",
  },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      id="experience"
      className="scroll-mt-24 relative overflow-hidden bg-obsidian px-5 py-14 md:px-16 md:py-24"
    >
      {/* Living aurora — drifting brand light */}
      <div className="aurora opacity-40" />
      {/* Soft radial glow behind the browser window */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(62,155,212,0.18), rgba(10,10,9,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light md:text-xs">
              The Sonder Experience™
            </span>
          </div>
          <h2
            className="mb-5 text-3xl font-light leading-[1.05] text-warm-50 md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Every listing starts to{" "}
            <em className="font-normal text-gold-light">look the same.</em>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-warm-200 md:text-xl">
            So we build something buyers can&apos;t scroll past: one premium
            digital experience for a single property — a cinematic film, an
            interactive walkthrough, and a dedicated microsite that create an
            emotional connection before the first showing.
          </p>
        </motion.div>

        {/* macOS-style browser window with the looping walkthrough film */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }
            className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-[#1b1d21] shadow-2xl shadow-black/60 ring-1 ring-white/[0.06] md:rounded-2xl"
          >
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] bg-gradient-to-b from-[#2a2d33] to-[#212328] px-4 py-3">
              {/* Traffic-light controls */}
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              {/* Address bar */}
              <div className="mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-md bg-black/25 px-3 py-1.5">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-warm-400"
                  aria-hidden
                >
                  <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="truncate text-[11px] font-light tracking-wide text-warm-400">
                  sonderstudio.space/the-obsidian-estate
                </span>
              </div>
              {/* Right-side spacer to visually balance the traffic lights */}
              <div className="hidden w-[52px] sm:block" aria-hidden />
            </div>

            {/* Viewport — the looping walkthrough film */}
            <video
              className="block aspect-video w-full bg-obsidian object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/hero-poster-v2.jpg"
            >
              <source src={EXPERIENCE_VIDEO} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>

        {/* Pillars */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 md:mt-16">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + 0.1 * i }}
              className="flex flex-col gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-xl text-gold">
                {pillar.icon}
              </div>
              <h3
                className="text-lg font-light text-warm-50 md:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {pillar.label}
              </h3>
              <p className="text-sm font-light leading-relaxed text-warm-400">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="#services"
            className="glass-btn-accent inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white"
          >
            Explore What&apos;s Included
            <span className="inline-block h-px w-6 bg-current" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
