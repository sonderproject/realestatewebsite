import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Sonder skin (current homepage + core pages) ──────────────────
        // Deep ocean navy bg, teal accent, cream text. Editorial, dark.
        navy: {
          DEFAULT: "#0a1929", // page background
          deep: "#06121f",
          900: "#0a1929",
          800: "#0f2335",
          700: "#16304a",
          600: "#1a3a52", // secondary surface
          500: "#244c6a",
          400: "#356488",
        },
        teal: {
          DEFAULT: "#7dd3fc", // accent
          light: "#a9e2fd",
          dark: "#4cb9ea",
        },
        cream: {
          DEFAULT: "#f5f1ea", // primary text
          dim: "#c9c4ba",
          faint: "#8a93a0",
        },
        // ── Legacy tokens (kept so the /photography page still builds) ────
        obsidian: "#0A0A09",
        charcoal: "#141412",
        stone: "#1E1D1B",
        ash: "#2A2926",
        warm: {
          50: "#FBFAF8",
          100: "#F3F0EB",
          200: "#E2DBD0",
          300: "#CBC0B0",
          400: "#AEA08D",
          500: "#6E5F4D",
          600: "#4C4135",
          700: "#332C25",
          800: "#201E1A",
        },
        // Primary accent — Google-blue meets ocean surf.
        // (Token kept as `gold` so existing utilities reskin in one place.)
        gold: {
          DEFAULT: "#3E9BD4",
          light: "#62B4E6",
          dark: "#1C77B5",
        },
        surf: {
          50: "#EEF6FC",
          100: "#D6EAF7",
          200: "#AED5EF",
          300: "#7CBCE4",
          400: "#4FA4D9",
          500: "#3E9BD4",
          600: "#1C77B5",
          700: "#155C8C",
        },
        sand: {
          50: "#FCFBF8",
          100: "#F6F4EF",
          200: "#ECE7DD",
          300: "#DBD2C2",
        },
        ocean: {
          deep: "#071726",
          dark: "#0B2236",
          DEFAULT: "#143A57",
          mid: "#225A7C",
          light: "#5BA0C2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        "ultra-wide": "0.35em",
      },
    },
  },
  plugins: [],
} satisfies Config;
