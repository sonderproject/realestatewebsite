"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LINKS = ["Services", "Pricing", "Contact"];

export default function Navbar() {
  // Once the user scrolls past the very top, the bar frosts over and the
  // iridescent rainbow hairline fades in along its bottom edge.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      </div>
    </motion.nav>
  );
}
