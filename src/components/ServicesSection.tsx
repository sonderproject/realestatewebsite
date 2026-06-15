"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

// Bold keyword highlighter — makes key phrases stand out without feeling
// like a marketing bullet list. Used inline inside service descriptions.
function Kw({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-obsidian">{children}</strong>
  );
}

const services: Array<{
  number: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  isNew: boolean;
}> = [
  {
    number: "01",
    title: "AI Lead Assistant",
    subtitle: "24 / 7 Intelligence",
    description: (
      <>
        A custom AI trained on your <Kw>listings and market</Kw> — captures,
        qualifies, scores, and books leads <Kw>around the clock</Kw>. Included in every plan.
      </>
    ),
    isNew: true,
  },
  {
    number: "02",
    title: "Agent Websites",
    subtitle: "Custom Sites",
    description: (
      <>
        Custom sites for solo agents — <Kw>lead capture</Kw> and{" "}
        <Kw>conversion-focused design</Kw> that books consultations.
      </>
    ),
    isNew: false,
  },
  {
    number: "03",
    title: "Brokerage Platforms",
    subtitle: "Company Sites",
    description: (
      <>
        Full-scale platforms for brokerages — <Kw>MLS-synced listings</Kw>,
        agent rosters, and the brand authority that wins market share.
      </>
    ),
    isNew: false,
  },
  {
    number: "04",
    title: "Property Portals",
    subtitle: "Listing Systems",
    description: (
      <>
        IDX-powered portals built on your brand — your search, your data,
        no Zillow or third-party templates. Available on <Kw>Apartment and Broker</Kw> plans.
      </>
    ),
    isNew: false,
  },
  {
    number: "05",
    title: "Brand Identity",
    subtitle: "Visual Design",
    description: (
      <>
        Logos, <Kw>color systems</Kw>, and brand guidelines that make you
        the recognizable name in your market.
      </>
    ),
    isNew: false,
  },
  {
    number: "06",
    title: "Conversion Tools",
    subtitle: "Lead Capture",
    description: (
      <>
        <Kw>Landing pages</Kw> and lead capture built to convert the traffic
        you&apos;re already driving — no ad spend or marketing retainer required.
      </>
    ),
    isNew: false,
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="services" className="bg-sand-50 py-12 px-5 md:py-20 md:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-7 md:mb-11"
      >
        <SectionLabel index="01" tone="light" className="mb-5">
          What We Do
        </SectionLabel>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-obsidian leading-tight max-w-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built for Real Estate
            <br />
            <em className="text-gold-dark">Professionals</em>
          </h2>
          <p className="text-warm-500 text-sm font-light max-w-sm leading-relaxed md:text-right">
            Premium websites and AI-powered lead capture — purpose-built for
            agents, apartment communities, and brokerages.
          </p>
        </div>
      </motion.div>

      {/* Service list */}
      <div className="border-t border-sand-300/70">
        {services.map((service, i) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 * i }}
            className={`group border-b border-sand-300/70 py-5 md:py-7 cursor-default transition-colors duration-300 rounded-xl px-3 md:px-5 ${
              service.isNew
                ? "bg-gold-dark/[0.04] hover:bg-gold-dark/[0.07]"
                : "hover:bg-sand-100"
            }`}
          >
            <div className="flex gap-4 md:gap-6 items-start">
              {/* Editorial numeral */}
              <span
                className={`text-2xl md:text-3xl font-light tabular-nums leading-none mt-1 shrink-0 w-9 md:w-12 transition-colors duration-500 ${
                  service.isNew
                    ? "text-gold-dark/70"
                    : "text-warm-300 group-hover:text-gold-dark/60"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {service.number}
              </span>

              {/* Content */}
              <div className="flex-1 flex flex-col md:flex-row md:gap-8">
                {/* Title block */}
                <div className="shrink-0 md:w-52 lg:w-64">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-warm-400 text-[10px] tracking-[0.3em] uppercase">
                      {service.subtitle}
                    </p>
                    {service.isNew && (
                      <span className="rounded-full bg-gold-dark/10 border border-gold-dark/30 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase text-gold-dark font-semibold">
                        New
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-xl md:text-2xl lg:text-3xl font-light transition-colors duration-500 ${
                      service.isNew
                        ? "text-gold-dark group-hover:text-gold"
                        : "text-obsidian group-hover:text-gold-dark"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {service.isNew && (
                      <span className="mr-2 text-base align-middle">✦</span>
                    )}
                    {service.title}
                  </h3>
                </div>

                {/* Description — with bolded keyword phrases */}
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
