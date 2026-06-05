"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Acquisition",
    subtitle: "Buying",
    description:
      "Exclusive access to off-market properties. Precision representation for buyers who won't settle for the standard market.",
  },
  {
    number: "02",
    title: "Disposition",
    subtitle: "Selling",
    description:
      "Property marketing built for attention, trust, and action. We position your home to command — not compete.",
  },
  {
    number: "03",
    title: "Luxury Portfolio",
    subtitle: "Premium Listings",
    description:
      "White-glove service for estates, penthouses, and coastal properties. Every listing treated as a singular event.",
  },
  {
    number: "04",
    title: "Capital Strategy",
    subtitle: "Investment",
    description:
      "Data-driven acquisition for investors building long-term wealth through premium coastal real estate.",
  },
  {
    number: "05",
    title: "Relocation",
    subtitle: "Transition Services",
    description:
      "Comprehensive support for executives and families relocating to Southern California's most desirable markets.",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="services" className="bg-sand-100 py-14 px-5 md:py-24 md:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-14"
      >
        <p className="text-gold-dark text-xs tracking-[0.4em] uppercase mb-4 font-light">
          What We Do
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-obsidian leading-tight max-w-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Services Built for
            <br />
            <em>Discerning Clients</em>
          </h2>
          <p className="text-warm-500 text-sm font-light max-w-sm leading-relaxed md:text-right">
            Every service we offer is purpose-built for the upper tier of the market.
            No volume plays. No diluted attention.
          </p>
        </div>
      </motion.div>

      {/* Service list */}
      <div className="border-t border-warm-300/60">
        {services.map((service, i) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 * i }}
            className="group border-b border-warm-300/60 py-6 md:py-9 cursor-default hover:bg-sand-200/50 transition-colors duration-500 px-1"
          >
            <div className="flex gap-4 items-start">
              {/* Number */}
              <span className="text-warm-400 text-xs font-light tracking-wider mt-[3px] shrink-0 w-6">
                {service.number}
              </span>
              {/* Content */}
              <div className="flex-1 flex flex-col md:flex-row md:gap-8">
                {/* Title block */}
                <div className="shrink-0 md:w-52 lg:w-64">
                  <p className="text-warm-400 text-[10px] tracking-[0.3em] uppercase mb-1">
                    {service.subtitle}
                  </p>
                  <h3
                    className="text-obsidian text-xl md:text-2xl lg:text-3xl font-light group-hover:text-gold-dark transition-colors duration-500"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {service.title}
                  </h3>
                </div>
                {/* Description */}
                <p className="text-warm-500 text-sm font-light leading-relaxed mt-2 md:mt-0 md:flex-1 md:pt-px">
                  {service.description}
                </p>
                {/* Arrow — desktop only */}
                <div className="hidden md:flex items-center gap-2 shrink-0 mt-[2px]">
                  <span className="w-0 group-hover:w-8 h-px bg-gold transition-all duration-500 inline-block" />
                  <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs">
                    →
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
