"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ImageZoomSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Image scale: starts small, grows to fill viewport as user scrolls
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.0, 1.5]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Overlay dims as image zooms in, revealing the property
  const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0.7, 0.2]);

  // Info panels appear after the zoom peaks
  const panelOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const panelY = useTransform(scrollYProgress, [0.45, 0.65], [40, 0]);

  // Vignette expands inward to frame the subject
  const vignetteIntensity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.85]);

  return (
    <section
      ref={sectionRef}
      id="listings"
      className="relative"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/*
          ──────────────────────────────────────────────────
          REPLACE: /media/real-estate-image.jpg
          Drop your hero property image here.
          The provided aerial sunset photo of the pier/coastline works perfectly.
          Recommended: 2400×1600 or larger, JPEG/WebP.
          ──────────────────────────────────────────────────
        */}
        <motion.div
          style={{ scale, opacity: imageOpacity }}
          className="absolute inset-0 origin-center"
        >
          <img
            src="/media/real-estate-image.jpg"
            alt="Luxury coastal property"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Darkening overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-obsidian"
        />

        {/* Radial vignette */}
        <motion.div
          style={{
            opacity: vignetteIntensity,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(10,10,9,0.95) 100%)",
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Section label — fades out as zoom proceeds */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.05, 0.3], [1, 0]),
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
            Featured Property
          </p>
          <h2
            className="text-5xl md:text-7xl font-light text-warm-50 text-center leading-tight max-w-3xl px-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Pacific Residences
          </h2>
          <p className="text-warm-300 text-sm mt-6 tracking-widest">
            Ocean Beach, San Diego
          </p>
        </motion.div>

        {/* Property info panels — appear after zoom */}
        <motion.div
          style={{ opacity: panelOpacity, y: panelY }}
          className="absolute inset-0 z-20 flex items-end pb-16 px-8 md:px-16"
        >
          <div className="w-full">
            {/* Top label */}
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-8 font-light text-center">
              Property Overview
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-warm-700/20">
              {[
                { label: "List Price", value: "$4.2M" },
                { label: "Square Feet", value: "4,850" },
                { label: "Bedrooms", value: "5 BR / 4 BA" },
                { label: "Year Built", value: "2021" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-obsidian/80 backdrop-blur-sm px-6 py-6 border border-warm-700/20"
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

            {/* Detail row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-px bg-warm-700/20">
              {[
                {
                  label: "Location",
                  detail:
                    "Direct ocean frontage. Steps from Ocean Beach Pier. Sunset views year-round.",
                },
                {
                  label: "Highlights",
                  detail:
                    "Chef's kitchen, rooftop terrace, radiant floors, private beach access, 3-car garage.",
                },
                {
                  label: "Investment",
                  detail:
                    "Prime San Diego coastal corridor. Strong short-term rental history. Cap rate 5.2%.",
                },
              ].map(({ label, detail }) => (
                <div
                  key={label}
                  className="bg-obsidian/80 backdrop-blur-sm px-6 py-5 border border-warm-700/20"
                >
                  <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                    {label}
                  </p>
                  <p className="text-warm-300 text-xs leading-relaxed font-light">
                    {detail}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-8 gap-4">
              <a
                href="#contact"
                className="bg-gold text-obsidian text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300"
              >
                Schedule a Showing
              </a>
              <a
                href="#services"
                className="border border-warm-600 text-warm-300 text-xs tracking-[0.3em] uppercase px-8 py-4 hover:border-gold hover:text-gold transition-colors duration-300"
              >
                View All Listings
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
