"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Stripe Payment Links ─────────────────────────────────────────────────
// FLAG: Replace the placeholder below with the real Stripe Payment Link for
// the Agent plan ($297/mo + $497 one-time setup, AI Lead Assistant included).
// Apartment and Broker route to Book a Call — no Stripe links needed.
const AGENT_LINK = "STRIPE_LINK_PLACEHOLDER";

type Feature = { bold: string; rest: string };

// ── Plan data ─────────────────────────────────────────────────────────────
const TIERS: {
  name: string;
  audience: string;
  monthly: string;
  setup: string;
  featured: boolean;
  badge: string | null;
  roi: string;
  checkout: boolean;
  cta: { label: string; href: string };
  features: Feature[];
}[] = [
  {
    name: "Agent",
    audience: "Solo agents & small teams",
    monthly: "$297",
    setup: "$497",
    featured: false,
    badge: null,
    roi: "1 closed deal → 4+ years covered",
    checkout: true,
    cta: { label: "Continue to Checkout →", href: AGENT_LINK },
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
    featured: true,
    badge: "Most Popular",
    roi: "1 lease-up campaign → months covered",
    checkout: false,
    cta: { label: "Book a Call →", href: "/#contact" },
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
    featured: false,
    badge: null,
    roi: "1 recruited agent → immediate ROI",
    checkout: false,
    cta: { label: "Book a Call →", href: "/#contact" },
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

export default function GetStartedPage() {
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
            The Agent plan checks out securely through Stripe — no call needed.
            Apartment and Broker builds start with a call so we scope it right.{" "}
            <Link
              href="/#contact"
              className="text-gold-light hover:text-gold underline underline-offset-2 transition-colors duration-200"
            >
              Have questions? Book a call.
            </Link>
          </p>
        </motion.div>
      </section>

      {/* ── Plan cards ───────────────────────────────────────────────── */}
      <section className="px-5 pb-6 md:px-16 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start md:items-stretch">
          {TIERS.map((tier, i) => (
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
              <p className={`text-xs tracking-[0.12em] uppercase mb-4 ${tier.featured ? "text-surf-100" : "text-warm-600"}`}>
                {tier.audience}
              </p>

              {/* ROI hint */}
              <p className={`text-[11px] font-semibold mb-5 ${tier.featured ? "text-surf-100" : "text-gold-dark"}`}>
                ↗ {tier.roi}
              </p>

              {/* Pricing */}
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
                <p className={`text-xs mt-1.5 ${tier.featured ? "text-surf-200" : "text-warm-600"}`}>
                  + {tier.setup} one-time setup
                </p>
              </div>

              {/* Feature list with highlighted key terms */}
              <ul className="flex flex-col gap-3 mb-7 flex-1">
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

              {/* CTA */}
              {tier.checkout ? (
                // Agent: Stripe checkout link
                // FLAG: Wire AGENT_LINK to a real Stripe Payment Link before launch
                <a
                  href={tier.cta.href}
                  className={`flex w-full items-center justify-center rounded-full text-xs tracking-[0.2em] uppercase px-6 py-3.5 font-medium text-center transition-opacity duration-200 ${
                    tier.featured ? "glass-btn text-white" : "glass-btn-accent text-white"
                  }`}
                >
                  {tier.cta.label}
                </a>
              ) : (
                // Apartment / Broker: Book a Call
                <Link
                  href={tier.cta.href}
                  className={`flex w-full items-center justify-center rounded-full text-xs tracking-[0.2em] uppercase px-6 py-3.5 font-medium text-center transition-opacity duration-200 ${
                    tier.featured ? "glass-btn text-white" : "glass-btn-accent text-white"
                  }`}
                >
                  {tier.cta.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Trust line ───────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-warm-500 text-xs font-light text-center px-5 pb-16 md:pb-20 leading-relaxed"
      >
        Agent plan: setup fee + first month billed today. Cancel the monthly anytime.{" "}
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
