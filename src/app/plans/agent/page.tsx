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
    <section className="relative bg-obsidian overflow-hidden flex flex-col justify-end min-h-[85vh] md:min-h-screen pb-16 px-5 md:pb-24 md:px-16 pt-28 md:pt-36">
      {/* Ocean-depth gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #071726 0%, #0B2236 40%, #143A57 70%, #071726 100%)",
        }}
      />
      {/* Subtle grid */}
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

      <div className="relative z-10 max-w-4xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 mb-6 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="text-gold-light text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold">
            Agent Plan
          </span>
        </motion.div>

        {/* Headline */}
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

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="text-warm-300 text-sm md:text-base font-light leading-relaxed max-w-xl mb-9"
        >
          The Agent plan gives you a premium real estate site and an AI assistant
          that answers leads, qualifies buyers, and books showings — 24/7.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/get-started"
            className="glass-btn-accent text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium"
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
        className="mb-10 md:mb-14"
      >
        <SectionLabel index="01" tone="light">
          What&apos;s included
        </SectionLabel>
      </motion.div>

      <ul className="max-w-2xl flex flex-col divide-y divide-sand-200">
        {INCLUSIONS.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
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
  {
    number: "01",
    title: "A lead lands on your site",
  },
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
        className="relative z-10 mb-10 md:mb-14"
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
        className="mb-8 md:mb-10"
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

function PricingAgent() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-sand-50 py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-10"
      >
        <SectionLabel index="04" tone="light">
          Pricing
        </SectionLabel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-sm"
      >
        <div className="rounded-3xl bg-white border border-sand-200 p-8 md:p-10 flex flex-col gap-6 shadow-sm">
          {/* Price */}
          <div>
            <div className="flex items-end gap-2 mb-1.5">
              <span
                className="text-5xl font-light text-obsidian leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                $297
              </span>
              <span className="text-warm-600 text-sm pb-1">/ month</span>
            </div>
            <p className="text-warm-600 text-sm font-light">
              + $497 one-time setup
            </p>
          </div>

          {/* Policy */}
          <p className="text-warm-600 text-sm font-light">
            No long-term contracts. Cancel anytime.
          </p>

          {/* CTA */}
          <Link
            href="/get-started"
            className="glass-btn-accent flex w-full items-center justify-center rounded-full text-xs tracking-[0.2em] uppercase px-8 py-4 font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
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
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Glow orb */}
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
