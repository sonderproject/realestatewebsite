// ─────────────────────────────────────────────────────────────────────────
// SONDER STUDIO — SITE CONFIG
// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for the homepage + core pages.
//
// Sonder Studio sells ONE package at ONE price: a complete property
// experience for a single listing. We do not build agent or brokerage
// websites, and we do not offer à la carte services — one package, one price,
// nothing else. Every listing becomes its own interactive marketing asset that
// lets buyers experience the home before they ever step inside.
//
// The one package ($1,497, per property) includes:
//   • A premium, scroll-animated property website (the experience itself).
//   • A cinematic video walkthrough of the property.
//   • An interactive virtual tour buyers can explore.
//   • Professional property photos and full listing information.
//
// Per project: when the property sells, the project is complete. No
// subscriptions, no add-ons, no revenue share, no commission — we are a
// premium marketing studio, not a brokerage.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Sonder",
  studio: "Sonder Studio",
  domain: "sonderstudio.space",
  url: "https://sonderstudio.space",
  tagline: "One premium experience for every property.",
  // Cal.com inline booking embed (kept from the previous build).
  cal: {
    namespace: "sonder-studio",
    link: "dante-valentino/sonder-studio",
  },
  // Short reassurance lines used under the hero CTA.
  focus: "One package, one price",
  promise: "We handle everything",
} as const;

// ── MEDIA ────────────────────────────────────────────────────────────────
// Real client-supplied assets. Paths are served from /public/media.
export const media = {
  // The property walkthrough film — drives the hero + the walkthrough section.
  walkthrough: "/media/Sonder_walkthrough_3792_Vista_Po_202607011518_202607022138.mp4",
  // Storyboard of the interactive virtual tour (the Obsidian Estate).
  virtualTour: "/media/Virtual_tour_of_property_202607022138.jpeg",
  // Static poster shown before the hero video loads.
  heroPoster: "/media/hero-poster-v2.jpg",
} as const;

// ── HERO ───────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "The property experience",
  // Fraunces serif headline. <em> spans are styled as the teal accent.
  headlineLead: "Give every listing its own ",
  headlineEm: "immersive experience",
  headlineTail: ".",
  subhead:
    "Sonder Studio gives your listing its own premium, scroll-animated website — complete with a cinematic video walkthrough, an interactive virtual tour, and professional property photos and information. One package, one price, one immersive link that lets buyers feel the home before they step inside.",
  primaryCta: { label: "Start a Project", href: "/get-started" },
  secondaryCta: { label: "See what's included", href: "#pricing" },
  // Two short reassurance lines under the CTA.
  reassurances: [site.focus, site.promise],
} as const;

// ── FLOATING SHOWCASE ────────────────────────────────────────────────────
// Floating, softly-shadowed placeholders. Real assets are supplied later.
export const showcase = {
  // The real property walkthrough film, looping muted.
  primary: {
    label: "Cinematic walkthrough of the property",
    sublabel: "Cinematic video walkthrough",
    aspect: "16 / 9" as const,
    src: media.walkthrough,
    kind: "video" as const,
  },
  // Placeholder photo for now — swap for a real scroll capture of the property
  // website (9:16 portrait) at /public/media/showcase/property-site.mp4.
  secondary: {
    label: "City skyline at sunset",
    sublabel: "Premium scroll-animated site",
    aspect: "9 / 16" as const,
    src: "/media/pexels-quintingellar-313765.jpg",
    kind: "image" as const,
  },
} as const;

// ── PILL CLOUD ─────────────────────────────────────────────────────────────
// Everything included in the one package — one complete experience per
// property, under one shareable link.
export const pillCloud = {
  heading: "Everything in one experience",
  subhead:
    "One package includes everything below, produced end to end for a single property and delivered under one shareable link.",
  pills: [
    "Scroll-Animated Website",
    "Cinematic Walkthrough",
    "Interactive Virtual Tour",
    "Professional Photos",
    "Property Information",
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
  /** Real media to render in the frame. Omit to show the labeled stand-in. */
  src?: string;
  kind?: "image" | "video";
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
    id: "property-website",
    eyebrow: "The experience",
    title: "A Premium Property Website",
    body: "Every listing gets its own premium, scroll-animated website — a single-property site where the whole experience comes together. It's built around the home, designed to feel like a luxury product launch, and delivered as one shareable link with a QR code you can put anywhere. We design, build, and host it; you send it everywhere.",
    placeholders: [
      {
        label: "Waterfront residence exterior",
        aspect: "16 / 10",
        // Placeholder photo — swap for a real desktop scroll capture of the site.
        asset: "/public/media/features/property-site-desktop.mp4 — 16:10 scroll capture",
        src: "/media/sonder-edge-waterfront.jpg",
        kind: "image",
      },
      {
        label: "Aerial view of the community",
        aspect: "4 / 5",
        // Placeholder photo — swap for a real mobile screen capture of the site.
        asset: "/public/media/features/property-site-mobile.mp4 — 4:5 mobile capture",
        src: "/media/pexels-kindelmedia-9936969.jpg",
        kind: "image",
      },
    ],
  },
  {
    id: "cinematic-walkthrough",
    eyebrow: "The film",
    title: "A Cinematic Video Walkthrough",
    body: "A cinematic video walkthrough that glides through the home — the kind of film that makes a buyer feel the space before they ever book a showing. It's immersive and editorial, ready to share on the MLS, your socials, and front and center on the property website.",
    reverse: true,
    placeholders: [
      {
        label: "Cinematic walkthrough of the property",
        aspect: "16 / 9",
        // The real property walkthrough film, looping muted.
        asset: media.walkthrough,
        src: media.walkthrough,
        kind: "video",
      },
    ],
  },
  {
    id: "virtual-tour",
    eyebrow: "Explore the home",
    title: "An Interactive Virtual Tour",
    body: "Beyond the film, buyers get an interactive virtual tour they can explore at their own pace, room by room, on any device. It turns a static listing into something a buyer can step into and lose track of time in — the way a great open house feels in person, without the scheduling or the drive.",
    placeholders: [
      {
        label: "Interactive virtual tour of the estate",
        aspect: "16 / 10",
        // The client's virtual-tour storyboard (the Obsidian Estate).
        asset: media.virtualTour,
        src: media.virtualTour,
        kind: "image",
      },
    ],
  },
  {
    id: "photos-info",
    eyebrow: "Every detail",
    title: "Photos & Property Information",
    body: "Professional property photos and all the listing information, laid out beautifully: a high-resolution gallery, property features, the details buyers care about, and a built-in contact form so interested buyers reach you directly. Everything a buyer needs to fall for the home, in one place.",
    reverse: true,
    placeholders: [
      {
        label: "Skyline at golden hour",
        aspect: "4 / 3",
        // Placeholder photo — swap for a real enhanced listing / gallery photo.
        asset: "/public/media/features/gallery.jpg — 4:3 gallery photo",
        src: "/media/pexels-quintingellar-313765.jpg",
        kind: "image",
      },
      {
        label: "Coastline at dusk",
        aspect: "4 / 5",
        // Placeholder photo — swap for a real property info + contact module detail.
        asset: "/public/media/features/property-info.png — 4:5 info & contact detail",
        src: "/media/pexels-rdne-8231167.jpg",
        kind: "image",
      },
    ],
  },
];

// ── PRICING ──────────────────────────────────────────────────────────────
// ONE package, ONE price, per property, billed once. Every property is a
// project: when the property sells, the project is complete.
//
// The shape still supports multiple tiers (and a future recurring tier)
// without rework, but only one tier is offered today.
export type BillingType = "one-time" | "recurring";

export interface PricingTier {
  id: string;
  name: string;
  /** Display price, e.g. "$1,497". */
  price: string;
  /** Numeric price in USD, for future logic/sorting. */
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
    "Every listing gets the complete experience — the premium website, the cinematic walkthrough, the interactive virtual tour, and professional photos and information. One flat package.",
  note: "One package, billed once per property. No subscriptions, no add-ons, no revenue share, no commission — ever. When the property sells, the project is complete.",
  tiers: [
    {
      id: "experience",
      name: "The Property Experience",
      price: "$1,497",
      priceUsd: 1497,
      billing: "one-time",
      visible: true,
      featured: true,
      badge: "Everything included",
      tagline: "One package. Everything your listing needs.",
      description:
        "The complete experience for a single property — designed, produced, and hosted end to end so your listing feels like a luxury product launch.",
      deliverables: [
        "Premium scroll-animated property website",
        "Cinematic video walkthrough",
        "Interactive virtual tour",
        "Professional property photos",
        "Full property information & details",
        "Mobile-optimized, shareable link & QR code",
      ],
      cta: { label: "Start a Project", href: "/get-started" },
      // TODO(stripe): Stripe Price ID for the $1,497 Property Experience.
      stripePriceId: null,
    },
    // ── FUTURE: recurring/retainer tier ─────────────────────────────────
    // Only add once the core product is fully systemized (per the roadmap).
    // Keep visible:false so it does NOT render until launched.
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
    q: "What exactly do I get?",
    a: "One package for one property: a premium, scroll-animated property website that brings it all together — a cinematic video walkthrough, an interactive virtual tour buyers can explore, professional property photos, and the full listing information — delivered under one shareable link with a QR code. One immersive experience, produced end to end.",
  },
  {
    q: "Is the virtual tour just a Matterport scan?",
    a: "No. The cinematic walkthrough is a directed film that moves through the home like a piece of cinema. The interactive virtual tour lets buyers explore at their own pace — but it's a crafted, editorial experience, not a raw dollhouse scan. Everything is designed to feel immersive and premium.",
  },
  {
    q: "Do you build agent or brokerage websites?",
    a: "No — and that's the point. We don't build agent sites, brokerage sites, or general business websites, and we don't sell à la carte services. We build one complete experience per property. Keeping the offer focused is how we keep the quality exceptional.",
  },
  {
    q: "What does it cost?",
    a: "One flat package: $1,497 per property, billed once. No subscriptions, no add-ons, no revenue share, and no commission split. When the property sells, the project is complete. We're a premium marketing studio, not a brokerage partner.",
  },
  {
    q: "How do buyers reach me?",
    a: "The property website includes a built-in contact form. When a buyer enters their details to request info or a showing, that inquiry is sent straight to you so you can follow up — turning anonymous views into named buyer leads that belong to you.",
  },
  {
    q: "What do I need to send you?",
    a: "Just the property address, your photos (phone photos are fine to start), your contact details, and any notes about the listing. You'll do that on the Get Started intake. We handle production from there.",
  },
  {
    q: "Who owns the final experience?",
    a: "You do. The website, walkthrough, virtual tour, and photos are yours to market the listing across the MLS, your website, email, and social for as long as the listing is live.",
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
    "One premium experience for every property. A scroll-animated property website with a cinematic walkthrough, an interactive virtual tour, and professional photos — so buyers can feel the home before they step inside.",
  columns: [
    {
      title: "Experience",
      links: [
        { label: "Property Website", href: "#property-website" },
        { label: "Cinematic Walkthrough", href: "#cinematic-walkthrough" },
        { label: "Interactive Virtual Tour", href: "#virtual-tour" },
        { label: "Photos & Information", href: "#photos-info" },
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
