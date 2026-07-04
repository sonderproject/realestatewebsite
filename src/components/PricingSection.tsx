"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

// Everything included in a Sonder Experience — shown in the pricing card.
const INCLUDED = [
  "Cinematic AI property film",
  "Interactive property walkthrough",
  "Premium property microsite",
  "Full photo gallery & property features",
  "Floor plans, neighborhood & interactive maps",
  "Contact & lead capture",
  "Mobile-optimized, shareable link & QR code",
];

// What moves a project above the starting price — quoted individually.
const QUOTE_FACTORS = [
  "Property size",
  "Scope & deliverables",
  "Custom visualization",
  "Development marketing",
];

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} id="pricing" className="scroll-mt-24 bg-white py-12 px-5 md:py-20 md:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-12 max-w-2xl"
      >
        <SectionLabel index="06" tone="light" className="mb-4">
          Investment
        </SectionLabel>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          One property. One experience.
          <br />
          <em className="text-gold-dark">One price.</em>
        </h2>
        <p className="text-warm-600 text-sm md:text-base font-light leading-relaxed max-w-xl">
          We price based on value — not production time. Every project is built to
          feel like the launch of a luxury product.
        </p>
      </motion.div>

      {/* The single offering */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 md:gap-6 items-stretch">
        {/* Primary card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl p-8 md:p-10 flex flex-col bg-gradient-to-br from-surf-600 to-ocean text-white shadow-xl shadow-surf-600/25 overflow-hidden"
        >
          <div className="aurora opacity-30" />
          <div className="relative z-10 flex flex-col h-full">
            <span className="absolute top-0 right-0 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-surf-700 font-semibold">
              The Sonder Experience™
            </span>

            <h3
              className="text-2xl font-medium mb-1 text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A premium property experience
            </h3>
            <p className="text-surf-100 text-xs tracking-[0.12em] uppercase mb-6">
              Produced end to end · per property
            </p>

            {/* Price */}
            <div className="mb-7">
              <div className="flex items-end gap-2">
                <span className="text-surf-100 text-lg pb-1.5">Starting at</span>
                <span
                  className="text-5xl md:text-6xl font-light leading-none text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  $1,500+
                </span>
              </div>
              <p className="text-surf-200 text-xs mt-2">
                Larger projects quoted individually.
              </p>
            </div>

            {/* Included */}
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-sm text-white">✓</span>
                  <span className="text-sm leading-snug text-surf-50">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="/get-started"
              className="group cta-shine glass-btn-dark flex w-full items-center justify-center gap-2.5 rounded-full text-xs tracking-[0.2em] uppercase px-8 py-4 font-semibold text-center text-white"
            >
              Start a Project
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </motion.div>

        {/* Quote factors / philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="rounded-3xl border border-sand-200 bg-sand-50 p-8 md:p-10 flex flex-col"
        >
          <p className="text-gold-dark text-[10px] tracking-[0.4em] uppercase mb-5 font-medium">
            Quoted individually
          </p>
          <p className="text-warm-700 text-sm font-light leading-relaxed mb-7">
            Every property is different. Larger and more ambitious projects are
            scoped and quoted individually, based on:
          </p>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {QUOTE_FACTORS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-sm text-gold-dark">↗</span>
                <span className="text-obsidian text-sm font-medium leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="text-gold-dark text-xs tracking-[0.2em] uppercase font-semibold hover:underline"
          >
            Book a call for a quote →
          </a>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-warm-600 text-xs font-light text-center mt-8"
      >
        No subscriptions. No revenue share. When the property sells, the project
        is complete. Not sure where to start?{" "}
        <a href="#contact" className="text-gold-dark hover:underline">
          Book a free call.
        </a>
      </motion.p>
    </section>
  );
}
