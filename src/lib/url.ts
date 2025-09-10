// src/lib/url.ts
import site from "@/config/site";

/** دامنه‌ی مطلق را از siteConfig یا از env برمی‌گرداند (برای SSG لازم است) */
export function getBaseUrl(): string {
  const fromConfig = site.brand?.domain ? `https://${site.brand.domain}` : "";
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";
  return fromConfig || fromEnv || "";
}

/** اگر path نسبی باشد، با base می‌سازد؛ اگر مطلق باشد همان را برمی‌گرداند. */
export function absUrl(path: string): string {
  const base = getBaseUrl();
  if (!base) return path; // fallback: relative (Next از metadataBase کمک می‌گیرد)
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
