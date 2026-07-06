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
                Property visualization is the only thing
                <em className="text-gold-light"> we do.</em>
              </p>
            </div>
            <p className="text-warm-400 text-sm font-light leading-relaxed max-w-xs md:text-right">
              People don&apos;t fall in love with square footage. They fall in love
              with how a property makes them feel.
            </p>
          </div>
        </div>

        {/* Bottom: the four principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.05]">
          {[
            {
              stat: "Simplicity",
              label: "one product",
              body: "One product. One process. One exceptional outcome. Not a menu of services — a single, focused craft done exceptionally well.",
            },
            {
              stat: "Quality",
              label: "premium, always",
              body: "Every project should feel premium. No shortcuts, and no templates that feel generic. If it doesn't feel like a luxury launch, it isn't done.",
            },
            {
              stat: "Innovation",
              label: "AI with intent",
              body: "We use AI where it creates a better experience — not simply because it's AI. Technology should disappear behind great design.",
            },
            {
              stat: "Storytelling",
              label: "emotion first",
              body: "Today's buyers discover properties online long before a showing. Presentation shapes perception, and perception creates opportunity.",
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
