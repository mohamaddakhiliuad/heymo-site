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
        {/* تست گرادیان */}
      <div className="bg-hero-gradient text-white text-center py-10 mb-8">
        <h1 className="text-4xl font-serif title-softshadow">
          Gradient Test Block
        </h1>
        <p className="mt-2 text-white/80">If you see purple → plum → amber, theme is loaded ✅</p>
      </div>

      {/* تست دکمه‌ها */}
      <div className="flex gap-4 justify-center mb-10">
        <button className="px-6 py-3 rounded-xl bg-[rgb(var(--color-accent))] text-white shadow-btn-glow">
          Primary Test
        </button>
        <button className="px-6 py-3 rounded-xl bg-[rgb(var(--color-accent))] text-white relative overflow-hidden shadow-btn-glow
          after:absolute after:inset-0 after:bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.6)_20%,rgba(255,255,255,0)_40%)] 
          after:bg-[length:250%_100%] hover:after:animate-shine">
          Shine Test
        </button>
      </div>

        {/* تست کارت */}
      <div className="max-w-md mx-auto p-6 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-card-glow mb-12">
        <h2 className="text-xl font-semibold mb-2">Card Glow Test</h2>
        <p className="text-[rgb(var(--color-text-muted))]">
          If this card has a subtle amber glow shadow → glow is working ✅
        </p>
      </div>
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
