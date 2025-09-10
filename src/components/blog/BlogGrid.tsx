// src/components/blog/BlogGrid.tsx
"use client";

import BlogCard from "./BlogCard";
import { useI18n } from "@/i18n/I18nProvider";
import { cx } from "@/styles/theme";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
};

type BlogGridProps = {
  posts: BlogPost[];
  className?: string;
};

export default function BlogGrid({ posts, className }: BlogGridProps) {
  const { locale, dict } = useI18n();

  if (!posts || posts.length === 0) {
    return (
      <p
        className={cx(
          "text-center text-lg",
          "text-[rgb(var(--color-accent))]"
        )}
      >
        {dict?.blog?.empty ??
          (locale === "fa"
            ? "در حال حاضر هیچ پستی موجود نیست."
            : "No blog posts available at this time.")}
      </p>
    );
  }

  return (
    <section className={cx("grid grid-cols-1 md:grid-cols-2 gap-8", className)}>
      {posts.map((post) => {
        if (!post.slug || !post.title || !post.date) {
          console.warn("⚠️ Skipping invalid post in BlogGrid:", post);
          return null;
        }

        return (
          <BlogCard
            key={post.slug}
            locale={locale}
            slug={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            coverImage={post.coverImage}
          />
        );
      })}
    </section>
  );
}
