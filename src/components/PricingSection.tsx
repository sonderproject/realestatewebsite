"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const tiers = [
  {
    name: "Launch",
    audience: "For solo agents",
    price: "$2,500",
    note: "starting at",
    featured: false,
    features: [
      "Custom-designed landing site",
      "Mobile-first & lightning fast",
      "Lead capture form",
      "Foundational SEO setup",
      "Live in ~2 weeks",
    ],
  },
  {
    name: "Growth",
    audience: "For teams & brokerages",
    price: "$6,500",
    note: "starting at",
    featured: true,
    features: [
      "Everything in Launch",
      "Full multi-page website",
      "Agent profiles & bios",
      "IDX / MLS live listings",
      "CRM integration (Follow Up Boss, kvCORE…)",
      "Blog + advanced SEO",
    ],
  },
  {
    name: "Enterprise",
    audience: "For brokerages & management cos.",
    price: "Custom",
    note: "tailored scope",
    featured: false,
    features: [
      "Everything in Growth",
      "Property search portal",
      "Tenant & leasing portals",
      "Custom integrations & automations",
      "Priority support & retainer",
    ],
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="pricing" className="bg-white py-12 px-5 md:py-20 md:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-14 max-w-2xl"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          Packages
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Pricing that scales
          <br />
          <em className="text-gold-dark">with your business.</em>
        </h2>
      </motion.div>

      {/* Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            className={`relative rounded-3xl p-7 md:p-8 flex flex-col ${
              tier.featured
                ? "bg-gradient-to-br from-surf-600 to-ocean text-white shadow-xl shadow-surf-600/25 md:-translate-y-3"
                : "bg-sand-50 border border-sand-200 text-obsidian"
            }`}
          >
            {tier.featured && (
              <span className="absolute top-5 right-5 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-surf-700 font-semibold">
                Most Popular
              </span>
            )}

            <h3
              className={`text-2xl font-medium mb-1 ${tier.featured ? "text-white" : "text-obsidian"}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tier.name}
            </h3>
            <p className={`text-xs tracking-[0.12em] uppercase mb-5 ${tier.featured ? "text-surf-100" : "text-warm-500"}`}>
              {tier.audience}
            </p>

            <div className="mb-6">
              <span
                className={`text-4xl font-light ${tier.featured ? "text-white" : "text-obsidian"}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tier.price}
              </span>
              <span className={`ml-2 text-xs ${tier.featured ? "text-surf-100" : "text-warm-400"}`}>
                {tier.note}
              </span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 shrink-0 ${tier.featured ? "text-surf-100" : "text-gold-dark"}`}
                  >
                    ✓
                  </span>
                  <span className={`text-sm font-light ${tier.featured ? "text-surf-50" : "text-warm-600"}`}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`rounded-full text-xs tracking-[0.2em] uppercase px-6 py-3.5 font-medium text-center ${
                tier.featured
                  ? "glass-btn text-white"
                  : "glass-btn-accent text-white"
              }`}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-warm-400 text-xs font-light text-center mt-8"
      >
        Every project is quoted to scope. Not sure which fits? Book a free
        consultation and we&apos;ll point you the right way.
      </motion.p>
    </section>
  );
}
