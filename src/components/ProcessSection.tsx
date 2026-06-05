"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your market, your clients, and your goals — then map exactly what your site needs to do.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "A custom design built around your brand. You see it, shape it, and sign off before a line of code.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We develop a fast, mobile-first site with the integrations you need — IDX, CRM, lead capture.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We go live, train you on it, and stay on to support and refine as your business grows.",
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-12 px-5 md:py-20 md:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-14 max-w-2xl"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          How It Works
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A clear path from
          <br />
          <em className="text-gold-dark">first call to launch.</em>
        </h2>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-sand-200 rounded-2xl overflow-hidden border border-sand-200">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            className="bg-white p-7 md:p-8 flex flex-col"
          >
            <span
              className="text-gold-dark text-3xl md:text-4xl font-light mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {step.number}
            </span>
            <h3 className="text-obsidian text-lg md:text-xl font-medium mb-2">
              {step.title}
            </h3>
            <p className="text-warm-500 text-sm font-light leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
