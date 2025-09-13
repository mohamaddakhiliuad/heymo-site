// src/config/site.ts
// Central site configuration (locale-aware, DRY, theme-driven)

export type Locale = "fa" | "en";
export const SITE_LOCALES: Locale[] = ["en", "fa"];
export const DEFAULT_LOCALE: Locale = "en";

export type NavItem = { label: string; href: string; external?: boolean };
export type CTA = { label: string; href: string; external?: boolean };

// src/config/site.ts
import { settings } from "./settings";

export const site = {
  name: "Fatemeh Mindfulness",
  description: "Mindfulness & MBSR coaching — EN/FA",
  social: {
    instagram: "https://instagram.com/…",
    linkedin: "https://linkedin.com/in/…",
    youtube: "https://youtube.com/@…",
  },
  social: {
    instagram: "https://instagram.com/…",
    linkedin: "https://linkedin.com/in/…",
    whatsapp: "https://wa.me/1XXXXXXXXXX", // اختیاری
  },
  contact: {
    emailTo: "inbox@yourdomain.com",   // گیرنده
    emailCc: "",                       // اختیاری
    webhook: "",                       // اگر به‌جای ایمیل، به Notion/Zap/Webhook بزنی
  },
  booking: {
    discovery: {
      fa: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
      en: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
    },
    session: {
      fa: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
      en: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
    },
    mbsr: {
      fa: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
      en: "https://cal.com/fatemeh-taghizadeh-khorasani-2lj4yj/15min?overlayCalendar=true",
    },
  },

  booking: {
    // مصرف مستقیم در /[locale]/booking
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
      { key: "programs", href: "/programs" },
      { key: "blog", href: "/blog" },
      { key: "booking", href: "/booking" },
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
    variant: "accent",
    translucent:false,
    sticky: true,
    showLanguageSwitch: true,
    nav: {
      fa: [
      
        { label: "دوره‌ها", href: "/fa/programs" },
        { label: "درباره من", href: "/fa/about" },
        { label: "بلاگ",    href: "/fa/blog" },
      ],
      en: [
       
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
    variant: "accent", // یا "accent" اگر فوتر تیره با رنگ برند می‌خوای
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
      { label: "Instagram", href: "https://instagram.com/changeclubmag", external: true },
      { label: "LinkedIn",  href: "https://linkedin.com/in/fatemeh-taghizadehkhorassani", external: true },
      { label: "YouTube",   href: "https://youtube.com/changeclubmag",  external: true },
      { label: "Pinterest", href: "https://t.me/mindfulnesslifecoach", external: true },
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

  seo: {
    title: "Fatemeh — Mindfulness Coaching",
    description:
      "Reduce stress with evidence-informed mindfulness. 1:1 coaching and 8-week MBSR in Toronto & online.",
    ogImage: "/og-cover.png",
  },
} satisfies SiteConfig;

export default siteConfig;
