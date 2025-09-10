// src/config/site.ts
// Central site configuration (locale-aware, DRY, theme-driven)

export type Locale = "fa" | "en";
export const SITE_LOCALES: Locale[] = ["en", "fa"];
export const DEFAULT_LOCALE: Locale = "en";

export type NavItem = { label: string; href: string; external?: boolean };
export type CTA = { label: string; href: string; external?: boolean };

export interface BrandConfig {
  name: string;
  tagline?: string;
  logo?: string;           // e.g. /logo.svg
  domain?: string;         // canonical
  localeDefault: Locale;
  locales: Locale[];
  themeVariant?: "sage" | "warm" | "lavender";
}

export interface HeaderConfig {
  nav: Record<Locale, NavItem[]>;
  ctas?: Record<Locale, { primary?: CTA; secondary?: CTA }>;
  sticky?: boolean;
  translucent?: boolean;   // blur + surface bg
  showLanguageSwitch?: boolean;
}

export interface FooterColumn { title: string; links: NavItem[] }

export interface FooterConfig {
  variant?: "accent" | "surface"; // accent: brand bg, surface: light bg
  columns: Record<Locale, FooterColumn[]>;
  socials?: NavItem[];            // Instagram/LinkedIn/YouTube/Pinterest
  legal?: Record<Locale, NavItem[]>;
  newsletter?: { enable: boolean; formAction?: string };
  copy: Record<Locale, string>;
}

export interface BookingConfig {
  discovery?: Record<Locale, string>; // Calendly/Cal.com links
  session?: Record<Locale, string>;   // paid 1:1 link (optional)
  mbsr?: Record<Locale, string>;      // Stripe/Checkout link (optional)
}

export interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
}

export interface SiteConfig {
  brand: BrandConfig;
  header: HeaderConfig;
  footer: FooterConfig;
  booking?: BookingConfig;
  seo?: SEOConfig;
}

/* ──────────────────────────────────────────────────────────────
   DEFAULT CONFIG — Fatemeh Mindfulness (FA/EN)
   ────────────────────────────────────────────────────────────── */
const siteConfig = {
  brand: {
    name: "Fatemeh • Mindfulness",
    tagline: "Evidence-informed mindfulness & MBSR",
    logo: "/logo.svg",
    domain: "fatemehmindful.com",
    localeDefault: DEFAULT_LOCALE,
    locales: SITE_LOCALES,
    themeVariant: "sage",
  },

  header: {
    sticky: true,
    translucent: true,
    showLanguageSwitch: true,
    nav: {
      fa: [
        { label: "خدمات",  href: "/fa/services" },
        { label: "دوره‌ها", href: "/fa/programs" },
        { label: "درباره من", href: "/fa/about" },
        { label: "بلاگ",    href: "/fa/blog" },
      ],
      en: [
        { label: "Services", href: "/en/services" },
        { label: "Programs", href: "/en/programs" },
        { label: "About",    href: "/en/about" },
        { label: "Blog",     href: "/en/blog" },
      ],
    },
    ctas: {
      fa: {
        primary:   { label: "رزرو جلسه", href: "/fa/booking" },
        secondary: { label: "EN", href: "/en" },
      },
      en: {
        primary:   { label: "Book a Call", href: "/en/booking" },
        secondary: { label: "FA", href: "/fa" },
      },
    },
  },

  footer: {
    variant: "surface", // یا "accent" اگر فوتر تیره با رنگ برند می‌خوای
    columns: {
      fa: [
        {
          title: "سریع",
          links: [
            { label: "خدمات",  href: "/fa/services" },
            { label: "دوره‌ها", href: "/fa/programs" },
            { label: "رزرو",    href: "/fa/booking" },
          ],
        },
        {
          title: "یادگیری",
          links: [
            { label: "بلاگ",    href: "/fa/blog" },
            { label: "منابع",   href: "/fa/resources" },
          ],
        },
      ],
      en: [
        {
          title: "Quick",
          links: [
            { label: "Services", href: "/en/services" },
            { label: "Programs", href: "/en/programs" },
            { label: "Booking",  href: "/en/booking" },
          ],
        },
        {
          title: "Learn",
          links: [
            { label: "Blog",      href: "/en/blog" },
            { label: "Resources", href: "/en/resources" },
          ],
        },
      ],
    },
    socials: [
      { label: "Instagram", href: "https://instagram.com/...", external: true },
      { label: "LinkedIn",  href: "https://linkedin.com/in/...", external: true },
      { label: "YouTube",   href: "https://youtube.com/...",  external: true },
      { label: "Pinterest", href: "https://pinterest.com/...", external: true },
    ],
    legal: {
      fa: [
        { label: "حریم خصوصی",  href: "/fa/privacy" },
        { label: "شرایط",        href: "/fa/terms" },
        { label: "سلب مسئولیت",  href: "/fa/disclaimer" },
      ],
      en: [
        { label: "Privacy",    href: "/en/privacy" },
        { label: "Terms",      href: "/en/terms" },
        { label: "Disclaimer", href: "/en/disclaimer" },
      ],
    },
    copy: {
      fa: `© ${new Date().getFullYear()} فاطمه — Mindfulness Coaching`,
      en: `© ${new Date().getFullYear()} Fatemeh — Mindfulness Coaching`,
    },
    newsletter: { enable: false },
  },

  booking: {
    discovery: {
      fa: "https://cal.com/your-handle/20min?lang=fa",
      en: "https://cal.com/your-handle/20min?lang=en",
    },
    session: {
      fa: "https://cal.com/your-handle/60min?lang=fa",
      en: "https://cal.com/your-handle/60min?lang=en",
    },
    mbsr: {
      fa: "https://buy.stripe.com/...fa",
      en: "https://buy.stripe.com/...en",
    },
  },

  seo: {
    title: "Fatemeh — Mindfulness Coaching",
    description:
      "Reduce stress with evidence-informed mindfulness. 1:1 coaching and 8-week MBSR in Toronto & online.",
    ogImage: "/og-cover.png",
  },
} satisfies SiteConfig;

export default siteConfig;
