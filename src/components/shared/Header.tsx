"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/config/site";
import { inferLocaleFromPath, otherLocale, localizedHref, switchLocalePath } from "@/lib/locale";

export default function Header() {
  const pathname = usePathname() || "/";
  const locale = inferLocaleFromPath(pathname);
  const { nav, ctas, sticky, translucent, showLanguageSwitch } = site.header;

  const primary = ctas?.[locale]?.primary;
  // اگر LanguageSwitch فعاله، لینکِ سوییچ باید به همین صفحه ولی زبانِ مقابل باشد
  const secondary = showLanguageSwitch
    ? { label: otherLocale(locale).toUpperCase(), href: switchLocalePath(pathname, otherLocale(locale)) }
    : ctas?.[locale]?.secondary;

  return (
    <header
      className={[
        "w-full z-40",
        sticky ? "sticky top-0" : "",
        translucent
          ? "bg-[rgb(var(--color-surface))/0.7] backdrop-blur border-b border-[var(--color-border)]"
          : "bg-[rgb(var(--color-surface))] border-b border-[var(--color-border)]",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* برند */}
        <Link href={locale === "fa" ? "/fa" : "/en"} className="flex items-center gap-2">
          {site.brand.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.brand.logo} alt={site.brand.name} className="h-7 w-auto" />
          ) : null}
          <span className="font-semibold text-[rgb(var(--color-accent))]">
            {site.brand.name}
          </span>
        </Link>

        {/* ناوبری دسکتاپ */}
        <nav className="hidden md:flex items-center gap-5">
          {nav[locale].map((item) => {
            const href = localizedHref(item.href, locale);
            const active =
              href === pathname ||
              (pathname !== "/" && pathname.startsWith(href) && href !== `/${locale}`);
            return (
              <Link
                key={item.href + item.label}
                href={href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={[
                  "text-sm transition",
                  active
                    ? "text-[rgb(var(--color-accent))]"
                    : "text-[rgb(var(--color-text))]/80 hover:text-[rgb(var(--color-accent))]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* اکشن‌ها + موبایل */}
        <div className="flex items-center gap-2">
          {secondary && (
            <Link
              href={secondary.href}
              className="hidden sm:inline-flex rounded-md border px-3 py-1 text-sm border-[rgb(var(--color-accent))] text-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-surface-muted))]"
            >
              {secondary.label}
            </Link>
          )}
          {primary && (
            <Link
              href={primary.href}
              className="inline-flex rounded-full px-4 py-2 text-sm bg-[rgb(var(--color-accent))] text-[rgb(var(--color-on-accent))] hover:brightness-95"
            >
              {primary.label}
            </Link>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const pathname = usePathname() || "/";
  const locale = inferLocaleFromPath(pathname);
  const items = site.header.nav[locale];

  return (
    <details className="md:hidden relative">
      <summary className="list-none cursor-pointer rounded-md border px-3 py-1 text-sm border-[rgb(var(--color-accent))] text-[rgb(var(--color-accent))]">
        Menu
      </summary>
      <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-[rgb(var(--color-surface))] p-2 shadow-md border-[var(--color-border)]">
        {items.map((i) => (
          <Link
            key={i.href}
            href={localizedHref(i.href, locale)}
            className="block rounded-lg px-3 py-2 text-sm text-[rgb(var(--color-text))]/90 hover:bg-[rgb(var(--color-surface-muted))]"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
