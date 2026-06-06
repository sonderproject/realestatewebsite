"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = ["Services", "Pricing", "Contact"];

export default function Navbar() {
  // Once the user scrolls past the very top, the bar frosts over and the
  // iridescent rainbow hairline fades in along its bottom edge.
  const [scrolled, setScrolled] = useState(false);
  // Mobile slide-down menu state.
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${
        scrolled ? "py-3 md:py-4" : "py-5 md:py-8"
      }`}
    >
      {/* Frosted glass backdrop — fades in on scroll */}
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,9,0.55), rgba(10,10,9,0.18))",
          WebkitBackdropFilter: "blur(18px) saturate(170%)",
          backdropFilter: "blur(18px) saturate(170%)",
        }}
      />

      {/* Rainbowish clear blur along the bottom border */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[3px] transition-opacity duration-500 ${
          scrolled ? "opacity-90" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(90deg, rgba(255,107,107,0.85), rgba(254,202,87,0.85), rgba(72,219,251,0.85), rgba(159,122,234,0.85), rgba(84,160,255,0.85), rgba(255,107,107,0.85))",
          filter: "blur(2.5px)",
        }}
      />
      {/* Crisp top edge of the rainbow line for definition */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
          scrolled ? "opacity-60" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(90deg, rgba(255,140,140,0.7), rgba(255,224,140,0.7), rgba(140,232,255,0.7), rgba(190,160,245,0.7), rgba(140,190,255,0.7))",
        }}
      />

      {/* Content */}
      <div className="relative flex items-center justify-between px-5 md:px-10">
        {/* Plain anchor: navigates to the homepage from any sub-page, and
            triggers a full refresh when already on the homepage. */}
        <a href="/" className="flex items-center gap-2">
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
        </a>

        <div className="hidden md:flex items-center gap-10">
          {LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-warm-200 text-xs tracking-[0.2em] uppercase hover:text-gold transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          {/* Cross-page link to the photography studio */}
          <Link
            href="/photography"
            className="flex items-center gap-2 text-gold-light text-xs tracking-[0.2em] uppercase hover:text-gold transition-colors duration-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Photography
          </Link>
        </div>

        <a
          href="#contact"
          className="glass-btn hidden md:block text-warm-50 text-xs tracking-[0.15em] uppercase rounded-full px-6 py-2.5 font-medium"
        >
          Get a Quote
        </a>

        {/* Mobile hamburger / close toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-full glass-btn"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-warm-50 transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 bg-warm-50 transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-warm-50 transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute inset-x-0 top-full mx-3 mt-2 rounded-3xl overflow-hidden border border-white/10"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,9,0.92), rgba(10,10,9,0.78))",
              WebkitBackdropFilter: "blur(22px) saturate(180%)",
              backdropFilter: "blur(22px) saturate(180%)",
            }}
          >
            <div className="flex flex-col px-6 py-5">
              {LINKS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/5 py-4 text-warm-100 text-sm tracking-[0.2em] uppercase hover:text-gold transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
              {/* Cross-page link to the photography studio */}
              <Link
                href="/photography"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 border-b border-white/5 py-4 text-gold-light text-sm tracking-[0.2em] uppercase hover:text-gold transition-colors duration-300"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                Photography
              </Link>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="glass-btn-accent mt-5 text-white text-xs tracking-[0.2em] uppercase rounded-full px-6 py-3.5 font-medium text-center"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
