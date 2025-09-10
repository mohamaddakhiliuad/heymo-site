// src/components/blog/BlogCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { cx } from "@/styles/theme";
import { useI18n } from "@/i18n/I18nProvider";

type BlogCardProps = {
  slug: string;
  title: string;
  date: string | Date;
  excerpt?: string;
  coverImage?: string;
  className?: string;
};

function formatDate(date: string | Date, locale: "fa" | "en") {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-CA", {
    dateStyle: "medium",
  }).format(d);
}

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
  coverImage,
  className,
}: BlogCardProps) {
  const { locale, dict } = useI18n();
  const dir = locale === "fa" ? "rtl" : "ltr";

  // متن‌ها از دیکشنری با fallback
  const readMore = dict?.blog?.readMore ?? (locale === "fa" ? "ادامه مطلب" : "Read more");

  // مسیر چندزبانه
  const href = `/${locale}/blog/${slug}`;

  return (
    <article
      dir={dir}
      className={cx(
        "group overflow-hidden rounded-xl border border-[var(--color-border)]",
        "bg-[rgb(var(--color-surface))] shadow-md transition hover:shadow-lg",
        className
      )}
    >
      <Link
        href={href}
        aria-label={title}
        className={cx(
          "block focus:outline-none focus-visible:ring-2",
          "focus-visible:ring-[rgb(var(--color-accent))] rounded-xl"
        )}
        prefetch
      >
        {coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
          </div>
        )}

        <div className="p-5">
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-[rgb(var(--color-accent))]">
            {title}
          </h2>

          <p className="mt-1 text-xs text-[rgb(var(--color-text))]/60">
            {formatDate(date, locale)}
          </p>

          {excerpt && (
            <p className="mt-3 text-sm text-[rgb(var(--color-text))] line-clamp-3">
              {excerpt}
            </p>
          )}

          <span className="mt-4 inline-block text-sm text-[rgb(var(--color-accent))] underline">
            {locale === "fa" ? `← ${readMore}` : `${readMore} →`}
          </span>
        </div>
      </Link>
    </article>
  );
}
