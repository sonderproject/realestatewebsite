"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 96;
// Video finishes by the time the pinned section unpins (400vh / 100vh sticky).
const PIN_FRACTION = 0.75;

const framePath = (set: "desktop" | "mobile", i: number) =>
  `/media/hero-frames/${set}/frame-${String(i + 1).padStart(4, "0")}.jpg`;

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Hero text fades out shortly after you start scrolling so the footage shows.
  const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.18], [0, -30]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Draw a frame to the canvas with object-fit: cover behaviour.
  const draw = (idx: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        {/* Poster shown until the first frame is ready */}
        <div
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
          className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-10 py-8"
        >
          <div className="flex items-center gap-2">
            <span
              className="text-warm-50 text-xl tracking-[0.25em] uppercase font-light"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Meridian
            </span>
            <span className="w-px h-4 bg-gold/60 mx-1" />
            <span className="text-warm-300 text-xs tracking-[0.3em] uppercase font-light">
              Properties
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {["Listings", "Services", "About", "Contact"].map((item) => (
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
            className="hidden md:block border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-gold/10 transition-all duration-300"
          >
            Schedule a Call
          </a>
        </motion.nav>

        {/* Hero content — fades as the footage plays */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex flex-col justify-end pb-24 px-10 md:px-20"
        >
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light"
            >
              Luxury Coastal Properties
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-warm-50 leading-[0.9] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Modern Living.
              <br />
              <em className="italic text-warm-200">Elevated.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-warm-300 text-sm md:text-base font-light tracking-wide max-w-xl leading-relaxed mb-12"
            >
              Luxury real estate deserves a digital experience as refined as the homes
              themselves. Designed for buyers who expect more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="flex items-center gap-6"
            >
              <a
                href="#listings"
                className="group relative bg-gold text-obsidian text-xs tracking-[0.3em] uppercase px-10 py-4 font-medium hover:bg-gold-light transition-all duration-300"
              >
                Explore Properties
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

        {/* Scroll-to-play hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 right-10 z-20 flex flex-col items-center gap-3"
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
