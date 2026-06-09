"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// Homepage cross-sell: points visitors to the Sonder Photography studio.
// Mirrors the bundle-offer treatment used on the photography page so the two
// pages feel like one connected studio.
export default function PhotographyPromo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-obsidian px-5 py-12 md:px-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative rounded-3xl overflow-hidden bg-obsidian"
      >
        {/* Drone aerial — our own listing photography on display */}
        <Image
          src="/media/photography-aerial.jpg"
          alt="Aerial drone photograph of a residential community and pool"
          fill
          sizes="(max-width: 768px) 100vw, 90vw"
          className="object-cover object-center"
        />
        {/* Cinematic scrim so the copy stays legible over the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/55" />
        <div className="absolute inset-0 bg-obsidian/30" />
        {/* Living aurora — drifting brand light over the image */}
        <div className="aurora opacity-60" />

        <div className="relative z-10 px-7 py-12 md:px-16 md:py-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 mb-6 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-gold-light text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold">
              Sonder Photography
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-light text-warm-50 leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We shoot your listings too.
            <br />
            <em className="text-gold-light font-normal">Photo, drone & 3D.</em>
          </h2>
          <p className="text-warm-300 text-sm md:text-base font-light leading-relaxed mb-9 max-w-xl mx-auto">
            This aerial? <strong className="text-warm-50 font-medium">Ours.</strong> Premium
            property photography, FAA-licensed drone aerials, AI-generated 3D tours, and
            cinematic listing films. Book any package and get{" "}
            <strong className="text-warm-50 font-medium">30% off your website setup fee</strong>{" "}
            — one studio for both sides of your listing.
          </p>
          <Link
            href="/photography"
            className="glass-btn-accent inline-block text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-3.5 font-medium"
          >
            Explore Photography
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
