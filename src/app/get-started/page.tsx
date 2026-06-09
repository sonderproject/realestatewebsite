"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Stripe Payment Links ────────────────────────────────────────────────
// Replace each placeholder with the real Stripe Payment Link URL once
// the products are created in the Stripe dashboard.
const AGENT_LINK         = "STRIPE_LINK_PLACEHOLDER";
const AGENT_AI_LINK      = "STRIPE_LINK_PLACEHOLDER";
const APARTMENT_LINK     = "STRIPE_LINK_PLACEHOLDER";
const APARTMENT_AI_LINK  = "STRIPE_LINK_PLACEHOLDER";
const BROKER_LINK        = "STRIPE_LINK_PLACEHOLDER";
const BROKER_AI_LINK     = "STRIPE_LINK_PLACEHOLDER";

// ── Plan data ──────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Agent",
    audience: "Solo agents & small teams",
    monthly: 197,
    setup: "$497",
    featured: false,
    badge: null,
    ai: { price: 97, label: "AI assistant qualifies leads & books showings 24/7" },
    roi: "1 closed deal → 6+ years covered",
    link: AGENT_LINK,
    aiLink: AGENT_AI_LINK,
    features: [
      "Custom single-page agent site",
      "IDX property search integrated",
      "Monthly listing highlights updated",
      "Lead capture → your inbox or CRM",
      "SEO tune-up every month",
      "Headshot, bio & testimonial updates",
      "Google Business Profile management",
      "Hosting, SSL & uptime monitoring",
    ],
  },
  {
    name: "Apartment",
    audience: "Apartment communities",
    monthly: 497,
    setup: "$1,497",
    featured: true,
    badge: "Most Popular",
    ai: { price: 147, label: "AI leasing assistant answers availability & books tours 24/7" },
    roi: "1 lease-up campaign → months covered",
    link: APARTMENT_LINK,
    aiLink: APARTMENT_AI_LINK,
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
    monthly: 997,
    setup: "$2,997",
    featured: false,
    badge: null,
    ai: { price: 197, label: "AI assistant handles lead routing, FAQs & agent recruitment 24/7" },
    roi: "1 recruited agent → immediate ROI",
    link: BROKER_LINK,
    aiLink: BROKER_AI_LINK,
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

function formatPrice(n: number) {
  return "$" + n.toLocaleString();
}

export default function GetStartedPage() {
  // Independent AI toggle per card (indexed to TIERS)
  const [aiOn, setAiOn] = useState([false, false, false]);

  const toggleAi = (i: number) =>
    setAiOn((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />

      {/* ── Hero heading ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-12 px-5 md:pt-36 md:pb-16 md:px-16">
        <div className="aurora opacity-40" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-2xl"
        >
          <p className="text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            Self-Serve Checkout
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light text-warm-50 leading-[1.0] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to get started?
          </h1>
          <p className="text-warm-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
            Pick your plan below. No call needed — you&apos;ll check out securely
            through Stripe.{" "}
            <Link
              href="/#contact"
              className="text-gold-light hover:text-gold underline underline-offset-2 transition-colors duration-200"
            >
              Need to talk first? Book a call.
            </Link>
          </p>
        </motion.div>
      </section>

      {/* ── Plan cards ───────────────────────────────────────────────── */}
      <section className="px-5 pb-6 md:px-16 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start md:items-stretch">
          {TIERS.map((tier, i) => {
            const on = aiOn[i];
            const displayMonthly = tier.monthly + (on ? tier.ai.price : 0);
            const href = on ? tier.aiLink : tier.link;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + 0.1 * i }}
                className={`relative rounded-3xl p-7 md:p-8 flex flex-col ${
                  tier.featured
                    ? "bg-gradient-to-br from-surf-600 to-ocean text-white shadow-xl shadow-surf-600/25 md:-translate-y-3"
                    : "bg-sand-50 border border-sand-200 text-obsidian"
                }`}
              >
                {/* Popular badge */}
                {tier.badge && (
                  <span className="absolute top-5 right-5 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-surf-700 font-semibold">
                    {tier.badge}
                  </span>
                )}

                {/* Name + audience */}
                <h2
                  className={`text-2xl font-medium mb-0.5 ${tier.featured ? "text-white" : "text-obsidian"}`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tier.name}
                </h2>
                <p className={`text-xs tracking-[0.12em] uppercase mb-4 ${tier.featured ? "text-surf-100" : "text-warm-500"}`}>
                  {tier.audience}
                </p>

                {/* ROI hint */}
                <p className={`text-[11px] font-medium mb-5 ${tier.featured ? "text-surf-100" : "text-gold-dark"}`}>
                  ↗ {tier.roi}
                </p>

                {/* Pricing — animates when AI is toggled */}
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <motion.span
                      key={displayMonthly}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-4xl font-light leading-none ${tier.featured ? "text-white" : "text-obsidian"}`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {formatPrice(displayMonthly)}
                    </motion.span>
                    <span className={`text-xs pb-1 ${tier.featured ? "text-surf-100" : "text-warm-400"}`}>
                      / month
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 ${tier.featured ? "text-surf-200" : "text-warm-400"}`}>
                    + {tier.setup} one-time setup
                  </p>
                </div>

                {/* Feature list */}
                <ul className="flex flex-col gap-3 mb-7 flex-1">
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

                {/* AI toggle */}
                <div
                  className={`rounded-xl px-3.5 py-3 mb-5 ${
                    tier.featured
                      ? on
                        ? "bg-white/15 border border-white/30"
                        : "bg-white/10 border border-white/20"
                      : on
                        ? "bg-gold-dark/10 border border-gold/30"
                        : "bg-ocean-deep/5 border border-gold/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAi(i)}
                    className="w-full flex items-center justify-between gap-3 text-left"
                    aria-pressed={on}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className={`text-xs ${tier.featured ? "text-gold-light" : "text-gold-dark"}`}>
                        ✦
                      </span>
                      <div className="min-w-0">
                        <p className={`text-[11px] tracking-[0.15em] uppercase font-semibold leading-snug ${tier.featured ? "text-gold-light" : "text-gold-dark"}`}>
                          AI Assistant
                          <span className={`ml-1.5 font-normal normal-case tracking-normal ${tier.featured ? "text-surf-100" : "text-warm-500"}`}>
                            +{formatPrice(tier.ai.price)}/mo
                          </span>
                        </p>
                        <p className={`text-[10px] font-light mt-0.5 leading-snug ${tier.featured ? "text-surf-100/80" : "text-warm-500"}`}>
                          {tier.ai.label}
                        </p>
                      </div>
                    </div>

                    {/* Pill toggle */}
                    <div
                      className={`relative shrink-0 h-6 w-11 rounded-full transition-colors duration-200 ${
                        on
                          ? tier.featured
                            ? "bg-gold"
                            : "bg-gold-dark"
                          : tier.featured
                            ? "bg-white/20"
                            : "bg-sand-300"
                      }`}
                      aria-hidden
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                          on ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                  </button>
                </div>

                {/* CTA */}
                <a
                  href={href}
                  className={`rounded-full text-xs tracking-[0.2em] uppercase px-6 py-3.5 font-medium text-center transition-opacity duration-200 ${
                    tier.featured
                      ? "glass-btn text-white"
                      : "glass-btn-accent text-white"
                  }`}
                >
                  Continue to Checkout →
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Trust line ───────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-warm-500 text-xs font-light text-center px-5 pb-16 md:pb-20 leading-relaxed"
      >
        Setup fee + first month billed today. Cancel the monthly anytime.{" "}
        <span className="inline-flex items-center gap-1.5">
          <svg
            width="11"
            height="13"
            viewBox="0 0 11 13"
            fill="none"
            className="inline-block text-warm-600"
            aria-hidden
          >
            <rect x="1" y="5" width="9" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3.5 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Secure checkout by Stripe.
        </span>
      </motion.p>

      <Footer />
    </div>
  );
}
