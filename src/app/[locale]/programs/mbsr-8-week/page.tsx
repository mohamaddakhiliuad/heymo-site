// src/app/[locale]/programs/mbsr-8-week/page.tsx
import type { Locale } from "@/config/site";
import site from "@/config/site";
import Section from "@/components/ui/Section";
import FAQ from "@/components/ui/FAQ";
import Button from "@/components/ui/Button";
import { getContent } from "@/lib/content";
import { getDictionary } from "@/i18n";

type Params = Promise<{ locale: Locale }>; // Next.js 15

export default async function Page({ params }: { params: Params }) {
  const { locale } = await params;

  // UI labels from dictionaries (i18n/dictionaries/*.ts)
  const dict = await getDictionary(locale);
  // heavy page content (curriculum, faq answers...) from JSON
  const data = await getContent(locale, "mbsr");

  const booking =
    site.booking?.mbsr?.[locale] ?? site.booking?.discovery?.[locale] ?? `/${locale}/booking`;

  return (
    <main className="bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))]">
      <Section title={data.title} subtitle={data.subtitle}>
        <p className="text-lg leading-relaxed">{data.blurb}</p>

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <Button as="a" href={booking} variant="primary">
            {dict.mbsr.ctaJoin ?? "Join"}
          </Button>
          <Button
            as="a"
            href={site.booking?.discovery?.[locale] ?? `/${locale}/booking`}
            variant="outline"
          >
            {dict.mbsr.ctaDiscovery ?? "Book a Call"}
          </Button>
        </div>
      </Section>

      <Section title={dict.mbsr.outcomesTitle} muted>
        <ul className="list-disc ms-5 space-y-2 text-[rgb(var(--color-text))]">
          {data.outcomes?.map((o: string, i: number) => <li key={i}>{o}</li>)}
        </ul>
      </Section>

      <Section title={dict.mbsr.weeklyTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {data.curriculum?.map((w: any) => (
            <div key={w.week} className="rounded-xl border border-[var(--color-border)] p-4">
              <div className="font-semibold">{w.week}. {w.title}</div>
              <ul className="mt-2 list-disc ms-5 text-[rgb(var(--color-text))]">
                {w.topics?.map((t: string, i: number) => <li key={i}>{t}</li>)}
              </ul>
              {w.homework && (
                <div className="mt-2 text-sm text-[rgb(var(--color-text-muted))]">{w.homework}</div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {data.retreat && (
        <Section title={data.retreat.title} muted>
          <p className="leading-relaxed text-[rgb(var(--color-text))]">{data.retreat.description}</p>
        </Section>
      )}

      <Section title={dict.mbsr.faqTitle}>
        <FAQ items={data.faq ?? []} />
      </Section>
      {data.logistics?.pricing && (
  <Section title={dict.mbsr.pricingTitle} muted>
    <div className="space-y-2 text-[rgb(var(--color-text))]">
      <div>
        <strong>{dict.mbsr.tuitionLabel}:</strong>{" "}
        {data.logistics.pricing.tuition} {data.logistics.pricing.currency}
      </div>
      {data.logistics.pricing.notes && (
        <div className="text-[rgb(var(--color-text-muted))]">
          <strong>{dict.mbsr.notesLabel}:</strong>{" "}
          {data.logistics.pricing.notes}
        </div>
      )}
    </div>
  </Section>
)}

      <Section title={data.title} >
        

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <Button as="a" href={booking} variant="primary">
            {dict.mbsr.ctaJoin ?? "Join"}
          </Button>
          <Button
            as="a"
            href={site.booking?.discovery?.[locale] ?? `/${locale}/booking`}
            variant="outline"
          >
            {dict.mbsr.ctaDiscovery ?? "Book a Call"}
          </Button>
        </div>
      </Section>

    </main>
  );
}
