"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const GLOBE_1_SRC = "/media/globe.jpg";
const GLOBE_2_SRC = "/media/globe-2.jpg";
const GLOBE_3_SRC = "/media/globe-3.jpg";

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

// Auto-advance cadence (ms). Matches the progress-bar CSS duration below.
const ADVANCE_MS = 5200;

const STATS = [
  { value: "120+", label: "Websites Launched" },
  { value: "40+", label: "Agents & Brokerages" },
  { value: "3×", label: "Avg. Lead Increase" },
];

export default function GlobeSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const place = PLACES[active];
  const frozen = paused || expanded !== null;

  // Auto-advance through the locations. Re-arms on every change, so a manual
  // selection also resets the timer. Pauses on hover or while the lightbox is
  // open. No scroll hijacking — the section lives in normal document flow.
  useEffect(() => {
    if (frozen) return;
    const id = setTimeout(
      () => setActive((p) => (p + 1) % PLACES.length),
      ADVANCE_MS
    );
    return () => clearTimeout(id);
  }, [active, frozen]);

  // ── Lightbox ──────────────────────────────────────────────────────────
  const closeExpanded = useCallback(() => setExpanded(null), []);

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

  return (
    <>
      <section
        ref={ref}
        className="relative bg-obsidian overflow-hidden px-5 py-16 md:px-16 md:py-24"
      >
        {/* Signature brand atmosphere — drifting aurora + faint starfield */}
        <div className="aurora opacity-40" />
        <div className="starfield absolute inset-0 opacity-[0.25] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="mb-8 md:mb-12 max-w-2xl"
          >
            <p className="text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 font-medium">
              Your Market
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light text-warm-50 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your city. <em className="text-gold-light font-normal">Your brand.</em>
            </h2>
            <p className="text-warm-400 text-sm md:text-base font-light leading-relaxed mt-4 max-w-lg">
              From the coast to downtown, we build the digital presence that wins
              the neighborhoods you work. Every market, beautifully presented.
            </p>
          </motion.div>

          {/* Interactive location gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="grid lg:grid-cols-[1.55fr_1fr] gap-4 md:gap-6"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* ── Feature image ── */}
            <div
              className="group relative rounded-3xl overflow-hidden h-[46vh] sm:h-[54vh] lg:h-[62vh] bg-[#0c2733] cursor-pointer"
              onClick={() => setExpanded(active)}
              role="button"
              aria-label={`Expand ${place.name} image`}
            >
              {/* Auto-advance progress bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-white/10 z-30">
                <div
                  key={active}
                  className="h-full bg-gold"
                  style={{
                    animation: `gallery-progress ${ADVANCE_MS}ms linear forwards`,
                    animationPlayState: frozen ? "paused" : "running",
                  }}
                />
              </div>

              {/* Crossfading images with a slow Ken Burns drift */}
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div
                    className="kenburns absolute inset-0"
                    style={{ backgroundImage: `url('${place.src}')` }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Legibility gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/15 to-obsidian/10 pointer-events-none" />

              {/* Ghost numeral — editorial signature */}
              <span
                className="absolute top-3 left-5 text-[5rem] md:text-[7rem] leading-none font-light text-white/10 select-none pointer-events-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {place.index}
              </span>

              {/* View hint */}
              <span className="absolute top-5 right-5 z-20 flex items-center gap-1.5 bg-black/40 text-white text-[10px] tracking-[0.2em] uppercase rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1 10L10 1M10 1H5M10 1v5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                View
              </span>

              {/* Live caption — animates on each location change */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-8 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-gold text-[10px] md:text-[11px] tracking-[0.4em] uppercase mb-2 font-light">
                      {place.coords}
                    </p>
                    <h3
                      className="text-2xl md:text-4xl font-light text-warm-50 mb-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        textShadow: "0 2px 24px rgba(0,0,0,0.6)",
                      }}
                    >
                      {place.name}
                    </h3>
                    <p className="text-warm-300 text-xs md:text-sm font-light italic tracking-wide">
                      {place.tag}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Location selector ── */}
            <div className="flex flex-col gap-3">
              {PLACES.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.name}
                    onClick={() => setActive(i)}
                    className={`group relative text-left rounded-2xl border px-5 py-4 md:px-6 md:py-5 transition-all duration-300 ${
                      isActive
                        ? "border-gold/40 bg-white/[0.06]"
                        : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`text-base md:text-lg font-light tabular-nums leading-none mt-0.5 transition-colors duration-300 ${
                          isActive ? "text-gold" : "text-warm-500 group-hover:text-warm-300"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.index}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-lg md:text-xl font-light transition-colors duration-300 ${
                            isActive ? "text-warm-50" : "text-warm-300 group-hover:text-warm-100"
                          }`}
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {p.name}
                        </h3>
                        <p
                          className={`text-[10px] tracking-[0.25em] uppercase mt-1 transition-colors duration-300 ${
                            isActive ? "text-gold/80" : "text-warm-600"
                          }`}
                        >
                          {p.coords}
                        </p>
                        {/* Tag reveals on the active row */}
                        <div
                          className={`grid transition-all duration-300 ${
                            isActive ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <p className="overflow-hidden text-warm-400 text-xs font-light italic leading-relaxed">
                            {p.tag}
                          </p>
                        </div>
                      </div>
                      {/* Active marker */}
                      <span
                        className={`mt-1 h-2 w-2 rounded-full shrink-0 transition-all duration-300 ${
                          isActive ? "bg-gold scale-100" : "bg-white/15 scale-75 group-hover:bg-white/30"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Stats + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-10 md:mt-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-4 flex-1 max-w-2xl">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-5 text-center"
                >
                  <p
                    className="text-2xl md:text-3xl lg:text-4xl text-gold-light font-medium mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {value}
                  </p>
                  <p className="text-warm-400 text-[10px] tracking-[0.18em] uppercase font-medium leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="glass-btn-accent block w-full lg:w-auto text-center text-white text-xs tracking-[0.2em] uppercase rounded-full px-9 py-3.5 font-medium shrink-0"
            >
              Book a Consultation
            </a>
          </motion.div>
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
            {/* Backdrop blur */}
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
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${PLACES[expanded].src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

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

              {/* Prev */}
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
                    <path
                      d="M8 12V4M4 8l4-4 4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[9px] tracking-widest uppercase opacity-70">
                    Prev
                  </span>
                </button>
              )}

              {/* Next */}
              {expanded < PLACES.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded((p) => (p !== null ? p + 1 : p));
                  }}
                  className="absolute bottom-[7.5rem] md:bottom-24 right-4 flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-white/20 transition-colors active:scale-95"
                  aria-label="Next"
                >
                  <span className="text-[9px] tracking-widest uppercase opacity-70">
                    Next
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 4v8M4 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
              {PLACES.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(i);
                  }}
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
