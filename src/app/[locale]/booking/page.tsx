// src/app/[locale]/booking/page.tsx
import { site } from "@/config/site";
import { settings, type Locale } from "@/config/settings";
import { getDictionary } from "@/i18n";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { layout } from "@/styles/formStyles";

type Params = { locale: Locale };

export async function generateMetadata({ params }: { params: Params }) {
  const dict = await getDictionary(params.locale);
  return {
    title: `${dict.booking.title} · ${site.name}`,
    description: dict.booking.intro,
    alternates: {
      languages: {
        en: `${settings.baseUrl}/en/booking`,
        fa: `${settings.baseUrl}/fa/booking`,
      },
    },
  };
}

export default async function BookingPage({ params }: { params: Params }) {
  const { locale } = params;
  const t = await getDictionary(locale);
  const isFA = locale === "fa";

  const cardCls =
    "p-5 rounded-2xl border border-[var(--color-border)] bg-[rgb(var(--color-surface))]";
  const titleCls = "font-semibold text-xl text-[rgb(var(--color-text))]";
  const descCls = "mt-2 text-[rgb(var(--color-text))]/75";

  return (
    <Section>
      <div className={layout.container}>
        <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-accent))]">
          {t.booking.title}
        </h1>
        <p className="mt-2 text-[rgb(var(--color-text))]/80">{t.booking.intro}</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Free Discovery */}
          <div className={cardCls} dir={isFA ? "rtl" : "ltr"}>
            <h2 className={titleCls}>{t.booking.free.title}</h2>
            <p className={descCls}>{t.booking.free.desc}</p>
            <div className="mt-4">
              <Button as="a" href={site.booking.cal.free}>
                {t.booking.free.ctaCal}
              </Button>
            </div>
          </div>

          {/* Coaching Session */}
          <div className={cardCls} dir={isFA ? "rtl" : "ltr"}>
            <h2 className={titleCls}>{t.booking.coaching.title}</h2>
            <p className={descCls}>{t.booking.coaching.desc}</p>
            <div className="mt-4 flex gap-3">
              <Button as="a" href={site.booking.cal.coaching}>
                {t.booking.coaching.ctaCal}
              </Button>
              <Button as="a" variant="outline" href={site.booking.stripe.coaching}>
                {t.booking.coaching.ctaStripe}
              </Button>
            </div>
          </div>

          {/* MBSR Registration (اختیاری) */}
          {site.booking?.stripe?.mbsr && (
            <div className={cardCls} dir={isFA ? "rtl" : "ltr"}>
              <h2 className={titleCls}>{t.booking.mbsr.title}</h2>
              <p className={descCls}>{t.booking.mbsr.desc}</p>
              <div className="mt-4">
                <Button as="a" href={site.booking.stripe.mbsr}>
                  {t.booking.mbsr.ctaStripe}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
