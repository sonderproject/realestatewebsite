"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

// FLAG: swap href="#contact" for live experience URLs once flagship builds
// are public. These are sample/reference experiences — not client work.
const SAMPLES = [
  {
    tag: "Luxury Estate",
    title: "The Obsidian Estate",
    description:
      "A flagship property experience — cinematic film, interactive 3D floor plan, and premium digital experience for a single luxury estate. Request a private preview.",
    href: "#contact",
    icon: "◎",
  },
  {
    tag: "New Development",
    title: "A Development Launch",
    description:
      "How a community, townhome, or mixed-use project launches like a luxury product — visualized before a single unit is complete. Preview on request.",
    href: "#contact",
    icon: "◈",
  },
];

export default function SamplesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-10 md:mb-14 max-w-2xl"
      >
        <SectionLabel index="05" tone="light" className="mb-4">
          The Work
        </SectionLabel>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What an experience
          <br />
          <em className="text-gold-dark">feels like.</em>
        </h2>
        <p className="text-warm-500 text-sm md:text-base font-light leading-relaxed">
          A look at the kind of property experiences we build. These are sample
          concepts — not client work, not paid placements.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {SAMPLES.map((s, i) => (
          <motion.a
            key={s.tag}
            href={s.href}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + 0.1 * i }}
            className="group relative rounded-3xl border border-sand-200 bg-sand-50 p-8 md:p-10 flex flex-col gap-5 hover:border-gold/40 hover:bg-sand-100 transition-colors duration-300"
          >
            {/* Tag */}
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-gold-dark font-semibold">
              <span>{s.icon}</span> {s.tag}
            </span>

            {/* Title */}
            <h3
              className="text-2xl md:text-3xl font-light text-obsidian group-hover:text-gold-dark transition-colors duration-300"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {s.title}
            </h3>

            {/* Description */}
            <p className="text-warm-500 text-sm font-light leading-relaxed flex-1">
              {s.description}
            </p>

            {/* Arrow */}
            <div className="flex items-center gap-3 text-gold-dark text-xs tracking-[0.2em] uppercase font-medium">
              <span className="w-0 group-hover:w-8 h-px bg-gold-dark transition-all duration-500 inline-block" />
              Preview →
            </div>

            {/* Sample label watermark */}
            <span className="absolute top-5 right-5 rounded-full border border-sand-300 bg-white px-3 py-1 text-[9px] tracking-[0.2em] uppercase text-warm-400 font-medium">
              Sample
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
