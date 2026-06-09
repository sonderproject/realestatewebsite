"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

const testimonials = [
  {
    quote:
      "Sonder Studio didn't just build us a website. They built us a brand. Our inquiry volume doubled within 60 days of launching — the quality of leads is night and day.",
    name: "Marcus T.",
    location: "Brokerage Owner, San Diego CA",
  },
  {
    quote:
      "I was embarrassed by my old site. Now I send every prospect there first. It sets the tone before I even pick up the phone. Worth every dollar.",
    name: "Rachel N.",
    location: "Independent Agent, La Jolla CA",
  },
];

export default function CredibilitySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-sand-50 py-12 px-5 md:py-20 md:px-16 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-7 md:mb-10 max-w-2xl"
      >
        <SectionLabel index="05" tone="light" className="mb-4">
          Client Results
        </SectionLabel>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Results are not promised.
          <br />
          <em className="text-gold-dark">They are built.</em>
        </h2>
      </motion.div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {testimonials.map(({ quote, name, location }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + 0.15 * i }}
            className="bg-white rounded-2xl border border-sand-200 p-6 md:p-8 relative shadow-sm"
          >
            <span
              className="absolute top-4 left-6 text-5xl text-gold/25 font-medium leading-none select-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;
            </span>
            <p className="text-warm-700 text-sm md:text-[15px] font-light leading-relaxed mb-6 mt-4 relative z-10">
              {quote}
            </p>
            <div className="border-t border-sand-200 pt-4">
              <p className="text-obsidian text-sm font-medium">{name}</p>
              <p className="text-warm-500 text-xs tracking-[0.12em] uppercase mt-1">
                {location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Value proposition — hard differentiators, not generic agency claims */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="mt-10 md:mt-14 rounded-3xl bg-obsidian overflow-hidden shadow-xl"
      >
        {/* Top: headline + context */}
        <div className="relative px-7 py-8 md:px-12 md:pt-12 md:pb-10 border-b border-white/[0.07]">
          <div className="aurora opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-3 font-medium">
                Why Sonder Studio
              </p>
              <p
                className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-tight max-w-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Real estate is the only industry
                <em className="text-gold-light"> we work in.</em>
              </p>
            </div>
            <p className="text-warm-400 text-sm font-light leading-relaxed max-w-xs md:text-right">
              We don&apos;t build websites for restaurants, dentists, or everyone else.
              We know this industry — and it shows in the results.
            </p>
          </div>
        </div>

        {/* Bottom: 4 specific differentiators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.05]">
          {[
            {
              stat: "IDX + MLS",
              label: "on every build",
              body: "Property search, live listing sync, and CRM integration are standard — not add-ons you haggle over.",
            },
            {
              stat: "Sub-2s",
              label: "mobile load time",
              body: "Page speed is Google's #1 mobile ranking factor. We engineer for it, not just design around it.",
            },
            {
              stat: "We write",
              label: "the copy too",
              body: "Most agencies hand you a template and ask you to fill it in. We write every headline, every CTA, every page.",
            },
            {
              stat: "Month 1",
              label: "to month 12+",
              body: "We don't disappear after launch. Every month we push updates, track rankings, and make your site better.",
            },
          ].map(({ stat, label, body }) => (
            <div key={stat} className="bg-obsidian px-7 py-7 md:px-8 md:py-8 flex flex-col gap-2 hover:bg-white/[0.03] transition-colors duration-300">
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="text-2xl md:text-3xl font-light text-warm-50"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat}
                </span>
                <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium">
                  {label}
                </span>
              </div>
              <p className="text-warm-400 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
