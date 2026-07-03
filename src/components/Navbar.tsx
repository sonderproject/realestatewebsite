"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Homepage section anchors.
const LINKS = [
  { label: "Experience", href: "/#cinematic-tour" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  // Once the user scrolls past the very top, the bar frosts over.
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        scrolled ? "py-3 md:py-4" : "py-5 md:py-7"
      }`}
    >
      {/* Frosted glass backdrop — fades in on scroll */}
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(10,25,41,0.7), rgba(10,25,41,0.25))",
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
      <div className="relative flex items-center justify-between px-5 md:px-8">
        <a href="/" className="group flex items-center gap-2.5">
          <span className="relative block h-8 w-8 shrink-0 transition-transform duration-500 group-hover:scale-105 md:h-9 md:w-9">
            <Image
              src="/media/logo-mark.png"
              alt="Sonder Studio"
              fill
              priority
              sizes="36px"
              className="object-contain"
            />
          </span>
          <span
            className="text-xl font-light uppercase tracking-[0.25em] text-cream"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sonder
          </span>
          <span className="mx-1 h-4 w-px bg-teal/50" />
          <span className="text-xs font-light uppercase tracking-[0.3em] text-cream-faint">
            Studio
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs uppercase tracking-[0.2em] text-cream-dim transition-colors duration-300 hover:text-teal"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/#contact"
            className="glass-btn rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-cream"
          >
            Book a Call
          </a>
          <Link
            href="/get-started"
            className="glass-btn-accent rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-navy-deep"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger / close toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="glass-btn relative z-50 flex h-10 w-10 items-center justify-center rounded-full md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-cream transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 bg-cream transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-cream transition-all duration-300 ${
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
            className="absolute inset-x-0 top-full mx-3 mt-2 overflow-hidden rounded-3xl border border-teal/15 md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,25,41,0.96), rgba(10,25,41,0.85))",
              WebkitBackdropFilter: "blur(22px) saturate(180%)",
              backdropFilter: "blur(22px) saturate(180%)",
            }}
          >
            <div className="flex flex-col px-6 py-5">
              {LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-teal/10 py-4 text-sm uppercase tracking-[0.2em] text-cream-dim transition-colors duration-300 hover:text-teal"
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/get-started"
                  onClick={() => setMenuOpen(false)}
                  className="glass-btn-accent rounded-full px-6 py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-navy-deep"
                >
                  Get Started →
                </Link>
                <a
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="glass-btn rounded-full px-6 py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-cream"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
