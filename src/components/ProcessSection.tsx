"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

const steps = [
  {
    number: "01",
    title: "Send us the property",
    description:
      "Share the property, your media, and the details. Ten minutes, and we have what we need to begin.",
  },
  {
    number: "02",
    title: "We craft the experience",
    description:
      "Our studio produces the cinematic film, the interactive walkthrough, and the premium microsite — designed like a luxury product launch.",
  },
  {
    number: "03",
    title: "We refine together",
    description:
      "You review the experience and we polish the details until it feels exactly right for the property.",
  },
  {
    number: "04",
    title: "Launch & share",
    description:
      "You get one shareable link and a QR code — ready for the MLS, social, listing presentations, and email.",
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
        <SectionLabel index="04" tone="light" className="mb-4">
          How It Works
        </SectionLabel>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          From property to
          <br />
          <em className="text-gold-dark">launch, in days.</em>
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
            className="group relative bg-white p-7 md:p-8 flex flex-col overflow-hidden transition-colors duration-500 hover:bg-sand-50"
          >
            {/* Top accent rule fills on hover */}
            <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold-dark to-gold transition-all duration-700 ease-out" />
            {/* Oversized ghost numeral */}
            <span
              className="absolute -top-3 -right-1 text-[5.5rem] md:text-[7rem] font-light leading-none text-sand-200/70 select-none pointer-events-none transition-colors duration-500 group-hover:text-gold/10"
              style={{ fontFamily: "var(--font-display)" }}
              aria-hidden
            >
              {step.number}
            </span>
            <span
              className="relative text-gold-dark text-sm tracking-[0.25em] font-medium mb-5"
            >
              STEP {step.number}
            </span>
            <h3 className="relative text-obsidian text-lg md:text-xl font-medium mb-2">
              {step.title}
            </h3>
            <p className="relative text-warm-500 text-sm font-light leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
