"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

type Feature = { bold: string; rest: string };

const tiers: {
  name: string;
  audience: string;
  monthly: string;
  setup: string;
  setupLabel: string;
  featured: boolean;
  badge: string | null;
  roi: string;
  cta: { label: string; href: string };
  features: Feature[];
}[] = [
  {
    name: "Agent",
    audience: "Solo agents & small teams",
    monthly: "$297",
    setup: "$497",
    setupLabel: "one-time setup",
    featured: true,
    badge: "Most Popular",
    roi: "1 closed deal → 4+ years covered",
    cta: { label: "Get Started", href: "/plans/agent" },
    features: [
      { bold: "AI Lead Assistant", rest: " — captures, qualifies & books 24/7" },
      { bold: "Custom single-page agent site", rest: "" },
      { bold: "Monthly content & listing updates", rest: "" },
      { bold: "Lead capture", rest: " → your inbox or CRM" },
      { bold: "Headshot, bio & testimonials", rest: " updated anytime" },
      { bold: "Google Business Profile", rest: " management" },
      { bold: "Hosting, SSL & uptime monitoring", rest: "" },
    ],
  },
  {
    name: "Apartment",
    audience: "Apartment communities",
    monthly: "$1,197",
    setup: "$2,497",
    setupLabel: "one-time setup",
    featured: false,
    badge: null,
    roi: "1 lease-up campaign → months covered",
    cta: { label: "Book a Call", href: "/#contact" },
    features: [
      { bold: "AI leasing assistant", rest: " — answers availability, qualifies renters & books tours 24/7" },
      { bold: "Conversion-optimized floor-plan page", rest: " (all plans displayed, assistant attached)" },
      { bold: "3D virtual tour", rest: " of the community included" },
      { bold: "Monthly availability updates", rest: " — your assistant stays current" },
      { bold: "Move-in specials & promos", rest: " updated as needed" },
      { bold: "Hosting, SSL & uptime monitoring", rest: "" },
      { bold: "Monthly lead & traffic report", rest: "" },
    ],
  },
  {
    name: "Broker / Co.",
    audience: "Brokerages & management companies",
    monthly: "$2,197",
    setup: "$4,997",
    setupLabel: "one-time setup",
    featured: false,
    badge: null,
    roi: "1 recruited agent → immediate ROI",
    cta: { label: "Book a Call", href: "/#contact" },
    features: [
      { bold: "AI assistant", rest: " — lead routing, FAQs & agent recruitment 24/7" },
      { bold: "Full multi-page website", rest: " build included" },
      { bold: "Agent roster", rest: " — profiles kept current" },
      { bold: "IDX / MLS", rest: " live listing sync" },
      { bold: "CRM integration", rest: " (kvCORE, Follow Up Boss…)" },
      { bold: "Recruiting pages", rest: " that attract top agents" },
      { bold: "Custom campaign landing pages", rest: " quarterly" },
      { bold: "Priority support", rest: " — same-day response" },
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
        <p className="text-warm-600 text-sm md:text-base font-light leading-relaxed max-w-xl">
          The average San Diego commission is $15,000+. The Agent plan is $3,564/year — one extra closed deal covers four years.
        </p>
      </motion.div>

      {/* ROI math callout */}
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
          One extra deal closed through your website pays for over{" "}
          <span className="text-warm-200 font-medium">4 years</span> of the Agent plan.
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
            <p className={`text-xs tracking-[0.12em] uppercase mb-4 ${tier.featured ? "text-surf-100" : "text-warm-600"}`}>
              {tier.audience}
            </p>

            {/* ROI hint */}
            <p className={`text-[11px] font-semibold mb-5 ${tier.featured ? "text-surf-100" : "text-gold-dark"}`}>
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
                <span className={`text-xs pb-1 ${tier.featured ? "text-surf-100" : "text-warm-600"}`}>
                  / month
                </span>
              </div>
              {tier.setup && (
                <p className={`text-xs mt-1.5 ${tier.featured ? "text-surf-200" : "text-warm-600"}`}>
                  + {tier.setup} {tier.setupLabel}
                </p>
              )}
            </div>

            {/* Feature list with highlighted key terms */}
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {tier.features.map((f) => (
                <li key={f.bold} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 text-sm ${tier.featured ? "text-white" : "text-gold-dark"}`}>
                    ✓
                  </span>
                  <span className="text-sm leading-snug">
                    <span className={`font-semibold ${tier.featured ? "text-white" : "text-obsidian"}`}>
                      {f.bold}
                    </span>
                    {f.rest && (
                      <span className={`font-light ${tier.featured ? "text-surf-100" : "text-warm-700"}`}>
                        {f.rest}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={tier.cta.href}
              className="group cta-shine glass-btn-dark flex w-full items-center justify-center gap-2.5 rounded-full text-xs tracking-[0.2em] uppercase px-8 py-4 font-semibold text-center text-white"
            >
              {tier.cta.label}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-warm-600 text-xs font-light text-center mt-8"
      >
        No long-term contracts. Cancel anytime. Not sure which plan fits?{" "}
        <a href="#contact" className="text-gold-dark hover:underline">Book a free call</a> and we&apos;ll walk you through it.
      </motion.p>
    </section>
  );
}
