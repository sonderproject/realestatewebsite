"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  const imageScale   = useTransform(p, [0, 1], [1.05, 1.22]);
  const imageY       = useTransform(p, [0, 1], ["0%", "10%"]);
  const overlayOpacity = useTransform(p, [0, 1], [0.5, 0.92]);
  const contentOpacity = useTransform(p, [0, 0.55], [1, 0]);
  const contentY     = useTransform(p, [0, 0.55], [0, -60]);
  const hintOpacity  = useTransform(p, [0, 0.12], [1, 0]);

  return (
    <section ref={sectionRef} className="relative bg-obsidian" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: imageScale, y: imageY }}>
          <div className="absolute inset-0" style={{ backgroundColor: "#071726" }}>
            <Image src="/media/pexels-rdne-8231167.jpg" alt="" fill priority className="object-cover object-center" />
          </div>
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: overlayOpacity, background: "linear-gradient(135deg, rgba(7,23,38,0.95) 0%, rgba(11,34,54,0.7) 45%, rgba(20,58,87,0.55) 100%)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/95" />

        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-16 md:px-16 md:pb-24">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
              className="inline-flex items-center gap-2.5 mb-6 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-gold-light text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold">Sonder AI Lead Assistant</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-warm-50 leading-[0.95] mb-6 md:mb-8"
              style={{ fontFamily: "var(--font-display)" }}>
              Your best closer
              <br />
              <em className="text-gold-light font-normal">works at 2am.</em>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.85 }}
              className="text-warm-200 text-base md:text-lg font-light max-w-xl leading-relaxed mb-8 md:mb-10">
              An AI trained on your listings, your market, and your voice — capturing,
              qualifying, and booking leads around the clock while you focus on closing.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-wrap items-center gap-4">
              <Link href="/get-started" className="glass-btn-accent inline-flex items-center gap-3 text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium">
                Add to My Plan
                <span className="w-6 h-px bg-current inline-block" />
              </Link>
              <a href="#how-it-works" className="text-warm-300 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors duration-300 flex items-center gap-3">
                See How It Works
                <span className="w-8 h-px bg-current inline-block" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-6 right-5 md:right-10 z-20 flex flex-col items-center gap-3">
          <span className="text-warm-300 text-[10px] tracking-[0.4em] uppercase rotate-90 origin-center">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-warm-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

// ── The Cost of Silence ──────────────────────────────────────────────────

function CostOfSilence() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-sand-50 py-14 px-5 md:py-24 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}
          className="mb-10 md:mb-14 max-w-2xl">
          <p className="text-gold-dark text-xs tracking-[0.4em] uppercase mb-4 font-light">The Reality</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}>
            Silence is
            <br /><em className="text-gold-dark">losing deals.</em>
          </h2>
        </motion.div>

        {/* Before / After scenario */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-10 md:mb-12">
          {/* Without */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl border border-sand-200 bg-white p-6 md:p-8">
            <p className="text-warm-400 text-[10px] tracking-[0.3em] uppercase mb-5 font-medium">Without Sonder AI</p>
            <div className="space-y-3">
              {[
                { time: "11:47 PM", event: "Buyer lands on your site with a question.", dim: false },
                { time: "11:48 PM", event: "No reply. You're asleep.", dim: true },
                { time: "8:12 AM", event: "You finally respond — 8 hours later.", dim: true },
                { time: "8:13 AM", event: "They already signed with someone else.", dim: true },
              ].map(({ time, event, dim }) => (
                <div key={time} className={`flex gap-3 items-start ${dim ? "opacity-40" : ""}`}>
                  <span className="text-warm-400 text-[11px] tabular-nums mt-0.5 shrink-0 w-16">{time}</span>
                  <span className="text-warm-600 text-sm font-light leading-snug">{event}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-sand-200">
              <p className="text-warm-400 text-xs font-light">Result: <span className="text-warm-600 font-medium">Lead lost. Commission gone.</span></p>
            </div>
          </motion.div>

          {/* With */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}
            className="rounded-2xl bg-obsidian p-6 md:p-8 relative overflow-hidden">
            <div className="aurora opacity-40" />
            <div className="relative z-10">
              <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-5 font-medium">With Sonder AI</p>
              <div className="space-y-3">
                {[
                  { time: "11:47 PM", event: "Buyer lands on your site with a question.", highlight: false },
                  { time: "11:47 PM", event: "AI responds in 3 seconds. Starts qualifying.", highlight: true },
                  { time: "11:52 PM", event: "Budget confirmed. Timeline: 60 days. Hot lead.", highlight: true },
                  { time: "11:53 PM", event: "Showing booked for Saturday. You're notified.", highlight: true },
                ].map(({ time, event, highlight }) => (
                  <div key={time + event} className="flex gap-3 items-start">
                    <span className={`text-[11px] tabular-nums mt-0.5 shrink-0 w-16 ${highlight ? "text-gold" : "text-warm-500"}`}>{time}</span>
                    <span className={`text-sm font-light leading-snug ${highlight ? "text-warm-100" : "text-warm-400"}`}>{event}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-warm-400 text-xs font-light">Result: <span className="text-gold font-medium">Qualified lead. Showing booked. Deal in motion.</span></p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Single brutal stat */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center">
          <p className="text-warm-400 text-sm font-light">
            <span className="text-obsidian font-semibold text-base">78% of buyers</span> hire the first agent to respond.{" "}
            <span className="text-obsidian font-semibold text-base">Your AI responds in 3 seconds.</span>{" "}
            Every time. No exceptions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── What It Does ─────────────────────────────────────────────────────────

function WhatItDoes() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const PILLARS = [
    {
      icon: "◷",
      title: "Always On",
      headline: "24/7 lead capture & instant response.",
      body: "While you sleep, show homes, or take a day off — your AI is on your site, answering every visitor in seconds.",
      tags: ["24/7 Lead Capture", "Instant Responses", "Multi-Channel"],
    },
    {
      icon: "◎",
      title: "Qualifies For You",
      headline: "Only warm leads reach your phone.",
      body: "Budget. Timeline. Buying vs. renting. Motivation. Your AI asks the right questions and scores every lead before you ever pick up.",
      tags: ["Buyer & Seller Qualification", "Smart Lead Scoring", "Real-Time Notifications"],
    },
    {
      icon: "✓",
      title: "Fills Your Calendar",
      headline: "Showings booked. No back-and-forth.",
      body: "Qualified leads go straight to your calendar. Property questions, availability, neighborhood info — handled automatically.",
      tags: ["Appointment Booking", "Property Search", "Market Insights"],
    },
    {
      icon: "✦",
      title: "Keeps Working",
      headline: "No lead ever goes cold again.",
      body: "Personalized follow-up, reactivation campaigns, and long-term nurturing — every contact stays warm until they're ready.",
      tags: ["Automated Nurturing", "Lead Reactivation", "Relationship Tracking"],
    },
  ];

  return (
    <section ref={ref} className="relative bg-obsidian py-14 px-5 md:py-24 md:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/media/ai-assistant-bg.jpg')" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(7,23,38,0.96) 0%, rgba(11,34,54,0.90) 45%, rgba(20,58,87,0.88) 100%)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-transparent to-obsidian/80" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}
          className="mb-10 md:mb-14 max-w-xl">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-semibold">What It Does</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-warm-50 leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}>
            One AI. Every job
            <br /><em className="text-gold-light font-normal">your pipeline needs.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-6 md:p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl border border-gold/30 bg-gold/10 text-gold text-base shrink-0">
                  {p.icon}
                </div>
                <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">{p.title}</span>
              </div>
              <div>
                <h3 className="text-warm-50 text-lg md:text-xl font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {p.headline}
                </h3>
                <p className="text-warm-400 text-sm font-light leading-relaxed">{p.body}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] tracking-[0.15em] uppercase text-warm-500 border border-white/10 rounded-full px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ─────────────────────────────────────────────────────────

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const STEPS = [
    {
      number: "01",
      title: "We train it on you.",
      description: "Your listings. Your market. Your tone. Your FAQs. It answers as if you wrote every word.",
    },
    {
      number: "02",
      title: "It goes live on your site.",
      description: "Embedded on your Sonder website — every visitor gets an instant, intelligent response.",
    },
    {
      number: "03",
      title: "You get warm leads.",
      description: "Qualified. Scored. Booked. Delivered straight to you — ready to close.",
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="bg-white py-12 px-5 md:py-20 md:px-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}
        className="mb-10 md:mb-14 max-w-xl">
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">How It Works</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}>
          Up and running
          <br /><em className="text-gold-dark">in days. Not months.</em>
        </h2>
      </motion.div>

      {/* Steps with connecting arrows */}
      <div className="relative">
        {/* Desktop horizontal connector */}
        <div className="hidden sm:block absolute top-[3.5rem] left-[calc(33.33%-1rem)] right-[calc(33.33%-1rem)] h-px bg-sand-200 z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative flex flex-col sm:flex-row items-start sm:items-stretch">
              {/* The card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 * i }}
                className="relative z-10 flex-1 bg-white p-6 md:p-8 flex flex-col">
                {/* Number with circle */}
                <div className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-sand-200 bg-white mb-6 shrink-0">
                  <span className="text-gold-dark text-sm font-medium tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
                    {step.number}
                  </span>
                </div>
                <h3 className="text-obsidian text-lg md:text-xl font-medium mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {step.title}
                </h3>
                <p className="text-warm-500 text-sm font-light leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Arrow between steps — desktop: right side, mobile: bottom */}
              {i < STEPS.length - 1 && (
                <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.15 * i + 0.3 }}
                  className="flex items-start sm:items-center justify-center sm:justify-start shrink-0">
                  {/* Mobile: down arrow */}
                  <div className="sm:hidden flex flex-col items-center py-2 pl-[2.75rem]">
                    <div className="w-px h-6 bg-sand-200" />
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-gold-dark/50">
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Desktop: right arrow overlaid on the horizontal rule */}
                  <div className="hidden sm:flex items-center justify-center w-8 mt-[2.75rem] -mx-4 z-20">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-sand-200">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-gold-dark">
                        <path d="M2 5h6M5.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Companion App ─────────────────────────────────────────────────────────

function CompanionApp() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-obsidian px-5 py-12 md:px-16 md:py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}
        className="relative rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071726 0%, #0e2d48 50%, #071c30 100%)" }}>
        <div className="aurora opacity-50" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        <div className="relative z-10 px-7 py-12 md:px-14 md:py-14 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-gold/30 bg-gold/[0.08] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-gold-light text-[11px] tracking-[0.3em] uppercase font-semibold">Coming Soon</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-warm-50 leading-[1.05] mb-4" style={{ fontFamily: "var(--font-display)" }}>
              The Sonder Studio
              <br /><em className="text-gold-light font-normal">companion app.</em>
            </h2>
            <p className="text-warm-400 text-sm font-light leading-relaxed max-w-md">
              Your entire lead pipeline in your pocket. Watch live AI conversations,
              step in with one tap, and respond to hot leads from anywhere — iOS and Android.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 lg:w-80">
            {[
              "Live AI conversation feed",
              "Instant push notifications",
              "One-tap agent takeover",
              "Lead scoring at a glance",
              "Site & conversion analytics",
              "iOS & Android",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-3">
                <span className="text-gold text-xs shrink-0">✦</span>
                <p className="text-warm-300 text-xs font-light leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────

function FinalCTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-obsidian px-5 pb-12 md:px-16 md:pb-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}
        className="relative rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(115deg, #071726 0%, #143A57 55%, #0B2236 100%)" }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />
        <div className="absolute -left-20 -bottom-24 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #3E9BD4 0%, transparent 70%)" }} />

        <div className="relative z-10 px-7 py-12 md:px-16 md:py-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-light text-warm-50 leading-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
            Your competitors are
            <br /><em className="text-gold-light font-normal">already using AI.</em>
          </h2>
          <p className="text-warm-300 text-sm md:text-base font-light leading-relaxed mb-9 max-w-lg mx-auto">
            Add the AI Lead Assistant to any Sonder plan. Setup in days.
            First response in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-started" className="glass-btn-accent inline-flex items-center gap-3 text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-3.5 font-medium">
              Add to My Plan
              <span className="w-6 h-px bg-current inline-block" />
            </Link>
            <Link href="/#contact" className="text-warm-300 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors duration-300 flex items-center gap-3">
              Book a Call First
              <span className="w-8 h-px bg-current inline-block" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function AIAssistantPage() {
  return (
    <main className="bg-obsidian">
      <Navbar />
      <Hero />
      <CostOfSilence />
      <WhatItDoes />
      <HowItWorks />
      <CompanionApp />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
