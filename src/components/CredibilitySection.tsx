"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "$2.4B", label: "In Transactions Closed" },
  { value: "14", label: "Years in Coastal Markets" },
  { value: "340+", label: "Luxury Properties Placed" },
  { value: "97%", label: "List-to-Sale Ratio" },
];

const testimonials = [
  {
    quote:
      "Meridian didn't just find us a home. They understood what we were building — a life, a legacy. The attention to detail was extraordinary.",
    name: "James & Caroline W.",
    location: "La Jolla, CA",
  },
  {
    quote:
      "Our oceanfront listing sold in 11 days at 104% of asking. The marketing was unlike anything I'd seen in this market.",
    name: "David R.",
    location: "Del Mar, CA",
  },
];

export default function CredibilitySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-charcoal py-32 px-8 md:px-20 overflow-hidden">
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-warm-700/20 mb-24"
      >
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            className="bg-charcoal py-12 px-8 text-center"
          >
            <p
              className="text-4xl md:text-5xl text-gold font-light mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {value}
            </p>
            <p className="text-warm-500 text-[10px] tracking-[0.3em] uppercase font-light">
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
        className="mb-16 max-w-2xl"
      >
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-5 font-light">
          Client Perspective
        </p>
        <h2
          className="text-4xl md:text-5xl font-light text-warm-50 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Trust is not claimed.
          <br />
          <em>It is demonstrated.</em>
        </h2>
      </motion.div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map(({ quote, name, location }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + 0.15 * i }}
            className="border border-warm-700/30 p-10 relative"
          >
            {/* Decorative quotemark */}
            <span
              className="absolute top-6 left-8 text-6xl text-gold/20 font-light leading-none select-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              "
            </span>
            <p className="text-warm-200 text-base font-light leading-relaxed mb-8 mt-4 relative z-10">
              {quote}
            </p>
            <div className="border-t border-warm-700/30 pt-6">
              <p className="text-warm-100 text-sm font-light">{name}</p>
              <p className="text-warm-500 text-xs tracking-[0.2em] uppercase mt-1">
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
        className="mt-24 border border-warm-700/30 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-light">
            Why Meridian
          </p>
          <p
            className="text-warm-50 text-3xl md:text-4xl font-light leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Property marketing built for
            <em> attention, trust, and action.</em>
          </p>
        </div>
        <div className="flex flex-col gap-4 min-w-fit">
          {[
            "Bespoke market analysis",
            "Off-market access network",
            "Dedicated buyer representation",
            "Full-service luxury staging",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="w-4 h-px bg-gold" />
              <span className="text-warm-300 text-xs font-light tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
