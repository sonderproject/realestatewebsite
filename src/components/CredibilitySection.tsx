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
    <section ref={ref} className="bg-ocean-dark py-14 px-5 md:py-24 md:px-16 overflow-hidden">
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ocean-light/15 mb-10 md:mb-16"
      >
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            className="bg-ocean-dark py-8 px-5 md:py-10 md:px-8 text-center"
          >
            <p
              className="text-3xl md:text-4xl lg:text-5xl text-gold font-light mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {value}
            </p>
            <p className="text-ocean-light/70 text-[10px] tracking-[0.3em] uppercase font-light">
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
        className="mb-8 md:mb-12 max-w-2xl"
      >
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-light">
          Client Results
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-warm-50 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Results are not promised.
          <br />
          <em>They are built.</em>
        </h2>
      </motion.div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        {testimonials.map(({ quote, name, location }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + 0.15 * i }}
            className="border border-ocean-light/20 p-5 md:p-8 relative"
          >
            <span
              className="absolute top-4 left-5 text-5xl text-gold/20 font-light leading-none select-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;
            </span>
            <p className="text-warm-100 text-sm font-light leading-relaxed mb-6 mt-3 relative z-10">
              {quote}
            </p>
            <div className="border-t border-ocean-light/20 pt-4">
              <p className="text-warm-50 text-sm font-light">{name}</p>
              <p className="text-ocean-light/60 text-xs tracking-[0.2em] uppercase mt-1">
                {location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Value proposition bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="mt-10 md:mt-16 border border-ocean-light/20 p-6 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3 font-light">
            Why Sonder Studio
          </p>
          <p
            className="text-warm-50 text-2xl md:text-3xl lg:text-4xl font-light leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Web design built for
            <em> attention, trust, and action.</em>
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
              <span className="w-4 h-px bg-gold shrink-0" />
              <span className="text-warm-200 text-xs font-light tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
