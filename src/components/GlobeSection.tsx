"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

// Three coastal aerials, one per globe in the carousel
const GLOBE_1_SRC = "/media/globe.jpg";   // Ocean Beach pier at sunset
const GLOBE_2_SRC = "/media/globe-2.jpg"; // hillside coastal neighborhood
const GLOBE_3_SRC = "/media/globe-3.jpg"; // downtown San Diego, golden hour

const GLOBE_SIZE = "42vmin";

function SphereShading({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <>
      {/* Limb shadow — darkens the edges into a ball */}
      <motion.div
        style={{
          opacity,
          background:
            "radial-gradient(circle at 50% 50%, transparent 48%, rgba(3,6,10,0.94) 100%)",
        }}
        className="absolute inset-0 pointer-events-none"
      />
      {/* Specular highlight */}
      <motion.div
        style={{
          opacity,
          background:
            "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.36) 0%, transparent 40%)",
        }}
        className="absolute inset-0 pointer-events-none"
      />
    </>
  );
}

function GlobeTexture({ src }: { src: string }) {
  return (
    <div
      className="globe-drift absolute inset-0"
      style={{
        backgroundImage: `url('${src}')`,
        backgroundSize: "165% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    />
  );
}

export default function GlobeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ── Phase timeline (500vh) ──────────────────────────────────────────────
  //  0.00–0.30  Flat coastal image zooms in → "Global Reach" caption
  //  0.30–0.46  Corners round to sphere, space backdrop fades in
  //  0.46–0.62  Globe 1 slides LEFT off screen, Globe 2 enters from RIGHT
  //  0.62–0.76  Globe 2 slides LEFT off screen, Globe 3 enters from RIGHT
  //  0.76–0.92  Globe 3 (centered) expands to fill screen
  //  0.92–1.00  Full-screen coastal image — info section
  // ───────────────────────────────────────────────────────────────────────

  // Space backdrop
  const spaceOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.42, 0.84, 0.96],
    [0, 1, 1, 0]
  );

  // Shared sphere shading — reaches full at 0.48 and holds
  const sphereShading = useTransform(scrollYProgress, [0.30, 0.48], [0, 1]);

  // ── Globe 1: hero zoom → sphere → slide left ──
  const g1Scale = useTransform(scrollYProgress, [0, 0.22, 0.42], [1.1, 1.55, 1.0]);
  const g1Radius = useTransform(scrollYProgress, [0.24, 0.44], ["3%", "50%"]);
  const g1X = useTransform(scrollYProgress, [0.44, 0.64], [0, -700]);
  const g1Opacity = useTransform(scrollYProgress, [0.46, 0.60], [1, 0]);
  // Glow tied to Globe 1 — follows its position and fades with it
  const g1GlowOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.48, 0.50, 0.62],
    [0, 1, 1, 0]
  );

  // ── Globe 2: slides in from right → holds → slides left ──
  const g2Scale = useTransform(scrollYProgress, [0.46, 0.56], [0.7, 1.0]);
  const g2X = useTransform(
    scrollYProgress,
    [0.46, 0.56, 0.63, 0.78],
    [700, 0, 0, -700]
  );
  const g2Opacity = useTransform(
    scrollYProgress,
    [0.46, 0.55, 0.64, 0.76],
    [0, 1, 1, 0]
  );

  // ── Globe 3: slides in from right → expands to fill screen ──
  const g3X = useTransform(scrollYProgress, [0.63, 0.76], [700, 0]);
  const g3Scale = useTransform(
    scrollYProgress,
    [0.63, 0.76, 0.93],
    [0.7, 1.0, 6.4]
  );
  const g3Opacity = useTransform(scrollYProgress, [0.63, 0.74], [0, 1]);
  const g3Radius = useTransform(
    scrollYProgress,
    [0.63, 0.76, 0.91],
    ["50%", "50%", "0%"]
  );

  // Dark overlay inside Globe 3 (readability as it fills the screen)
  const overlayOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);

  // Info text above Globe 3
  const infoOpacity = useTransform(scrollYProgress, [0.91, 0.97], [0, 1]);
  const infoY = useTransform(scrollYProgress, [0.91, 0.97], [28, 0]);

  // Intro caption
  const intro = useTransform(
    scrollYProgress,
    [0.02, 0.12, 0.20, 0.30],
    [0, 1, 1, 0]
  );

  return (
    <section ref={ref} className="relative bg-obsidian" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">

        {/* Deep-space backdrop */}
        <motion.div style={{ opacity: spaceOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0b1e2e_0%,#060606_72%)]" />
        </motion.div>

        {/* Atmospheric glow — follows Globe 1 */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              opacity: g1GlowOpacity,
              scale: g1Scale,
              x: g1X,
              width: GLOBE_SIZE,
              height: GLOBE_SIZE,
              boxShadow:
                "0 0 80px 22px rgba(120,170,220,0.32), inset 0 0 50px rgba(150,195,235,0.18)",
            }}
            className="rounded-full"
          />
        </div>

        {/* ── Globe 1 ── */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              scale: g1Scale,
              x: g1X,
              opacity: g1Opacity,
              borderRadius: g1Radius,
              width: GLOBE_SIZE,
              height: GLOBE_SIZE,
            }}
            className="relative overflow-hidden bg-[#0c2733]"
          >
            <GlobeTexture src={GLOBE_1_SRC} />
            <SphereShading opacity={sphereShading} />
          </motion.div>
        </div>

        {/* ── Globe 2 ── */}
        <div className="absolute inset-0 z-[21] flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              scale: g2Scale,
              x: g2X,
              opacity: g2Opacity,
              borderRadius: "50%",
              width: GLOBE_SIZE,
              height: GLOBE_SIZE,
            }}
            className="relative overflow-hidden bg-[#0c2733]"
          >
            <GlobeTexture src={GLOBE_2_SRC} />
            <SphereShading opacity={sphereShading} />
          </motion.div>
        </div>

        {/* ── Globe 3 — expands to fill screen then shows info ── */}
        <div className="absolute inset-0 z-[22] flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              scale: g3Scale,
              x: g3X,
              opacity: g3Opacity,
              borderRadius: g3Radius,
              width: GLOBE_SIZE,
              height: GLOBE_SIZE,
            }}
            className="relative overflow-hidden bg-[#0c2733]"
          >
            <GlobeTexture src={GLOBE_3_SRC} />
            <SphereShading opacity={sphereShading} />
            {/* Readability overlay fades in as globe fills screen */}
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-obsidian/65 pointer-events-none"
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

        {/* Info section over the expanded Globe 3 */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{ opacity: infoOpacity, y: infoY }}
            className="text-center px-8 max-w-4xl w-full"
          >
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
              One Platform
            </p>
            <h2
              className="text-3xl md:text-5xl font-light text-warm-50 mb-8 md:mb-10 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The world&apos;s finest coastlines,
              <br />
              <em>at your fingertips.</em>
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 mb-10 md:mb-12">
              {[
                { value: "$2.4B", label: "In Transactions" },
                { value: "340+", label: "Properties Placed" },
                { value: "97%", label: "List-to-Sale Ratio" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="text-2xl md:text-3xl lg:text-4xl text-gold font-light mb-1"
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
