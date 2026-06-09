"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CredibilitySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-sand-50 py-12 px-5 md:py-20 md:px-16 overflow-hidden">
      {/* Value proposition — hard differentiators, not generic agency claims */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="rounded-3xl bg-obsidian overflow-hidden shadow-xl"
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
