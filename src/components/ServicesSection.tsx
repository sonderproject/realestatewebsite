"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

// Bold keyword highlighter — makes key phrases stand out without feeling
// like a marketing bullet list. Light on the dark, image-backed section.
function Kw({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-warm-50">{children}</strong>;
}

const services: Array<{
  number: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  isNew: boolean;
}> = [
  {
    number: "01",
    title: "Property Visualization",
    subtitle: "Our Core Service",
    description: (
      <>
        Everything needed to create one <Kw>premium digital property
        experience</Kw> — film, walkthrough, and microsite, produced end to end.
      </>
    ),
    isNew: true,
  },
  {
    number: "02",
    title: "AI Cinematic Property Films",
    subtitle: "The Film",
    description: (
      <>
        We transform property photos and media into <Kw>cinematic marketing
        films</Kw> — ready for the microsite, social, listing presentations, and email.
      </>
    ),
    isNew: false,
  },
  {
    number: "03",
    title: "Interactive Property Experiences",
    subtitle: "Explore The Home",
    description: (
      <>
        Immersive <Kw>walkthrough experiences</Kw> buyers can explore online, at
        their own pace, room by room, on any device.
      </>
    ),
    isNew: false,
  },
  {
    number: "04",
    title: "Premium Property Microsites",
    subtitle: "One Property, One Link",
    description: (
      <>
        A dedicated landing page designed for <Kw>one property</Kw> — gallery,
        features, floor plans, neighborhood, maps, and lead capture. Not an agent
        site. Not a brokerage site.
      </>
    ),
    isNew: false,
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="services"
      className="relative overflow-hidden py-12 px-5 md:py-20 md:px-16"
    >
      {/* Oceanfront estate background */}
      <Image
        src="/media/services-oceanfront.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Legibility overlay — dark enough for text, keeps the estate visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/92 via-obsidian/72 to-obsidian/92" />
      <div className="absolute inset-0 bg-obsidian/20" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-7 md:mb-11"
        >
          <SectionLabel index="02" tone="dark" className="mb-5">
            What We Do
          </SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-warm-50 leading-tight max-w-xl [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We specialize in
              <br />
              <em className="text-gold-light">one thing.</em>
            </h2>
            <p className="text-warm-200 text-sm font-light max-w-sm leading-relaxed md:text-right [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
              Making properties unforgettable online. We combine AI, cinematic
              storytelling, and interactive design to visualize high-value properties.
            </p>
          </div>
        </motion.div>

        {/* Service list */}
        <div className="border-t border-white/15">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 * i }}
              className={`group border-b border-white/15 py-5 md:py-7 cursor-default transition-colors duration-300 rounded-xl px-3 md:px-5 ${
                service.isNew
                  ? "bg-gold/[0.08] hover:bg-gold/[0.12]"
                  : "hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex gap-4 md:gap-6 items-start">
                {/* Editorial numeral */}
                <span
                  className={`text-2xl md:text-3xl font-light tabular-nums leading-none mt-1 shrink-0 w-9 md:w-12 transition-colors duration-500 ${
                    service.isNew
                      ? "text-gold-light/80"
                      : "text-warm-400 group-hover:text-gold-light/70"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.number}
                </span>

                {/* Content */}
                <div className="flex-1 flex flex-col md:flex-row md:gap-8">
                  {/* Title block */}
                  <div className="shrink-0 md:w-52 lg:w-64">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-warm-300 text-[10px] tracking-[0.3em] uppercase">
                        {service.subtitle}
                      </p>
                      {service.isNew && (
                        <span className="rounded-full bg-gold/15 border border-gold/40 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase text-gold-light font-semibold">
                          New
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-xl md:text-2xl lg:text-3xl font-light transition-colors duration-500 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] ${
                        service.isNew
                          ? "text-gold-light group-hover:text-gold"
                          : "text-warm-50 group-hover:text-gold-light"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {service.isNew && (
                        <span className="mr-2 text-base align-middle">✦</span>
                      )}
                      {service.title}
                    </h3>
                  </div>

                  {/* Description — with bolded keyword phrases */}
                  <p className="text-warm-200 text-sm font-light leading-relaxed mt-2 md:mt-0 md:flex-1 md:pt-px [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
                    {service.description}
                  </p>

                  {/* Arrow — desktop only */}
                  <div className="hidden md:flex items-center gap-2 shrink-0 mt-[2px]">
                    <span className="w-0 group-hover:w-8 h-px bg-gold-light transition-all duration-500 inline-block" />
                    <span className="text-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Every experience includes / What we don't offer */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 md:gap-6">
          {/* Included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-obsidian/60 backdrop-blur-md p-7 md:p-10 overflow-hidden relative"
          >
            <div className="aurora opacity-40" />
            <div className="relative z-10">
              <p className="text-gold-light text-[10px] tracking-[0.4em] uppercase mb-5 font-medium">
                Every experience includes
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {INCLUDED.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-gold-light text-sm mt-0.5 shrink-0">✓</span>
                    <span className="text-warm-100 text-sm font-light leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Not offered — the specialization guardrail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-7 md:p-10"
          >
            <p className="text-warm-300 text-[10px] tracking-[0.4em] uppercase mb-5 font-medium">
              What we don&apos;t offer
            </p>
            <div className="flex flex-col gap-2.5">
              {NOT_OFFERED.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-warm-400 text-sm mt-0.5 shrink-0">—</span>
                  <span className="text-warm-300 text-sm font-light leading-snug line-through decoration-white/25">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-gold-light text-xs font-medium mt-6 tracking-wide">
              Focus creates expertise.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// What ships with every Sonder Experience.
const INCLUDED = [
  "Cinematic AI property film",
  "Interactive property walkthrough",
  "Premium property microsite",
  "Full photo gallery",
  "Property features",
  "Floor plans (when available)",
  "Neighborhood highlights",
  "Interactive maps",
  "Contact & lead capture",
  "Mobile-optimized experience",
  "QR code",
  "Shareable listing link",
];

// The specialization guardrail — deliberately out of scope.
const NOT_OFFERED = [
  "Agent websites",
  "Brokerage websites",
  "General business websites",
  "SEO services",
  "Social media management",
  "Advertising services",
];
