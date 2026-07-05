"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  "Interactive 3D floor plans",
  "Luxury AI virtual staging",
  "Photorealistic room visualization",
  "Perfect for listings, developers, investors, architects, and luxury property marketing",
];

export default function FloorPlansSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const rise = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={ref}
      id="floor-plans"
      className="relative overflow-hidden bg-obsidian py-16 px-5 md:py-28 md:px-16"
    >
      {/* Soft brand glow behind the showcase */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(62,155,212,0.14), rgba(10,10,9,0) 70%)",
        }}
      />

      <div className="relative z-10 grid items-center gap-8 md:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Image — first on mobile, left on desktop. Focal point. */}
        <motion.div
          custom={0}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={rise}
          className="group"
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/60 ring-1 ring-white/[0.06] transition-transform duration-500 ease-out hover:-translate-y-1">
            <video
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/floorplan-oceanfront.jpg"
              aria-label="Animated interactive 3D floor plan walkthrough of a luxury property."
            >
              <source src="/media/floorplan-walkthrough.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Glass description panel — right on desktop */}
        <motion.div
          custom={1}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={rise}
          className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 md:p-10 backdrop-blur-md shadow-lg transition-colors duration-500 hover:bg-white/[0.08]"
        >
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-gold-light">
            AI Property Visualization
          </p>
          <h2
            className="mb-5 text-3xl font-light leading-[1.05] text-warm-50 md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Interactive 3D Floor Plans
          </h2>
          <p className="mb-8 text-base font-light leading-relaxed text-warm-200 md:text-lg">
            Transform traditional floor plans into immersive, photorealistic 3D
            experiences with luxury virtual staging. Help buyers instantly
            understand the layout, room flow, and scale of a property while
            creating an unforgettable first impression that drives engagement and
            interest.
          </p>

          <ul className="mb-9 flex flex-col gap-3">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-sm text-gold-light">✓</span>
                <span className="text-sm font-light leading-snug text-warm-100">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="glass-btn-accent inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white"
          >
            Explore Floor Plan Experiences
            <span className="inline-block h-px w-6 bg-current" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
