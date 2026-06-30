"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, useInView } from "framer-motion";
import { site } from "@/config/site";

// ── 7 — BOOKING / CONTACT ────────────────────────────────────────────────
// Closing section. Keeps the Cal.com inline booking embed for agents who want
// to talk before starting, with a secondary nudge to the self-serve intake.
// Reskinned to the Sonder navy palette. Shared by the homepage and /photography.
export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  const secondaryRef = useRef<HTMLDivElement>(null);
  const secondaryInView = useInView(secondaryRef, { once: true, amount: 0 });

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: site.cal.namespace });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy py-16 px-5 md:py-28 md:px-8"
    >
      <div className="aurora opacity-60" />

      {/* Large background word */}
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span
          className="whitespace-nowrap text-[22vw] font-light text-teal/5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Sonder
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center text-xs font-medium uppercase tracking-[0.4em] text-teal"
        >
          Book a Call
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="mb-4 text-center text-4xl font-light leading-[1.0] text-cream md:mb-6 md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let&apos;s talk.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mx-auto mb-10 max-w-lg text-center text-sm font-light leading-relaxed text-cream-dim md:mb-14"
        >
          Prefer to talk it through first? Book a free intro call — we&apos;ll scope
          your listing and answer anything about the 4D tour, the property page, or
          turnaround.
        </motion.p>

        {/* Cal.com inline embed — min-h so it auto-expands on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mb-12 min-h-[600px] overflow-hidden rounded-2xl shadow-2xl shadow-navy-deep/60 ring-1 ring-teal/10 md:mb-16 md:min-h-[720px]"
        >
          <Cal
            namespace={site.cal.namespace}
            calLink={site.cal.link}
            style={{ width: "100%", height: "100%" }}
            config={{ layout: "month_view" }}
          />
        </motion.div>

        <motion.div
          ref={secondaryRef}
          initial={{ opacity: 0, y: 16 }}
          animate={secondaryInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="border-t border-teal/10 pt-10 text-center md:pt-12"
        >
          <p
            className="mb-2 text-xl font-light text-cream md:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Already know what you need?
          </p>
          <p className="mx-auto mb-6 max-w-xs text-sm font-light leading-relaxed text-cream-faint">
            Send us the property and we&apos;ll get started — no call needed.
          </p>
          <Link
            href="/get-started"
            className="cta-shine glass-btn-accent inline-block rounded-full px-7 py-3 text-xs font-medium uppercase tracking-[0.15em] text-navy-deep"
          >
            Get Started →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
