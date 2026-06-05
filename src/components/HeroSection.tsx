"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Fraction of the pinned scroll over which the footage plays start→end.
// The remaining scroll releases the pin. Lower section height = shorter scrub.
const PIN_FRACTION = 0.85;

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const rafRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Text fades out as you scroll past; the footage scrubs underneath.
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Prime the video so frame-accurate seeking works (incl. mobile Safari).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);

    // A muted, inline play()→pause() decodes the first frames so currentTime
    // seeks render immediately instead of showing the poster while buffering.
    const prime = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    video.addEventListener("loadeddata", prime, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", prime);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Map scroll position → video time.
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const video = videoRef.current;
      const duration = durationRef.current;
      if (!video || !duration) return;
      const p = Math.min(v / PIN_FRACTION, 1);
      const time = p * duration;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        // fastSeek is cheaper on mobile when available
        if (typeof video.fastSeek === "function") video.fastSeek(time);
        else video.currentTime = time;
      });
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgress]);

  return (
    // ~2s of scroll to play through, then a short release.
    <section ref={sectionRef} className="relative" style={{ height: "230vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        {/* Scroll-scrubbed footage */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/media/hero.mp4"
          poster="/media/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
        />

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-transparent" />

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-5 md:px-10 md:py-8"
        >
          <div className="flex items-center gap-2">
            <span
              className="text-warm-50 text-xl tracking-[0.25em] uppercase font-light"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sonder
            </span>
            <span className="w-px h-4 bg-gold/60 mx-1" />
            <span className="text-warm-300 text-xs tracking-[0.3em] uppercase font-light">
              Studio
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {["Work", "Services", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-warm-200 text-xs tracking-[0.2em] uppercase hover:text-gold transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:block bg-gold text-white text-xs tracking-[0.15em] uppercase rounded-full px-6 py-2.5 font-medium hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
          >
            Get a Quote
          </a>
        </motion.nav>

        {/* Hero content — fades as the footage plays */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex flex-col justify-end pb-14 px-5 md:pb-20 md:px-16"
        >
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light"
            >
              Web Design for Real Estate
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-warm-50 leading-[0.9] mb-5 md:mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Digital Presence.
              <br />
              <em className="text-gold-light font-normal">Elevated.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-warm-300 text-sm md:text-base font-light tracking-wide max-w-xl leading-relaxed mb-8 md:mb-10"
            >
              We build premium websites and digital experiences for real estate agents,
              brokerages, and property companies. What you&apos;re looking at is our work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="flex items-center gap-6"
            >
              <a
                href="#work"
                className="group relative bg-gold text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium hover:bg-gold-light transition-all duration-300 shadow-xl shadow-gold/25"
              >
                See Our Work
              </a>
              <a
                href="#services"
                className="text-warm-300 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors duration-300 flex items-center gap-3"
              >
                Our Services
                <span className="w-8 h-px bg-current inline-block" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 right-5 md:right-10 z-20 flex flex-col items-center gap-3"
        >
          <span className="text-warm-400 text-[10px] tracking-[0.4em] uppercase rotate-90 origin-center">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-warm-400 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
