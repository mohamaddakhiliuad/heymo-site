// src/app/[locale]/contact/page.tsx
import { settings, type Locale } from "@/config/settings";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/contact/ContactForm";
import { layout } from "@/styles/formStyles";

type Params = { locale: Locale };

export async function generateMetadata({ params }: { params: Params }) {
  const dict = await getDictionary(params.locale);
  const base = settings.baseUrl;
  return {
    title: `${dict.contact.title} · ${site.name}`,
    description: dict.contact.intro,
    alternates: {
      languages: {
        en: `${base}/en/contact`,
        fa: `${base}/fa/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const isFA = locale === "fa";

  return (
    <Section>
      <div className={layout.container} dir={isFA ? "rtl" : "ltr"}>
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-accent))]">
            {dict.contact.title}
          </h1>
          <p className="mt-2 text-[rgb(var(--color-text))]/80">{dict.contact.intro}</p>
        </header>

        <ContactForm
          dict={dict.contact as any}
          locale={locale}
          whatsappUrl={site.social.whatsapp}
          bookingUrl={`/${locale}/booking`}
          emailHref={`mailto:${site.contact.emailTo}`}
        />
      </div>
    </Section>
  );
}
