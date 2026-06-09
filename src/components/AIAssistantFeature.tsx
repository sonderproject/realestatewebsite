"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// Three supporting points — same icon + label + one-line treatment as the
// site's other feature points, rendered in the gold rounded-square style.
const POINTS = [
  {
    icon: "✦",
    label: "Answers instantly",
    body: "Buyer and renter questions handled 24/7, even at 2am.",
  },
  {
    icon: "◎",
    label: "Qualifies automatically",
    body: "Sorts serious buyers from browsers, so you spend time on real leads.",
  },
  {
    icon: "✓",
    label: "Books while you sleep",
    body: "Captures contact details and schedules showings without you lifting a finger.",
  },
];

export default function AIAssistantFeature() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="bg-obsidian px-5 py-12 md:px-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative rounded-3xl overflow-hidden bg-obsidian"
      >
        {/* Dusk skyline — sets the after-hours, "while you sleep" mood */}
        <Image
          src="/media/sonder-edge-skyline.jpg"
          alt="City skyline at dusk"
          fill
          sizes="(max-width: 768px) 100vw, 90vw"
          className="object-cover object-center"
        />
        {/* Brand-tinted scrim so the copy stays legible over the photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(7,23,38,0.94) 0%, rgba(20,58,87,0.80) 55%, rgba(11,34,54,0.94) 100%)",
          }}
        />
        {/* Living aurora — drifting brand light over the image */}
        <div className="aurora opacity-70" />
        {/* Subtle grid texture over the aurora */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 p-7 md:p-12 lg:p-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-6 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-gold-light text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold">
              The Sonder Edge
            </span>
          </div>

          {/* Headline + subhead */}
          <div className="max-w-3xl">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light text-warm-50 leading-[1.05] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Never lose a lead to a{" "}
              <em className="text-gold-light font-normal">missed message</em> again.
            </h2>
            <p className="text-warm-300 text-base md:text-lg font-light leading-relaxed">
              Visitors come at all hours. Most agents reply the next morning —
              once the lead is gone. Our AI is trained on your MLS listings and
              market area, so it answers the second they land: qualifies buyers
              and renters, and books showings around the clock.
            </p>
          </div>

          {/* Supporting points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-14 mb-10 md:mb-14">
            {POINTS.map((point, i) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + 0.1 * i }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-gold/30 bg-gold/10 text-gold text-xl">
                  {point.icon}
                </div>
                <h3
                  className="text-warm-50 text-lg md:text-xl font-light"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {point.label}
                </h3>
                <p className="text-warm-400 text-sm font-light leading-relaxed">
                  {point.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/ai-assistant"
            className="glass-btn-accent inline-flex items-center gap-3 text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium"
          >
            See How It Works
            <span className="w-6 h-px bg-current inline-block" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
