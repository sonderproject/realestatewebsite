"use client";

import { useRef } from "react";
import Image from "next/image";
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
    <section
      ref={ref}
      className="relative overflow-hidden py-12 px-5 md:py-20 md:px-16"
    >
      {/* Oceanfront estate background — different crop from the Services section */}
      <Image
        src="/media/services-oceanfront.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_70%]"
      />
      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/88 via-obsidian/62 to-obsidian/90" />
      <div className="absolute inset-0 bg-obsidian/25" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-8 md:mb-14 max-w-2xl"
        >
          <SectionLabel index="04" tone="dark" className="mb-4">
            How It Works
          </SectionLabel>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-warm-50 leading-[1.05] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From property to
            <br />
            <em className="text-gold-light">launch, in days.</em>
          </h2>
        </motion.div>

        {/* Steps — frosted glass panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-7 backdrop-blur-md transition-colors duration-500 hover:bg-white/[0.1]"
            >
              {/* Top accent rule fills on hover */}
              <span className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold to-gold-light transition-all duration-700 ease-out" />
              {/* Oversized ghost numeral */}
              <span
                className="absolute -top-3 -right-1 text-[5.5rem] md:text-[7rem] font-light leading-none text-white/[0.06] select-none pointer-events-none transition-colors duration-500 group-hover:text-gold-light/10"
                style={{ fontFamily: "var(--font-display)" }}
                aria-hidden
              >
                {step.number}
              </span>
              <span className="relative text-gold-light text-sm tracking-[0.25em] font-medium mb-5">
                STEP {step.number}
              </span>
              <h3 className="relative text-warm-50 text-lg md:text-xl font-medium mb-2">
                {step.title}
              </h3>
              <p className="relative text-warm-200 text-sm font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
