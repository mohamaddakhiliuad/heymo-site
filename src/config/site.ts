// src/config/site.ts
// Central site configuration (locale-aware, DRY, theme-driven)

export type Locale = "fa" | "en";
export const SITE_LOCALES: Locale[] = ["en", "fa"];
export const DEFAULT_LOCALE: Locale = "en";

export type NavItem = { label: string; href: string; external?: boolean };
export type CTA = { label: string; href: string; external?: boolean };

import { settings } from "./settings";

export const site = {
  name: "heyMo — Shopify, Headless Web & NFC Profiles",
  description: "Clean tech + clear strategy. Shopify storefronts, NFC smart profiles, content & SEO.",
  social: {
    instagram: "https://instagram.com/changeclubmag",
    linkedin: "https://linkedin.com/in/mohamad-dakhili",
    youtube: "https://youtube.com/changeclubmag",
    whatsapp: "https://wa.me/+16474820073",
  },
  contact: {
    emailTo: "mohamaddakhiliuad@gmail.com",
    emailCc: "",
    webhook: "",
  },
  booking: {
    cal: {
      free: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
      coaching: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
    },
    stripe: {
      coaching: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
      mbsr: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
    },
  },
  seo: {
    baseUrl: settings.baseUrl,
    twitterHandle: "@yourhandle",
  },
  nav: {
    header: [
      { key: "home", href: "/" },
      { key: "services", href: "/services" },
      { key: "projects", href: "/projects" },
      { key: "blog", href: "/blog" },
      { key: "contact", href: "/contact" },
    ],
    footer: [
      { key: "privacy", href: "/privacy" },
      { key: "terms", href: "/terms" },
      { key: "disclaimer", href: "/disclaimer" },
    ],
  },
};

export interface BrandConfig {
  name: string;
  tagline?: string;
  logo?: string;
  domain?: string;
  localeDefault: Locale;
  locales: Locale[];
  themeVariant?: "sage" | "warm" | "lavender";
}

export interface HeaderConfig {
  nav: Record<Locale, NavItem[]>;
  ctas?: Record<Locale, { primary?: CTA; secondary?: CTA }>;
  sticky?: boolean;
  translucent?: boolean;
  showLanguageSwitch?: boolean;
  variant?: "surface" | "accent";
}

export interface FooterColumn { title: string; links: NavItem[] }

export interface FooterConfig {
  variant?: "accent" | "surface";
  columns: Record<Locale, FooterColumn[]>;
  socials?: NavItem[];
  legal?: Record<Locale, NavItem[]>;
  newsletter?: { enable: boolean; formAction?: string };
  copy: Record<Locale, string>;
}

export interface BookingConfig {
  discovery?: Record<Locale, string>;
  session?: Record<Locale, string>;
  mbsr?: Record<Locale, string>;
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

/* ────────────────────────────────────────────────
   DEFAULT CONFIG — heyMo (FA/EN)
   ──────────────────────────────────────────────── */
const siteConfig = {
  brand: {
    name: "heyMo",
    tagline: "Smart websites, Shopify & digital growth strategies",
    logo: "/logo.svg",
    domain: "heymo.ca",
    localeDefault: DEFAULT_LOCALE,
    locales: SITE_LOCALES,
    themeVariant: "sage",
  },

  header: {
    variant: "accent",
    translucent: false,
    sticky: true,
    showLanguageSwitch: true,
    nav: {
      fa: [
        { label: "پروژه‌ها", href: "/fa/projects" },
        { label: "کارت هوشمند NFC", href: "/fa/nfc" },
        { label: "درباره من", href: "/fa/about" },
        { label: "ارتباط با ما", href: "/fa/contact" },
      ],
      en: [
        { label: "Projects", href: "/en/projects" },
        { label: "NFC Business Card", href: "/en/nfc" },
        { label: "About", href: "/en/about" },
        { label: "Contact", href: "/en/contact" },
      ],
    },
    ctas: {
      fa: { secondary: { label: "EN", href: "/en" } },
      en: { secondary: { label: "FA", href: "/fa" } },
    },
  },

  footer: {
    variant: "accent",
    columns: {
      fa: [
        {
          title: "دسترسی سریع",
          links: [
            { label: "خدمات", href: "/fa/services" },
            { label: "پروژه‌ها", href: "/fa/projects" },
            { label: "رزرو", href: "/fa/booking" },
          ],
        },
        {
          title: "یادگیری",
          links: [
            { label: "بلاگ", href: "/fa/blog" },
            { label: "منابع", href: "/fa/resources" },
          ],
        },
      ],
      en: [
        {
          title: "Quick Links",
          links: [
            { label: "Projects", href: "/en/projects" },
            { label: "Contact", href: "/en/contact" },
          ],
        },
        {
          title: "Learn",
          links: [
            { label: "Blog", href: "/en/blog" },
            { label: "Resources", href: "/en/resources" },
          ],
        },
      ],
    },
    socials: [
      { label: "Instagram", href: "https://instagram.com/changeclubmag", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/mohamad-dakhili", external: true },
      { label: "YouTube", href: "https://youtube.com/changeclubmag", external: true },
      { label: "WhatsApp", href: "https://wa.me/+16474820073", external: true },
    ],
    legal: {
      fa: [
        { label: "حریم خصوصی", href: "/fa/privacy" },
        { label: "شرایط", href: "/fa/terms" },
        { label: "سلب مسئولیت", href: "/fa/disclaimer" },
      ],
      en: [
        { label: "Privacy", href: "/en/privacy" },
        { label: "Terms", href: "/en/terms" },
        { label: "Disclaimer", href: "/en/disclaimer" },
      ],
    },
    copy: {
      fa: `© ${new Date().getFullYear()} heymo.ca`,
      en: `© ${new Date().getFullYear()} heymo.ca`,
    },
    newsletter: { enable: false },
  },

  seo: {
    title: "heyMo — Digital Growth & Smart Web Solutions",
    description:
      "Smart websites, Shopify strategies, and NFC business cards. Helping businesses grow with clarity and modern tools.",
    ogImage: "/og-cover.png",
  },
} satisfies SiteConfig;

export default siteConfig;
