"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";

// Bold keyword highlighter — makes key phrases stand out without feeling
// like a marketing bullet list. Used inline inside service descriptions.
function Kw({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-obsidian">{children}</strong>
  );
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
        experience</Kw> — film, 3D floor plan, and story, produced end to end.
      </>
    ),
    isNew: true,
  },
  {
    number: "02",
    title: "Cinematic Property Films",
    subtitle: "The Film",
    description: (
      <>
        We transform property photos and media into a <Kw>cinematic film</Kw> —
        ready for the experience, social, listing presentations, and email.
      </>
    ),
    isNew: false,
  },
  {
    number: "03",
    title: "Interactive 3D Floor Plans",
    subtitle: "Explore The Home",
    description: (
      <>
        An <Kw>interactive 3D floor plan</Kw> buyers can explore online — layout,
        flow, and scale, at their own pace, on any device.
      </>
    ),
    isNew: false,
  },
  {
    number: "04",
    title: "Premium Property Experiences",
    subtitle: "One Property, One Link",
    description: (
      <>
        A digital experience built for <Kw>one property</Kw> — story, gallery, and
        lead capture, under one shareable link. Not an agent site. Not a
        brokerage site.
      </>
    ),
    isNew: false,
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="services" className="bg-sand-50 py-12 px-5 md:py-20 md:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="mb-7 md:mb-11"
      >
        <SectionLabel index="02" tone="light" className="mb-5">
          What We Do
        </SectionLabel>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-obsidian leading-tight max-w-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We specialize in
            <br />
            <em className="text-gold-dark">one thing.</em>
          </h2>
          <p className="text-warm-500 text-sm font-light max-w-sm leading-relaxed md:text-right">
            Making properties unforgettable online — built for luxury and
            residential listing agents. One complete experience, produced for a
            single property.
          </p>
        </div>
      </motion.div>

      {/* Service list */}
      <div className="border-t border-sand-300/70">
        {services.map((service, i) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 * i }}
            className={`group border-b border-sand-300/70 py-5 md:py-7 cursor-default transition-colors duration-300 rounded-xl px-3 md:px-5 ${
              service.isNew
                ? "bg-gold-dark/[0.04] hover:bg-gold-dark/[0.07]"
                : "hover:bg-sand-100"
            }`}
          >
            <div className="flex gap-4 md:gap-6 items-start">
              {/* Editorial numeral */}
              <span
                className={`text-2xl md:text-3xl font-light tabular-nums leading-none mt-1 shrink-0 w-9 md:w-12 transition-colors duration-500 ${
                  service.isNew
                    ? "text-gold-dark/70"
                    : "text-warm-300 group-hover:text-gold-dark/60"
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
                    <p className="text-warm-400 text-[10px] tracking-[0.3em] uppercase">
                      {service.subtitle}
                    </p>
                    {service.isNew && (
                      <span className="rounded-full bg-gold-dark/10 border border-gold-dark/30 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase text-gold-dark font-semibold">
                        New
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-xl md:text-2xl lg:text-3xl font-light transition-colors duration-500 ${
                      service.isNew
                        ? "text-gold-dark group-hover:text-gold"
                        : "text-obsidian group-hover:text-gold-dark"
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
                <p className="text-warm-500 text-sm font-light leading-relaxed mt-2 md:mt-0 md:flex-1 md:pt-px">
                  {service.description}
                </p>

                {/* Arrow — desktop only */}
                <div className="hidden md:flex items-center gap-2 shrink-0 mt-[2px]">
                  <span className="w-0 group-hover:w-8 h-px bg-gold transition-all duration-500 inline-block" />
                  <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs">
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
          className="rounded-3xl bg-obsidian p-7 md:p-10 overflow-hidden relative"
        >
          <div className="aurora opacity-40" />
          <div className="relative z-10">
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-5 font-medium">
              Every experience includes
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {INCLUDED.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-gold-light text-sm mt-0.5 shrink-0">✓</span>
                  <span className="text-warm-200 text-sm font-light leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cinematic walkthrough film — autoplay, muted, looping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative min-h-[300px] overflow-hidden rounded-3xl border border-sand-200 bg-obsidian shadow-lg"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Cinematic walkthrough of a property"
          >
            <source
              src="/media/Sonder_walkthrough_3792_Vista_Po_202607011518_202607042302.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
      </div>
    </section>
  );
}

// The Sonder Experience™ — included in every build.
const INCLUDED = [
  "Cinematic property film",
  "Premium digital property experience",
  "Interactive 3D floor plan",
  "Luxury property story, written for the home",
  "Curated property gallery",
  "Mobile-first design",
  "Lead capture — request info or a private showing",
  "Shareable property link + QR code",
];
