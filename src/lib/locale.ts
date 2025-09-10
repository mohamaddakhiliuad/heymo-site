// src/lib/locale.ts
export type Locale = "fa" | "en";
import { DEFAULT_LOCALE } from "@/config/site";

export const inferLocaleFromPath = (path: string): Locale => {
  if (path.startsWith("/fa")) return "fa";
  if (path.startsWith("/en")) return "en";
  return DEFAULT_LOCALE; // ← اگر "/" یا بدون پیشوند بود → EN
};

export const otherLocale = (l: Locale): Locale => (l === "fa" ? "en" : "fa");

export function localizedHref(href: string, locale: Locale) {
  if (!href) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("/fa") || href.startsWith("/en")) return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

export function switchLocalePath(path: string, to: Locale) {
  if (path === "/" || path === "/fa" || path === "/en") return `/${to}`;
  if (path.startsWith("/fa")) return `/${to}${path.slice(3)}`;
  if (path.startsWith("/en")) return `/${to}${path.slice(3)}`;
  return `/${to}${path}`;
}
