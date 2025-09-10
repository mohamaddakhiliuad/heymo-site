// src/app/[locale]/blog/[slug]/page.tsx
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { absUrl } from "@/lib/url";
import site, { SITE_LOCALES, type Locale } from "@/config/site";
import { getAllPosts, getPostBySlug } from "@/lib/mdLoader";

function formatDate(date: string | Date, locale: Locale) {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-CA", { dateStyle: "medium" }).format(d);
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);

  // ✅ مهم: حتماً locale را پاس بده
  const post = await getPostBySlug(locale, slug);

  const pagePath = `/${locale}/blog/${slug}`;
  const pageUrl  = absUrl(pagePath);
  const hasLocalCover = typeof post.coverImage === "string" && post.coverImage.startsWith("/");
  const coverUrl = hasLocalCover ? absUrl(post.coverImage) : undefined;

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <h1 className="text-4xl md:text-5xl font-serif text-center text-[rgb(var(--color-accent))] font-bold leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-center text-[rgb(var(--color-text))]/60 mb-10">
          {dict?.blog?.publishedOn ? `${dict.blog.publishedOn} ${formatDate(post.date, locale)}` : formatDate(post.date, locale)}
        </p>

        {/* 🛡️ گارد برای تصویر: اگر path معتبر نبود، با یک باکس خنثی جایگزین کن */}
        {hasLocalCover ? (
          <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </div>
        ) : (
          <div className="w-full h-64 md:h-80 mb-12 rounded-xl bg-[rgb(var(--color-surface-muted))] border border-[var(--color-border)]" />
        )}

        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>

        {/* JSON-LD */}
        <Script id="ld-json" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            image: coverUrl ? [coverUrl] : [],
            author: { "@type": "Person", name: "Fatemeh Mindfulness" },
            publisher: {
              "@type": "Organization",
              name: "Fatemeh Mindfulness",
              logo: { "@type": "ImageObject", url: absUrl("/logo.png") },
            },
            datePublished: post.date,
            mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
          })}
        </Script>
      </div>
    </div>
  );
}

// ✅ برای SSG: پست‌ها را per-locale جمع کن
export async function generateStaticParams() {
  const locales: Locale[] = SITE_LOCALES;
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    for (const p of posts) params.push({ locale, slug: p.slug });
  }

  return params;
}

// ✅ Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);

  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    metadataBase: new URL(`https://${site.brand.domain}`),
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "",
      url: `/${locale}/blog/${slug}`,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? "",
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}
