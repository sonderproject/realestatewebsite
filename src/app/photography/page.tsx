"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";

// ── Placeholder data — swap in real content later ─────────────────────────

const SERVICES = [
  {
    number: "01",
    title: "Property Photography",
    subtitle: "Interiors & Exteriors",
    description:
      "HDR-processed stills that make every room feel larger, brighter, and more inviting — shot to MLS specs and delivered same day.",
  },
  {
    number: "02",
    title: "Aerial & Drone",
    subtitle: "FAA-Licensed Pilots",
    description:
      "Licensed drone photography for lot boundaries, neighborhood context, and the kind of sweeping shots that stop the scroll.",
  },
  {
    number: "03",
    title: "Virtual Tours",
    subtitle: "Immersive 3D",
    description:
      "Matterport-compatible 3D walkthroughs that let buyers tour from anywhere, at any hour, on any device.",
  },
  {
    number: "04",
    title: "Twilight & Golden Hour",
    subtitle: "Elevated Listings",
    description:
      "Dusk shoots that transform an ordinary exterior into a warm, luminous first impression buyers won't forget.",
  },
  {
    number: "05",
    title: "Video Walkthroughs",
    subtitle: "Cinematic Film",
    description:
      "Short-form listing videos edited for Instagram Reels, YouTube, and your MLS — complete with music and motion graphics.",
  },
  {
    number: "06",
    title: "Agent Headshots",
    subtitle: "Personal Branding",
    description:
      "On-location or studio headshots that match your brand palette and look great on every screen, from LinkedIn to yard signs.",
  },
];

const STATS = [
  { value: "500+", label: "Properties Shot" },
  { value: "48 hr", label: "Standard Turnaround" },
  { value: "4K", label: "Resolution Delivered" },
  { value: "100%", label: "Satisfaction Guarantee" },
];

const PACKAGES = [
  {
    name: "Essential",
    audience: "For single listings",
    price: "$299",
    note: "starting at",
    featured: false,
    features: [
      "25 edited HDR photos",
      "MLS-ready file sizes",
      "Same-day delivery option",
      "Online gallery & download",
    ],
  },
  {
    name: "Signature",
    audience: "For premium listings",
    price: "$549",
    note: "starting at",
    featured: true,
    features: [
      "50 edited HDR photos",
      "Drone aerial (5 images)",
      "2-minute video walkthrough",
      "Twilight exterior shot",
      "Online gallery & download",
    ],
  },
  {
    name: "Cinematic",
    audience: "For luxury properties",
    price: "Custom",
    note: "tailored to scope",
    featured: false,
    features: [
      "Unlimited HDR photos",
      "Full drone session",
      "Cinematic listing film",
      "Matterport 3D tour",
      "Priority 24-hr turnaround",
    ],
  },
];

// ── Section components ────────────────────────────────────────────────────

function HeroPhotography() {
  return (
    <section className="relative bg-obsidian overflow-hidden" style={{ minHeight: "100vh" }}>
      {/* Background gradient standing in for a real photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #071726 0%, #0B2236 40%, #143A57 70%, #071726 100%)",
        }}
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(98,180,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(98,180,230,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col justify-end pb-16 px-5 md:pb-24 md:px-16 pt-32">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light"
          >
            Real Estate Photography
          </motion.p>

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
            Premium property photography, drone aerials, and cinematic video for
            real estate agents and brokerages across San Diego. Delivered fast.
            Built to convert.
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
          What We Shoot
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
            From single-family homes to luxury high-rises — we cover every visual
            format your listing needs to compete.
          </p>
        </div>
      </motion.div>

      <div className="border-t border-sand-300/70">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 * i }}
            className="group border-b border-sand-300/70 py-5 md:py-7 cursor-default hover:bg-sand-100 transition-colors duration-300 rounded-xl px-3 md:px-5"
          >
            <div className="flex gap-4 items-start">
              <span className="text-warm-400 text-xs font-light tracking-wider mt-[3px] shrink-0 w-6">
                {service.number}
              </span>
              <div className="flex-1 flex flex-col md:flex-row md:gap-8">
                <div className="shrink-0 md:w-52 lg:w-64">
                  <p className="text-warm-400 text-[10px] tracking-[0.3em] uppercase mb-1">
                    {service.subtitle}
                  </p>
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
          Photography that
          <br />
          <em className="text-gold-light font-normal">moves properties.</em>
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
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="packages" className="bg-white py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-14 max-w-2xl"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
          Packages
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light text-obsidian leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Transparent pricing.
          <br />
          <em className="text-gold-dark">No surprises.</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {PACKAGES.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            className={`relative rounded-3xl p-7 md:p-8 flex flex-col ${
              pkg.featured
                ? "bg-gradient-to-br from-surf-600 to-ocean text-white shadow-xl shadow-surf-600/25 md:-translate-y-3"
                : "bg-sand-50 border border-sand-200 text-obsidian"
            }`}
          >
            {pkg.featured && (
              <span className="absolute top-5 right-5 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-surf-700 font-semibold">
                Most Popular
              </span>
            )}

            <h3
              className={`text-2xl font-medium mb-0.5 ${pkg.featured ? "text-white" : "text-obsidian"}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pkg.name}
            </h3>
            <p className={`text-xs tracking-[0.12em] uppercase mb-5 ${pkg.featured ? "text-surf-100" : "text-warm-500"}`}>
              {pkg.audience}
            </p>

            <div className="mb-6">
              <span
                className={`text-4xl font-light ${pkg.featured ? "text-white" : "text-obsidian"}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {pkg.price}
              </span>
              <span className={`ml-2 text-xs ${pkg.featured ? "text-surf-100" : "text-warm-400"}`}>
                {pkg.note}
              </span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 ${pkg.featured ? "text-surf-100" : "text-gold-dark"}`}>✓</span>
                  <span className={`text-sm font-light ${pkg.featured ? "text-surf-50" : "text-warm-600"}`}>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`rounded-full text-xs tracking-[0.2em] uppercase px-6 py-3.5 font-medium text-center ${
                pkg.featured ? "glass-btn text-white" : "glass-btn-accent text-white"
              }`}
            >
              Book Now
            </a>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-warm-400 text-xs font-light text-center mt-8"
      >
        All packages include a licensed, insured photographer.{" "}
        <a href="#contact" className="text-gold-dark hover:underline">Contact us</a> for volume pricing or monthly retainer rates.
      </motion.p>
    </section>
  );
}

function ProcessPhotography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    { number: "01", title: "Book Online", description: "Choose a package, pick a date, and confirm in under two minutes. We handle the rest." },
    { number: "02", title: "We Shoot", description: "Our photographer arrives on time, stages the shots, and captures every angle you need." },
    { number: "03", title: "We Edit", description: "HDR processing, color grading, and retouching — all done in-house to a consistent standard." },
    { number: "04", title: "You Deliver", description: "Download your gallery within 48 hours and upload straight to MLS, your website, or social." },
  ];

  return (
    <section ref={ref} className="bg-white py-12 px-5 md:py-20 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-8 md:mb-14 max-w-2xl"
      >
        <p className="text-gold-dark text-xs tracking-[0.3em] uppercase mb-3 font-semibold">How It Works</p>
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
            <h3 className="text-obsidian text-lg md:text-xl font-medium mb-2">{step.title}</h3>
            <p className="text-warm-500 text-sm font-light leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
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
      <ProcessPhotography />
      <FinalCTA />
    </main>
  );
}
