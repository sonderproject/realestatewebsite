"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

type Plan = {
  name: string;
  featured: boolean;
  badge?: string;
  priceOriginal: string; // founding anchor — rendered struck-through
  priceMain: string; // founding rate — dominant number
  priceUnit?: string;
  setupOriginal?: string; // struck-through setup anchor
  setupMain?: string; // discounted setup number
  subtext: string;
  description: string;
  includes: string[];
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
};

const PLANS: Plan[] = [
  {
    name: "One-Time Project",
    featured: false,
    priceOriginal: "$2,497",
    priceMain: "$497",
    priceUnit: "one-time",
    subtext: "Per property • Live in 48 hours",
    description:
      "One complete Digital Property Experience custom-built for a single property.",
    includes: [
      "Cinematic property film",
      "Interactive 3D floor plan",
      "Premium digital property experience",
      "Luxury property story",
      "Curated property gallery",
      "Built-in lead capture form",
      "Shareable link + QR code",
      "90-day hosting included",
      "Two revision rounds",
      "Mobile & desktop QA",
    ],
    cta: { label: "Start a Project", href: "/get-started" },
    secondary: { label: "Larger project? Request a custom quote", href: "#contact" },
  },
  {
    name: "Studio Plan",
    featured: true,
    badge: "Most Popular",
    priceOriginal: "$1,497",
    priceMain: "$997",
    priceUnit: "/month",
    setupOriginal: "$2,497",
    setupMain: "$497",
    subtext: "3-month minimum • 1 property per month • Each live in 48 hours",
    description:
      "An always-on production partner for top-producing agents. After onboarding, every new listing becomes a Digital Property Experience — live in 48 hours, no queue — with hosting included for all active properties while subscribed.",
    includes: [
      "Everything in One-Time Project",
      "One new Digital Property Experience each month",
      "Built-in lead capture on every active property",
      "Hosting included while subscribed",
      "Priority scheduling",
      "Dedicated production workflow tailored to your brand",
      "Monthly production review",
    ],
    cta: { label: "Apply for the Studio Plan", href: "/get-started" },
  },
  {
    name: "Developer Plan",
    featured: false,
    priceOriginal: "$4,997",
    priceMain: "$1,497",
    priceUnit: "/month",
    setupOriginal: "$2,497",
    setupMain: "$1,997",
    subtext: "3-month minimum • Up to 3 properties per month • Each live in 48 hours",
    description:
      "Built for developers, builders, architects, and investment groups managing multiple active projects. After onboarding, receive up to three new Digital Property Experiences every month — each live in 48 hours — with hosting across all active projects.",
    includes: [
      "Everything in Studio Plan",
      "Up to 3 new Digital Property Experiences each month",
      "Built-in lead capture on every active project",
      "Pre-construction and render-based production",
      "Multi-phase project support",
      "Investor presentation formats",
      "Buyer presentation formats",
      "Dedicated production planning",
    ],
    cta: { label: "Apply for the Developer Plan", href: "/get-started" },
  },
];

const DISCLOSURES =
  "All subscription plans begin with a required one-time onboarding and production fee, discounted at the founding rate shown above. This includes brand calibration, production workflow setup, and creation of your first Digital Property Experience. Monthly billing begins after onboarding. Unused monthly allocations do not roll over. Subscriptions require a 3-month minimum commitment. The $497 reel credit applies once, toward a full Digital Property Experience.";

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      ref={ref}
      id="pricing"
      className="scroll-mt-24 bg-white py-16 px-5 md:py-28 md:px-16"
    >
      {/* Header — centered */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel index="07" tone="light" className="mb-5 justify-center">
          Investment
        </SectionLabel>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-light text-obsidian leading-[1.05] mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Sonder <em className="text-gold-dark">Experience™</em>
        </h2>
        <p className="mx-auto max-w-xl text-warm-600 text-base md:text-lg font-light leading-relaxed">
          Every property receives a custom-crafted digital experience designed to
          create emotional connection before a buyer ever steps inside.
        </p>
      </motion.div>

      {/* Entry wedge — highlighted callout strip above the cards */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative mx-auto mt-12 md:mt-16 max-w-5xl overflow-hidden rounded-3xl bg-obsidian px-7 py-7 md:px-10 md:py-8 shadow-xl"
      >
        <div className="aurora opacity-40" />
        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-3">
              <h3
                className="text-warm-50 text-xl md:text-2xl font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Start with a 48-Hour Reel
              </h3>
              <span className="text-gold-light text-xl md:text-2xl font-light">$497</span>
            </div>
            <p className="text-warm-300 text-sm font-light leading-relaxed">
              A cinematic property reel for a single listing, delivered in 48 hours.
              Credited 100% toward your full Digital Property Experience if you upgrade.
            </p>
          </div>
          <a
            href="/get-started"
            className="glass-btn-accent group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold text-white"
          >
            Start with a Reel
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </motion.div>

      {/* Speed positioning — directly above the cards */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-12 md:mt-16 mb-8 text-center text-gold-dark text-xs md:text-sm tracking-[0.25em] uppercase font-medium"
      >
        Every experience delivered in 48 hours.
      </motion.p>

      {/* Three plans — one-time + two recurring partnerships */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 + 0.1 * i }}
            className={`relative flex flex-col overflow-hidden rounded-3xl p-7 md:p-8 ${
              plan.featured
                ? "bg-gradient-to-br from-surf-600 to-ocean text-white shadow-xl shadow-surf-600/25 md:-translate-y-3"
                : "bg-sand-50 border border-sand-200 text-obsidian"
            }`}
          >
            {plan.featured && <div className="aurora opacity-30" />}
            <div className="relative z-10 flex flex-col h-full">
              {plan.badge && (
                <span className="absolute top-0 right-0 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-surf-700 font-semibold">
                  {plan.badge}
                </span>
              )}

              <h3
                className={`text-2xl font-medium mb-1 ${plan.featured ? "text-white" : "text-obsidian"}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {plan.name}
              </h3>

              {/* Price — founding discount: anchor struck through, founding rate dominant */}
              <div className="mt-4 mb-1">
                <p className={`mb-2 text-[10px] tracking-[0.2em] uppercase font-semibold ${plan.featured ? "text-gold-light" : "text-gold-dark"}`}>
                  Founding rate — limited
                </p>
                <div className="flex items-end gap-2 flex-wrap">
                  <span
                    className={`text-4xl md:text-5xl font-light leading-none ${plan.featured ? "text-white" : "text-obsidian"}`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {plan.priceMain}
                  </span>
                  {plan.priceUnit && (
                    <span className={`text-sm pb-1 ${plan.featured ? "text-surf-100" : "text-warm-600"}`}>
                      {plan.priceUnit}
                    </span>
                  )}
                  <span
                    className={`text-xl pb-1 font-light line-through ${plan.featured ? "text-surf-200/80" : "text-warm-400"}`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {plan.priceOriginal}
                  </span>
                </div>
                {plan.setupMain && (
                  <p className={`text-xs mt-1.5 ${plan.featured ? "text-surf-200" : "text-warm-600"}`}>
                    +{" "}
                    <span className={`line-through ${plan.featured ? "text-surf-200/70" : "text-warm-400"}`}>
                      {plan.setupOriginal}
                    </span>{" "}
                    <span className="font-semibold">{plan.setupMain}</span> one-time setup
                  </p>
                )}
              </div>

              {/* Subtext */}
              <p className={`text-[11px] tracking-[0.1em] uppercase mb-5 ${plan.featured ? "text-surf-100" : "text-warm-500"}`}>
                {plan.subtext}
              </p>

              {/* Description */}
              <p className={`text-sm font-light leading-relaxed mb-6 ${plan.featured ? "text-surf-50" : "text-warm-600"}`}>
                {plan.description}
              </p>

              {/* Includes */}
              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 shrink-0 text-sm ${plan.featured ? "text-white" : "text-gold-dark"}`}>
                      ✓
                    </span>
                    <span className={`text-sm leading-snug ${plan.featured ? "text-surf-50" : "text-warm-700"}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.cta.href}
                className="group cta-shine glass-btn-dark flex w-full items-center justify-center gap-2.5 rounded-full text-xs tracking-[0.15em] uppercase px-6 py-4 font-semibold text-center text-white"
              >
                {plan.cta.label}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              {plan.secondary && (
                <a
                  href={plan.secondary.href}
                  className={`mt-4 text-center text-xs font-medium hover:underline ${plan.featured ? "text-surf-100" : "text-gold-dark"}`}
                >
                  {plan.secondary.label} →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Disclosures */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mx-auto mt-10 max-w-4xl text-center text-warm-500 text-xs font-light leading-relaxed"
      >
        {DISCLOSURES}
      </motion.p>
    </section>
  );
}
