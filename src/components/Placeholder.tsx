"use client";

// ─────────────────────────────────────────────────────────────────────────
// Placeholder — a clearly-labeled stand-in for real product media.
//
// Sonder supplies real assets (tour reels, page captures, staged photos)
// later. Until then every product visual on the site renders as one of these:
// a rounded card with a soft teal-tinted border, the correct aspect ratio,
// and a centered uppercase label like "4D AI TOUR — placeholder".
//
// Each usage site should sit next to a TODO comment naming the expected asset
// (those live in /src/config/site.ts alongside the copy).
// ─────────────────────────────────────────────────────────────────────────

interface PlaceholderProps {
  /** Centered label, e.g. "4D AI TOUR — placeholder". */
  label: string;
  /** Optional smaller line under the label. */
  sublabel?: string;
  /** CSS aspect-ratio value, e.g. "16 / 9". */
  aspect?: string;
  className?: string;
}

export default function Placeholder({
  label,
  sublabel,
  aspect = "16 / 9",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-teal/20 bg-navy-800/80 ${className}`}
      style={{ aspectRatio: aspect }}
    >
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
