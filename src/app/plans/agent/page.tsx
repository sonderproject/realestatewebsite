"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/SectionLabel";

// ── Hero ──────────────────────────────────────────────────────────────────

function HeroAgent() {
  return (
    <section className="relative bg-obsidian overflow-hidden flex flex-col items-center justify-center text-center min-h-[85vh] md:min-h-screen px-5 md:px-16 pt-24 pb-16">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #071726 0%, #0B2236 40%, #143A57 70%, #071726 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/90" />
      <div className="aurora opacity-50" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 mb-8 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="text-gold-light text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold">
            Agent Plan
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-warm-50 leading-[0.92] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your website.
          <br />
          <em className="text-gold-light font-normal">Working while you sleep.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="text-warm-300 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto mb-10"
        >
          The Agent plan gives you a premium real estate site and an AI assistant
          that answers leads, qualifies buyers, and books showings — 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/get-started"
            className="cta-shine glass-btn-accent text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-semibold"
          >
            Get Started — $297/mo
          </Link>
          <Link
            href="/#pricing"
            className="text-warm-300 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors duration-300 flex items-center gap-3"
          >
            View all plans
            <span className="w-8 h-px bg-current inline-block" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── What's Included ───────────────────────────────────────────────────────

const INCLUSIONS = [
  "AI lead assistant — answers buyer questions, qualifies leads, and books showings 24/7",
  "Premium single-page agent website, custom-built for your brand",
  "Lead capture routed to your inbox or CRM",
  "Headshot, bio & testimonial updates included",
  "Hosting, SSL & uptime monitoring",
  "One-time setup — $497",
  "No long-term contracts. Cancel anytime.",
];

function InclusionsAgent() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="bg-white py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="flex justify-center mb-10 md:mb-14"
      >
        <SectionLabel index="01" tone="light">
          What&apos;s included
        </SectionLabel>
      </motion.div>

      {/* Centered list — container centered, text left-aligned within it */}
      <ul className="max-w-xl mx-auto flex flex-col divide-y divide-sand-200">
        {INCLUSIONS.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.07 * i }}
            className="flex items-start gap-4 py-4 md:py-5"
          >
            <span className="mt-0.5 shrink-0 text-gold-dark text-sm">✓</span>
            <span className="text-obsidian text-sm md:text-base font-light leading-relaxed">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

// ── How the assistant works ───────────────────────────────────────────────

const STEPS = [
  { number: "01", title: "A lead lands on your site" },
  {
    number: "02",
    title: "The assistant answers instantly — trained on your listings and market",
  },
  {
    number: "03",
    title: "It qualifies them (serious buyer vs. browser) and scores the lead",
  },
  {
    number: "04",
    title: "It books a showing or consultation directly into your calendar",
  },
];

function HowItWorksAgent() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative py-12 px-5 md:py-20 md:px-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #071726 0%, #0B2236 50%, #143A57 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="aurora opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative z-10 flex justify-center mb-10 md:mb-14"
      >
        <SectionLabel index="02" tone="dark">
          How it works
        </SectionLabel>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 * i }}
            className="bg-white/[0.04] backdrop-blur-sm p-7 md:p-8 flex flex-col"
          >
            <span
              className="text-gold text-3xl md:text-4xl font-light mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {step.number}
            </span>
            <h3 className="text-warm-50 text-lg md:text-xl font-medium leading-snug">
              {step.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Demo Placeholder ──────────────────────────────────────────────────────

function DemoAgent() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="flex justify-center mb-8 md:mb-10"
      >
        <SectionLabel index="03" tone="light">
          See it live
        </SectionLabel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative rounded-3xl overflow-hidden bg-obsidian px-7 py-20 md:px-16 md:py-28 text-center"
      >
        <div className="aurora opacity-50" />
        <div className="relative z-10 max-w-md mx-auto">
          <p
            className="text-warm-50 text-2xl md:text-3xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A live demo is coming soon.
          </p>
          <a
            href="mailto:hello@sonderstudio.space"
            className="text-gold-light text-sm font-light hover:text-gold transition-colors duration-200"
          >
            Want early access?
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ── Pricing Block ─────────────────────────────────────────────────────────

const PLAN_CHIPS = [
  "AI Lead Assistant",
  "Custom agent site",
  "Lead capture → inbox / CRM",
  "Monthly updates",
  "Hosting & SSL",
];

function PricingAgent() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 px-5 md:py-28 md:px-16 text-center"
      style={{
        background:
          "linear-gradient(135deg, #071726 0%, #0B2236 40%, #143A57 70%, #071726 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="aurora opacity-65" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <SectionLabel index="04" tone="dark">
            Pricing
          </SectionLabel>
        </motion.div>

        {/* ROI line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-10"
        >
          ↗ 1 closed deal → 4+ years covered
        </motion.p>

        {/* Giant price */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-3 leading-none"
        >
          <span
            className="text-[5.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-light text-white leading-none tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            $297
          </span>
          <span className="text-warm-300 text-xl md:text-2xl font-light ml-2">
            /mo
          </span>
        </motion.div>

        {/* Setup cost */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-warm-400 text-sm md:text-base font-light mb-12"
        >
          + $497 one-time setup
        </motion.p>

        {/* Feature chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {PLAN_CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-sm px-4 py-1.5 text-warm-200 text-xs font-light tracking-wide"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <Link
            href="/get-started"
            className="cta-shine glass-btn-accent group inline-flex items-center justify-center gap-3 text-white text-sm tracking-[0.15em] uppercase rounded-full px-10 py-5 font-semibold"
          >
            Get Started — $297/mo
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Policy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-warm-500 text-xs font-light mt-7"
        >
          No long-term contracts. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}

// ── Bundle Offer ──────────────────────────────────────────────────────────

function BundleAgent() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-obsidian px-5 py-12 md:px-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(115deg, #071726 0%, #143A57 55%, #0B2236 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          className="absolute -left-20 -bottom-24 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #3E9BD4 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 px-7 py-12 md:px-16 md:py-16 text-center max-w-3xl mx-auto">
          <p className="text-gold text-[10px] md:text-xs tracking-[0.35em] uppercase font-light mb-5">
            Bundle & Save
          </p>
          <h2
            className="text-3xl md:text-5xl font-light text-warm-50 leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One studio.
            <br />
            <em className="text-gold-light font-normal">
              Both sides of your listing.
            </em>
          </h2>
          <p className="text-warm-300 text-sm md:text-base font-light leading-relaxed mb-9 max-w-xl mx-auto">
            Book any Sonder Photography package and get{" "}
            <strong className="text-warm-50 font-medium">
              30% off your website setup fee
            </strong>{" "}
            — your listings and your digital presence, handled by one team.
          </p>
          <Link
            href="/photography"
            className="glass-btn-accent inline-block text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-3.5 font-medium"
          >
            See Photography Packages
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function AgentPlanPage() {
  return (
    <main className="bg-obsidian">
      <Navbar />
      <HeroAgent />
      <InclusionsAgent />
      <HowItWorksAgent />
      <DemoAgent />
      <PricingAgent />
      <BundleAgent />
      <Footer />
    </main>
  );
}
