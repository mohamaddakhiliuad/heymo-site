// middleware.ts (drop at project root)
// Edge-safe redirect to default locale when missing (Next.js 15 compatible)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, SITE_LOCALES } from "./src/config/i18n";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip assets, API, and files with extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If path already starts with a supported locale, continue
  const hasLocale = SITE_LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  // Redirect to default locale
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

// Match everything except _next, api, and static files
export const config = {
  matcher: ["/((?!_next|api|.*\..*).*)"],
};
