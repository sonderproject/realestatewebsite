"use client";

import { motion } from "framer-motion";

// ── Signature section index ─────────────────────────────────────────────────
// The recurring editorial marker that gives every section the same designed
// rhythm: an index number, a self-drawing hairline, then the label. This is
// the brand's signature — used in place of plain eyebrow text site-wide.
//
//   02  ──────  WHAT WE DO
//
// `tone` adapts the colors to light or dark section backgrounds.

type Tone = "light" | "dark";

const TONES: Record<
  Tone,
  { index: string; rule: string; label: string }
> = {
  light: {
    index: "text-gold-dark",
    rule: "bg-gold-dark/35",
    label: "text-warm-500",
  },
  dark: {
    index: "text-gold-light",
    rule: "bg-gold-light/40",
    label: "text-warm-300",
  },
};

export default function SectionLabel({
  index,
  children,
  tone = "light",
  className = "",
}: {
  index: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const c = TONES[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-3 ${className}`}
    >
      <span
        className={`text-[11px] tracking-[0.25em] tabular-nums font-medium ${c.index}`}
      >
        {index}
      </span>
      <span className={`rule-grow h-px w-10 ${c.rule}`} />
      <span
        className={`text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium ${c.label}`}
      >
        {children}
      </span>
    </motion.div>
  );
}
