"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Data ──────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Trained on you",
    description:
      "We train your assistant on your listings, market area, FAQs, and tone — so it answers like your team, not a generic bot.",
  },
  {
    number: "02",
    title: "Embedded in your site",
    description:
      "It lives right on your Sonder website, greeting every visitor the second they land.",
  },
  {
    number: "03",
    title: "Qualifies & hands off",
    description:
      "It answers questions, separates serious buyers from browsers, captures their details, and delivers qualified leads straight to you.",
  },
];

const FEATURES: { icon: string; title: string; body: string }[] = [
  {
    icon: "◷",
    title: "24/7 Lead Capture",
    body: "Engages every website visitor the moment they land — midnight, weekend, or mid-showing.",
  },
  {
    icon: "⚡",
    title: "Instant Responses",
    body: "Replies in seconds. Whoever responds first wins the deal — your AI is always first.",
  },
  {
    icon: "◎",
    title: "Buyer & Seller Qualification",
    body: "Asks the right questions: budget, timeline, buying vs. renting — so you only talk to real prospects.",
  },
  {
    icon: "↑",
    title: "Smart Lead Scoring",
    body: "Ranks every lead by readiness so you know exactly who to call back first.",
  },
  {
    icon: "✓",
    title: "Appointment Booking",
    body: "Schedules showings directly into your calendar without you lifting a finger.",
  },
  {
    icon: "✦",
    title: "Personalized Follow-Up",
    body: "Follows up with every lead automatically, tailored to their specific profile and interest.",
  },
  {
    icon: "❝",
    title: "Conversation Memory",
    body: "Remembers every exchange so leads never have to repeat themselves — the experience feels human.",
  },
  {
    icon: "⬡",
    title: "Agent Personality Training",
    body: "Trained on your voice, tone, and brand — never sounds like a generic chatbot.",
  },
  {
    icon: "⌂",
    title: "Property Search Assistance",
    body: "Answers detailed questions about listings, features, neighborhood comps, and availability.",
  },
  {
    icon: "→",
    title: "Market Insights & Updates",
    body: "Shares current pricing trends, inventory levels, and local market data with buyers on demand.",
  },
  {
    icon: "◈",
    title: "Multi-Channel Communication",
    body: "Engages visitors via website chat, SMS, and email — wherever the conversation happens.",
  },
  {
    icon: "⟳",
    title: "Automated Lead Nurturing",
    body: "Keeps cold leads warm with scheduled, personalized touchpoints over days, weeks, and months.",
  },
  {
    icon: "◬",
    title: "Lead Reactivation Campaigns",
    body: "Automatically wins back leads who went quiet with perfectly timed re-engagement outreach.",
  },
  {
    icon: "◉",
    title: "Real-Time Agent Notifications",
    body: "Alerts you the instant a qualified lead needs a human — so you step in at exactly the right moment.",
  },
  {
    icon: "◑",
    title: "Client Relationship Tracking",
    body: "Maintains a complete history of every lead, conversation, and interaction in one place.",
  },
  {
    icon: "▦",
    title: "Performance Analytics & Reporting",
    body: "Shows you what's working: response rates, qualification rates, booking conversions, and more.",
  },
];

const STATS = [
  { value: "2 min", label: "Average first response without AI" },
  { value: "< 3 sec", label: "Average first response with Sonder AI" },
  { value: "78%", label: "Of buyers hire the first agent to respond" },
  { value: "24 / 7", label: "Always on — zero missed conversations" },
];

// ── Section components ────────────────────────────────────────────────────

function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  const imageScale = useTransform(p, [0, 1], [1.05, 1.22]);
  const imageY = useTransform(p, [0, 1], ["0%", "10%"]);
  const overlayOpacity = useTransform(p, [0, 1], [0.5, 0.92]);
  const contentOpacity = useTransform(p, [0, 0.55], [1, 0]);
  const contentY = useTransform(p, [0, 0.55], [0, -60]);
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);

  return (
    <section ref={sectionRef} className="relative bg-obsidian" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: imageScale, y: imageY }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "#071726" }}>
            <Image
              src="/media/pexels-rdne-8231167.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0"
          style={{
            opacity: overlayOpacity,
            background:
              "linear-gradient(135deg, rgba(7,23,38,0.95) 0%, rgba(11,34,54,0.7) 45%, rgba(20,58,87,0.55) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/95" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-16 md:px-16 md:pb-24"
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="inline-flex items-center gap-2.5 mb-6 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md px-4 py-2 shadow-lg shadow-gold/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-gold-light text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold">
                Sonder AI Lead Assistant
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-warm-50 leading-[0.95] mb-6 md:mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every missed message is a{" "}
              <em className="text-gold-light font-normal">lead going to someone else.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="text-warm-200 text-base md:text-lg font-light tracking-wide max-w-2xl leading-relaxed mb-8 md:mb-10"
            >
              Buyers and renters don&apos;t wait. They message at midnight, between
              showings, on weekends — and whoever replies first wins the deal.
              Our AI answers every visitor instantly, qualifies them, and books
              showings 24/7. Trained on your listings and your market.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/get-started"
                className="glass-btn-accent inline-flex items-center gap-3 text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium"
              >
                Get Started
                <span className="w-6 h-px bg-current inline-block" />
              </Link>
              <a
                href="#what-it-does"
                className="text-warm-300 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors duration-300 flex items-center gap-3"
              >
                See All Features
                <span className="w-8 h-px bg-current inline-block" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 right-5 md:right-10 z-20 flex flex-col items-center gap-3"
        >
          <span className="text-warm-300 text-[10px] tracking-[0.4em] uppercase rotate-90 origin-center">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-warm-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="bg-sand-50 py-14 px-5 md:py-24 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="max-w-3xl mb-12 md:mb-16"
      >
        <p className="text-gold-dark text-xs tracking-[0.4em] uppercase mb-4 font-light">
          The Problem
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Most online leads die in the
          <br className="hidden md:block" />{" "}
          <em className="text-gold-dark">first five minutes.</em>
        </h2>
        <p className="text-warm-500 text-base md:text-lg font-light leading-relaxed">
          A lead that isn&apos;t answered fast goes cold and moves on. But you
          can&apos;t be on your phone at 2am, mid-showing, or on your day off — so
          your site goes quiet exactly when buyers are most curious. That silence
          costs you commissions.
        </p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {STATS.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * i }}
            className="rounded-2xl border border-sand-200 bg-white px-5 py-6 md:px-6 md:py-7"
          >
            <p
              className="text-2xl md:text-3xl font-light text-obsidian mb-1.5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {value}
            </p>
            <p className="text-warm-500 text-xs font-light leading-snug">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhatIsIt() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-12 px-5 md:py-20 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="grid lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center"
        >
          {/* Left: explanation */}
          <div>
            <p className="text-gold-dark text-xs tracking-[0.4em] uppercase mb-4 font-light">
              What Is It
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your website now has a
              <br />
              <em className="text-gold-dark">full-time sales agent.</em>
            </h2>
            <div className="space-y-4 text-warm-500 text-sm md:text-base font-light leading-relaxed">
              <p>
                The Sonder AI Lead Assistant is a custom-trained AI that lives on
                your website and handles every visitor conversation — automatically,
                intelligently, and in your voice.
              </p>
              <p>
                Unlike a generic chatbot, it&apos;s trained specifically on your{" "}
                <strong className="font-medium text-obsidian">MLS listings</strong>,{" "}
                your market area, your pricing, your FAQs, and your brand
                personality. It knows your business — so every conversation feels
                like it&apos;s coming from you.
              </p>
              <p>
                It doesn&apos;t just answer questions. It{" "}
                <strong className="font-medium text-obsidian">qualifies leads</strong>,
                scores them by readiness,{" "}
                <strong className="font-medium text-obsidian">books appointments</strong>{" "}
                into your calendar, nurtures cold contacts over time, and delivers
                warm, pre-qualified prospects directly to your inbox.
              </p>
            </div>
          </div>

          {/* Right: capability pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Trained on your listings & market", icon: "⬡" },
              { label: "Responds in under 3 seconds, 24/7", icon: "◷" },
              { label: "Sounds like you — never a bot", icon: "❝" },
              { label: "Qualifies, scores & routes leads", icon: "◎" },
              { label: "Books showings automatically", icon: "✓" },
              { label: "Follows up so you don't have to", icon: "→" },
            ].map(({ label, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + 0.07 * i }}
                className="flex items-start gap-3 rounded-xl border border-sand-200 bg-sand-50 px-4 py-4"
              >
                <span className="text-gold-dark text-base mt-0.5 shrink-0">{icon}</span>
                <p className="text-obsidian text-sm font-light leading-snug">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-sand-50 py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-14 max-w-2xl"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          How It Works
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Trained on you.
          <br />
          <em className="text-gold-dark">Working while you don&apos;t.</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-sand-200 rounded-2xl overflow-hidden border border-sand-200">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            className="bg-white p-7 md:p-8 flex flex-col"
          >
            <span
              className="text-gold-dark text-3xl md:text-4xl font-light mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {step.number}
            </span>
            <h3 className="text-obsidian text-lg md:text-xl font-medium mb-2">
              {step.title}
            </h3>
            <p className="text-warm-500 text-sm font-light leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhatItDoes() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      id="what-it-does"
      ref={ref}
      className="relative bg-obsidian py-14 px-5 md:py-24 md:px-16 overflow-hidden"
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/media/ai-assistant-bg.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(7,23,38,0.95) 0%, rgba(11,34,54,0.88) 45%, rgba(20,58,87,0.85) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-transparent to-obsidian/80" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-10 md:mb-14 max-w-2xl"
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
            What the AI Lead Assistant Does
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-warm-50 leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A full-time team member
            <br />
            <em className="text-gold-light font-normal">that never clocks out.</em>
          </h2>
          <p className="text-warm-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
            16 capabilities working together — so every lead is captured, every
            question is answered, and every appointment is booked without you
            having to be available.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.04 * i }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-5 md:p-6 flex flex-col gap-3 hover:bg-white/[0.08] transition-colors duration-300"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl border border-gold/30 bg-gold/10 text-gold text-base shrink-0">
                {feature.icon}
              </div>
              <h3
                className="text-warm-50 text-sm md:text-[15px] font-medium leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {feature.title}
              </h3>
              <p className="text-warm-400 text-xs md:text-sm font-light leading-relaxed">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveDemo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="text-center mb-8 md:mb-12 max-w-2xl mx-auto"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          Live Demo
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Try it yourself.
        </h2>
        <p className="text-warm-500 text-sm md:text-base font-light leading-relaxed">
          Ask it anything a buyer might ask. See how it qualifies and responds.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mx-auto w-full max-w-2xl"
      >
        <div className="relative rounded-3xl border border-sand-300 bg-sand-50 overflow-hidden shadow-sm min-h-[460px] md:min-h-[560px] flex flex-col">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-sand-200 bg-white/60">
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
            <span className="ml-3 text-warm-400 text-[10px] tracking-[0.25em] uppercase">
              Sonder Assistant
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-gold-dark/20 bg-gold-dark/5 text-gold-dark mb-6">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12a8 8 0 0 1-8 8H7l-4 3v-4.5A8 8 0 1 1 21 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="8.5" cy="12" r="1" fill="currentColor" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <circle cx="15.5" cy="12" r="1" fill="currentColor" />
              </svg>
            </div>
            <p
              className="text-obsidian text-xl md:text-2xl font-light mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Live demo coming soon.
            </p>
            <p className="text-warm-500 text-sm font-light max-w-xs">
              We&apos;re putting the finishing touches on it. Your assistant will
              answer right here.
            </p>
          </div>
          <div className="px-5 py-4 border-t border-sand-200 bg-white/60">
            <div className="flex items-center gap-3 rounded-full border border-sand-300 bg-white px-5 py-3">
              <span className="text-warm-400 text-sm font-light flex-1">
                Ask a question…
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-dark/10 text-gold-dark text-sm">
                →
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CompanionApp() {
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
          background: "linear-gradient(135deg, #071726 0%, #0e2d48 50%, #071c30 100%)",
        }}
      >
        <div className="aurora opacity-50" />
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 px-7 py-12 md:px-14 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
            {/* Left */}
            <div className="flex-1">
              {/* Coming soon badge */}
              <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-gold/30 bg-gold/[0.08] px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                <span className="text-gold-light text-[11px] tracking-[0.3em] uppercase font-semibold">
                  Coming Soon
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-light text-warm-50 leading-[1.05] mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Sonder Studio
                <br />
                <em className="text-gold-light font-normal">companion app.</em>
              </h2>
              <p className="text-warm-400 text-sm md:text-base font-light leading-relaxed max-w-lg mb-8">
                Your AI assistant, your lead pipeline, and your site analytics —
                all in your pocket. The Sonder Studio app will let you monitor
                live conversations, take over from the AI at any moment, and
                respond to hot leads from anywhere. One tap to step in, one tap
                to hand back.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-300 shrink-0">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.32 2.99-2.54 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor" />
                  </svg>
                  <div>
                    <p className="text-warm-500 text-[9px] tracking-[0.2em] uppercase">Coming to</p>
                    <p className="text-warm-100 text-sm font-medium">App Store</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-300 shrink-0">
                    <path d="M3.18 23.76c.39.21.84.22 1.24 0l11.05-6.37L12.45 14 3.18 23.76zM20.7 10.01l-2.83-1.63L14.6 12l3.27 3.27 2.83-1.63a1.5 1.5 0 0 0 0-2.63zM3.18.24a1.5 1.5 0 0 0-.18.72v22.08c0 .26.06.5.18.72L12.45 12 3.18.24zM4.42.24L15.47 6.61l-3.02 3.02L4.42.24z" fill="currentColor" />
                  </svg>
                  <div>
                    <p className="text-warm-500 text-[9px] tracking-[0.2em] uppercase">Coming to</p>
                    <p className="text-warm-100 text-sm font-medium">Google Play</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: feature pills */}
            <div className="lg:w-72 grid grid-cols-1 gap-2.5">
              {[
                { icon: "◉", text: "Live AI conversation feed" },
                { icon: "⚡", text: "Instant lead alert push notifications" },
                { icon: "✓", text: "One-tap agent takeover from the AI" },
                { icon: "◎", text: "Lead scoring & qualification summaries" },
                { icon: "▦", text: "Site traffic & conversion analytics" },
                { icon: "◷", text: "Available on iOS & Android" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3"
                >
                  <span className="text-gold text-sm shrink-0">{icon}</span>
                  <p className="text-warm-300 text-sm font-light">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FinalCTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-obsidian px-5 py-12 md:px-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(115deg, #071726 0%, #143A57 55%, #0B2236 100%)",
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
          style={{ background: "radial-gradient(circle, #3E9BD4 0%, transparent 70%)" }}
        />

        <div className="relative z-10 px-7 py-12 md:px-16 md:py-16 text-center max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-5xl font-light text-warm-50 leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stop losing leads
            <br />
            <em className="text-gold-light font-normal">to silence.</em>
          </h2>
          <p className="text-warm-300 text-sm md:text-base font-light leading-relaxed mb-9 max-w-xl mx-auto">
            The AI Lead Assistant is available as an add-on to any Sonder website
            plan. Set up in days, not weeks. First lead response in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="glass-btn-accent inline-flex items-center gap-3 text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-3.5 font-medium"
            >
              Get Started
              <span className="w-6 h-px bg-current inline-block" />
            </Link>
            <Link
              href="/#contact"
              className="text-warm-300 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors duration-300 flex items-center gap-3"
            >
              Book a Call First
              <span className="w-8 h-px bg-current inline-block" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function AIAssistantPage() {
  return (
    <main className="bg-obsidian">
      <Navbar />
      <Hero />
      <Problem />
      <WhatIsIt />
      <HowItWorks />
      <WhatItDoes />
      <LiveDemo />
      <CompanionApp />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
