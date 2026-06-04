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
        obsidian: "#0A0A09",
        charcoal: "#141412",
        stone: "#1E1D1B",
        ash: "#2A2926",
        warm: {
          50: "#F7F5F2",
          100: "#EDE9E3",
          200: "#D4CCC0",
          300: "#B8AC9C",
          400: "#9A8C7A",
          500: "#7D6E5C",
          600: "#5E5144",
          700: "#3F372F",
          800: "#201E1A",
        },
        gold: {
          DEFAULT: "#C8A96E",
          light: "#DFC28A",
          dark: "#A8893E",
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
