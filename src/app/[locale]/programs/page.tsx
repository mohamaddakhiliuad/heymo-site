// src/app/[locale]/programs/page.tsx
import type { Locale } from "@/config/site";
import site from "@/config/site";
import { getDictionary } from "@/i18n";
import { getPrograms } from "@/lib/programs";
import ProgramCard from "@/components/programs/ProgramCard";
import { layout, cn } from "@/styles/formStyles";
import type { Metadata } from "next";

type Params = Promise<{ locale: Locale }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const title = dict.programs?.metaTitle ?? "Programs";
  const description = dict.programs?.metaDescription ?? "Explore available programs";
  return {
    title,
    description,
    metadataBase: new URL(`https://${site.brand.domain}`),
    alternates: { canonical: `https://${site.brand.domain}/${locale}/programs` },
    openGraph: { title, description, images: site.seo?.ogImage ? [{ url: site.seo.ogImage }] : [] },
  };
}

export default async function ProgramsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const data = await getPrograms(locale);

  // همهٔ آیتم‌ها در یک آرایه
  const items = data.sections.flatMap((s) => s.items);

  return (
    <main className="bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))]">
      <header className={cn(layout.container, layout.section, "text-center mb-6")}>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          {dict.programs?.title ?? (locale === "fa" ? "برنامه‌ها" : "Programs")}
        </h1>
        {dict.programs?.subtitle && (
          <p className="mt-3 text-lg text-[rgb(var(--color-text-muted))]">
            {dict.programs.subtitle}
          </p>
        )}
      </header>

      {/* گرید واحد و واکنش‌گرا */}
      <section className={cn(layout.container, "pb-16")}>
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
          {items.map((item) => (
            <ProgramCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      </section>
    </main>
  );
}
