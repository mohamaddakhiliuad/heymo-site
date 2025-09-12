// src/app/robots.ts
import { settings } from "@/config/settings";
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${settings.baseUrl}/sitemap.xml`,
  };
}
