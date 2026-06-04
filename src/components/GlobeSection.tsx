"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Texture mapped onto the "globe". Coastal photo for now (per the swap).
const GLOBE_SRC = "/media/globe.jpg";

export default function GlobeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll choreography:
  //  0.00–0.25  zoom into the flat image
  //  0.25–0.50  morph into a spinning sphere (Earth-like)
  //  0.50–0.78  pull back, revealing it on a computer screen
  //  0.78–1.00  hold, then the page releases and continues
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.78], [1.15, 1.5, 1.0, 0.42]);
  const radius = useTransform(scrollYProgress, [0.25, 0.48], ["3%", "50%"]);
  const sphere = useTransform(scrollYProgress, [0.28, 0.5], [0, 1]);
  const space = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const screen = useTransform(scrollYProgress, [0.55, 0.74], [0, 1]);
  const screenScale = useTransform(scrollYProgress, [0.55, 0.78], [0.86, 1]);

  const intro = useTransform(scrollYProgress, [0.02, 0.12, 0.22, 0.32], [0, 1, 1, 0]);
  const outro = useTransform(scrollYProgress, [0.72, 0.84], [0, 1]);

  return (
    <section ref={ref} className="relative bg-obsidian" style={{ height: "340vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        {/* Deep-space backdrop, appears once in orbit */}
        <motion.div style={{ opacity: space }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0b1e2e_0%,#060606_72%)]" />
        </motion.div>

        {/* Atmospheric glow behind the globe */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              opacity: sphere,
              scale,
              width: "82vmin",
              height: "82vmin",
              boxShadow:
                "0 0 70px 16px rgba(120,170,220,0.30), inset 0 0 50px rgba(150,195,235,0.20)",
            }}
            className="rounded-full"
          />
        </div>

        {/* The computer screen the globe pulls back into */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div style={{ opacity: screen, scale: screenScale }} className="relative">
            <div
              className="rounded-[1.4vmin] border-[1.5vmin] border-[#1c1a17] bg-black/40 shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
              style={{ width: "66vmin", height: "44vmin" }}
            />
            <div className="absolute inset-[1.5vmin] rounded-[0.6vmin] bg-gradient-to-br from-white/5 to-transparent" />
            {/* stand */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 w-[7vmin] h-[4vmin] bg-[#1c1a17]" />
            <div className="absolute left-1/2 top-[calc(100%+4vmin)] -translate-x-1/2 w-[22vmin] h-[1.4vmin] rounded-full bg-[#1c1a17]" />
          </motion.div>
        </div>

        {/* The globe / image */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            style={{ scale, borderRadius: radius, width: "82vmin", height: "82vmin" }}
            className="relative overflow-hidden bg-[#0c2733]"
          >
            {/* Seamless spinning map: two identical halves translated -50% */}
            <div className="globe-track absolute inset-y-0 left-0 flex h-full" style={{ width: "200%" }}>
              <div
                className="h-full w-1/2"
                style={{ backgroundImage: `url('${GLOBE_SRC}')`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div
                className="h-full w-1/2"
                style={{ backgroundImage: `url('${GLOBE_SRC}')`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
            </div>

            {/* Spherical limb shadow (darkens edges into a ball) */}
            <motion.div
              style={{
                opacity: sphere,
                background: "radial-gradient(circle at 50% 50%, transparent 48%, rgba(3,6,10,0.92) 100%)",
              }}
              className="absolute inset-0 pointer-events-none"
            />
            {/* Highlight */}
            <motion.div
              style={{
                opacity: sphere,
                background: "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.38) 0%, transparent 40%)",
              }}
              className="absolute inset-0 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Intro caption */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <motion.div style={{ opacity: intro }} className="text-center px-8">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-light">
              Global Reach
            </p>
            <h2
              className="text-4xl md:text-6xl font-light text-warm-50"
              style={{ fontFamily: "var(--font-display)", textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
            >
              A World of Opportunity
            </h2>
          </motion.div>
        </div>

        {/* Outro caption (once it's on the screen) */}
        <div className="absolute inset-x-0 bottom-[11vh] z-30 flex justify-center pointer-events-none">
          <motion.div style={{ opacity: outro }} className="text-center px-8">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-light">
              One Platform
            </p>
            <h2
              className="text-3xl md:text-5xl font-light text-warm-50"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The world&apos;s finest coastlines,
              <br />
              <em>at your fingertips.</em>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
