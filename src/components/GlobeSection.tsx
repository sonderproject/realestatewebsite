"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import type { MotionValue } from "framer-motion";

const GLOBE_1_SRC = "/media/globe.jpg";
const GLOBE_2_SRC = "/media/globe-2.jpg";
const GLOBE_3_SRC = "/media/globe-3.jpg";
const GLOBE_SIZE = "42vmin";

const PLACES = [
  {
    index: "01",
    name: "Ocean Beach",
    coords: "32.74° N  117.25° W",
    tag: "Your market, beautifully presented.",
    src: GLOBE_1_SRC,
  },
  {
    index: "02",
    name: "La Jolla Heights",
    coords: "32.84° N  117.27° W",
    tag: "Listings that convert at first sight.",
    src: GLOBE_2_SRC,
  },
  {
    index: "03",
    name: "Downtown San Diego",
    coords: "32.71° N  117.16° W",
    tag: "Digital presence that commands attention.",
    src: GLOBE_3_SRC,
  },
];

function SphereShading({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <>
      <motion.div
        style={{
          opacity,
          background:
            "radial-gradient(circle at 50% 50%, transparent 48%, rgba(3,6,10,0.94) 100%)",
        }}
        className="absolute inset-0 pointer-events-none"
      />
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
  const { scrollYProgress: rawProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Smooth the raw scroll progress with a spring. Every globe motion below
  // reads from this instead of the raw value, so the whole sequence eases
  // fluidly rather than tracking scroll 1:1 (which feels steppy/jittery,
  // especially on mobile and trackpads).
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.0005,
  });

  // ── Lightbox state ────────────────────────────────────────────────────
  const [expanded, setExpanded] = useState<number | null>(null);

  const closeExpanded = useCallback(() => setExpanded(null), []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (expanded === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeExpanded();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        setExpanded((p) => (p !== null && p > 0 ? p - 1 : p));
      if (e.key === "ArrowDown" || e.key === "ArrowRight")
        setExpanded((p) => (p !== null && p < PLACES.length - 1 ? p + 1 : p));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, closeExpanded]);

  // ── 1.5 s scroll lock when Globe 3 fully expands ─────────────────────
  useEffect(() => {
    let locked = false;
    let lockTimer: ReturnType<typeof setTimeout> | null = null;

    const prevent = (e: Event) => { e.preventDefault(); };

    const lock = () => {
      if (locked) return;
      locked = true;
      // Pause Lenis on desktop
      window.dispatchEvent(new CustomEvent("sonder:scroll-lock"));
      // Block native wheel + touch scroll (mobile + trackpad)
      window.addEventListener("wheel", prevent, { passive: false });
      window.addEventListener("touchmove", prevent, { passive: false });

      lockTimer = setTimeout(() => {
        unlock();
      }, 1500);
    };

    const unlock = () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.dispatchEvent(new CustomEvent("sonder:scroll-unlock"));
      if (lockTimer) { clearTimeout(lockTimer); lockTimer = null; }
    };

    const unsub = scrollYProgress.on("change", (v) => {
      if (v >= 0.88) lock();
      // Reset so lock fires again if user scrolls back up then down
      if (v < 0.78) { locked = false; }
    });

    return () => {
      unsub();
      unlock();
    };
  }, [scrollYProgress]);

  // ── Phase timeline (350vh) ────────────────────────────────────────────
  //  0.00–0.30  Flat coastal image zooms in → intro caption
  //  0.30–0.46  Corners round to sphere, space backdrop fades in
  //  0.46–0.64  Globe 1 slides UP off screen, Globe 2 rises from below
  //  0.63–0.78  Globe 2 slides UP off screen, Globe 3 rises from below
  //  0.76–0.93  Globe 3 (centered) expands to fill screen
  //  0.91–1.00  Full-screen coastal image — info section
  // ─────────────────────────────────────────────────────────────────────

  const spaceOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.42, 0.84, 0.96],
    [0, 1, 1, 0]
  );
  const sphereShading = useTransform(scrollYProgress, [0.30, 0.48], [0, 1]);

  // Globe 1 — zooms in, rounds, slides UP
  const g1Scale = useTransform(scrollYProgress, [0, 0.22, 0.42], [1.1, 1.55, 1.0]);
  const g1Radius = useTransform(scrollYProgress, [0.24, 0.44], ["3%", "50%"]);
  const g1Y = useTransform(scrollYProgress, [0.44, 0.62], [0, -800]);
  const g1Opacity = useTransform(scrollYProgress, [0.46, 0.60], [1, 0]);
  const g1GlowOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.48, 0.50, 0.62],
    [0, 1, 1, 0]
  );

  // Globe 2 — rises from below, slides UP
  const g2Scale = useTransform(scrollYProgress, [0.46, 0.56], [0.7, 1.0]);
  const g2Y = useTransform(
    scrollYProgress,
    [0.46, 0.56, 0.63, 0.76],
    [800, 0, 0, -800]
  );
  const g2Opacity = useTransform(
    scrollYProgress,
    [0.46, 0.55, 0.64, 0.76],
    [0, 1, 1, 0]
  );

  // Globe 3 — rises from below, expands to fill screen
  const g3Y = useTransform(scrollYProgress, [0.63, 0.76], [800, 0]);
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
  const overlayOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);

  const infoOpacity = useTransform(scrollYProgress, [0.91, 0.97], [0, 1]);
  const infoY = useTransform(scrollYProgress, [0.91, 0.97], [28, 0]);

  const intro = useTransform(
    scrollYProgress,
    [0.02, 0.12, 0.20, 0.30],
    [0, 1, 1, 0]
  );

  // Per-globe captions
  const cap1 = useTransform(scrollYProgress, [0.30, 0.36, 0.44, 0.50], [0, 1, 1, 0]);
  const cap2 = useTransform(scrollYProgress, [0.50, 0.57, 0.63, 0.70], [0, 1, 1, 0]);
  const cap3 = useTransform(scrollYProgress, [0.70, 0.77, 0.81, 0.86], [0, 1, 1, 0]);
  const captions = [cap1, cap2, cap3];
  const capY1 = useTransform(scrollYProgress, [0.30, 0.36], [18, 0]);
  const capY2 = useTransform(scrollYProgress, [0.50, 0.57], [18, 0]);
  const capY3 = useTransform(scrollYProgress, [0.70, 0.77], [18, 0]);
  const capYs = [capY1, capY2, capY3];

  // Progress rail — now vertical (01 top, 03 bottom matches downward flow)
  const railOpacity = useTransform(scrollYProgress, [0.28, 0.34, 0.82, 0.88], [0, 1, 1, 0]);
  const dot1 = useTransform(scrollYProgress, [0.30, 0.36, 0.46, 0.50], [0.25, 1, 1, 0.25]);
  const dot2 = useTransform(scrollYProgress, [0.50, 0.57, 0.63, 0.70], [0.25, 1, 1, 0.25]);
  const dot3 = useTransform(scrollYProgress, [0.70, 0.77, 0.83, 0.87], [0.25, 1, 1, 0.25]);
  const dots = [dot1, dot2, dot3];

  // Shared expand-hint hover class (only visible when shading makes sphere clear)
  const globeBase = "relative overflow-hidden bg-[#0c2733] cursor-pointer select-none";

  return (
    <>
      <section ref={ref} className="relative bg-obsidian" style={{ height: "350vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">

          {/* Deep-space backdrop */}
          <motion.div style={{ opacity: spaceOpacity }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0b1e2e_0%,#060606_72%)]" />
            <div className="starfield absolute inset-0" />
          </motion.div>

          {/* Atmospheric glow — tracks Globe 1 vertically */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <motion.div
              style={{
                opacity: g1GlowOpacity,
                scale: g1Scale,
                y: g1Y,
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
                y: g1Y,
                opacity: g1Opacity,
                borderRadius: g1Radius,
                width: GLOBE_SIZE,
                height: GLOBE_SIZE,
                willChange: "transform, opacity",
              }}
              className={`${globeBase} pointer-events-auto`}
              onClick={() => setExpanded(0)}
              role="button"
              aria-label="Expand Ocean Beach image"
            >
              <GlobeTexture src={GLOBE_1_SRC} />
              <SphereShading opacity={sphereShading} />
              <ExpandHint />
            </motion.div>
          </div>

          {/* ── Globe 2 ── */}
          <div className="absolute inset-0 z-[21] flex items-center justify-center pointer-events-none">
            <motion.div
              style={{
                scale: g2Scale,
                y: g2Y,
                opacity: g2Opacity,
                borderRadius: "50%",
                width: GLOBE_SIZE,
                height: GLOBE_SIZE,
                willChange: "transform, opacity",
              }}
              className={`${globeBase} pointer-events-auto`}
              onClick={() => setExpanded(1)}
              role="button"
              aria-label="Expand La Jolla Heights image"
            >
              <GlobeTexture src={GLOBE_2_SRC} />
              <SphereShading opacity={sphereShading} />
              <ExpandHint />
            </motion.div>
          </div>

          {/* ── Globe 3 — expands to fill screen ── */}
          <div className="absolute inset-0 z-[22] flex items-center justify-center pointer-events-none">
            <motion.div
              style={{
                scale: g3Scale,
                y: g3Y,
                opacity: g3Opacity,
                borderRadius: g3Radius,
                width: GLOBE_SIZE,
                height: GLOBE_SIZE,
                willChange: "transform, opacity",
              }}
              className={`${globeBase} pointer-events-auto`}
              onClick={() => setExpanded(2)}
              role="button"
              aria-label="Expand Downtown San Diego image"
            >
              <GlobeTexture src={GLOBE_3_SRC} />
              <SphereShading opacity={sphereShading} />
              {/* Readability overlay as globe fills screen */}
              <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-obsidian/65 pointer-events-none"
              />
              <ExpandHint />
            </motion.div>
          </div>

          {/* Left progress rail */}
          <motion.div
            style={{ opacity: railOpacity }}
            className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-5 pointer-events-none"
          >
            {dots.map((op, i) => (
              <motion.div
                key={i}
                style={{ opacity: op }}
                className="flex flex-col items-center gap-5"
              >
                <span
                  className="text-warm-50 text-[10px] tracking-[0.3em] font-light"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {PLACES[i].index}
                </span>
                {i < PLACES.length - 1 && (
                  <span className="w-px h-8 bg-gold/40" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Per-globe location captions */}
          <div className="absolute inset-x-0 bottom-[13vh] z-30 flex justify-center pointer-events-none">
            <div className="relative w-full max-w-md h-24">
              {PLACES.map((place, i) => (
                <motion.div
                  key={place.name}
                  style={{ opacity: captions[i], y: capYs[i] }}
                  className="absolute inset-x-0 text-center px-6"
                >
                  <p className="text-gold text-[10px] tracking-[0.45em] uppercase mb-2 font-light">
                    {place.coords}
                  </p>
                  <h3
                    className="text-2xl md:text-3xl font-light text-warm-50 mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      textShadow: "0 2px 24px rgba(0,0,0,0.7)",
                    }}
                  >
                    {place.name}
                  </h3>
                  <p className="text-warm-300 text-xs font-light italic tracking-wide">
                    {place.tag}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Intro caption */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <motion.div style={{ opacity: intro }} className="text-center px-8">
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-light">
                Your Market
              </p>
              <h2
                className="text-4xl md:text-6xl font-light text-warm-50"
                style={{
                  fontFamily: "var(--font-display)",
                  textShadow: "0 2px 30px rgba(0,0,0,0.7)",
                }}
              >
                Your City. Your Brand.
              </h2>
            </motion.div>
          </div>

          {/* Info over expanded Globe 3 */}
          <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
            <motion.div
              style={{ opacity: infoOpacity, y: infoY }}
              className="text-center px-6 max-w-4xl w-full"
            >
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
                One Agency
              </p>
              <h2
                className="text-3xl md:text-5xl font-light text-warm-50 mb-8 md:mb-10 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Built for the markets
                <br />
                <em className="text-gold-light font-normal">where stakes are high.</em>
              </h2>

              <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4 mb-9 md:mb-11 max-w-2xl mx-auto">
                {[
                  { value: "120+", label: "Websites Launched" },
                  { value: "40+", label: "Agents & Brokerages" },
                  { value: "3×", label: "Avg. Lead Increase" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex-1 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md px-5 py-5 text-center"
                  >
                    <p
                      className="text-2xl md:text-3xl lg:text-4xl text-gold-light font-medium mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {value}
                    </p>
                    <p className="text-warm-300 text-[10px] tracking-[0.2em] uppercase font-medium">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="glass-btn-accent pointer-events-auto inline-block text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-3.5 font-medium"
              >
                Book a Consultation
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ backgroundColor: "rgba(4,8,14,0.92)" }}
            onClick={closeExpanded}
          >
            {/* Backdrop blur layer */}
            <div
              className="absolute inset-0"
              style={{
                WebkitBackdropFilter: "blur(16px)",
                backdropFilter: "blur(16px)",
              }}
            />

            {/* Image card */}
            <motion.div
              key={expanded}
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
              style={{ width: "min(90vw, 860px)", height: "min(80vh, 560px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${PLACES[expanded].src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Bottom caption */}
              <div className="absolute inset-x-0 bottom-0 px-6 py-7 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-1 font-light">
                  {PLACES[expanded].coords}
                </p>
                <h3
                  className="text-warm-50 text-xl md:text-2xl font-light"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {PLACES[expanded].name}
                </h3>
                <p className="text-warm-300 text-sm font-light mt-1">
                  {PLACES[expanded].tag}
                </p>
              </div>

              {/* Prev — swipe up metaphor */}
              {expanded > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded((p) => (p !== null ? p - 1 : p));
                  }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-white/20 transition-colors active:scale-95"
                  aria-label="Previous"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[9px] tracking-widest uppercase opacity-70">Prev</span>
                </button>
              )}

              {/* Next — swipe down metaphor */}
              {expanded < PLACES.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded((p) => (p !== null ? p + 1 : p));
                  }}
                  className="absolute bottom-24 right-4 flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-white/20 transition-colors active:scale-95"
                  aria-label="Next"
                >
                  <span className="text-[9px] tracking-widest uppercase opacity-70">Next</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 4v8M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </motion.div>

            {/* Close */}
            <button
              onClick={closeExpanded}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors active:scale-95"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Dot indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
              {PLACES.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setExpanded(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === expanded
                      ? "w-5 h-2 bg-gold"
                      : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to ${PLACES[i].name}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Small expand-hint overlay shown on hover / focus
function ExpandHint() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none">
      <span className="flex items-center gap-1.5 bg-black/50 text-white text-[10px] tracking-[0.2em] uppercase rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/20">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M1 10L10 1M10 1H5M10 1v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        View
      </span>
    </div>
  );
}
