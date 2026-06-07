"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";

// ── Data ──────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    number: "01",
    title: "Hi-Res Property Photography",
    subtitle: "Interiors & Exteriors",
    description:
      "Every package starts at 25 professionally edited HDR photos — minimum, guaranteed. Wide-angle lenses, natural light optimization, and color grading that makes rooms feel exactly the size they are. Delivered MLS-ready.",
    tag: "25 photos min.",
  },
  {
    number: "02",
    title: "Aerial Drone Photography",
    subtitle: "FAA-Licensed · 4K",
    description:
      "Licensed drone pilots capturing lot lines, neighborhood context, ocean views, and the sweeping aerials that stop buyers mid-scroll. 4K stills and video. Full compliance with FAA Part 107.",
    tag: null,
  },
  {
    number: "03",
    title: "3D Virtual Tours",
    subtitle: "Matterport-Powered",
    description:
      "Interactive 3D walkthroughs buyers can navigate from their couch — on any device, at any hour. Reduces wasted showings, increases time on listing, and gives out-of-market buyers the confidence to make offers.",
    tag: null,
  },
  {
    number: "04",
    title: "Cinematic Video Walkthroughs",
    subtitle: "Listing Films",
    description:
      "Stabilized 4K video with licensed music, smooth transitions, and motion graphics — edited for MLS, Instagram Reels, YouTube, and your brokerage site. Short-form and long-form versions included.",
    tag: null,
  },
  {
    number: "05",
    title: "Twilight & Golden Hour",
    subtitle: "Dusk Shoots",
    description:
      "The single most effective upgrade for curb appeal. Warm interior light spilling out against a painted sky — the exterior shot that makes buyers save the listing and schedule the showing.",
    tag: null,
  },
  {
    number: "06",
    title: "Virtual Staging",
    subtitle: "Furnished. Digitally.",
    description:
      "Empty rooms cost you offers. Our virtual staging team furnishes any space with photorealistic furniture in 24 hours — at a fraction of the cost of physical staging, with no move-in risk.",
    tag: null,
  },
  {
    number: "07",
    title: "Floor Plans",
    subtitle: "2D & 3D Digital",
    description:
      "Accurate, to-scale floor plan diagrams that let buyers understand flow and space before they walk through the door. Available in 2D schematic or rendered 3D format.",
    tag: null,
  },
  {
    number: "08",
    title: "Agent & Team Headshots",
    subtitle: "Personal Branding",
    description:
      "On-location or in our studio. Multiple outfit changes, natural and lifestyle shots, retouched and color-matched to your brand palette. Looks great everywhere — LinkedIn, yard signs, the MLS, your website.",
    tag: null,
  },
];

const STATS = [
  { value: "25+", label: "Photos, every package" },
  { value: "24 hr", label: "Rush turnaround option" },
  { value: "4K", label: "Resolution, every shoot" },
  { value: "FAA", label: "Licensed drone pilots" },
];

const TIERS = [
  {
    name: "Essential",
    audience: "Single-family homes up to 2,500 sq ft",
    price: "$399",
    note: "per shoot",
    featured: false,
    badge: null,
    features: [
      "25 HDR photos (minimum, guaranteed)",
      "Interior & exterior coverage",
      "AI-generated 3D virtual tour included",
      "Professional color grading & editing",
      "MLS-ready + web-optimized files",
      "Branded online gallery & download",
      "48-hour delivery",
      "Licensed, insured photographer",
    ],
  },
  {
    name: "Signature",
    audience: "Listings up to 4,500 sq ft",
    price: "$799",
    note: "per shoot",
    featured: true,
    badge: "Most Popular",
    features: [
      "35+ HDR photos",
      "FAA-licensed drone — 8 aerial stills + 60-sec drone video clip",
      "Twilight exterior shot",
      "AI-generated 3D virtual tour included",
      "MLS, web & social media edits",
      "24-hour priority delivery",
      "Licensed, insured photographer",
    ],
  },
  {
    name: "Cinematic",
    audience: "Luxury & high-value properties",
    price: "$1,499",
    note: "per shoot",
    featured: false,
    badge: null,
    features: [
      "50+ HDR photos",
      "Full drone session — stills & 4K video",
      "AI-generated 3D virtual tour included",
      "3–5 min cinematic listing film",
      "Virtual staging — up to 3 rooms",
      "2D floor plan diagram",
      "Twilight exterior shoot",
      "Same-day rush delivery available",
      "Licensed, insured photographer",
    ],
  },
];

const ADDONS = [
  { name: "2D Floor Plan", price: "$75" },
  { name: "3D Floor Plan", price: "$125" },
  { name: "Twilight Exterior", price: "$175" },
  { name: "Additional Drone Video", price: "$250" },
  { name: "Cinematic Listing Film", price: "$450" },
  { name: "Virtual Staging", price: "$45/image" },
  { name: "Rush Delivery", price: "$150" },
];

// ── Section components ────────────────────────────────────────────────────

function HeroPhotography() {
  return (
    <section className="relative bg-obsidian overflow-hidden" style={{ minHeight: "100vh" }}>
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
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col justify-end pb-16 px-5 md:pb-24 md:px-16 pt-24 md:pt-32">
        <div className="max-w-4xl">

          {/* Eye-catching badge — mirrors the homepage hero treatment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="inline-flex items-center gap-2.5 mb-6 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md px-4 py-2 shadow-lg shadow-gold/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-gold-light text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold">
              Real Estate Photography
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-warm-50 leading-[0.9] mb-5 md:mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Every listing.
            <br />
            <em className="text-gold-light font-normal">Shot to sell.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95 }}
            className="text-warm-300 text-sm md:text-base font-light tracking-wide max-w-xl leading-relaxed mb-8 md:mb-10"
          >
            Premium property photography, FAA-licensed drone aerials, Matterport
            3D tours, and cinematic listing films for agents and brokerages across
            San Diego. 25 photos minimum, every package. Delivered fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="#packages"
              className="glass-btn-accent text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium"
            >
              View Packages
            </a>
            <a
              href="#contact"
              className="text-warm-300 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors duration-300 flex items-center gap-3"
            >
              Book a Shoot
              <span className="w-8 h-px bg-current inline-block" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesPhotography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="services" className="bg-sand-50 py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-7 md:mb-11"
      >
        <p className="text-gold-dark text-xs tracking-[0.4em] uppercase mb-4 font-light">
          What We Offer
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-obsidian leading-tight max-w-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Every format.
            <br />
            <em className="text-gold-dark">Every property type.</em>
          </h2>
          <p className="text-warm-500 text-sm font-light max-w-sm leading-relaxed md:text-right">
            From starter condos to oceanfront estates — every visual format your
            listing needs to compete in today&apos;s market.
          </p>
        </div>
      </motion.div>

      <div className="border-t border-sand-300/70">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.06 * i }}
            className="group border-b border-sand-300/70 py-5 md:py-7 cursor-default hover:bg-sand-100 transition-colors duration-300 rounded-xl px-3 md:px-5"
          >
            <div className="flex gap-4 items-start">
              <span className="text-warm-400 text-xs font-light tracking-wider mt-[3px] shrink-0 w-6">
                {service.number}
              </span>
              <div className="flex-1 flex flex-col md:flex-row md:gap-8">
                <div className="shrink-0 md:w-52 lg:w-64">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-warm-400 text-[10px] tracking-[0.3em] uppercase">
                      {service.subtitle}
                    </p>
                    {service.tag && (
                      <span className="rounded-full bg-gold-dark/10 border border-gold-dark/30 px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase text-gold-dark font-semibold">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-obsidian text-xl md:text-2xl lg:text-3xl font-light group-hover:text-gold-dark transition-colors duration-500"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {service.title}
                  </h3>
                </div>
                <p className="text-warm-500 text-sm font-light leading-relaxed mt-2 md:mt-0 md:flex-1 md:pt-px">
                  {service.description}
                </p>
                <div className="hidden md:flex items-center gap-2 shrink-0 mt-[2px]">
                  <span className="w-0 group-hover:w-8 h-px bg-gold transition-all duration-500 inline-block" />
                  <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs">→</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StatsPhotography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-16 px-5 md:py-24 md:px-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #071726 0%, #0B2236 50%, #143A57 100%)",
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative z-10 text-center mb-12 md:mb-16"
      >
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-light">By the Numbers</p>
        <h2
          className="text-3xl md:text-5xl font-light text-warm-50 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Visuals that close deals.
          <br />
          <em className="text-gold-light font-normal">Not just fill galleries.</em>
        </h2>
      </motion.div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md px-5 py-6 text-center"
          >
            <p
              className="text-3xl md:text-4xl text-gold-light font-medium mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {stat.value}
            </p>
            <p className="text-warm-400 text-[10px] tracking-[0.2em] uppercase font-light">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PackagesPhotography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section ref={ref} id="packages" className="bg-white py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-3 md:mb-5 max-w-2xl"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          Packages
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Transparent pricing.
          <br />
          <em className="text-gold-dark">No surprises.</em>
        </h2>
        <p className="text-warm-500 text-sm font-light leading-relaxed">
          Every package includes a minimum of <strong className="font-medium text-obsidian">25 professionally edited photos</strong> — guaranteed. Licensed, insured photographer on every shoot.
        </p>
      </motion.div>

      {/* 3 tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch mt-10 md:mt-14">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + 0.1 * i }}
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

            <div className="mb-6">
              <span
                className={`text-4xl font-light ${tier.featured ? "text-white" : "text-obsidian"}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tier.price}
              </span>
              <span className={`ml-2 text-xs ${tier.featured ? "text-surf-100" : "text-warm-400"}`}>
                {tier.note}
              </span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 text-sm ${tier.featured ? "text-surf-100" : "text-gold-dark"}`}>✓</span>
                  <span className={`text-sm font-light ${tier.featured ? "text-surf-50" : "text-warm-600"}`}>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`rounded-full text-xs tracking-[0.2em] uppercase px-6 py-3.5 font-medium text-center ${
                tier.featured ? "glass-btn text-white" : "glass-btn-accent text-white"
              }`}
            >
              Book Now
            </a>
          </motion.div>
        ))}
      </div>

      {/* Partner tier — full-width, monthly relationship */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="relative rounded-3xl overflow-hidden mt-5 md:mt-6"
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
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow orb */}
        <div
          className="absolute -right-20 -top-20 w-72 h-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #3E9BD4 0%, transparent 70%)" }}
        />

        <div className="relative z-10 p-7 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            {/* Left — name + price */}
            <div className="shrink-0 lg:w-64 mb-7 lg:mb-0">
              <p className="text-gold text-[10px] tracking-[0.35em] uppercase font-light mb-2">
                Monthly Retainer
              </p>
              <h3
                className="text-3xl md:text-4xl font-light text-warm-50 mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Partner
              </h3>
              <p className="text-surf-200 text-xs tracking-[0.12em] uppercase mb-6">
                Your dedicated visual team
              </p>
              <div className="flex items-end gap-2 mb-1">
                <span
                  className="text-5xl font-light text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  $2,997
                </span>
                <span className="text-surf-200 text-sm pb-1.5">/ month</span>
              </div>
              <p className="text-surf-300 text-xs font-light">
                4 full shoots included · cancel anytime
              </p>

              <a
                href="#contact"
                className="glass-btn-accent inline-block mt-7 text-white text-xs tracking-[0.2em] uppercase rounded-full px-7 py-3.5 font-medium"
              >
                Become a Partner
              </a>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px self-stretch bg-white/10" />

            {/* Right — features grid */}
            <div className="flex-1">
              <p className="text-warm-300 text-sm font-light leading-relaxed mb-6 max-w-lg">
                For agents and brokerages who list consistently — one flat monthly fee
                replaces per-shoot invoicing. We become your in-house visual team.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                {[
                  "4 full photo shoots per month",
                  "Drone included on every shoot",
                  "AI 3D tour on every shoot",
                  "2 editing revision rounds per shoot",
                  "1 cinematic listing video per month",
                  "Virtual staging — up to 3 rooms/shoot",
                  "Priority 24-hr scheduling",
                  "Dedicated photographer assigned",
                  "Quarterly agent brand shoot",
                  "Unused shoots roll over (1 month)",
                  "Rush delivery available as paid add-on",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <span className="text-gold text-sm mt-0.5 shrink-0">✦</span>
                    <span className="text-surf-50 text-sm font-light">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-warm-400 text-xs font-light text-center mt-8"
      >
        All shoots include a licensed, insured photographer. Need a custom scope?{" "}
        <a href="#contact" className="text-gold-dark hover:underline">Talk to us.</a>
      </motion.p>
    </section>
  );
}

function ProcessPhotography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      number: "01",
      title: "Book Online",
      description:
        "Choose a package, pick a date, and confirm in under two minutes. We send a confirmation with everything you need to prepare the property.",
    },
    {
      number: "02",
      title: "We Shoot",
      description:
        "Our photographer arrives on time, stages each shot for maximum impact, and captures every angle — indoors, outdoors, and aerial.",
    },
    {
      number: "03",
      title: "We Edit",
      description:
        "HDR processing, color grading, sky replacement if needed, and retouching — all done in-house to a consistent, premium standard.",
    },
    {
      number: "04",
      title: "You List",
      description:
        "Download your full gallery within 48 hours (or 24 on Signature/Cinematic) and upload straight to MLS, your site, or social. Done.",
    },
  ];

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
          Book today.
          <br />
          <em className="text-gold-dark">Listed tomorrow.</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-sand-200 rounded-2xl overflow-hidden border border-sand-200">
        {steps.map((step, i) => (
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

function AddOnsPhotography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-sand-50 py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-12 max-w-2xl"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          Add-Ons
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          À la carte extras.
          <br />
          <em className="text-gold-dark">Add to any package.</em>
        </h2>
        <p className="text-warm-500 text-sm font-light leading-relaxed">
          Build the perfect shoot. Every add-on can be bundled with any package
          above or a Partner retainer.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-sand-200 rounded-2xl overflow-hidden border border-sand-200">
        {ADDONS.map((addon, i) => (
          <motion.div
            key={addon.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 * i }}
            className="bg-white px-6 py-6 md:px-7 md:py-7 flex items-center justify-between gap-4"
          >
            <span className="text-obsidian text-base md:text-lg font-light">
              {addon.name}
            </span>
            <span
              className="text-gold-dark text-lg md:text-xl font-medium shrink-0"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {addon.price}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BundleOffer() {
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
          <p className="text-gold text-[10px] md:text-xs tracking-[0.35em] uppercase font-light mb-5">
            Bundle & Save
          </p>
          <h2
            className="text-3xl md:text-5xl font-light text-warm-50 leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One studio.
            <br />
            <em className="text-gold-light font-normal">Both sides of your listing.</em>
          </h2>
          <p className="text-warm-300 text-sm md:text-base font-light leading-relaxed mb-9 max-w-xl mx-auto">
            Sonder Studio designs premium real estate websites. Book any
            photography package and get{" "}
            <strong className="text-warm-50 font-medium">30% off your website setup fee</strong>{" "}
            — your listings and your digital presence, handled by one team.
          </p>
          <Link
            href="/"
            className="glass-btn-accent inline-block text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-3.5 font-medium"
          >
            See Web Design Plans
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function PhotographyPage() {
  return (
    <main className="bg-obsidian">
      <Navbar />
      <HeroPhotography />
      <ServicesPhotography />
      <StatsPhotography />
      <PackagesPhotography />
      <AddOnsPhotography />
      <ProcessPhotography />
      <BundleOffer />
      <FinalCTA />
    </main>
  );
}
