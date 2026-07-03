"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { faqs } from "@/config/site";

// ── 6 — FAQ ────────────────────────────────────────────────────────────────
// dock.cool's FAQ accordion, reskinned. Single-open accordion. Entries live in
// /src/config/site.ts — including the plain-language notes on what the one
// package includes, that the cinematic walkthrough is a film (not a Matterport
// scan), that we don't build agent websites, and how buyers reach the agent.
export default function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section ref={ref} id="faq" className="relative scroll-mt-24 px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center text-3xl font-semibold tracking-tight text-cream md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Questions, answered
        </motion.h2>

        {/* dock.cool-style two-column accordion on desktop */}
        <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 md:gap-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                className="overflow-hidden rounded-2xl border border-cream/10 bg-white/[0.04]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-cream">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 text-teal transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-cream-dim">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
