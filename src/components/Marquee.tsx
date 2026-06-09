"use client";

// ── Signature keyword marquee ───────────────────────────────────────────────
// A seamless, infinitely scrolling band of the studio's disciplines. Sits
// between the hero and the body as a confident, editorial brand statement.
// The track is duplicated so the loop is seamless at translateX(-50%).

const WORDS = [
  "Agent Websites",
  "Brokerage Platforms",
  "AI Lead Assistant",
  "Brand Identity",
  "Property Portals",
  "Marketing Systems",
  "Listing Films",
];

function Row() {
  return (
    <div className="marquee-track">
      {WORDS.map((w, i) => (
        <span key={`${w}-${i}`} className="flex items-center">
          <span
            className="text-4xl md:text-6xl font-light text-warm-50/90 px-6 md:px-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {w}
          </span>
          <span className="text-gold text-xl md:text-2xl">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative bg-obsidian py-10 md:py-14 border-y border-white/[0.06] overflow-hidden">
      {/* Hairline ocean wash so the band reads as its own surface */}
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/40 via-transparent to-ocean-deep/40" />
      <div className="marquee-mask relative flex">
        {/* Two identical rows for a seamless -50% loop */}
        <Row />
        <Row />
      </div>
    </section>
  );
}
