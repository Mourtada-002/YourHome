import type { Config } from "tailwindcss";

// Single source of truth for design tokens (colors, fonts, spacing, easing).
// Loaded into Tailwind v4 via the `@config` directive in src/app/globals.css,
// so every token below is available as a utility class (bg-ink, text-gold, font-display, etc.)
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0a08", // deep near-black background
        charcoal: "#16140f", // secondary dark surface
        surface: "#1e1b16", // card / panel background
        ivory: "#f4eee2", // primary light text on dark
        stone: "#a79e8e", // muted secondary text
        gold: {
          DEFAULT: "#c6a15b",
          light: "#e0c48a",
          dark: "#9c7c3f",
        },
        terracotta: {
          DEFAULT: "#b5563a",
          light: "#d17e5f",
          dark: "#8a3f29",
        },
      },
      fontFamily: {
        display: ["var(--font-clash-display)", "serif"],
        sans: ["var(--font-general-sans)", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        section: "clamp(5rem, 10vw, 10rem)",
        gutter: "clamp(1.25rem, 5vw, 4rem)",
      },
      letterSpacing: {
        tightest2: "-0.04em",
        wide2: "0.18em",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.65, 0.05, 0.36, 1)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
} satisfies Config;
