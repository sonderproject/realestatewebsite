"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// One-time cinematic intro. Plays the ocean mark over an obsidian curtain,
// then lifts to reveal the site. Shows once per browser session so repeat
// navigations within a visit don't replay it.
const SESSION_KEY = "sonder-opener-seen";

export default function Opener() {
  // Deterministic initial value on server + first client render (avoids a
  // hydration mismatch). The effect below decides whether it actually plays.
  const [show, setShow] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (seen) {
      // Already played this session — dismiss instantly, no animation.
      setShow(false);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduced(prefersReduced);

    // Lock scroll while the curtain is up.
    document.body.style.overflow = "hidden";

    const hold = prefersReduced ? 900 : 2300;
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setShow(false);
    }, hold);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Always release scroll once the curtain is gone.
  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="opener"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Living aurora wash behind the mark */}
          <div className="aurora opacity-40" />

          {/* Radial glow that breathes behind the logo */}
          <motion.div
            aria-hidden
            className="absolute h-[60vmin] w-[60vmin] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(74,143,168,0.28), rgba(10,10,9,0) 70%)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.08 }}
            transition={{ duration: reduced ? 0.4 : 1.6, ease: "easeOut" }}
          />

          <div className="relative z-10 flex flex-col items-center px-8">
            {/* The mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
              transition={{ duration: reduced ? 0.4 : 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[34vw] max-w-[200px] min-w-[120px] aspect-square"
            >
              <Image
                src="/media/logo-mark.png"
                alt="Sonder Studio"
                fill
                priority
                sizes="200px"
                className="object-contain"
              />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.4 : 0.9,
                delay: reduced ? 0.1 : 0.55,
                ease: "easeOut",
              }}
              className="mt-7 flex items-center gap-3"
            >
              <span
                className="text-warm-50 text-lg md:text-xl tracking-[0.32em] uppercase font-light"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Sonder
              </span>
              <span className="h-4 w-px bg-gold/60" />
              <span className="text-warm-300 text-[11px] md:text-xs tracking-[0.4em] uppercase font-light">
                Studio
              </span>
            </motion.div>

            {/* Hairline that draws itself in */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: reduced ? 0.4 : 1.0,
                delay: reduced ? 0.2 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 h-px w-32 origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
