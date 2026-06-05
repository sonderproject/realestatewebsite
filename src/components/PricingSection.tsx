"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WHY_RETAINER = [
  {
    icon: "↑",
    title: "Google rewards fresh sites",
    body: "Agents and properties that update content consistently rank higher. Static sites drift down — maintained ones climb.",
  },
  {
    icon: "⟳",
    title: "Your market changes monthly",
    body: "New listings, sold properties, price shifts, seasonal campaigns — your site needs to reflect reality or it hurts your credibility.",
  },
  {
    icon: "⚡",
    title: "We handle every update",
    body: "Photos, copy, listings, bio changes, new reviews — you send it, we publish it. Zero tech work on your end.",
  },
  {
    icon: "⬡",
    title: "Hosting, security & uptime included",
    body: "No separate bills for servers, SSL, or maintenance. One flat fee keeps everything running and protected.",
  },
];

const tiers = [
  {
    name: "Agent",
    audience: "Solo agents & small teams",
    monthly: "$197",
    setup: "$497",
    setupLabel: "one-time setup",
    featured: false,
    badge: null,
    features: [
      "Custom single-page agent site",
      "Mobile-first, sub-2s load time",
      "Monthly listing highlights updated",
      "Lead capture form → your inbox or CRM",
      "SEO tune-up every month",
      "Headshot, bio & testimonial updates",
      "Google Business Profile management",
      "Hosting, SSL & uptime monitoring",
    ],
  },
  {
    name: "Apartment",
    audience: "Apartment communities",
    monthly: "$497",
    setup: "$1,497",
    setupLabel: "one-time setup",
    featured: true,
    badge: "Most Popular",
    features: [
      "Multi-page community site",
      "Live vacancy & floor plan updates",
      "High-converting tenant inquiry forms",
      "Google ranking for local rent searches",
      "Move-in specials & promotions rotated",
      "Photo gallery & virtual tour integration",
      "Monthly traffic & lead report",
      "Hosting, SSL & uptime monitoring",
    ],
  },
  {
    name: "Broker / Co.",
    audience: "Brokerages & management companies",
    monthly: "$997",
    setup: "$2,997",
    setupLabel: "full website design",
    featured: false,
    badge: null,
    features: [
      "Full multi-page website build included",
      "Agent roster — profiles kept current",
      "IDX / MLS live listing sync",
      "CRM integration (kvCORE, Follow Up Boss…)",
      "Recruiting pages that attract top agents",
      "Blog + market reports for long-term SEO",
      "Custom campaign landing pages quarterly",
      "Priority support — same-day response",
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
        className="mb-8 md:mb-12 max-w-2xl"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          Retainer Plans
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          One flat fee.
          <br />
          <em className="text-gold-dark">Everything handled.</em>
        </h2>
        <p className="text-warm-500 text-sm font-light leading-relaxed max-w-xl">
          Your website isn&apos;t a one-time purchase — it&apos;s a live marketing tool.
          We keep it fresh, fast, and converting every single month.
        </p>
      </motion.div>

      {/* Why retainer — 4 reasons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-sand-200 rounded-2xl overflow-hidden border border-sand-200 mb-10 md:mb-14"
      >
        {WHY_RETAINER.map((r) => (
          <div key={r.title} className="bg-white p-6 md:p-7 flex flex-col gap-2">
            <span className="text-gold-dark text-lg font-light">{r.icon}</span>
            <h4 className="text-obsidian text-sm font-medium leading-snug">{r.title}</h4>
            <p className="text-warm-500 text-xs font-light leading-relaxed">{r.body}</p>
          </div>
        ))}
      </motion.div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 + 0.1 * i }}
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
            <p className={`text-xs tracking-[0.12em] uppercase mb-5 ${tier.featured ? "text-surf-100" : "text-warm-500"}`}>
              {tier.audience}
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
        transition={{ duration: 0.8, delay: 0.55 }}
        className="text-warm-400 text-xs font-light text-center mt-8"
      >
        No long-term contracts. Cancel anytime. Not sure which plan fits?{" "}
        <a href="#contact" className="text-gold-dark hover:underline">Book a free call</a> and we&apos;ll walk you through it.
      </motion.p>
    </section>
  );
}
