"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// dock.cool-style floating pill nav: a compact, frosted, rounded bar that
// hovers at the top-center of the viewport. Reskinned to Sonder navy glass.
const LINKS = [
  { label: "Experience", href: "/#property-website" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

// Frosted navy glass with a bright inset hairline — the "liquid glass" pill.
const PILL_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(13,31,51,0.72), rgba(10,25,41,0.55))",
  WebkitBackdropFilter: "blur(16px) saturate(170%)",
  backdropFilter: "blur(16px) saturate(170%)",
  border: "1px solid rgba(125,211,252,0.16)",
  boxShadow:
    "inset 0 1px 0 0 rgba(255,255,255,0.10), 0 10px 30px -12px rgba(0,0,0,0.6)",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 md:top-5"
    >
      <div
        className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full px-3 py-2 md:px-4"
        style={PILL_STYLE}
      >
        {/* Brand */}
        <a href="/" className="group flex items-center gap-2 pl-1.5">
          <span className="relative block h-7 w-7 shrink-0 transition-transform duration-500 group-hover:scale-105 md:h-8 md:w-8">
            <Image
              src="/media/logo-mark.png"
              alt="Sonder Studio"
              fill
              priority
              sizes="32px"
              className="object-contain"
            />
          </span>
          <span
            className="text-lg font-semibold tracking-tight text-cream"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sonder
          </span>
        </a>

        {/* Center links (desktop) */}
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-cream-dim transition-colors duration-300 hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/#contact"
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-cream-dim transition-colors duration-300 hover:text-cream"
          >
            Book a Call
          </a>
          <Link
            href="/get-started"
            className="glass-btn-accent whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold text-navy-deep"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-50 flex h-9 w-9 items-center justify-center rounded-full md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-px w-4 bg-cream transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 bg-cream transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-cream transition-all duration-300 ${
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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-x-4 top-full mt-2 overflow-hidden rounded-3xl border border-teal/15 md:hidden"
            style={PILL_STYLE}
          >
            <div className="flex flex-col px-5 py-4">
              {LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-teal/10 py-4 text-base font-medium text-cream-dim transition-colors duration-300 hover:text-cream"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/get-started"
                  onClick={() => setMenuOpen(false)}
                  className="glass-btn-accent rounded-full px-6 py-3.5 text-center text-sm font-semibold text-navy-deep"
                >
                  Get Started →
                </Link>
                <a
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="glass-btn rounded-full px-6 py-3.5 text-center text-sm font-medium text-cream"
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
