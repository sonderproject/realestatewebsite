// ─────────────────────────────────────────────────────────────────────────
// SONDER STUDIO — SITE CONFIG
// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for the homepage + core pages.
//
// Sonder Studio builds ONE product: a premium AI Property Experience for a
// single listing — NOT agent websites, brokerage sites, or a self-serve SaaS
// platform. We do not build websites for real estate agents; we build a
// digital experience for every property. Every listing becomes its own
// interactive marketing asset that lets buyers emotionally experience the home
// before they ever step inside.
//
// The core deliverable bundles, per property:
//   • Cinematic AI Property Tour — a directed, AI-generated walkthrough film.
//   • Interactive AI Walkthrough — a self-paced exploration of the home.
//   • Dedicated Property Landing Page — gallery, floor plans, map &
//     neighborhood, features, and a built-in lead-capture form, all under one
//     shareable link + QR code, fully mobile-optimized.
//
// Pricing is per project, starting around $1,500; premium and landmark
// listings are scoped and quoted on a call. No subscriptions, no revenue
// share, no commission — we are a premium marketing studio, not a brokerage.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Sonder",
  studio: "Sonder Studio",
  domain: "sonderstudio.space",
  url: "https://sonderstudio.space",
  tagline: "AI-powered property experiences for luxury real estate.",
  // Cal.com inline booking embed (kept from the previous build).
  cal: {
    namespace: "sonder-studio",
    link: "dante-valentino/sonder-studio",
  },
  // Short reassurance lines used under the hero CTA.
  focus: "One property, one project",
  promise: "We handle everything",
} as const;

// ── HERO ───────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "AI property experiences",
  // Fraunces serif headline. <em> spans are styled as the teal accent.
  headlineLead: "Give every listing its own ",
  headlineEm: "immersive experience",
  headlineTail: ".",
  subhead:
    "Sonder Studio turns a single property into a cinematic AI tour, an interactive walkthrough, and a dedicated landing page — one immersive experience that lets buyers feel the home before they ever step inside. You send the address and photos; we produce the rest.",
  primaryCta: { label: "Start a Project", href: "/get-started" },
  secondaryCta: { label: "See pricing", href: "#pricing" },
  // Two short reassurance lines under the CTA.
  reassurances: [site.focus, site.promise],
} as const;

// ── FLOATING SHOWCASE ────────────────────────────────────────────────────
// Floating, softly-shadowed placeholders. Real assets are supplied later.
export const showcase = {
  // TODO(asset): hero cinematic AI tour reel — directed AI walkthrough MP4,
  // 16:9, muted autoplay loop. Drop at /public/media/showcase/ai-tour.mp4
  primary: {
    label: "CINEMATIC AI TOUR — placeholder",
    sublabel: "AI-generated cinematic walkthrough",
    aspect: "16 / 9" as const,
  },
  // TODO(asset): dedicated property experience screen-capture, 9:16 portrait
  // scroll capture. Drop at /public/media/showcase/property-experience.mp4
  secondary: {
    label: "PROPERTY EXPERIENCE — placeholder",
    sublabel: "Dedicated interactive landing page",
    aspect: "9 / 16" as const,
  },
} as const;

// ── PILL CLOUD ─────────────────────────────────────────────────────────────
// Mirrors the AI Property Experience inclusion list — one complete, dedicated
// experience produced per property.
export const pillCloud = {
  heading: "One immersive property experience",
  subhead:
    "Every project is a complete, dedicated experience for a single property — produced end to end, under one shareable link.",
  pills: [
    "Cinematic AI Tour",
    "Interactive Walkthrough",
    "Property Landing Page",
    "Photo Gallery",
    "Floor Plans",
    "Map & Neighborhood",
    "Property Features",
    "Lead Capture",
    "Mobile Optimized",
    "Shareable Link & QR",
  ],
} as const;

// ── FEATURE BLOCKS ─────────────────────────────────────────────────────────
// Each block: heading + paragraph + one or more labeled placeholder thumbs.
// `asset` is a TODO note naming the expected file for each placeholder.
export interface FeaturePlaceholder {
  label: string;
  aspect: string; // CSS aspect-ratio value, e.g. "16 / 9"
  asset: string; // TODO note: expected asset path / spec
}

export interface FeatureBlock {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  reverse?: boolean; // alternate image/text side on desktop
  placeholders: FeaturePlaceholder[];
}

export const featureBlocks: FeatureBlock[] = [
  {
    id: "cinematic-tour",
    eyebrow: "The flagship",
    title: "The Cinematic AI Tour",
    body: "Our signature deliverable: a cinematic, AI-generated tour that glides through the home on a directed camera path — the kind of film that makes a buyer feel the space before they ever book a showing. It is immersive and editorial, not a clunky dollhouse scan. You give us photos; we generate the tour and hand you a share-ready film for the MLS, your socials, and the property experience.",
    placeholders: [
      {
        label: "CINEMATIC AI TOUR — placeholder",
        aspect: "16 / 9",
        // TODO(asset): flagship AI tour reel, 16:9 MP4. /public/media/features/ai-tour.mp4
        asset: "/public/media/features/ai-tour.mp4 — 16:9 cinematic tour reel",
      },
    ],
  },
  {
    id: "interactive-walkthrough",
    eyebrow: "Explore the home",
    title: "The Interactive Walkthrough",
    body: "Beyond the film, every experience includes an interactive AI walkthrough — buyers explore the home at their own pace, room by room, on any device. It turns a static listing into something a buyer can step into and lose track of time in, the way a great open house feels in person — without the scheduling, the drive, or the pressure.",
    reverse: true,
    placeholders: [
      {
        label: "INTERACTIVE WALKTHROUGH — placeholder",
        aspect: "16 / 10",
        // TODO(asset): screen capture of the interactive walkthrough UI.
        asset: "/public/media/features/walkthrough.mp4 — 16:10 interactive walkthrough capture",
      },
    ],
  },
  {
    id: "property-page",
    eyebrow: "Capture the buyer",
    title: "The Property Landing Page",
    body: "Every project lives on its own dedicated landing page built around the listing: a high-resolution photo gallery, floor plans, map and neighborhood, property features, and a built-in lead-capture form that turns anonymous views into named, qualified buyer contacts in your inbox. We design, build, and host it; you get a single link to drop everywhere.",
    placeholders: [
      {
        label: "PROPERTY LANDING PAGE — placeholder",
        aspect: "16 / 10",
        // TODO(asset): desktop scroll capture of the property landing page.
        asset: "/public/media/features/property-page-desktop.mp4 — 16:10 scroll capture",
      },
      {
        label: "LEAD CAPTURE FORM — placeholder",
        aspect: "4 / 5",
        // TODO(asset): close-up of the in-page lead capture module.
        asset: "/public/media/features/lead-capture.png — 4:5 form detail",
      },
    ],
  },
  {
    id: "the-launch",
    eyebrow: "A launch, not a listing",
    title: "Make It a Product Launch",
    body: "Every experience is mobile-optimized and ships with a shareable link and QR code, so a property can travel from a yard sign to a text message to an Instagram story without losing an ounce of polish. One immersive link carries the whole home. The goal is simple: make every listing feel like a luxury product launch.",
    reverse: true,
    placeholders: [
      {
        label: "MOBILE EXPERIENCE — placeholder",
        aspect: "9 / 16",
        // TODO(asset): mobile screen capture of the property experience.
        asset: "/public/media/features/mobile-experience.mp4 — 9:16 mobile capture",
      },
      {
        label: "SHARE LINK & QR — placeholder",
        aspect: "4 / 3",
        // TODO(asset): shareable link + QR code detail. /public/media/features/share-qr.png
        asset: "/public/media/features/share-qr.png — 4:3 link & QR detail",
      },
    ],
  },
];

// ── PRICING ──────────────────────────────────────────────────────────────
// Per-project, ONE-TIME pricing. Every property is a project: when the
// property sells, the project is complete. The core AI Property Experience
// starts around $1,500; premium/landmark listings are scoped and quoted.
//
// The shape intentionally supports a future recurring tier without rework:
// add an entry with billing: "recurring", interval: "month", visible: true.
export type BillingType = "one-time" | "recurring";

export interface PricingTier {
  id: string;
  name: string;
  /** Display price, e.g. "$1,500" or "Custom". */
  price: string;
  /** Numeric price in USD, for future logic/sorting. 0 for quoted/custom. */
  priceUsd: number;
  billing: BillingType;
  /** Only used when billing === "recurring". */
  interval?: "month" | "year";
  /** Toggle a tier on/off without deleting it. */
  visible: boolean;
  featured: boolean;
  /** Optional badge shown on the featured card. */
  badge?: string;
  tagline: string;
  description: string;
  deliverables: string[];
  cta: { label: string; href: string };
  // TODO(stripe): replace with the real Stripe Price ID before launch.
  stripePriceId: string | null;
}

export const pricing = {
  heading: "One property. One experience. One price.",
  subhead:
    "Every project is a complete AI property experience, produced end to end and priced per listing — no subscriptions, no platform to learn.",
  note: "Pricing scales with the property, scope, and custom requirements. Premium and landmark listings are quoted on a call. No revenue share, no commission split — ever.",
  tiers: [
    {
      id: "experience",
      name: "AI Property Experience",
      price: "$1,500",
      priceUsd: 1500,
      billing: "one-time",
      visible: true,
      featured: true,
      badge: "The Experience",
      tagline: "The complete property experience",
      description:
        "Everything a single listing needs to feel like a luxury product launch — the cinematic AI tour, the interactive walkthrough, and a dedicated landing page with built-in lead capture.",
      deliverables: [
        "Cinematic AI property tour",
        "Interactive AI walkthrough",
        "Dedicated property landing page",
        "Photo gallery, floor plans & neighborhood",
        "Built-in buyer lead capture",
        "Shareable link & QR code",
      ],
      cta: { label: "Start a Project", href: "/get-started?tier=experience" },
      // TODO(stripe): Stripe Price ID for the $1,500 AI Property Experience.
      stripePriceId: null,
    },
    {
      id: "signature",
      name: "Signature",
      price: "Custom",
      priceUsd: 0,
      billing: "one-time",
      visible: true,
      featured: false,
      tagline: "For luxury & landmark listings",
      description:
        "For premium properties that warrant more: an expanded, bespoke experience scoped to the home, its story, and your marketing. Quoted per project.",
      deliverables: [
        "Everything in the Experience",
        "Extended, bespoke tour & narrative",
        "Custom design & property branding",
        "Priority production",
        "Scoped to the property & your goals",
      ],
      cta: { label: "Book a Call", href: "/#contact" },
      // TODO(stripe): custom/quoted — no fixed Stripe Price ID.
      stripePriceId: null,
    },
    // ── FUTURE: recurring/retainer tier ─────────────────────────────────
    // Only add once the core product is fully systemized (per the roadmap).
    // Keep visible:false so it does NOT render until launched.
    // {
    //   id: "studio",
    //   name: "Studio",
    //   price: "$X/mo",
    //   priceUsd: 0,
    //   billing: "recurring",
    //   interval: "month",
    //   visible: false,
    //   featured: false,
    //   tagline: "Ongoing experiences for active agents",
    //   description: "A set number of property experiences produced every month.",
    //   deliverables: ["N experiences / month", "Priority queue"],
    //   cta: { label: "Talk to us", href: "/#contact" },
    //   stripePriceId: null, // TODO(stripe): recurring Price ID
    // },
  ] as PricingTier[],
} as const;

/** Tiers that should render right now (visible + within current billing model). */
export const visibleTiers = pricing.tiers.filter((t) => t.visible);

// ── FAQ ──────────────────────────────────────────────────────────────────
export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "What exactly is an AI property experience?",
    a: "It's a complete, dedicated experience for one property: a cinematic AI tour, an interactive walkthrough buyers can explore, and a hosted landing page with the photo gallery, floor plans, map and neighborhood, property features, and a lead-capture form — all under one shareable link and QR code. One listing, one immersive experience.",
  },
  {
    q: "Is the tour just a Matterport scan?",
    a: "No. The cinematic tour is a directed, AI-generated film that moves through the home like a piece of cinema. The interactive walkthrough lets buyers explore at their own pace — but it's a crafted, editorial experience, not a raw dollhouse scan. Everything is designed to feel immersive and premium.",
  },
  {
    q: "Do you build agent or brokerage websites?",
    a: "No — and that's the point. We don't build agent sites, brokerage sites, or general business websites. We build one immersive experience per property. Keeping the offer focused is how we keep the quality exceptional.",
  },
  {
    q: "How does the lead capture work?",
    a: "The property landing page includes a built-in lead-capture form. When a buyer enters their details to request info or a showing, that contact is sent straight to you (your inbox, and your CRM if you use one) so you can follow up. The page turns anonymous views into named, qualified buyer leads that belong to you.",
  },
  {
    q: "What does it cost, and are there any commissions?",
    a: "Projects start around $1,500 and scale with the property, scope, and custom requirements — premium and landmark listings are quoted on a call. It's a flat, per-project fee: no subscriptions, no revenue share, and no commission split. We're a premium marketing studio, not a brokerage partner.",
  },
  {
    q: "What do I need to send you?",
    a: "Just the property address, your photos (phone photos are fine to start), your contact details, and which package you'd like. You'll do that on the Get Started intake. We handle production from there.",
  },
  {
    q: "Who owns the final experience?",
    a: "You do. The tour, walkthrough, page, and every asset are yours to market the listing across the MLS, your website, email, and social for as long as the listing is live.",
  },
  {
    q: "Do you work with luxury agents and developers?",
    a: "Yes. Luxury and listing agents are who we build for first, along with home builders, property developers, and boutique hospitality. If a property deserves to stand out before a buyer ever schedules a showing, it's a fit.",
  },
];

// ── FOOTER ─────────────────────────────────────────────────────────────────
export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footer = {
  blurb:
    "AI-powered property experiences for luxury real estate. Every listing becomes its own immersive tour, interactive walkthrough, and dedicated landing page — so buyers can feel the home before they step inside.",
  columns: [
    {
      title: "Experience",
      links: [
        { label: "Cinematic AI Tour", href: "#cinematic-tour" },
        { label: "Interactive Walkthrough", href: "#interactive-walkthrough" },
        { label: "Property Page", href: "#property-page" },
        { label: "The Launch", href: "#the-launch" },
      ],
    },
    {
      title: "Studio",
      links: [
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
        { label: "Start a Project", href: "/get-started" },
        { label: "Book a Call", href: "#contact" },
      ],
    },
    {
      title: "Get in touch",
      links: [
        { label: "Start a project", href: "/get-started" },
        { label: "Book a call", href: "#contact" },
      ],
    },
  ] as FooterColumn[],
} as const;
