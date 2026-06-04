"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GLOBE_SRC = "/media/globe.jpg";

export default function GlobeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Phase timeline (500vh):
  //  0.00–0.25  flat image zooms in, "Global Reach" intro caption
  //  0.25–0.55  corners round to sphere, space backdrop appears
  //  0.55–0.68  full spinning globe holds
  //  0.68–0.86  sphere expands to fill screen (scale up, radius → 0, dark overlay fades in)
  //  0.86–1.00  full-screen coastal backdrop, info section appears

  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.56, 0.66, 0.88],
    [1.1, 1.55, 1.0, 1.0, 3.4]
  );
  const radius = useTransform(
    scrollYProgress,
    [0.24, 0.46, 0.66, 0.82],
    ["3%", "50%", "50%", "0%"]
  );
  const spaceOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.44, 0.66, 0.84],
    [0, 1, 1, 0]
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.48, 0.62, 0.78],
    [0, 1, 1, 0]
  );
  const sphereShadow = useTransform(scrollYProgress, [0.30, 0.50], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.66, 0.84], [0, 1]);
  const infoOpacity = useTransform(scrollYProgress, [0.82, 0.93], [0, 1]);
  const infoY = useTransform(scrollYProgress, [0.82, 0.93], [32, 0]);
  const intro = useTransform(
    scrollYProgress,
    [0.02, 0.12, 0.20, 0.30],
    [0, 1, 1, 0]
  );

  return (
    <section ref={ref} className="relative bg-obsidian" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">

        {/* Deep-space backdrop — fades in during sphere phase, out during expansion */}
        <motion.div style={{ opacity: spaceOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0b1e2e_0%,#060606_72%)]" />
        </motion.div>

        {/* Atmospheric glow ring behind the globe */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              opacity: glowOpacity,
              scale,
              width: "82vmin",
              height: "82vmin",
              boxShadow:
                "0 0 80px 20px rgba(120,170,220,0.32), inset 0 0 50px rgba(150,195,235,0.18)",
            }}
            className="rounded-full"
          />
        </div>

        {/* Globe / image */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            style={{ scale, borderRadius: radius, width: "82vmin", height: "82vmin" }}
            className="relative overflow-hidden bg-[#0c2733]"
          >
            {/* Single drifting image — no seam */}
            <div
              className="globe-drift absolute inset-0"
              style={{
                backgroundImage: `url('${GLOBE_SRC}')`,
                backgroundSize: "165% auto",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            />

            {/* Spherical limb shadow */}
            <motion.div
              style={{
                opacity: sphereShadow,
                background:
                  "radial-gradient(circle at 50% 50%, transparent 48%, rgba(3,6,10,0.94) 100%)",
              }}
              className="absolute inset-0 pointer-events-none"
            />
            {/* Specular highlight */}
            <motion.div
              style={{
                opacity: sphereShadow,
                background:
                  "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.36) 0%, transparent 40%)",
              }}
              className="absolute inset-0 pointer-events-none"
            />

            {/* Darkening overlay for info-section readability */}
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-obsidian/68 pointer-events-none"
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
              style={{
                fontFamily: "var(--font-display)",
                textShadow: "0 2px 30px rgba(0,0,0,0.7)",
              }}
            >
              A World of Opportunity
            </h2>
          </motion.div>
        </div>

        {/* Info section — appears over the full-screen coastal image */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{ opacity: infoOpacity, y: infoY }}
            className="text-center px-8 max-w-4xl w-full"
          >
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
              One Platform
            </p>
            <h2
              className="text-4xl md:text-6xl font-light text-warm-50 mb-12 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The world&apos;s finest coastlines,
              <br />
              <em>at your fingertips.</em>
            </h2>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20 mb-14">
              {[
                { value: "$2.4B", label: "In Transactions" },
                { value: "340+", label: "Properties Placed" },
                { value: "97%", label: "List-to-Sale Ratio" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="text-3xl md:text-4xl text-gold font-light mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {value}
                  </p>
                  <p className="text-warm-300 text-[10px] tracking-[0.3em] uppercase font-light">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="pointer-events-auto inline-block border border-gold/50 text-gold text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold/10 transition-all duration-300"
            >
              Begin Your Search
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
