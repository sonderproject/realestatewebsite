"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { pillCloud } from "@/config/site";

// ── 3 — PILL CLOUD ───────────────────────────────────────────────────────
// "Everything to sell the listing." dock.cool's centered pill cloud, reskinned
// as rounded teal-outlined chips on navy. Each pill staggers in.
export default function PillCloud() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold tracking-tight text-cream md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {pillCloud.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-cream-dim"
        >
          {pillCloud.subhead}
        </motion.p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
          {pillCloud.pills.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
              className="rounded-full border border-cream/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-cream-dim backdrop-blur-sm transition-colors duration-300 hover:border-teal/50 hover:text-teal md:px-5 md:py-2.5"
            >
              {pill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
