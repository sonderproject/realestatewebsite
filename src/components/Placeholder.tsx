"use client";

import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────
// Placeholder / media frame.
//
// When given a `src`, it renders the real asset (image or looping video)
// filling a rounded, correctly-proportioned frame. Without a `src`, it falls
// back to a clearly-labeled stand-in card (soft teal border + centered label)
// so slots that don't have media yet still read as "asset goes here".
//
// Asset specs for each usage live in /src/config/site.ts alongside the copy.
// ─────────────────────────────────────────────────────────────────────────

interface PlaceholderProps {
  /** Label — used as the alt text for real media, or the centered stand-in badge. */
  label: string;
  /** Optional smaller line under the label (stand-in mode only). */
  sublabel?: string;
  /** CSS aspect-ratio value, e.g. "16 / 9". */
  aspect?: string;
  className?: string;
  /** When set, renders real media instead of the stand-in card. */
  src?: string;
  /** Media type for `src`. Defaults to "image". */
  kind?: "image" | "video";
  /** next/image sizes hint (image mode). */
  sizes?: string;
}

export default function Placeholder({
  label,
  sublabel,
  aspect = "16 / 9",
  className = "",
  src,
  kind = "image",
  sizes = "(min-width: 768px) 45vw, 90vw",
}: PlaceholderProps) {
  const frame = `relative w-full overflow-hidden rounded-2xl border border-teal/20 bg-navy-800/80 ${className}`;

  // ── Real media ──────────────────────────────────────────────────────────
  if (src) {
    return (
      <div className={frame} style={{ aspectRatio: aspect }}>
        {kind === "video" ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <Image src={src} alt={label} fill sizes={sizes} className="object-cover" />
        )}
        {/* Inner ring + bottom shade to seat the media into the dark design */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(180deg, transparent, rgba(6,17,29,0.4))" }}
          aria-hidden
        />
      </div>
    );
  }

  // ── Labeled stand-in ──────────────────────────────────────────────────────
  return (
    <div className={frame} style={{ aspectRatio: aspect }}>
      {/* Soft inner gradient so the empty card still reads as "media" */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-700/60 via-navy-800 to-navy-deep" />

      {/* Faint diagonal hatch — signals "asset goes here" without stock imagery */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #7dd3fc 0, #7dd3fc 1px, transparent 1px, transparent 12px)",
        }}
        aria-hidden
      />

      {/* Centered label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full border border-teal/30 bg-navy-deep/50 px-4 py-1.5 text-[10px] md:text-xs font-medium uppercase tracking-[0.22em] text-teal">
          {label}
        </span>
        {sublabel && (
          <span className="mt-3 text-xs md:text-sm font-light text-cream-faint">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
