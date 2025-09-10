// src/i18n/index.ts (switch-based loader to avoid Turbopack/dynamic import issues)
export type Locale = "fa" | "en";

export async function getDictionary(locale: Locale) {
  switch (locale) {
    case "fa":
      return (await import("./dictionaries/fa")).default;
    case "en":
    default:
      return (await import("./dictionaries/en")).default;
  }
}

// Simple t() helper for dot-notation access
export function t(dict: any, path: string, fallback?: string) {
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), dict) ?? fallback ?? path;
}
