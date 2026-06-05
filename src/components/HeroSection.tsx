"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

  // Hero text fades out shortly after you start scrolling so the footage shows.
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

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
          ? "/media/hero-poster-mobile.jpg"
          : "/media/hero-poster.jpg";
      posterRef.current.style.backgroundImage = `url('${poster}')`;
    }

    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(set, i);
      if (i === 0) img.onload = () => draw(frameRef.current);
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
          style={{ backgroundImage: "url('/media/hero-poster.jpg')" }}
        />

        {/* Scroll-driven frame canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

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
            className="glass-btn hidden md:block text-warm-50 text-xs tracking-[0.15em] uppercase rounded-full px-6 py-2.5 font-medium"
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
                className="glass-btn-accent group text-white text-xs tracking-[0.2em] uppercase rounded-full px-8 py-3.5 font-medium"
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
