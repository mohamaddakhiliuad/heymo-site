// src/config/i18n.ts
// ⚠️ Edge-safe: no Node/React imports, no env access.
export const SITE_LOCALES = ["en", "fa"] as const;
export type Locale = (typeof SITE_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
