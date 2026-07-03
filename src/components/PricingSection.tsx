"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { pricing, visibleTiers } from "@/config/site";

// ── 5 — PRICING ────────────────────────────────────────────────────────────
// dock.cool's centered pricing cards, reskinned. One package today: the
// Property Experience ($1,497, per property). Rendered as a single centered
// card; the layout still supports multiple tiers side by side if more are
// switched on later.
//
// Tiers come from /src/config/site.ts via `visibleTiers`, which already filters
// out anything with visible:false — so a future monthly/recurring tier can be
// switched on there without touching this component.
export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const single = visibleTiers.length === 1;

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative scroll-mt-24 px-5 py-24 md:px-8 md:py-36"
    >
      <div className="aurora opacity-30" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl font-semibold tracking-tight text-cream md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {pricing.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream-dim"
          >
            {pricing.subhead}
          </motion.p>
        </div>

        <div
          className={`mx-auto grid items-start gap-6 ${
            single ? "max-w-md" : "max-w-3xl md:grid-cols-2"
          }`}
        >
          {visibleTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              className={`relative flex flex-col rounded-3xl p-8 md:p-9 ${
                tier.featured
                  ? `border border-teal/40 bg-gradient-to-br from-navy-600 to-navy-800 shadow-2xl shadow-teal/10 ${
                      single ? "" : "md:-translate-y-3"
                    }`
                  : "border border-teal/10 bg-navy-800/60"
              }`}
            >
              {tier.featured && tier.badge && (
                <span className="absolute right-7 top-7 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-navy-deep">
                  {tier.badge}
                </span>
              )}

              <h3
                className="pr-36 text-2xl font-semibold tracking-tight text-cream"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-cream-faint">
                {tier.tagline}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span
                  className="text-5xl font-semibold leading-none tracking-tight text-cream"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tier.price}
                </span>
                <span className="pb-1.5 text-sm text-cream-faint">
                  {tier.billing === "recurring"
                    ? `/ ${tier.interval ?? "month"}`
                    : tier.priceUsd === 0
                    ? "scoped & quoted"
                    : "one-time · per project"}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-cream-dim">
                {tier.description}
              </p>

              <ul className="mt-7 flex flex-1 flex-col gap-3">
                {tier.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 shrink-0 text-teal">✓</span>
                    <span className="text-cream-dim">{d}</span>
                  </li>
                ))}
              </ul>

              {/* TODO(stripe): tier.stripePriceId is a placeholder (null). Wire
                  the real Stripe Price ID / checkout before launch. For now the
                  CTA routes to the property intake at /get-started. */}
              <Link
                href={tier.cta.href}
                className={`mt-8 flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold ${
                  tier.featured
                    ? "cta-shine glass-btn-accent text-navy-deep"
                    : "glass-btn text-cream"
                }`}
              >
                {tier.cta.label} →
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-cream-faint"
        >
          {pricing.note}
        </motion.p>
      </div>
    </section>
  );
}
