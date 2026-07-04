"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Placeholder from "@/components/Placeholder";
import { showcase } from "@/config/site";

// ── 2 — FLOATING SHOWCASE ───────────────────────────────────────────────────
// dock.cool's floating product shot, reskinned. A large central cinematic-
// walkthrough video placeholder with a smaller property-website mockup floating
// over its corner. Soft shadows + a gentle, looping vertical drift for motion.
//
// TODO(asset): replace both Placeholder blocks with real media —
//   showcase.primary  → cinematic walkthrough reel (16:9 MP4, muted autoplay loop)
//   showcase.secondary→ property-website screen capture (9:16 portrait)
export default function FloatingShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative px-5 pt-16 pb-16 md:px-8 md:pt-24 md:pb-24"
    >
      {/* Full-bleed oceanfront background behind the walkthrough video */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/sonder-edge-waterfront.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle dark overlay so the floating video reads clearly */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Large central walkthrough placeholder — floats up and down slowly */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-3xl shadow-2xl shadow-navy-deep/70 ring-1 ring-teal/10"
          >
            <Placeholder
              label={showcase.primary.label}
              sublabel={showcase.primary.sublabel}
              aspect={showcase.primary.aspect}
              src={showcase.primary.src}
              kind={showcase.primary.kind}
              sizes="(min-width: 768px) 900px, 100vw"
              className="rounded-3xl"
            />
          </motion.div>

          {/* Property-website mockup — floats over the bottom-right corner */}
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -bottom-10 right-2 w-28 sm:w-40 md:right-6 md:w-52 lg:-right-8"
          >
            <div className="rounded-2xl shadow-2xl shadow-navy-deep/80 ring-1 ring-teal/15">
              <Placeholder
                label={showcase.secondary.label}
                sublabel={showcase.secondary.sublabel}
                aspect={showcase.secondary.aspect}
                src={showcase.secondary.src}
                kind={showcase.secondary.kind}
                sizes="(min-width: 768px) 220px, 160px"
                className="rounded-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
