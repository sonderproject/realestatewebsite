"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    name: "Coastal & Co.",
    type: "Luxury Agent Site",
    result: "+180% inquiries in 90 days",
    gradient: "from-surf-500 to-ocean",
  },
  {
    name: "Harborline Realty",
    type: "Brokerage Platform",
    result: "42 agents under one brand",
    gradient: "from-ocean to-ocean-deep",
  },
  {
    name: "Vista Living",
    type: "Apartment Community",
    result: "3× tour bookings",
    gradient: "from-gold to-gold-dark",
  },
  {
    name: "Summit Property Group",
    type: "Management Company",
    result: "Tenant + leasing portal",
    gradient: "from-surf-600 to-surf-700",
  },
  {
    name: "Marina Listings",
    type: "IDX Listing Portal",
    result: "Live MLS-connected search",
    gradient: "from-ocean-mid to-ocean-deep",
  },
  {
    name: "Atlas Estates",
    type: "Brand + Website",
    result: "Full rebrand & launch",
    gradient: "from-warm-500 to-warm-700",
  },
];

export default function WorkSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="work" className="bg-white py-12 px-5 md:py-20 md:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
            Selected Work
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-obsidian leading-[1.05] max-w-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sites that sell
            <br />
            <em className="text-gold-dark">the dream.</em>
          </h2>
        </div>
        <p className="text-warm-500 text-sm font-light max-w-sm leading-relaxed md:text-right">
          A look at the kind of digital experiences we build for agents,
          brokerages, and property companies.
        </p>
      </motion.div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 * i }}
            className="group cursor-pointer"
          >
            {/* Browser-frame mockup */}
            <div className="rounded-2xl overflow-hidden border border-sand-200 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl">
              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 px-4 h-9 bg-sand-100 border-b border-sand-200">
                <span className="w-2.5 h-2.5 rounded-full bg-warm-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-warm-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-warm-300" />
                <span className="ml-3 flex-1 h-4 rounded-full bg-white/70 max-w-[60%]" />
              </div>
              {/* Faux site */}
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.gradient} p-5 flex flex-col justify-between`}>
                {/* mini nav */}
                <div className="flex items-center justify-between">
                  <span className="w-10 h-1.5 rounded-full bg-white/80" />
                  <div className="flex gap-1.5">
                    <span className="w-5 h-1.5 rounded-full bg-white/40" />
                    <span className="w-5 h-1.5 rounded-full bg-white/40" />
                    <span className="w-5 h-1.5 rounded-full bg-white/40" />
                  </div>
                </div>
                {/* hero text */}
                <div>
                  <p
                    className="text-white text-2xl md:text-3xl font-light leading-tight mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </p>
                  <span className="inline-block rounded-full bg-white/90 px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase text-obsidian font-medium">
                    View Listings
                  </span>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between mt-4 px-1">
              <div>
                <h3 className="text-obsidian text-base font-medium">{p.name}</h3>
                <p className="text-warm-500 text-xs tracking-[0.12em] uppercase mt-0.5">
                  {p.type}
                </p>
              </div>
              <span className="text-gold-dark text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {p.result} →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
