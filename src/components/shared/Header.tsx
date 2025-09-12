// src/components/shared/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/config/site";
import {
  inferLocaleFromPath,
  otherLocale,
  localizedHref,
  switchLocalePath,
} from "@/lib/locale";

export default function Header() {
  const pathname = usePathname() || "/";
  const locale = inferLocaleFromPath(pathname);

  // variant: "surface" | "accent"
  const {
    nav,
    ctas,
    sticky,
    translucent,
    showLanguageSwitch,
    variant = "surface",
  } = site.header as {
    nav: Record<"fa" | "en", Array<{ href: string; label: string; external?: boolean }>>;
    ctas?: Record<"fa" | "en", { primary?: { href: string; label: string }, secondary?: { href: string; label: string } }>;
    sticky?: boolean;
    translucent?: boolean;
    showLanguageSwitch?: boolean;
    variant?: "surface" | "accent";
  };

  const isAccent = variant === "accent";

  const primary = ctas?.[locale]?.primary;
  const secondary = showLanguageSwitch
    ? { label: otherLocale(locale).toUpperCase(), href: switchLocalePath(pathname, otherLocale(locale)) }
    : ctas?.[locale]?.secondary;

  return (
    <header
      className={[
        "w-full z-40",
        sticky ? "sticky top-0" : "",
        isAccent
          ? "bg-[rgb(var(--color-accent))] text-[rgb(var(--color-on-accent))] border-b border-transparent"
          : translucent
            ? "bg-[rgb(var(--color-surface))/0.7] backdrop-blur border-b border-[var(--color-border)]"
            : "bg-[rgb(var(--color-surface))] border-b border-[var(--color-border)]",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* برند */}
        <Link
          href={locale === "fa" ? "/fa" : "/en"}
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--color-accent))] ring-offset-transparent"
        >
          
          <span
            className={
              isAccent
                ? "font-semibold text-[rgb(var(--color-on-accent))]"
                : "font-semibold text-[rgb(var(--color-accent))]"
            }
          >
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

  const base =
    "relative text-sm transition-colors duration-150 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-[rgb(var(--color-cta, var(--color-accent)))] ring-offset-transparent";

  // رنگ متن در حالت عادی/هاور بر اساس variant هدر
  const normal = isAccent
    ? "text-[rgb(var(--color-on-accent))]/80 hover:text-[rgb(var(--color-on-accent))]"
    : "text-[rgb(var(--color-text))]/80 hover:text-[rgb(var(--color-accent))]";

  const activeCls = isAccent
    ? "text-[rgb(var(--color-on-accent))]"
    : "text-[rgb(var(--color-accent))]";

  // خط زیرین ظریف برای hover/active (انیمیت‌شونده)
  const underline =
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 " +
    (isAccent
      ? "after:bg-[rgb(var(--color-on-accent))]/70"
      : "after:bg-[rgb(var(--color-accent))]/80") +
    " after:transition-all after:duration-200 hover:after:w-full " +
    (active ? "after:w-full" : "");

  return (
    <Link
      key={item.href + item.label}
      href={href}
      aria-current={active ? "page" : undefined}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={[base, active ? activeCls : normal, underline].join(" ")}
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
              className={[
                "hidden sm:inline-flex rounded-md px-3 py-1 text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--color-accent))]",
                isAccent
                  ? "border-[rgb(var(--color-on-accent))]/40 text-[rgb(var(--color-on-accent))] hover:bg-white/10"
                  : "border-[rgb(var(--color-accent))] text-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-surface-muted))]",
              ].join(" ")}
            >
              {secondary.label}
            </Link>
          )}
          {primary && (
            <Link
              href={primary.href}
              className="inline-flex rounded-full px-4 py-2 text-sm bg-[rgb(var(--color-cta, var(--color-accent)))] text-white hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--color-accent))]"
            >
              {primary.label}
            </Link>
          )}
          <MobileNav isAccent={isAccent} />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ isAccent }: { isAccent: boolean }) {
  const pathname = usePathname() || "/";
  const locale = inferLocaleFromPath(pathname);
  const items = site.header.nav[locale];

  return (
    <details className="md:hidden relative">
      <summary
        className={[
          "list-none cursor-pointer rounded-md px-3 py-1 text-sm border",
          isAccent
            ? "border-[rgb(var(--color-on-accent))]/40 text-[rgb(var(--color-on-accent))]"
            : "border-[rgb(var(--color-accent))] text-[rgb(var(--color-accent))]",
        ].join(" ")}
      >
        Menu
      </summary>

      {/* منو روی surface روشن تا خوانایی خوب بماند */}
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
