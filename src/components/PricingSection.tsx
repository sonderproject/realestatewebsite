"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

const tiers = [
  {
    name: "Agent",
    audience: "Solo agents & small teams",
    monthly: "$297",
    setup: "$497",
    setupLabel: "one-time setup",
    featured: false,
    badge: null,
    roi: "1 closed deal → 4+ years covered",
    cta: { label: "Get Started", href: "/get-started" },
    features: [
      "AI Lead Assistant — captures, qualifies & books 24/7",
      "Custom single-page agent site",
      "Monthly content & listing updates",
      "Lead capture → your inbox or CRM",
      "Headshot, bio & testimonial updates",
      "Google Business Profile management",
      "Hosting, SSL & uptime monitoring",
    ],
  },
  {
    name: "Apartment",
    audience: "Apartment communities",
    monthly: "$747",
    setup: "$2,497",
    setupLabel: "one-time setup",
    featured: true,
    badge: "Most Popular",
    roi: "1 lease-up campaign → months covered",
    cta: { label: "Book a Call", href: "/#contact" },
    features: [
      "AI leasing assistant — answers availability & books tours 24/7",
      "Multi-page community site",
      "Live vacancy & floor plan updates",
      "High-converting tenant inquiry forms",
      "Move-in specials & promotions rotated",
      "Photo gallery & virtual tour integration",
      "Monthly content updates",
      "Hosting, SSL & uptime monitoring",
    ],
  },
  {
    name: "Broker / Co.",
    audience: "Brokerages & management companies",
    monthly: "$1,747",
    setup: "$4,997",
    setupLabel: "one-time setup",
    featured: false,
    badge: null,
    roi: "1 recruited agent → immediate ROI",
    cta: { label: "Book a Call", href: "/#contact" },
    features: [
      "AI assistant — lead routing, FAQs & agent recruitment 24/7",
      "Full multi-page website build included",
      "Agent roster — profiles kept current",
      "IDX / MLS live listing sync",
      "CRM integration (kvCORE, Follow Up Boss…)",
      "Recruiting pages that attract top agents",
      "Custom campaign landing pages quarterly",
      "Priority support — same-day response",
    ],
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} id="pricing" className="bg-white py-12 px-5 md:py-20 md:px-16">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-12 max-w-2xl"
      >
        <SectionLabel index="05" tone="light" className="mb-4">
          Retainer Plans
        </SectionLabel>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your website should be
          <br />
          <em className="text-gold-dark">your best salesperson.</em>
        </h2>
        <p className="text-warm-500 text-sm md:text-base font-light leading-relaxed max-w-xl">
          The average San Diego commission is $15,000+. The Agent plan is $3,564/year — one extra closed deal covers four years.
        </p>
      </motion.div>

      {/* ROI math callout — makes the decision feel obvious */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="relative rounded-2xl overflow-hidden mb-8 md:mb-10 bg-obsidian px-7 py-8 md:px-12 md:py-10"
      >
        <div className="aurora opacity-60" />
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch">
          {[
            { value: "$15K+", label: "Avg. SD commission" },
            { value: "$3,564", label: "Agent plan / year" },
            { value: "< 1 deal", label: "To break even" },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex-1 flex items-center">
              {/* Divider between stats */}
              {i > 0 && (
                <span
                  aria-hidden
                  className="hidden sm:block w-px self-stretch bg-white/10 mx-2"
                />
              )}
              <div className="flex-1 flex flex-col items-center text-center py-3 sm:py-0">
                <span
                  className="text-3xl md:text-4xl font-light text-warm-50 mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {value}
                </span>
                <span className="text-warm-400 text-xs tracking-[0.2em] uppercase font-light">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="relative z-10 text-warm-400 text-xs text-center mt-6 font-light leading-relaxed max-w-lg mx-auto">
          One extra deal closed through your website pays for over <span className="text-warm-200 font-medium">4 years</span> of the Agent plan.
          The question isn&apos;t whether you can afford it — it&apos;s how many leads you&apos;re letting slip through right now.
        </p>
      </motion.div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.42 + 0.1 * i }}
            className={`relative rounded-3xl p-7 md:p-8 flex flex-col ${
              tier.featured
                ? "bg-gradient-to-br from-surf-600 to-ocean text-white shadow-xl shadow-surf-600/25 md:-translate-y-3"
                : "bg-sand-50 border border-sand-200 text-obsidian"
            }`}
          >
            {tier.badge && (
              <span className="absolute top-5 right-5 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-surf-700 font-semibold">
                {tier.badge}
              </span>
            )}

            <h3
              className={`text-2xl font-medium mb-0.5 ${tier.featured ? "text-white" : "text-obsidian"}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tier.name}
            </h3>
            <p className={`text-xs tracking-[0.12em] uppercase mb-4 ${tier.featured ? "text-surf-100" : "text-warm-500"}`}>
              {tier.audience}
            </p>

            {/* ROI hint */}
            <p className={`text-[11px] font-medium mb-5 ${tier.featured ? "text-surf-100" : "text-gold-dark"}`}>
              ↗ {tier.roi}
            </p>

            {/* Pricing block */}
            <div className="mb-6">
              <div className="flex items-end gap-2">
                <span
                  className={`text-4xl font-light leading-none ${tier.featured ? "text-white" : "text-obsidian"}`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tier.monthly}
                </span>
                <span className={`text-xs pb-1 ${tier.featured ? "text-surf-100" : "text-warm-400"}`}>
                  / month
                </span>
              </div>
              {tier.setup && (
                <p className={`text-xs mt-1.5 ${tier.featured ? "text-surf-200" : "text-warm-400"}`}>
                  + {tier.setup} {tier.setupLabel}
                </p>
              )}
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 text-sm ${tier.featured ? "text-surf-100" : "text-gold-dark"}`}>
                    ✓
                  </span>
                  <span className={`text-sm font-light ${tier.featured ? "text-surf-50" : "text-warm-600"}`}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={tier.cta.href}
              className={`rounded-full text-xs tracking-[0.2em] uppercase px-6 py-3.5 font-medium text-center ${
                tier.featured
                  ? "glass-btn text-white"
                  : "glass-btn-accent text-white"
              }`}
            >
              {tier.cta.label}
            </a>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-warm-400 text-xs font-light text-center mt-8"
      >
        No long-term contracts. Cancel anytime. Not sure which plan fits?{" "}
        <a href="#contact" className="text-gold-dark hover:underline">Book a free call</a> and we&apos;ll walk you through it.
      </motion.p>
    </section>
  );
}
