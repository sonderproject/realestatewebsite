"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-obsidian">
      {/*
        ─────────────────────────────────────────────
        REPLACE: /public/media/hero-video.mp4
        Drop your full-resolution hero video here.
        Recommended: 1920×1080, H.264, ≤ 30 MB, no audio.
        ─────────────────────────────────────────────
      */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/media/hero-poster.jpg"
      >
        <source src="/media/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-transparent" />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Navigation bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-8"
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

      {/* Hero content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 px-10 md:px-20">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light"
          >
            Luxury Coastal Properties
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
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
            transition={{ duration: 1, delay: 1.3 }}
            className="text-warm-300 text-sm md:text-base font-light tracking-wide max-w-xl leading-relaxed mb-12"
          >
            Luxury real estate deserves a digital experience as refined as the homes
            themselves. Designed for buyers who expect more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex items-center gap-6"
          >
            <a
              href="#listings"
              className="group relative bg-gold text-obsidian text-xs tracking-[0.3em] uppercase px-10 py-4 font-medium hover:bg-gold-light transition-all duration-300"
            >
              Explore Properties
            </a>
            <a
              href="#services"
              className="text-warm-300 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors duration-300 flex items-center gap-3"
            >
              Our Services
              <span className="w-8 h-px bg-current inline-block" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 right-10 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-warm-400 text-[10px] tracking-[0.4em] uppercase rotate-90 origin-center">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-warm-400 to-transparent" />
      </motion.div>
    </section>
  );
}
