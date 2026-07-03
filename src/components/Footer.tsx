"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { footer, site } from "@/config/site";

// ── 8 — FOOTER ─────────────────────────────────────────────────────────────
// dock.cool's multi-column footer, reskinned in Sonder navy. Brand + blurb on
// the left, link columns from /src/config/site.ts on the right. Shared by every
// page so the closing bar stays identical site-wide.
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <footer ref={ref} className="border-t border-teal/10 bg-navy-deep px-5 pb-10 pt-14 md:px-8 md:pb-14 md:pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-6xl"
      >
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand + blurb */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative block h-8 w-8 shrink-0">
                <Image
                  src="/media/logo-mark.png"
                  alt="Sonder Studio"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </span>
              <span
                className="text-xl font-light uppercase tracking-[0.25em] text-cream"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Sonder
              </span>
              <span className="mx-1 h-4 w-px bg-teal/40" />
              <span className="text-xs font-light uppercase tracking-[0.3em] text-cream-faint">
                Studio
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-cream-faint">
              {footer.blurb}
            </p>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-cream">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-faint transition-colors duration-300 hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant fit-to-width wordmark (dock.cool signature) */}
        <div className="mt-12 overflow-hidden md:mt-16" aria-hidden>
          <div
            className="select-none whitespace-nowrap text-center font-semibold leading-[0.78] tracking-[-0.04em] text-teal/[0.07]"
            style={{ fontFamily: "var(--font-display)", fontSize: "23vw" }}
          >
            Sonder
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-teal/10 pt-7 md:flex-row">
          <p className="text-xs text-cream-faint">
            © 2026 {site.studio}. All rights reserved.
          </p>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cream-faint transition-colors duration-300 hover:text-cream"
          >
            {site.domain}
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
