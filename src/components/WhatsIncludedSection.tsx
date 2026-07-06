"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

// The eight premium components of one product — The Sonder Experience™.
// Presented as parts of a single experience, never as separate services.
const COMPONENTS: { title: string; body: string }[] = [
  {
    title: "Cinematic Property Film",
    body: "A directed film that moves through the home like a piece of cinema.",
  },
  {
    title: "Premium Digital Property Experience",
    body: "One immersive experience, built for a single property.",
  },
  {
    title: "Interactive 3D Floor Plan",
    body: "Explore the layout, flow, and scale, room by room, on any device.",
  },
  {
    title: "Luxury Property Story",
    body: "A written narrative — the lifestyle and architecture, not the specs.",
  },
  {
    title: "Curated Property Gallery",
    body: "Every image chosen and sequenced to make buyers feel the home.",
  },
  {
    title: "Mobile-Optimized Experience",
    body: "Flawless on the phone, where buyers first fall in love.",
  },
  {
    title: "Lead Capture",
    body: "Buyers request info or schedule a private showing, direct to you.",
  },
  {
    title: "Shareable Link & QR Code",
    body: "One link for social, email, text, print, open houses, and yard signs.",
  },
];

export default function WhatsIncludedSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-obsidian py-14 px-5 md:py-24 md:px-16"
    >
      <div className="aurora opacity-30" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-9 md:mb-14 max-w-2xl"
        >
          <SectionLabel index="06" tone="dark" className="mb-5">
            The Sonder Experience™
          </SectionLabel>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-warm-50 leading-[1.05] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What&apos;s <em className="text-gold-light">included.</em>
          </h2>
          <p className="text-warm-300 text-base md:text-lg font-light leading-relaxed">
            We create premium digital property experiences. Every component below
            is part of one product — never a separate service — and every project
            is custom-built for a single property.
          </p>
        </motion.div>

        {/* Components — one product, eight parts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {COMPONENTS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 * i }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-colors duration-500 hover:bg-white/[0.07]"
            >
              <span className="mb-4 text-gold-light text-base">✦</span>
              <h3
                className="text-warm-50 text-lg font-light leading-snug mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.title}
              </h3>
              <p className="text-warm-400 text-sm font-light leading-relaxed">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
