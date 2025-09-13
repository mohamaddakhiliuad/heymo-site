// src/app/[locale]/page.tsx
import Link from "next/link";
import Section from "@/components/ui/Section";
import { layout, button } from "@/styles/formStyles";
import { site, type Locale } from "@/config/site";
import ProgramCard from "@/components/programs/ProgramCard";

// داده‌ها
import { getPrograms, type ProgramItem } from "@/lib/programs";

// ─────────────────────────────────────────
// SEO (اختیاری)
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const title = locale === "fa" ? "خانه" : "Home";
  return { title: `${title} · ${site.name}` };
}
// ─────────────────────────────────────────

export default async function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const isFA = locale === "fa";

  // Featured Programs از سکشن upcoming (سه مورد)
  let featuredPrograms: ProgramItem[] = [];
  try {
    const data = await getPrograms(locale); // { sections: [...] }
    const upcoming =
      data.sections?.find(
        (s) => s.id === "upcoming" || s.title?.toLowerCase().includes("upcoming")
      ) ?? data.sections?.[0];
    featuredPrograms = (upcoming?.items ?? []).slice(0, 3);
  } catch {
    featuredPrograms = [];
  }

  // Featured Blog (اختیاری — اگر lib/content هست)
  let featuredPosts: any[] = [];
  try {
    const mod = await import("@/lib/content"); // باید getAllPosts یا getPosts صادر کند
    const getAllPosts = (mod as any).getAllPosts || (mod as any).getPosts;
    if (getAllPosts) {
      featuredPosts = (getAllPosts(locale) || []).slice(0, 3);
    }
  } catch {
    featuredPosts = [];
  }

  return (
    <main dir={isFA ? "rtl" : "ltr"}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className={`${layout.container} py-16 md:py-24`}>
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-wide text-white/80">
              {isFA ? "مایندفولنس · کوچینگ" : "Mindfulness · Coaching"}
            </p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl text-white title-softshadow">
              {isFA ? "نفس بکش. مکث کن. تازه شو." : "Pause. Breathe. Renew."}
            </h1>
            <p className="mt-4 text-white/90 leading-relaxed">
              {isFA
                ? "برنامه‌ها و کوچینگی که کمک می‌کند آگاه‌تر زندگی کنی، استرس را کاهش دهی و تغییرات معنادار بسازی."
                : "Programs and coaching to help you live mindfully, reduce stress, and create meaningful change."}
            </p>

            <div className="mt-6 flex gap-3">
              <Link href={`/${locale}/programs`} className={button.primary}>
                {isFA ? "دیدن دوره‌ها" : "Explore Programs"}
              </Link>
              <Link
                href={site.booking.cal.free}
                className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-[rgb(var(--color-border))] text-white hover:bg-white/10"
              >
                {isFA ? "رزرو جلسه رایگان" : "Book a Free Call"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <Section>
        <div className={layout.container}>
          <header className="mb-6 md:mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-[rgb(var(--color-accent))]">
              {isFA ? "دوره‌های منتخب" : "Featured Programs"}
            </h2>
            <p className="text-[rgb(var(--color-text))]/75 mt-1">
              {isFA ? "مسیر مناسب خودت را انتخاب کن." : "Choose the path that fits you."}
            </p>
          </header>

          {featuredPrograms.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {featuredPrograms.map((p) => (
                <ProgramCard key={p.id || p.slug} item={p} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[rgb(var(--color-border))] p-6 text-[rgb(var(--color-text))]/75">
              {isFA ? "به‌زودی دوره‌ها افزوده می‌شود." : "Programs coming soon."}
            </div>
          )}

          <div className="mt-6">
            <Link href={`/${locale}/programs`} className="underline underline-offset-4">
              {isFA ? "همه‌ی دوره‌ها" : "See all programs"}
            </Link>
          </div>
        </div>
      </Section>

      {/* ABOUT TEASER */}
      <Section>
        <div
          className={`${layout.container} grid grid-cols-1 md:grid-cols-2 gap-10 items-center`}
        >
          <div>
            <h3 className="font-serif text-2xl text-[rgb(var(--color-accent))]">
              {isFA ? "سلام، من فاطمه‌ام" : "Hi, I’m Fatemeh"}
            </h3>
            <p className="mt-3 text-[rgb(var(--color-text))]/80">
              {isFA
                ? "مربی زندگی مایندفول با بیش از ۵ سال تجربه در همراهی افراد برای پرورش خودآگاهی و کاهش استرس."
                : "A mindfulness life coach with 5+ years helping people cultivate awareness and reduce stress."}
            </p>
            <div className="mt-4">
              <Link href={`/${locale}/about`} className="underline underline-offset-4">
                {isFA ? "بیشتر درباره من" : "Learn more about me"}
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about/fatemeh-portrait.jpg"
              alt="Fatemeh portrait"
              className="max-h-[420px] w-auto rounded-2xl border-2 border-[rgb(var(--color-border))] shadow-card-glow object-cover"
            />
          </div>
        </div>
      </Section>

      {/* FEATURED BLOG (اختیاری) */}
      <Section>
        <div className={layout.container}>
          <header className="mb-6 md:mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-[rgb(var(--color-accent))]">
              {isFA ? "از بلاگ" : "From the Blog"}
            </h2>
          </header>

          {featuredPosts.length ? (
            // اگر BlogCard داری همسو با بلاگ استفاده کن
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {featuredPosts.map((post) => {
                // اگر BlogCard نداری، لینک ساده نشون بده
                return (
                  <article
                    key={post.slug}
                    className="rounded-2xl border border-[rgb(var(--color-border))] p-5 shadow-card-glow"
                  >
                    <h3 className="font-serif text-xl text-[rgb(var(--color-accent))]">
                      <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 text-[rgb(var(--color-text))]/80 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-3">
                      <Link
                        className="underline underline-offset-4"
                        href={`/${locale}/blog/${post.slug}`}
                      >
                        {isFA ? "ادامه مطلب" : "Read more"}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-[rgb(var(--color-border))] p-6 text-[rgb(var(--color-text))]/75">
              {isFA ? "به‌زودی نوشته‌ها منتشر می‌شود." : "Posts coming soon."}
            </div>
          )}

          <div className="mt-6">
            <Link href={`/${locale}/blog`} className="underline underline-offset-4">
              {isFA ? "همه‌ی نوشته‌ها" : "See all posts"}
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA پایانی */}
      <section className="relative overflow-hidden bg-hero-gradient footer-glow">
        <div className={`${layout.container} py-12`}>
          <div className="max-w-2xl">
            <h3 className="font-serif text-2xl text-white title-softshadow">
              {isFA ? "آماده‌ای شروع کنی؟" : "Ready to begin?"}
            </h3>
            <p className="mt-2 text-white/85">
              {isFA
                ? "یک گفت‌وگوی کوتاه رایگان رزرو کن تا ببینیم چه مسیری مناسب توست."
                : "Book a free discovery call and find your best next step."}
            </p>
            <div className="mt-4">
              <Link href={site.booking.cal.free} className={button.shine}>
                {isFA ? "رزرو جلسه رایگان" : "Book a Free Call"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
