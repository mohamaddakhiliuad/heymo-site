"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/config/site";
import { inferLocaleFromPath, localizedHref } from "@/lib/locale";
import { FaInstagram, FaLinkedin, FaYoutube, FaPinterest } from "react-icons/fa";

const ICONS = {
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  YouTube: FaYoutube,
  Pinterest: FaPinterest,
};

export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = inferLocaleFromPath(pathname);
  const f = site.footer;

  const columns = f.columns[locale] || [];
  const legal   = f.legal?.[locale] || [];
  const copy    = f.copy[locale] || f.copy.en;

  const isAccent = (f.variant || "surface") === "accent";
  const wrap      = isAccent ? "bg-[rgb(var(--color-accent))] text-[rgb(var(--color-on-accent))]" : "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))]";
  const subtle    = isAccent ? "text-[rgb(var(--color-on-accent))]/80" : "text-[rgb(var(--color-text))]/80";
  const linkHover = isAccent ? "hover:text-[rgb(var(--color-on-accent))]" : "hover:text-[rgb(var(--color-accent))]";
  const borderCls = isAccent ? "border-[rgb(var(--color-on-accent))]/20" : "border-[var(--color-border)]";

  return (
    <footer className={`${wrap} px-6 md:px-20 py-12`}>
      <div className="mx-auto grid max-w-7xl items-start gap-10 text-sm md:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="mb-3 font-serif text-xl font-semibold">{site.brand.name}</h3>
          {site.brand.tagline ? <p className={subtle}>{site.brand.tagline}</p> : null}
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mb-3 font-semibold">{locale === "fa" ? "کاوش" : "Explore"}</h4>
          {columns.map((col) => (
            <ul key={col.title} className={`space-y-2 ${subtle}`}>
              {col.links.map((l) => (
                <li key={`${l.label}-${l.href}`}>
                  <Link
                    href={localizedHref(l.href, locale)}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className={`hover:underline ${linkHover}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Social */}
        <div>
          <h4 className="mb-3 font-semibold">{locale === "fa" ? "دنبال کنید" : "Follow"}</h4>
          <div className={`flex gap-4 ${subtle}`}>
            {f.socials?.map((s) => {
              const Icon = (ICONS as any)[s.label] || FaInstagram;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={linkHover}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={`mt-10 text-center text-xs ${subtle}`}>{copy}</div>
      <div className={`mt-6 border-t ${borderCls}`} />
    </footer>
  );
}
