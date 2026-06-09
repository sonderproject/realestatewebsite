"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// HD frames extracted from the hero clip. Canvas frame-scrubbing is the
// smoothest scroll technique — it draws pre-decoded images with no video
// seeking, so it stays buttery on mobile (incl. iOS) where currentTime
// seeking stutters.
const FRAME_COUNT = 120;
// Footage finishes by this point in the pinned scroll; the rest releases it.
const PIN_FRACTION = 0.85;

const framePath = (set: "desktop" | "mobile", i: number) =>
  `/media/hero-frames/${set}/frame-${String(i + 1).padStart(4, "0")}.jpg`;

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Spring-smoothed progress for the overlay UI so the text/hint ease out
  // fluidly. The frame scrub below stays on the raw value so frames track
  // scroll instantly (springing it would make the footage feel laggy).
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Hero text fades out shortly after you start scrolling so the footage shows.
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.4], [0, -40]);
  const hintOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  // Draw a frame to the canvas with object-fit: cover behaviour.
  const draw = (idx: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number, dx: number, dy: number;
    if (cr > ir) {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
      dy = 0;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Preload the right frame set for the device + keep the canvas sized.
  useEffect(() => {
    const set: "desktop" | "mobile" =
      window.innerWidth <= 768 ? "mobile" : "desktop";

    // Use the portrait poster on mobile so first paint matches the frames.
    if (posterRef.current) {
      const poster =
        set === "mobile"
          ? "/media/hero-poster-mobile-v2.jpg"
          : "/media/hero-poster-v2.jpg";
      posterRef.current.style.backgroundImage = `url('${poster}')`;
    }

    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(set, i);
      if (i === 0)
        img.onload = () => {
          draw(frameRef.current);
          // Fade the canvas in over the poster so the switch is invisible
          if (canvasRef.current) {
            canvasRef.current.style.transition = "opacity 0.4s ease";
            canvasRef.current.style.opacity = "1";
          }
        };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    const canvas = canvasRef.current;
    const resize = () => {
      if (!canvas) return;
      // Render at the device's full pixel density on mobile (capped at 3) so a
      // high-DPI phone isn't softened by a second browser upscale of the canvas.
      const cap = set === "mobile" ? 3 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, cap);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      draw(frameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
      imgs.forEach((im) => (im.onload = null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Map scroll position to a frame.
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const p = Math.min(v / PIN_FRACTION, 1);
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1))));
      if (idx === frameRef.current) return;
      frameRef.current = idx;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => draw(idx));
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgress]);

  return (
    // ~2s of scroll to play through, then a short release.
    <section ref={sectionRef} className="relative" style={{ height: "230vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        {/* Poster shown until the first frame is ready (set per device) */}
        <div
          ref={posterRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/media/hero-poster-v2.jpg')" }}
        />

        {/* Scroll-driven frame canvas — starts hidden, fades in once frame 0 is ready */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }} />

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-transparent" />

        {/* Signature cartographic meta rail — left edge, desktop only.
            Ties the studio to its San Diego coastline through coordinates. */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="hidden md:flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4"
        >
          <span className="text-warm-300 text-[10px] tracking-[0.35em] uppercase rotate-180 [writing-mode:vertical-rl]">
            32.7157°N · 117.1611°W
          </span>
          <span className="w-px h-20 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
          <span className="text-gold-light text-[10px] tracking-[0.35em] uppercase [writing-mode:vertical-rl]">
            San Diego
          </span>
        </motion.div>

        {/* Navigation lives in the fixed <Navbar /> (rendered at page level) */}

        {/* Hero content — fades as the footage plays */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex flex-col justify-end pb-14 px-5 md:pb-20 md:px-16"
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="inline-flex items-center gap-2.5 mb-6 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md px-4 py-2 shadow-lg shadow-gold/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-gold-light text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold">
                Real Estate Web Design Agency · San Diego
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-warm-50 leading-[0.9] mb-5 md:mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Win More Listings.
              <br />
              <em className="text-shimmer font-normal">Close More Deals.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-warm-100 text-base md:text-lg font-light tracking-wide max-w-xl leading-relaxed mb-8 md:mb-10 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]"
            >
              <span className="text-white font-medium">Custom IDX websites</span>,{" "}
              <span className="text-white font-medium">AI lead assistants</span>, and{" "}
              <span className="text-white font-medium">real estate photography</span> —
              built and managed for agents, apartment communities, and brokerages.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <a
                href="#pricing"
                className="glass-btn-accent group text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium"
              >
                View Plans
              </a>
              <a
                href="#services"
                className="text-warm-300 text-xs tracking-[0.3em] uppercase hover:text-warm-50 transition-colors duration-300 flex items-center gap-3"
              >
                Our Services
                <span className="w-8 h-px bg-current inline-block" />
              </a>
              <Link
                href="/photography"
                className="text-warm-400 text-xs tracking-[0.3em] uppercase hover:text-gold transition-colors duration-300 flex items-center gap-3"
              >
                Sonder Photography
                <span className="w-8 h-px bg-current inline-block" />
              </Link>
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
