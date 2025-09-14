export const PRODUCT_SETTINGS = {
    defaultCount: 5,
  
  }
export const RELATED_PRODUCT_STRATEGY = 'tag' // or 'category'
export const RELATED_LIMIT = 4

export const LIGHTBOX_CONFIG = {
  thumbnails: false,
  enableNext: true,
  fullscreen: false,
  animationEffects: true,
  slideshow: false,
  shareButtons: true,
  previewOnWall: false,
  keyboardShortcuts: true,
  vignetteEffect: true,
  theme: 'dark',
}
export const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!

// src/config/settings.ts
export const settings = {
  baseUrl: "https://heymo.ca/", // به دامین واقعی‌ت تغییر بده
  locales: ["en", "fa"] as const,
  defaultLocale: "en" as const,
  rtlLocales: new Set(["fa"]),
  brand: {
    name: "heymo",
    theme: "Sage Calm",
  },
};
export type Locale = (typeof settings.locales)[number];
export const isRTL = (locale: Locale) => settings.rtlLocales.has(locale);