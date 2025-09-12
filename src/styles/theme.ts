// src/styles/theme.ts
/**
 * Noura Theme (Aggressive rewrite)
 * - همه‌ی استایل‌های موجود (button.primary, card.base, typography.heading, …)
 *   به تم جدید نورا تغییر داده شدند.
 * - گرادیان بنفش → آلویی → کهربایی برای هدر/فوتر
 * - متن سفید روی گرادیان
 * - کارت‌ها روی surface روشن (برای readability) + glow
 * - CTAها براق (shine)
 */

export const cx = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ");

// ---------- Color Tokens ----------
export const colorsHex = {
   // پایه
  primary:   "#142C44",  // هم‌راستا با accent (می‌تونی جدا نگه داری)
  background:"#FCFAF6",  // surface
  accent:    "#142C44",  // Navy برند (هدینگ/لینک/Primary)
  text:      "#142436",  // متن اصلی
  mutedText: "#606C76",  // متن ثانویه
  border:    "#D6DADE",  // بُردر سردِ ملایم
  highlight: "#B4CDD7",  // هایلایت خنثی

  // گرادیان هدر/فوتر (ناوی‌های ملایم)
  heroFrom:  "#0A1A2C",
  heroMid:   "#163052",
  heroTo:    "#22426C",

  // Glowها
  glowAmber: "#F2645A",  // کورال گرم برای افکت
  glowSage:  "#B4CDD7",

  // (اختیاری) CTA جدا از accent؛ اگر نخواستی، همان accent را بگذار
  cta:       "#F2645A",
} as const;

export const colors = {
  surface:       "rgb(var(--color-surface))",
  surfaceMuted:  "rgb(var(--color-surface-muted))",
  text:          "rgb(var(--color-text))",
  textMuted:     "rgb(var(--color-text-muted))",
  accent:        "rgb(var(--color-accent))",
  onAccent:      "rgb(var(--color-on-accent))",

  // aliasهای کاربردی
  primary:       "rgb(var(--color-accent))",
  background:    "rgb(var(--color-surface))",
  accentBg:      "rgb(var(--color-surface-muted))",
  border:        "rgb(var(--color-border))",
  highlight:     colorsHex.highlight,

  heroFrom:      "rgb(var(--hero-from))",
  heroMid:       "rgb(var(--hero-mid))",
  heroTo:        "rgb(var(--hero-to))",
  glowAmber:     "rgb(var(--glow-amber))",
  glowSage:      "rgb(var(--glow-sage))",
} as const;

// ---------- Typography ----------
export const typography = {
  heading: cx(
    "font-serif",
    "text-[rgb(var(--color-accent))]",
    "text-brown"
  ),
  headingOnHero: cx(
    "font-serif",
    "text-white",
    "title-softshadow"
  ),
  body: cx(
    "text-base",
    "antialiased",
    "text-[rgb(var(--color-text))]"
  ),
  small: cx(
    "text-sm",
    "text-[rgb(var(--color-text-muted))]"
  ),
} as const;

// ---------- Spacing ----------
export const spacing = {
  sectionPadding: cx("px-6", "py-16"),
  cardPadding: "p-6",
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
  cardGlow:
    "shadow-[0_0_0_1px_rgba(var(--glow-amber),.22),0_24px_40px_-18px_rgba(0,0,0,.25)]",
  btnGlow: "shadow-[0_0_0_2px_rgba(var(--glow-amber),.45)]",
  focusRing:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))] focus-visible:ring-offset-2 ring-offset-[rgb(var(--color-surface))]",
} as const;

// ---------- Component Recipes ----------
export const layout = {
  container: cx("container", "mx-auto"),
  section: cx("container", "mx-auto", spacing.sectionPadding),
  heroBackground: "relative overflow-hidden bg-hero-gradient",
  footerBackground: "relative overflow-hidden bg-hero-gradient footer-glow",
};

export const card = {
  base: cx(
    "bg-[rgb(var(--color-surface))]",
    radius.lg,
    shadow.cardGlow,
    spacing.cardPadding,
    "border",
    "border-[rgb(var(--color-border))]",
    "transition"
  ),
  hoverable: cx(
    "bg-[rgb(var(--color-surface))]",
    radius.lg,
    shadow.cardGlow,
    "hover:-translate-y-0.5 will-change-transform",
    "border",
    "border-[rgb(var(--color-border))]",
    "transition"
  ),
};

export const button = {
  primary: cx(
    "inline-flex items-center justify-center",
    "px-5 py-3",
    radius.button,
    "bg-[rgb(var(--color-accent))]",
    "text-[rgb(var(--color-on-accent))]",
    "hover:brightness-105",
    shadow.focusRing,
    shadow.btnGlow
  ),
  outline: cx(
      "inline-flex items-center justify-center",
    "px-5 py-3",
    radius.button,
    "border",
    "border-[rgb(var(--color-border))]",
    "text-[rgb(var(--color-text))]",
    "bg-transparent",
    "hover:bg-[rgb(var(--color-surface-muted))]",
    shadow.focusRing
  ),
  shine: cx(
    "inline-flex items-center justify-center",
    "px-6 py-3",
    radius.button,
    "relative overflow-hidden",
    "bg-[rgb(var(--color-accent))] text-white",
    "after:absolute after:inset-0 after:bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.6)_20%,rgba(255,255,255,0)_40%)] after:bg-[length:250%_100%] hover:after:animate-shine",
    shadow.btnGlow,
    shadow.focusRing
  ),
  // اگر خواستی CTA مرجانی/کورال جدا از accent داشته باشیم:
  cta: cx(
    "inline-flex items-center justify-center",
    "px-6 py-3",
    radius.button,
    "relative overflow-hidden",
    // از متغیر CSS استفاده کن تا بعداً از globals کنترل شود
    "bg-[rgb(var(--color-cta, var(--color-accent)))] text-white",
    "after:absolute after:inset-0 after:bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.6)_20%,rgba(255,255,255,0)_40%)] after:bg-[length:250%_100%] hover:after:animate-shine",
    shadow.btnGlow,
    shadow.focusRing
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
