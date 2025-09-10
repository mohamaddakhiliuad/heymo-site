// src/components/programs/ProgramCard.tsx
import * as React from "react";
import Image from "next/image";
import { card, button, cn } from "@/styles/formStyles";
import type { ProgramItem } from "@/lib/programs";
import type { Locale } from "@/config/site";

function formatDate(date?: string, locale?: Locale) {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-CA", { dateStyle: "medium" }).format(d);
}

export default function ProgramCard({
  item,
  locale,
  ctaFallback = locale === "fa" ? "مشاهده" : "Learn more",
}: {
  item: ProgramItem;
  locale: Locale;
  ctaFallback?: string;
}) {
  const href = item.href || `/${locale}/programs/${item.slug}`;
  const dateLabel = formatDate(item.startDate, locale);
  const tuition = item.price?.tuition;
  const currency = item.price?.currency ?? "";

  return (
    <article className={cn(card.base, card.hover, "overflow-hidden h-full flex flex-col")}>
      {/* تصویر */}
      <a href={href} className="block">
        {item.image ? (
          <div className="relative aspect-[16/9]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-[rgb(var(--color-surface-muted))]" />
        )}
      </a>

      {/* بدنه */}
      <div className={cn(card.padded, "flex flex-col grow")}>
        <header className={card.header}>
          <a href={href} className="no-underline hover:opacity-90">
            <h3 className={card.title}>{item.title}</h3>
          </a>
          {item.subtitle && <p className={card.subtitle}>{item.subtitle}</p>}
        </header>

        <ul className="text-sm text-[rgb(var(--color-text))] space-y-1">
          {dateLabel && <li><strong>{locale === "fa" ? "شروع:" : "Start:"}</strong> {dateLabel}</li>}
          {item.duration && <li><strong>{locale === "fa" ? "مدت:" : "Duration:"}</strong> {item.duration}</li>}
          {item.location && <li><strong>{locale === "fa" ? "محل:" : "Location:"}</strong> {item.location}</li>}
          {typeof tuition === "number" && (
            <li>
              <strong>{locale === "fa" ? "شهریه:" : "Tuition:"}</strong> {tuition} {currency}
            </li>
          )}
        </ul>

        <footer className={cn(card.footer, "mt-auto")}>
          <a href={href} className={button.primary}>
            {item.ctaLabel || ctaFallback}
          </a>
        </footer>
      </div>
    </article>
  );
}
