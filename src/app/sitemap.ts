// src/app/sitemap.ts
import { settings } from "@/config/settings";
export default function sitemap() {
  const base = settings.baseUrl;
  const routes = ["", "/about", "/programs", "/blog", "/booking"];
  const out = [];
  for (const r of routes) {
    out.push({
      url: `${base}/en${r}`,
      alternates: { languages: { en: `${base}/en${r}`, fa: `${base}/fa${r}` } },
    });
    out.push({
      url: `${base}/fa${r}`,
      alternates: { languages: { en: `${base}/en${r}`, fa: `${base}/fa${r}` } },
    });
  }
  return out;
}
