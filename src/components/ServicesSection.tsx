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
    <section ref={ref} id="services" className="bg-obsidian py-32 px-8 md:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-20"
      >
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-5 font-light">
          What We Do
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="text-5xl md:text-6xl font-light text-warm-50 leading-tight max-w-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Services Built for
            <br />
            <em>Discerning Clients</em>
          </h2>
          <p className="text-warm-400 text-sm font-light max-w-sm leading-relaxed md:text-right">
            Every service we offer is purpose-built for the upper tier of the market.
            No volume plays. No diluted attention.
          </p>
        </div>
      </motion.div>

      {/* Service list */}
      <div className="border-t border-warm-700/30">
        {services.map((service, i) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            className="group border-b border-warm-700/30 py-8 md:py-10 grid grid-cols-12 gap-4 items-start cursor-default hover:bg-warm-800/10 transition-colors duration-500 px-2"
          >
            <span className="col-span-2 md:col-span-1 text-warm-600 text-xs font-light tracking-wider pt-1">
              {service.number}
            </span>
            <div className="col-span-5 md:col-span-3">
              <p className="text-warm-400 text-[10px] tracking-[0.3em] uppercase mb-1">
                {service.subtitle}
              </p>
              <h3
                className="text-warm-50 text-2xl md:text-3xl font-light group-hover:text-gold transition-colors duration-500"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {service.title}
              </h3>
            </div>
            <p className="col-span-5 md:col-span-6 text-warm-400 text-sm font-light leading-relaxed pt-1">
              {service.description}
            </p>
            <div className="hidden md:flex col-span-2 justify-end items-center pt-2">
              <span className="w-0 group-hover:w-8 h-px bg-gold transition-all duration-500 inline-block" />
              <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs ml-2">
                →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
