import Link from "next/link";
import Image from "next/image";
import { layout, card, button, cn } from "@/styles/formStyles";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HeroPremium from "@/components/Hero/HeroPremium";
import { getDictionary } from "@/i18n";

type Params = { params: { locale: "en" | "fa" } };


export const metadata: Metadata = {
  title: "heymo — Shopify, Headless Web & NFC Profiles",
  description: "Clean tech + clear strategy. Shopify storefronts, NFC smart profiles, content & SEO.",
};

async function getProjects(locale: "en" | "fa") {
  const data = await import(`@/content/${locale}/projects.json`);
  return data.default.slice(0, 3);
}

export default async function HomePage({ params }: Params) {
  const { locale } = params;
  const rtl = locale === "fa";
  const projects = await getProjects(locale);
  const dict = await getDictionary(params.locale);
  return (
    <main dir={rtl ? "rtl" : "ltr"}>
      {/* Hero */}
       <HeroPremium locale={params.locale}  t={dict.hero}  media="/media/hero-mock.png" /* videoId="YOUTUBE_ID" */ />
    <Hero locale={params.locale} ></Hero>


      {/* Value props */} 
      <section className={cn(layout.container, "py-12 md:py-16")}>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Websites that convert", s: "Clean UX, fast load, SEO-ready" },
            { t: "Shopify that sells", s: "Theme or Headless, speed + CRO" },
            { t: "NFC Smart Profiles", s: "Tap → profile, Add-to-Contacts, QR" },
          ].map((v, i) => (
            <div key={i} className={cn(card.base, card.padded, card.hover)}>
              <h3 className="text-lg font-semibold">{rtl ? "مزیت" : v.t}</h3>
              <p className="text-text-muted mt-1">{rtl ? "سریع، تمیز، آماده رشد" : v.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className={cn(layout.container, "pb-16")}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">{rtl ? "پروژه‌های منتخب" : "Selected Projects"}</h2>
          <Link href={`/${locale}/projects`} className="underline underline-offset-4">{rtl ? "همه پروژه‌ها" : "See all"}</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link key={p.slug} href={p.url || `/${locale}/projects`} className="block group">
              <article className={cn(card.base, "p-0 overflow-hidden")}>
                <div className="relative aspect-[4/3]">
                  <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-text-muted mt-1">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.highlights.slice(0, 3).map((h: string) => (
                      <span key={h} className="px-2 py-1 rounded-full text-xs bg-surface-muted">{h}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
