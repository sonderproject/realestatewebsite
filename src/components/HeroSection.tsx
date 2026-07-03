"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { hero, media } from "@/config/site";

// ── 1 — HERO ───────────────────────────────────────────────────────────────
// Pinned, scroll-scrubbed header film. The hero pins to the viewport while the
// user's scroll drives the video's playback frame by frame — the footage only
// moves as fast as they scroll. Once the film has played through, the pin
// releases and the page continues below. The headline sits over the opening
// frames and lifts away as the scrub begins.
//
// Mobile: iOS/Android won't buffer or paint frames for a paused <video> until
// playback has been triggered once, so seeking currentTime does nothing and
// the scrub looks frozen. The effect below "primes" the video — a muted
// play() immediately paused — on mount and again on the first touch/scroll,
// which unlocks decoding and makes scrubbing work on phones. Seeks go through
// fastSeek where available (Safari): the film is all-intra encoded, so
// nearest-keyframe seeking is still frame-accurate but much cheaper.
//
// Honors prefers-reduced-motion: no pin, the film simply autoplays and loops.
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scrub target (0–1). A rAF loop eases the video's currentTime toward it so
  // playback stays fluid even when scroll events arrive in bursts.
  const target = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    target.current = v;
  });

  useEffect(() => {
    if (reduce) return;
    const video = videoRef.current;
    if (!video) return;

    // Scroll-driven playback replaces autoplay.
    video.pause();

    // Prime the decoder: muted+playsInline play() is allowed without a
    // gesture on modern mobile browsers, but if it's still blocked (e.g.
    // Low Power Mode), retry on the first real interaction.
    let primed = false;
    const prime = () => {
      if (primed) return;
      primed = true;
      const p = video.play();
      if (p)
        p.then(() => video.pause()).catch(() => {
          primed = false;
        });
    };
    prime();
    const gestures: (keyof WindowEventMap)[] = [
      "touchstart",
      "pointerdown",
      "scroll",
    ];
    gestures.forEach((e) =>
      window.addEventListener(e, prime, { passive: true })
    );

    const fastSeek = (
      video as HTMLVideoElement & { fastSeek?: (t: number) => void }
    ).fastSeek?.bind(video);

    let raf = 0;
    let current = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0 || video.readyState < 2)
        return;
      // Ease toward the scroll position; snap when close to avoid micro-seeks.
      current += (target.current - current) * 0.22;
      if (Math.abs(target.current - current) < 0.0005) current = target.current;
      // Stay a hair inside the ends: seeking to exact duration can blank out.
      const t = Math.min(Math.max(current * duration, 0), duration - 0.05);
      if (Math.abs(video.currentTime - t) > 0.01) {
        // Don't queue seeks on top of one another — mobile Safari stalls if
        // a new seek lands while the previous one is still in flight.
        if (video.seeking) return;
        if (fastSeek) fastSeek(t);
        else video.currentTime = t;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      gestures.forEach((e) => window.removeEventListener(e, prime));
    };
  }, [reduce]);

  // Headline lifts, fades, and tilts back as the scrub begins.
  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const contentRotateX = useTransform(scrollYProgress, [0, 0.3], [0, 12]);
  // Bottom of the film dissolves into the page as the pin releases.
  const exitFade = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  const contentStyle = reduce
    ? undefined
    : { y: contentY, opacity: contentOpacity, rotateX: contentRotateX };

  return (
    // Tall track: ~2.5 extra viewport-heights of scroll scrub the 8s film.
    <section
      ref={sectionRef}
      className={reduce ? "relative" : "relative h-[350svh]"}
    >
      <div className="sticky top-0 flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden px-5 md:px-8">
        {/* Scroll-scrubbed film */}
        <video
          ref={videoRef}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster={media.headerPoster}
          autoPlay={!!reduce}
          loop={!!reduce}
          aria-hidden
        >
          <source src={media.headerFilm} type="video/mp4" />
          <source src={media.headerFilmWebm} type="video/webm" />
        </video>

        {/* Legibility overlay: darken under the nav + ground the base */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,17,29,0.74) 0%, rgba(10,25,41,0.30) 38%, rgba(10,25,41,0.42) 72%, rgba(10,25,41,0.9) 100%)",
          }}
          aria-hidden
        />
        {/* Soft brand aurora tint over the footage */}
        <div className="aurora opacity-25" />
        {/* Fade to page background as the film ends and the pin releases */}
        <motion.div
          style={reduce ? { opacity: 0 } : { opacity: exitFade }}
          className="pointer-events-none absolute inset-0 z-20 bg-navy"
          aria-hidden
        />

        {/* Content — tilted in 3D */}
        <div
          className="relative z-10 mx-auto w-full max-w-3xl text-center"
          style={{ perspective: 1200 }}
        >
          <motion.div style={contentStyle} className="[transform-style:preserve-3d]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex justify-center"
            >
              <span className="rounded-full border border-cream/15 bg-white/[0.07] px-4 py-1.5 text-xs font-medium text-teal backdrop-blur-md md:text-sm">
                {hero.eyebrow}
              </span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-cream drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {hero.headlineLead}
              <em className="not-italic text-teal">{hero.headlineEm}</em>
              {hero.headlineTail}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-cream-dim drop-shadow-[0_1px_12px_rgba(0,0,0,0.55)] md:text-lg"
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href={hero.primaryCta.href}
                className="cta-shine glass-btn-accent rounded-full px-8 py-3.5 text-sm font-semibold text-navy-deep md:text-base"
              >
                {hero.primaryCta.label} →
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="glass-btn rounded-full px-7 py-3.5 text-sm font-medium text-cream md:text-base"
              >
                {hero.secondaryCta.label}
              </Link>
            </motion.div>

            {/* Two reassurance lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-cream-dim"
            >
              {hero.reassurances.map((line, i) => (
                <span key={line} className="flex items-center gap-5">
                  {i > 0 && (
                    <span className="h-1 w-1 rounded-full bg-teal/60" aria-hidden />
                  )}
                  <span className="flex items-center gap-2">
                    <span className="text-teal">✓</span>
                    {line}
                  </span>
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          style={reduce ? undefined : { opacity: contentOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          aria-hidden
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-cream/40 p-1">
            <motion.span
              className="block h-1.5 w-1 rounded-full bg-cream/80"
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
