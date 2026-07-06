"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="pricing"
      className="scroll-mt-24 bg-white py-16 px-5 md:py-28 md:px-16"
    >
      {/* Header — centered, minimal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel index="07" tone="light" className="mb-5 justify-center">
          Investment
        </SectionLabel>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-light text-obsidian leading-[1.05] mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Sonder <em className="text-gold-dark">Experience™</em>
        </h2>
        <p className="mx-auto max-w-xl text-warm-600 text-base md:text-lg font-light leading-relaxed">
          Every property receives a custom-crafted digital experience designed to
          create emotional connection before a buyer ever steps inside.
        </p>
      </motion.div>

      {/* Single premium offer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mx-auto mt-12 md:mt-16 max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-surf-600 to-ocean p-8 md:p-12 text-center text-white shadow-xl shadow-surf-600/25"
      >
        <div className="aurora opacity-30" />
        <div className="relative z-10">
          <p className="text-surf-100 text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">
            One premium experience · per property
          </p>

          <div className="flex items-end justify-center gap-2">
            <span className="text-surf-100 text-lg pb-2">Starting at</span>
            <span
              className="text-6xl md:text-7xl font-light leading-none text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              $1,497
            </span>
          </div>
          <p className="text-surf-100 text-sm mt-3">per property</p>

          <p className="mx-auto mt-7 max-w-md text-surf-50 text-sm font-light leading-relaxed">
            Pricing varies based on property size, complexity, media assets, and
            project scope. Larger estates, luxury developments, and custom
            projects are quoted individually.
          </p>

          <a
            href="/get-started"
            className="cta-shine glass-btn-dark group mt-9 inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-white"
          >
            Start a Project
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <p className="mt-5 text-surf-200 text-xs">
            Larger project?{" "}
            <a href="#contact" className="text-white underline underline-offset-2 hover:no-underline">
              Request a custom quote
            </a>
          </p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-warm-500 text-xs font-light text-center mt-8"
      >
        One product. One property. No packages, no subscriptions — when the
        property sells, the project is complete.
      </motion.p>
    </section>
  );
}
