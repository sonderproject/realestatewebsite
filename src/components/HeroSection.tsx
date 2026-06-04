"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  // The section is tall (250vh) with a sticky inner viewport. While you scroll
  // through it the page stays "pinned" and the image plays/zooms — then it
  // releases and the rest of the page scrolls up.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image slowly zooms in as you scroll ("plays").
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.45]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  // Darken progressively so text/panels stay legible.
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.8]);

  // Hero headline fades out as the zoom takes over.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -40]);

  // Property panels reveal near the end of the pin.
  const panelOpacity = useTransform(scrollYProgress, [0.5, 0.78], [0, 1]);
  const panelY = useTransform(scrollYProgress, [0.5, 0.78], [40, 0]);

  // Scroll hint fades the moment you start.
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} id="listings" className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        {/* Sunset coastal gradient — shown if the photo isn't present yet,
            so the hero always looks intentional rather than blank. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#e9a87a] via-[#7c5a6b] to-[#0a0a09]" />

        {/*
          ─────────────────────────────────────────────
          The aerial sunset coastline photo.
          ADD: /public/media/real-estate-image.jpg
          Used as a CSS background, so a missing file simply falls back
          to the gradient above (no broken-image icon).
          ─────────────────────────────────────────────
        */}
        <motion.div
          style={{
            scale,
            y: imageY,
            backgroundImage: "url('/media/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 origin-center bg-no-repeat"
        />

        {/* Darkening + cinematic gradients */}
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-transparent" />

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-10 py-8"
        >
          <div className="flex items-center gap-2">
            <span
              className="text-warm-50 text-xl tracking-[0.25em] uppercase font-light"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Meridian
            </span>
            <span className="w-px h-4 bg-gold/60 mx-1" />
            <span className="text-warm-300 text-xs tracking-[0.3em] uppercase font-light">
              Properties
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {["Listings", "Services", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-warm-200 text-xs tracking-[0.2em] uppercase hover:text-gold transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:block border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-gold/10 transition-all duration-300"
          >
            Schedule a Call
          </a>
        </motion.nav>

        {/* Hero headline — fades as you scroll into the zoom */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light"
          >
            Luxury Coastal Properties
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-warm-50 leading-[0.9] mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Modern Living.
            <br />
            <em className="italic text-warm-200">Elevated.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-warm-300 text-sm md:text-base font-light tracking-wide max-w-xl leading-relaxed"
          >
            Luxury real estate deserves a digital experience as refined as the homes
            themselves. Designed for buyers who expect more.
          </motion.p>
        </motion.div>

        {/* Property panels — reveal near the end of the pinned scroll */}
        <motion.div
          style={{ opacity: panelOpacity, y: panelY }}
          className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 pointer-events-none"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3 font-light text-center">
            Featured Property
          </p>
          <h2
            className="text-4xl md:text-6xl font-light text-warm-50 text-center leading-tight mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Pacific Residences
          </h2>
          <p className="text-warm-300 text-sm tracking-widest text-center mb-10">
            Ocean Beach, San Diego
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-warm-700/20 max-w-4xl mx-auto w-full">
            {[
              { label: "List Price", value: "$4.2M" },
              { label: "Square Feet", value: "4,850" },
              { label: "Bedrooms", value: "5 BR / 4 BA" },
              { label: "Year Built", value: "2021" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-obsidian/80 backdrop-blur-sm px-6 py-6 border border-warm-700/20 text-center"
              >
                <p className="text-warm-400 text-[10px] tracking-[0.3em] uppercase mb-2">
                  {label}
                </p>
                <p
                  className="text-warm-50 text-2xl font-light"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 right-10 z-20 flex flex-col items-center gap-3"
        >
          <span className="text-warm-400 text-[10px] tracking-[0.4em] uppercase rotate-90 origin-center">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-warm-400 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
