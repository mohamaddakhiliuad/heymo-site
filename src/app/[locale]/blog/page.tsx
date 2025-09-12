// src/app/[locale]/blog/page.tsx
import type { Locale } from "@/config/site";
import site from "@/config/site";
import { getDictionary } from "@/i18n";
import { layout, cn } from "@/styles/formStyles";
import BlogCard from "@/components/blog/BlogCard";
// mdLoader شما: تلاش می‌کنیم locale را پاس بدهیم؛ اگر امضا متفاوت بود، fallback می‌کنیم.
import * as MD from "@/lib/mdLoader";
import type { Metadata } from "next";

type Params = Promise<{ locale: Locale }>;

async function fetchPosts(locale: Locale) {
  // اگر getAllPosts(locale) وجود داشته باشد استفاده می‌کنیم؛ وگرنه getAllPosts()
  const fn = (MD as any).getAllPosts;
  try {
    const res = await fn(locale);
    if (Array.isArray(res)) return res;
  } catch (_e) {}
  return await fn(); // fallback
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const title = dict.blog.metaTitle ?? "Blog";
  const description = dict.blog.metaDescription ?? "Latest posts";

  return {
    title,
    description,
    metadataBase: new URL(`https://${site.brand.domain}`),
    alternates: {
      canonical: `https://${site.brand.domain}/${locale}/blog`,
    },
    openGraph: {
      title,
      description,
      images: site.seo?.ogImage ? [{ url: site.seo.ogImage }] : [],
    },
  };
}

export default async function BlogPage({ params }: { params: Params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const posts = await fetchPosts(locale);

  return (
    <main className="bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))]">
      <header className={cn(layout.container, layout.section, "text-center mb-6")}>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          {dict.blog.title}
        </h1>
       
  
        {dict.blog.subtitle && (
          <p className="mt-3 text-lg text-[rgb(var(--color-text-muted))]">
            {dict.blog.subtitle}
          </p>
          
        )}
      </header>

      <section className={cn(layout.container, "pb-16")}>
        {(!posts || posts.length === 0) ? (
          <p className="text-center text-[rgb(var(--color-text-muted))]">
            {dict.blog.empty}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {posts.map((post: any) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                coverImage={post.coverImage}
                locale={locale}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
