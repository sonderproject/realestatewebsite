"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "120+", label: "Websites Launched" },
  { value: "5", label: "Years in Real Estate Web" },
  { value: "40+", label: "Agents & Brokerages Served" },
  { value: "3×", label: "Average Lead Generation Lift" },
];

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
      {/* Stats — clean rounded cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14"
      >
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 * i }}
            className="bg-white rounded-2xl border border-sand-200 py-7 px-5 md:py-9 md:px-6 text-center shadow-sm"
          >
            <p
              className="text-3xl md:text-4xl lg:text-5xl text-gold-dark font-medium mb-1.5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {value}
            </p>
            <p className="text-warm-500 text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-medium">
              {label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="mb-7 md:mb-10 max-w-2xl"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          Client Results
        </p>
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

      {/* Value proposition — azure feature panel (Google-style color pop) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="mt-10 md:mt-14 rounded-3xl bg-gradient-to-br from-surf-600 to-ocean p-7 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-lg shadow-surf-600/20"
      >
        <div className="max-w-xl">
          <p className="text-surf-100 text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
            Why Sonder Studio
          </p>
          <p
            className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Web design built for
            <em className="text-surf-100"> attention, trust, and action.</em>
          </p>
        </div>
        <div className="flex flex-col gap-3 min-w-fit">
          {[
            "Custom-designed, never templated",
            "Built for lead generation from day one",
            "Full-stack: design, dev, and copy",
            "Ongoing support and iteration",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-surf-200 shrink-0" />
              <span className="text-surf-50 text-xs md:text-sm font-light tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
