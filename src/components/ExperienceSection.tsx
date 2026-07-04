"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// The three pillars of every Sonder Experience — same icon + label + one-line
// treatment used across the site's feature points.
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

  return (
    <section
      ref={ref}
      id="experience"
      className="scroll-mt-24 bg-obsidian px-5 py-12 md:px-16 md:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative rounded-3xl overflow-hidden bg-obsidian"
      >
        {/* Cinematic property still */}
        <Image
          src="/media/pexels-rdne-8231167.jpg"
          alt="An immersive digital property experience"
          fill
          sizes="(max-width: 768px) 100vw, 90vw"
          className="object-cover object-center"
        />
        {/* Scrim — image-forward on the right, legible text on the left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(7,23,38,0.90) 0%, rgba(20,58,87,0.52) 50%, rgba(11,34,54,0.35) 100%)",
          }}
        />
        {/* Living aurora — drifting brand light over the image */}
        <div className="aurora opacity-40" />

        <div className="relative z-10 p-7 md:p-12 lg:p-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-6 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-gold-light text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold">
              The Sonder Experience™
            </span>
          </div>

          {/* Headline + subhead */}
          <div className="max-w-3xl">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light text-warm-50 leading-[1.05] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every listing starts to{" "}
              <em className="text-gold-light font-normal">look the same.</em>
            </h2>
            <p className="text-warm-300 text-base md:text-lg font-light leading-relaxed">
              Photos, a Zillow page, an MLS listing, a basic property site — the
              same template every buyer has already scrolled past. We build one
              premium digital experience for a single property: a cinematic film,
              an interactive walkthrough, and a dedicated microsite that create an
              emotional connection before the first showing.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-14 mb-10 md:mb-14">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + 0.1 * i }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-gold/30 bg-gold/10 text-gold text-xl">
                  {pillar.icon}
                </div>
                <h3
                  className="text-warm-50 text-lg md:text-xl font-light"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {pillar.label}
                </h3>
                <p className="text-warm-400 text-sm font-light leading-relaxed">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="#services"
            className="glass-btn-accent inline-flex items-center gap-3 text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium"
          >
            Explore What's Included
            <span className="w-6 h-px bg-current inline-block" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
