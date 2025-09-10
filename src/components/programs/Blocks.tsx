import * as React from "react";
import Image from "next/image";
import { cn, button, card } from "@/styles/formStyles";
import Section from "@/components/ui/Section";
import FAQ from "@/components/ui/FAQ";
import type { Block } from "@/lib/programDetail";
import type { Locale } from "@/config/site";
import site from "@/config/site";
import { getDictionary } from "@/i18n";

function formatDate(value: string, locale: Locale) {
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-CA", { dateStyle: "medium" }).format(d);
}

export default async function Blocks({
  blocks,
  locale
}: { blocks: Block[]; locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <>
      {blocks.map((b, idx) => {
        switch (b.type) {
          case "hero":
            return (
              <Section key={idx}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                  <div className="space-y-4">
                    {b.blurb && <p className="text-lg leading-relaxed">{b.blurb}</p>}
                    <div className="flex gap-3">
                      {b.primaryCtaHref && (
                        <a className={button.primary} href={b.primaryCtaHref}>
                          {b.primaryCtaLabel ?? (locale === "fa" ? "ثبت‌نام" : "Join")}
                        </a>
                      )}
                      {b.secondaryCtaHref && (
                        <a className={button.outline} href={b.secondaryCtaHref}>
                          {b.secondaryCtaLabel ?? (locale === "fa" ? "مشاهده همه" : "All programs")}
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    {b.image ? (
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[var(--color-border)]">
                        <Image src={b.image} alt="" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] rounded-xl bg-[rgb(var(--color-surface-muted))]" />
                    )}
                  </div>
                </div>
              </Section>
            );

          case "bullets":
            return (
              <Section key={idx} title={b.title} muted>
                <ul className="list-disc ms-5 space-y-2">
                  {b.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              </Section>
            );

          case "schedule":
            return (
              <Section key={idx} title={b.title ?? (locale === "fa" ? "زمان‌بندی" : "Schedule")}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {b.rows.map((r, i) => (
                    <div key={i} className={cn(card.base, card.padded)}>
                      <div className="text-sm text-[rgb(var(--color-text-muted))]">{r.label}</div>
                      <div className="font-medium">
                        {/\d{4}-\d{2}-\d{2}/.test(r.value) ? formatDate(r.value, locale) : r.value}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            );

          case "curriculum":
            return (
              <Section key={idx} title={b.title ?? (dict.mbsr?.weeklyTitle || (locale === "fa" ? "برنامهٔ هفتگی" : "Weekly Curriculum"))}>
                <div className="grid gap-4 md:grid-cols-2">
                  {b.weeks.map((w) => (
                    <div key={w.week} className={cn(card.base, card.padded)}>
                      <div className="font-semibold">{w.week}. {w.title}</div>
                      {w.topics && (
                        <ul className="mt-2 list-disc ms-5">
                          {w.topics.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      )}
                      {w.homework && (
                        <div className="mt-2 text-sm text-[rgb(var(--color-text-muted))]">{w.homework}</div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            );

          case "pricing":
            return (
              <Section key={idx} title={dict.mbsr?.pricingTitle ?? (locale === "fa" ? "شهریه" : "Pricing")} muted>
                <div className="space-y-1">
                  <div><strong>{dict.mbsr?.tuitionLabel ?? (locale === "fa" ? "شهریه:" : "Tuition:")}</strong> {b.tuition} {b.currency}</div>
                  {b.notes && <div className="text-[rgb(var(--color-text-muted))]">{b.notes}</div>}
                </div>
              </Section>
            );

          case "faq":
            return (
              <Section key={idx} title={b.title ?? (dict.mbsr?.faqTitle || (locale === "fa" ? "پرسش‌های رایج" : "FAQ"))}>
                <FAQ items={b.items} />
              </Section>
            );

          case "rich":
            return (
              <Section key={idx} title={b.title}>
                <article className="prose prose-lg max-w-none">
                  {b.html ? <div dangerouslySetInnerHTML={{ __html: b.html }} /> : null}
                </article>
              </Section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
