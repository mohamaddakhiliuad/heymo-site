/** @type {import('tailwindcss').Config} */
/**
 * Purpose:
 * - Reusable & scalable Tailwind setup (monorepo-friendly)
 * - Applies Sage Calm tokens via CSS variables
 * - Keeps backward-compatible aliases (cream/brown/beige)
 * - MD/MDX aware + sensible defaults
 */
module.exports = {
  // ✅ Monorepo & MD/MDX aware globs (safe to keep even if single app)
  content: [
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // If you later move to a turborepo:
    "../../packages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "../../apps/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],

  // ✅ Dark mode via class for brand control
  darkMode: "class",

  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem", "2xl": "3rem" },
    },
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "serif"], // headings
        // sans: ['ui-sans-serif','system-ui'], // optional
      },

      /**
       * Colors via CSS variables → theming & alpha channels
       * Keep original aliases too (no breaking changes).
       */
      colors: {
        // Semantic
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          muted: "rgb(var(--color-surface-muted) / <alpha-value>)",
        },
        text: {
          DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          onAccent: "rgb(var(--color-on-accent) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
        },

        // Back-compat aliases
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        brown: "rgb(var(--color-brown) / <alpha-value>)",
        beige: "rgb(var(--color-beige) / <alpha-value>)",
      },

      /**
       * Typography plugin: serif for headings + tokenized colors
       */
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.text.DEFAULT"),
            "--tw-prose-headings": theme("colors.text.DEFAULT"),
            "--tw-prose-links": theme("colors.accent.DEFAULT"),
            "--tw-prose-bold": theme("colors.text.DEFAULT"),
            "--tw-prose-quotes": theme("colors.text.muted"),
            h1: { fontFamily: theme("fontFamily.serif") },
            h2: { fontFamily: theme("fontFamily.serif") },
            h3: { fontFamily: theme("fontFamily.serif") },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.text.DEFAULT"),
            "--tw-prose-headings": theme("colors.text.DEFAULT"),
            "--tw-prose-links": theme("colors.accent.DEFAULT"),
            "--tw-prose-bold": theme("colors.text.DEFAULT"),
            "--tw-prose-quotes": theme("colors.text.muted"),
          },
        },
      }),
    },
  },

  safelist: [
    // Common prose variants to avoid purge issues in MDX pages
    "prose",
    "prose-lg",
    "prose-invert",
  ],

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),

    /**
     * Base tokens (CSS variables)
     * - Sage Calm palette
     * - Back-compat aliases map to the new palette
     */
    function ({ addBase }) {
      addBase({
        ":root": {
          // Back-compat aliases (RGB)
          "--color-cream": "230 240 236", // #E6F0EC  ← surface-muted
          "--color-brown": "46 94 78",    // #2E5E4E  ← brand
          "--color-beige": "248 251 249", // #F8FBF9  ← surface

          // Semantic tokens (Sage Calm)
          "--color-surface": "248 251 249",       // #F8FBF9
          "--color-surface-muted": "230 240 236", // #E6F0EC
          "--color-text": "35 48 43",             // #23302B
          "--color-text-muted": "96 114 108",     // #60726C
          "--color-accent": "46 94 78",           // #2E5E4E (brand)
          "--color-on-accent": "255 255 255",     // #FFFFFF
          "--color-border": "214 227 221",        // #D6E3DD
        },
        ".dark": {
          // You can refine later; safe defaults now
          "--color-surface": "23 23 23",          // #171717
          "--color-surface-muted": "38 38 38",    // #262626
          "--color-text": "245 245 245",          // #F5F5F5
          "--color-text-muted": "189 189 189",    // #BDBDBD
          "--color-accent": "134 189 170",        // #86BDAA (lighter brand on dark)
          "--color-on-accent": "33 33 33",        // #212121
          "--color-border": "64 64 64",           // #404040
          // Back-compat aliases under dark (optional)
          "--color-cream": "38 38 38",            // align cream to surface-muted
          "--color-brown": "134 189 170",         // align brown to accent-light
          "--color-beige": "23 23 23",            // align beige to surface
        },
      });
    },
  ],
};
