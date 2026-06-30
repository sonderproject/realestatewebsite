// ─────────────────────────────────────────────────────────────────────────
// SONDER STUDIO — SITE CONFIG
// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for the homepage + core pages.
//
// Sonder is a DONE-FOR-YOU service: we produce premium marketing media for a
// single property, per property — NOT a self-serve SaaS platform. All copy,
// pricing, deliverables, pills, feature blocks and FAQ entries live here so the
// pages stay thin and the wording is edited in one place.
//
// Two hero products lead everything:
//   1. 4D AI Property Tours — immersive, AI-generated cinematic walkthroughs
//      (on-rails camera, NOT a clickable Matterport dollhouse).
//   2. Premium Animated Property Landing Pages — a single-property page with
//      scroll-driven animation that also captures qualified buyer leads.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Sonder",
  studio: "Sonder Studio",
  domain: "sonderstudio.space",
  url: "https://sonderstudio.space",
  tagline: "Done-for-you property media that sells listings faster.",
  // Cal.com inline booking embed (kept from the previous build).
  cal: {
    namespace: "sonder-studio",
    link: "dante-valentino/sonder-studio",
  },
  turnaround: "48-hour turnaround",
  promise: "Done for you",
} as const;

// ── HERO ───────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "Done-for-you property media",
  // Fraunces serif headline. <em> spans are styled as the teal accent.
  headlineLead: "Turn any listing into an ",
  headlineEm: "immersive experience",
  headlineTail: " that sells faster.",
  subhead:
    "We produce the 4D AI tour, the animated property page, and every piece of marketing media your listing needs — so you win the listing, sell it faster, and capture the buyer leads. You send the address and photos; we deliver the rest.",
  primaryCta: { label: "Get Started", href: "/get-started" },
  secondaryCta: { label: "See pricing", href: "#pricing" },
  // Two short reassurance lines under the CTA.
  reassurances: [site.turnaround, site.promise],
} as const;

// ── FLOATING SHOWCASE ────────────────────────────────────────────────────
// Floating, softly-shadowed placeholders. Real assets are supplied later.
export const showcase = {
  // TODO(asset): hero 4D AI tour reel — cinematic on-rails walkthrough MP4,
  // 16:9, muted autoplay loop. Drop at /public/media/showcase/4d-tour.mp4
  primary: {
    label: "4D AI TOUR — placeholder",
    sublabel: "Cinematic AI-generated walkthrough",
    aspect: "16 / 9" as const,
  },
  // TODO(asset): animated property landing-page screen-capture, 9:16 portrait
  // scroll capture. Drop at /public/media/showcase/property-page.mp4
  secondary: {
    label: "ANIMATED PROPERTY PAGE — placeholder",
    sublabel: "Scroll-animated single-property page",
    aspect: "9 / 16" as const,
  },
} as const;

// ── PILL CLOUD ─────────────────────────────────────────────────────────────
export const pillCloud = {
  heading: "Everything to sell the listing",
  subhead:
    "One property, one team, one invoice. Every asset below is produced for you.",
  pills: [
    "4D AI Tour",
    "Animated Property Page",
    "Virtual Staging",
    "Walkthrough Video",
    "Photo Enhancement",
    "Sky Replacement",
    "Listing Description",
    "Social Cutdowns",
    "Lead Capture",
    "Hosted Page",
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
    id: "four-d-tour",
    eyebrow: "The flagship",
    title: "The 4D Tour",
    body: "Our signature product: a cinematic, AI-generated walkthrough that glides through the home on a directed camera path — the kind of film that makes a buyer feel the space before they ever book a showing. It is immersive and editorial, not a clunky dollhouse scan. You give us photos; we generate the tour and hand you a share-ready film for the MLS, your socials, and the property page.",
    placeholders: [
      {
        label: "4D AI TOUR — placeholder",
        aspect: "16 / 9",
        // TODO(asset): flagship 4D tour reel, 16:9 MP4. /public/media/features/4d-tour.mp4
        asset: "/public/media/features/4d-tour.mp4 — 16:9 cinematic tour reel",
      },
    ],
  },
  {
    id: "property-page",
    eyebrow: "Capture the buyer",
    title: "The Property Page",
    body: "A premium, single-property website with scroll-driven animation built around your listing — and a lead-capture form wired into the page so interested buyers become contacts in your inbox, not anonymous views. We design, build, and host it; you get a link to drop everywhere and a steady feed of qualified buyer leads.",
    reverse: true,
    placeholders: [
      {
        label: "ANIMATED PROPERTY PAGE — placeholder",
        aspect: "16 / 10",
        // TODO(asset): desktop scroll capture of the animated property page.
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
    id: "virtual-staging",
    eyebrow: "Cut staging costs",
    title: "Stage It Virtually",
    body: "Physical staging runs thousands per listing and weeks of logistics. We stage your rooms virtually instead — furnishing empty spaces and helping buyers picture life inside a vacant or fixer-upper home — for a fraction of the cost and with same-week turnaround. Show the home at its best without renting a single sofa.",
    placeholders: [
      {
        label: "VIRTUAL STAGING — before · placeholder",
        aspect: "4 / 3",
        // TODO(asset): empty-room "before" photo. /public/media/features/staging-before.jpg
        asset: "/public/media/features/staging-before.jpg — 4:3 empty room",
      },
      {
        label: "VIRTUAL STAGING — after · placeholder",
        aspect: "4 / 3",
        // TODO(asset): virtually staged "after" photo. /public/media/features/staging-after.jpg
        asset: "/public/media/features/staging-after.jpg — 4:3 staged room",
      },
    ],
  },
  {
    id: "everything-else",
    eyebrow: "No loose ends",
    title: "Everything Else, Handled",
    body: "Fresh listing? We turn it around fast and complete. Enhanced photography, a written listing description, and short social cutdowns for Reels, TikTok, and Stories — all produced from the same shoot so your marketing looks consistent and goes live the day it should.",
    reverse: true,
    placeholders: [
      {
        label: "PHOTO ENHANCEMENT — placeholder",
        aspect: "4 / 3",
        // TODO(asset): enhanced listing photo. /public/media/features/photo-enhanced.jpg
        asset: "/public/media/features/photo-enhanced.jpg — 4:3 enhanced photo",
      },
      {
        label: "SOCIAL CUTDOWN — placeholder",
        aspect: "9 / 16",
        // TODO(asset): vertical social cutdown clip. /public/media/features/social-cutdown.mp4
        asset: "/public/media/features/social-cutdown.mp4 — 9:16 social clip",
      },
    ],
  },
];

// ── PRICING ──────────────────────────────────────────────────────────────
// Per-property, ONE-TIME pricing for now. The shape intentionally supports a
// future recurring/monthly tier without rework: add an entry with
// billing: "recurring", interval: "month", visible: true and it renders.
// Nothing recurring is shown today (all current tiers are one-time).
export type BillingType = "one-time" | "recurring";

export interface PricingTier {
  id: string;
  name: string;
  /** Display price, e.g. "$497". */
  price: string;
  /** Numeric price in USD, for future logic/sorting. */
  priceUsd: number;
  billing: BillingType;
  /** Only used when billing === "recurring". */
  interval?: "month" | "year";
  /** Toggle a tier on/off without deleting it. Monthly tiers stay false for now. */
  visible: boolean;
  featured: boolean;
  tagline: string;
  description: string;
  deliverables: string[];
  cta: { label: string; href: string };
  // TODO(stripe): replace with the real Stripe Price ID before launch.
  stripePriceId: string | null;
}

export const pricing = {
  heading: "One property. One price. Done for you.",
  subhead:
    "Pick a package per listing. No subscriptions, no platform to learn — we deliver the media and you get back to selling.",
  note: "Prices are per property, billed once. Need volume pricing for a brokerage? Book a call.",
  tiers: [
    {
      id: "listing",
      name: "Listing",
      price: "$497",
      priceUsd: 497,
      billing: "one-time",
      visible: true,
      featured: false,
      tagline: "Core media for one property",
      description:
        "Everything you need to launch a brand-new listing looking premium — fast.",
      deliverables: [
        "Walkthrough video",
        "Photo enhancement",
        "Virtual staging",
        "Listing description",
        "Social cutdowns",
        "Hosted page",
      ],
      cta: { label: "Start a Listing", href: "/get-started?tier=listing" },
      // TODO(stripe): Stripe Price ID for the $497 one-time Listing package.
      stripePriceId: null,
    },
    {
      id: "flagship",
      name: "Flagship",
      price: "$997",
      priceUsd: 997,
      billing: "one-time",
      visible: true,
      featured: true,
      tagline: "The full immersive treatment",
      description:
        "Our hero package: the 4D AI tour and a premium animated property page with built-in lead capture, plus everything in Listing.",
      deliverables: [
        "4D AI property tour",
        "Premium animated property page",
        "Built-in buyer lead capture",
        "Everything in Listing",
        "Priority 48-hour turnaround",
      ],
      cta: { label: "Go Flagship", href: "/get-started?tier=flagship" },
      // TODO(stripe): Stripe Price ID for the $997 one-time Flagship package.
      stripePriceId: null,
    },
    // ── FUTURE: recurring/monthly tier ──────────────────────────────────
    // Example shape for a retainer once it's offered. Keep visible:false so it
    // does NOT render today. Flip to true (and fill the Stripe ID) to launch.
    // {
    //   id: "retainer",
    //   name: "Studio Retainer",
    //   price: "$X/mo",
    //   priceUsd: 0,
    //   billing: "recurring",
    //   interval: "month",
    //   visible: false,
    //   featured: false,
    //   tagline: "Ongoing media for active agents",
    //   description: "A set number of listings produced every month.",
    //   deliverables: ["N listings / month", "Priority queue"],
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
    q: "Is the 4D tour a Matterport scan?",
    a: "No. The 4D AI tour is a cinematic, AI-generated walkthrough — a directed video that moves through the home on a set camera path, like a film. It is not a Matterport-style dollhouse you click around in. We design it to feel immersive and editorial, and you receive a ready-to-share video, not an interactive scan.",
  },
  {
    q: "How does the lead capture work?",
    a: "The Flagship property page includes a built-in lead-capture form. When a buyer enters their details to request info or a showing, that contact is sent straight to you (your inbox, and your CRM if you use one) so you can follow up. The page turns anonymous views into named, qualified buyer leads that belong to you.",
  },
  {
    q: "What do I need to send you?",
    a: "Just the property address, your photos (phone photos are fine to start), and your contact details, plus which package you'd like. You'll do that on the Get Started intake. We handle production from there.",
  },
  {
    q: "How fast is turnaround?",
    a: "Standard turnaround is 48 hours from the moment we have your photos and details. Flagship listings get priority in the queue.",
  },
  {
    q: "How is this different from hiring a stager and a videographer?",
    a: "It's done for you, in one place, for one price. Virtual staging replaces costly physical staging — no furniture rental, no scheduling — and you get the tour, the page, the photos, the description, and the social cutdowns as a single package instead of coordinating multiple vendors.",
  },
  {
    q: "Do you work with brokerages and teams?",
    a: "Yes. Independent agents through large brokerages all use Sonder per listing. If you run a high volume of listings and want a standing arrangement, book a call and we'll scope it.",
  },
  {
    q: "Who owns the final media?",
    a: "You do. Use the tour, page, photos, and clips across the MLS, your website, email, and social — they're yours to market the listing.",
  },
];

// ── FOOTER ─────────────────────────────────────────────────────────────────
export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footer = {
  blurb:
    "Done-for-you property media. Immersive 4D AI tours and premium animated property pages that help agents sell listings faster and capture buyer leads.",
  columns: [
    {
      title: "Products",
      links: [
        { label: "4D AI Tour", href: "#four-d-tour" },
        { label: "Property Page", href: "#property-page" },
        { label: "Virtual Staging", href: "#virtual-staging" },
        { label: "Photo & Social", href: "#everything-else" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
        { label: "Get Started", href: "/get-started" },
        { label: "Book a Call", href: "#contact" },
      ],
    },
    {
      title: "Get in touch",
      links: [
        { label: "Start a listing", href: "/get-started" },
        { label: "Book a call", href: "#contact" },
      ],
    },
  ] as FooterColumn[],
} as const;
