import type { Metadata } from "next";
import site, { type Locale } from "@/config/site";
import { getDictionary } from "@/i18n";
import { getProgramDetail } from "@/lib/programDetail";
import Blocks from "@/components/programs/Blocks";

type Params = Promise<{ locale: Locale; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getProgramDetail(locale, slug);
  return {
    title: data.title,
    description: data.subtitle ?? data.title,
    metadataBase: new URL(`https://${site.brand.domain}`),
    openGraph: { title: data.title, description: data.subtitle ?? "" }
  };
}

export default async function ProgramDetailPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const data = await getProgramDetail(locale, slug);

  return (
    <main className="bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))]">
      {/* هدر ساده؛ عنوان/زیرعنوان از JSON، برچسب‌های UI از دیکشنری */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{data.title}</h1>
          {data.subtitle && (
            <p className="mt-2 text-[rgb(var(--color-text-muted))]">{data.subtitle}</p>
          )}
        </div>
      </section>

      {/* بلوک‌ها */}
      {/* BlockRenderer خودش از tokens و دیکشنری استفاده می‌کند */}
      {/* eslint-disable-next-line @next/next/no-async-client-component */}
      {/* (Blocks async است چون getDictionary داخلش صدا می‌خورد) */}
      {/* ts-expect-error Async Server Component */}
      <Blocks blocks={data.blocks} locale={locale} />
    </main>
  );
}
