"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Placeholder from "@/components/Placeholder";
import { featureBlocks, type FeatureBlock } from "@/config/site";

// ── 4 — FEATURE BLOCKS ─────────────────────────────────────────────────────
// dock.cool's stacked feature blocks: heading + paragraph on one side, media on
// the other, alternating sides down the page. Sonder skin. Each block's copy
// and placeholder specs live in /src/config/site.ts (featureBlocks).
//
// The Property Website leads; then the Cinematic Walkthrough, the Interactive
// Virtual Tour, and Photos & Property Information.

function Block({ block }: { block: FeatureBlock }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div
      ref={ref}
      id={block.id}
      className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 md:gap-16"
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: block.reverse ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={block.reverse ? "md:order-2" : ""}
      >
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-teal">
          {block.eyebrow}
        </p>
        <h3
          className="text-3xl font-light text-cream md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {block.title}
        </h3>
        <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-cream-dim md:text-base">
          {block.body}
        </p>
      </motion.div>

      {/* Media — one or two labeled placeholders */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`${block.reverse ? "md:order-1" : ""} ${
          block.placeholders.length > 1
            ? "grid grid-cols-2 gap-4"
            : "flex justify-center"
        }`}
      >
        {block.placeholders.map((p) => (
          // Real media renders when `src` is set (see /src/config/site.ts);
          // otherwise the labeled stand-in shows. Asset spec: {p.asset}
          <div
            key={p.label}
            className="w-full rounded-2xl shadow-xl shadow-navy-deep/50 ring-1 ring-teal/10"
          >
            <Placeholder
              label={p.label}
              aspect={p.aspect}
              src={p.src}
              kind={p.kind}
              className="rounded-2xl"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function FeatureBlocks() {
  return (
    <section className="relative px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-24 md:gap-36">
        {featureBlocks.map((block) => (
          <Block key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
