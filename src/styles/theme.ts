// src/styles/theme.ts
/**
 * Purpose:
 * - Central design tokens (colors/typography/spacing/radius/shadow)
 * - Works with Tailwind + CSS variables set in CSS (globals/theme) and/or tailwind.config.js
 * - Backward-compatible with your previous API (typography.heading/body/small, etc.)
 *
 * Notes:
 * - Colors are exposed in two ways:
 *   1) hex: raw hex for programmatic use (charts, inline styles if ever needed)
 *   2) token: CSS-variable based strings to be used with Tailwind arbitrary values (e.g. text-[rgb(var(--color-text))])
 * - Typography exports class recipes that you can drop on elements directly.
 * - Use `cx()` to compose classes conditionally (tiny clsx).
 */

// ---------- Tiny class combiner (no dependency) ----------
export const cx = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ");

// ---------- Color Tokens (SAGE CALM THEME) ----------
/** Raw hex palette (stable source of truth for brand) */
export const colorsHex = {
  primary:   "#2E5E4E", // brand (sage deep)
  background:"#F8FBF9", // surface (page background)
  accent:    "#E6F0EC", // surface-muted (subtle fills)
  text:      "#23302B",
  mutedText: "#60726C", // softened text
  border:    "#D6E3DD",
  highlight: "#86BDAA", // supportive accent (chips/labels/soft CTAs)
} as const;

/**
 * CSS-variable driven tokens (paired with CSS variables)
 * Use with Tailwind's arbitrary values, e.g.:
 *   className="text-[rgb(var(--color-text))] bg-[rgb(var(--color-surface))]"
 */
export const colors = {
  surface:       "rgb(var(--color-surface))",
  surfaceMuted:  "rgb(var(--color-surface-muted))",
  text:          "rgb(var(--color-text))",
  textMuted:     "rgb(var(--color-text-muted))",
  accent:        "rgb(var(--color-accent))",      // == BRAND
  onAccent:      "rgb(var(--color-on-accent))",

  // Back-compat names mapped to variables/hex:
  primary:       "rgb(var(--color-accent))",      // maps to brand (sage deep)
  background:    "rgb(var(--color-surface))",
  accentBg:      "rgb(var(--color-surface-muted))",
  border:        colorsHex.border,                // neutral subtle line
  highlight:     colorsHex.highlight,             // supportive accent
} as const;

// ---------- Typography Recipes (Tailwind classes) ----------
/**
 * Headings: serif + brand color
 * Body: system sans + tokenized text color
 * Small: smaller size + muted text
 *
 * NOTE: kept `text-brown` for backward-compat; also add tokenized color to be safe.
 */
export const typography = {
  heading: cx(
    "font-serif",
    "text-[rgb(var(--color-accent))]",
    "text-brown" // legacy alias; map 'brown' => brand in tailwind.config if needed
  ),
  body: cx(
    "text-sm",
    "antialiased",
    "text-[rgb(var(--color-text))]"
  ),
  small: cx(
    "text-xs",
    "text-[rgb(var(--color-text-muted))]"
  ),
} as const;

// ---------- Spacing (class recipes) ----------
export const spacing = {
  sectionPadding: cx("px-6", "py-16"),
  cardPadding: "p-4",
  sectionPaddingLg: cx("px-6", "py-24"),
} as const;

// ---------- Radius ----------
export const radius = {
  base: "rounded-xl",
  button: "rounded-full",
  lg: "rounded-2xl",
} as const;

// ---------- Shadow ----------
export const shadow = {
  base: "shadow-md",
  hover: "hover:shadow-lg transition-shadow duration-200",
  subtle: "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
} as const;

// ---------- Component Recipes ----------
export const layout = {
  container: cx("container", "mx-auto"),
  section: cx("container", "mx-auto", spacing.sectionPadding),
};

export const card = {
  base: cx(
    "bg-[rgb(var(--color-surface))]",
    radius.base,
    shadow.base,
    spacing.cardPadding,
    "border",
    "border-[color:var(--tw-prose-hr,#e5e7eb)]"
  ),
  hoverable: cx(
    "bg-[rgb(var(--color-surface))]",
    radius.base,
    shadow.base,
    "transition",
    "hover:shadow-lg",
    "border",
    "border-[color:var(--tw-prose-hr,#e5e7eb)]"
  ),
};

export const button = {
  primary: cx(
    "inline-flex items-center justify-center",
    "px-4 py-2",
    radius.button,
    "bg-[rgb(var(--color-accent))]",
    "text-[rgb(var(--color-on-accent))]",
    "hover:brightness-95",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-accent))]"
  ),
  outline: cx(
    "inline-flex items-center justify-center",
    "px-4 py-2",
    radius.button,
    "border",
    "border-[rgb(var(--color-accent))]",
    "text-[rgb(var(--color-accent))]",
    "bg-transparent",
    "hover:bg-[rgb(var(--color-surface-muted))]",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--color-accent))]"
  ),
};

// ---------- Export grouped theme ----------
export const theme = {
  colorsHex,
  colors,
  typography,
  spacing,
  radius,
  shadow,
  layout,
  card,
  button,
};
export type Theme = typeof theme;
