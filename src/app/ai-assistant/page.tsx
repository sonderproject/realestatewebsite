"use client";

import { useRef } from "react";
import Link from "next/link";
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

const FEATURES = [
  {
    icon: "✦",
    text: "Answers buyer & renter questions instantly, any hour",
  },
  {
    icon: "◎",
    text: "Qualifies leads — budget, timeline, buying vs. renting",
  },
  {
    icon: "✓",
    text: "Books showings and captures contact details",
  },
  {
    icon: "⬡",
    text: "Trained on your specific listings and market",
  },
  {
    icon: "❝",
    text: "Sounds like your brand, never a generic chatbot",
  },
  {
    icon: "→",
    text: "Hands qualified leads directly to you",
  },
];

// ── Section components ──────────────────────────────────────────────────────

function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-driven cinematic hero: the skyline slowly zooms and darkens while
  // the copy eases up and out as you scroll — the same "plays on scroll" feel
  // as the homepage hero, driven by the uploaded still rather than video frames.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Spring-smooth the raw progress so the motion glides instead of tracking
  // every scroll tick rigidly.
  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const imageScale = useTransform(p, [0, 1], [1.05, 1.22]);
  const imageY = useTransform(p, [0, 1], ["0%", "10%"]);
  const overlayOpacity = useTransform(p, [0, 1], [0.5, 0.92]);
  const contentOpacity = useTransform(p, [0, 0.55], [1, 0]);
  const contentY = useTransform(p, [0, 0.55], [0, -60]);
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);

  return (
    // Tall section so there's scroll distance to drive the motion; the inner
    // layer pins to the viewport while the page scrolls past it.
    <section ref={sectionRef} className="relative bg-obsidian" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Skyline image — parallax zoom */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: imageScale, y: imageY }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundColor: '#071726', backgroundImage: "url('/media/pexels-rdne-8231167.jpg')" }}
          />
        </motion.div>

        {/* Ocean-tinted darkening overlay — deepens as you scroll for legibility */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: overlayOpacity,
            background:
              "linear-gradient(135deg, rgba(7,23,38,0.95) 0%, rgba(11,34,54,0.7) 45%, rgba(20,58,87,0.55) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/95" />
        {/* Subtle grid texture for brand consistency */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Hero content — eases out as the footage zooms */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-16 md:px-16 md:pb-24"
        >
          <div className="max-w-4xl">
            {/* Eyebrow */}
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
              className="text-warm-200 text-sm md:text-base font-light tracking-wide max-w-2xl leading-relaxed mb-8 md:mb-10"
            >
              Buyers and renters don&apos;t wait. They ask at midnight, between
              showings, on weekends — and whoever answers first wins the deal. The
              Sonder AI Lead Assistant is a custom AI, trained on your listings and
              your market, that answers every visitor instantly, qualifies them, and
              books showings 24/7. You stop losing leads to slow replies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <Link
                href="/#pricing"
                className="glass-btn-accent inline-flex items-center gap-3 text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium"
              >
                See Pricing
                <span className="w-6 h-px bg-current inline-block" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
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
        className="max-w-3xl"
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
          The data is brutal: a lead that isn&apos;t answered fast goes cold and
          moves on. But you can&apos;t be on your phone at 2am, mid-showing, or on
          your day off. Your website goes quiet exactly when prospects are most
          curious — and that silence costs you commissions.
        </p>
      </motion.div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-12 px-5 md:py-20 md:px-16">
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
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative bg-obsidian py-12 px-5 md:py-20 md:px-16 overflow-hidden"
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/media/ai-assistant-bg.jpg')" }}
      />
      {/* Ocean-tinted overlay keeps the light skyline readable behind text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(7,23,38,0.92) 0%, rgba(11,34,54,0.82) 45%, rgba(20,58,87,0.78) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/80" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative z-10 mb-8 md:mb-12 max-w-2xl"
      >
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          What It Does
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-warm-50 leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A full-time team member
          <br />
          <em className="text-gold-light font-normal">that never clocks out.</em>
        </h2>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.text}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.06 * i }}
            className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-7 md:p-8 flex flex-col gap-4"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-gold/30 bg-gold/10 text-gold text-lg">
              {feature.icon}
            </div>
            <p className="text-warm-200 text-sm md:text-[15px] font-light leading-relaxed">
              {feature.text}
            </p>
          </motion.div>
        ))}
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
          Ask it anything a buyer might ask.
        </p>
      </motion.div>

      {/* Demo slot — sized to hold a chat widget; the working widget drops in here. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mx-auto w-full max-w-2xl"
      >
        <div className="relative rounded-3xl border border-sand-300 bg-sand-50 overflow-hidden shadow-sm min-h-[460px] md:min-h-[560px] flex flex-col">
          {/* Faux window header so the slot reads as a chat surface */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-sand-200 bg-white/60">
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300" />
            <span className="ml-3 text-warm-400 text-[10px] tracking-[0.25em] uppercase">
              Sonder Assistant
            </span>
          </div>

          {/* Coming-soon state */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
            {/* Chat-bubble illustration */}
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

          {/* Faux input bar — implies the chat widget that will live here */}
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
            plan.
          </p>
          <Link
            href="/#pricing"
            className="glass-btn-accent inline-flex items-center gap-3 text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-3.5 font-medium"
          >
            See Pricing
            <span className="w-6 h-px bg-current inline-block" />
          </Link>
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
      <HowItWorks />
      <WhatItDoes />
      <LiveDemo />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
