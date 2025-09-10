// src/styles/formStyles.ts
// Centralized, token-based UI classes for buttons, inputs, cards, etc.
// Uses CSS variables defined in globals.css (Sage Calm theme).
// No hardcoded hex colors; everything reads from tokens.

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/* ───────────────────────────────
   Buttons
   ─────────────────────────────── */
const baseBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium " +
  "transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "ring-offset-[rgb(var(--color-surface))]";

export const button = {
  primary: cn(
    baseBtn,
    "bg-[rgb(var(--color-accent))] text-[rgb(var(--color-on-accent))]",
    "hover:opacity-90",
    "focus-visible:ring-[rgb(var(--color-accent))]"
  ),
  outline: cn(
    baseBtn,
    "border border-[var(--color-border)] text-[rgb(var(--color-text))] bg-[rgb(var(--color-surface))]",
    "hover:bg-[rgb(var(--color-surface-muted))]",
    "focus-visible:ring-[rgb(var(--color-accent))]"
  ),
  ghost: cn(
    baseBtn,
    "text-[rgb(var(--color-text))] bg-transparent",
    "hover:bg-[rgb(var(--color-surface-muted))]",
    "focus-visible:ring-[rgb(var(--color-accent))]"
  ),
  link: cn(
    "inline-flex items-center gap-1 font-medium underline underline-offset-4",
    "text-[rgb(var(--color-accent))] hover:opacity-80"
  ),
  // Size variants
  sm: "px-3 py-2 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-xl",
  icon: "p-2 rounded-lg",
};

/* ───────────────────────────────
   Form controls
   ─────────────────────────────── */
const baseField =
  "block w-full rounded-lg px-3.5 py-2.5 text-[rgb(var(--color-text))] " +
  "bg-[rgb(var(--color-surface))] placeholder:text-[rgb(var(--color-text-muted))] " +
  "border border-[var(--color-border)] shadow-[0_1px_0_rgba(0,0,0,0.02)] " +
  "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))] " +
  "disabled:opacity-60 disabled:pointer-events-none";

export const field = {
  input: baseField,
  textarea: cn(baseField, "min-h-[112px]"),
  select: baseField,
  // Field wrapper for label + control + hint/error
  group: "space-y-2",
  label:
    "block text-sm font-medium text-[rgb(var(--color-text))] peer-disabled:opacity-60",
  hint: "text-sm text-[rgb(var(--color-text-muted))]",
  error: "text-sm font-medium text-red-700 dark:text-red-400",
};

/* ───────────────────────────────
   Cards & Surfaces
   ─────────────────────────────── */
export const card = {
  base:
    "rounded-2xl border border-[var(--color-border)] " +
    "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))] " +
    "shadow-[0_6px_14px_rgba(0,0,0,0.05)]",
  padded: "p-5 md:p-6",
  hover: "transition-shadow hover:shadow-[0_8px_22px_rgba(0,0,0,0.08)]",
  muted: "bg-[rgb(var(--color-surface-muted))]",
  header: "mb-3",
  title: "text-lg md:text-xl font-semibold tracking-tight",
  subtitle: "text-[rgb(var(--color-text-muted))]",
  footer: "mt-4",
};

/* ───────────────────────────────
   Badges / Chips
   ─────────────────────────────── */
export const badge = {
  base:
    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium " +
    "bg-[rgb(var(--color-surface-muted))] text-[rgb(var(--color-text))]",
  onAccent:
    "bg-[rgb(var(--color-on-accent))] text-[rgb(var(--color-accent))]",
};

/* ───────────────────────────────
   Layout helpers
   ─────────────────────────────── */
export const layout = {
  container: "mx-auto max-w-5xl px-4",
  section: "py-10 md:py-14",
  mutedBg: "bg-[rgb(var(--color-surface-muted))]",
};

/* ───────────────────────────────
   Example usage:
   <button className={button.primary}>Book a Call</button>
   <a className={button.outline} href="/en/booking">Booking</a>
   <input className={field.input} placeholder="Your name" />
   <div className={cn(card.base, card.padded, card.hover)}>...</div>
   <div className={cn(layout.container, layout.section)}>...</div>
   ─────────────────────────────── */
