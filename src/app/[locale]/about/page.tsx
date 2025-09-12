import { getAbout } from "@/lib/mdAbout";
import { settings, type Locale } from "@/config/settings";
import { site } from "@/config/site";
import Section from "@/components/ui/Section";
import { layout, prose } from "@/styles/formStyles";
import Button from "@/components/ui/Button";

type Params = { locale: Locale };

export async function generateMetadata({ params }: { params: Params }) {
  const about = await getAbout(params.locale);
  return {
    title: `${about.title} · ${site.name}`,
    description: about.description,
    alternates: {
      languages: {
        en: `${settings.baseUrl}/en/about`,
        fa: `${settings.baseUrl}/fa/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Params }) {
  const about = await getAbout(params.locale);
  const isFA = params.locale === "fa";

  return (
    <Section>
      <div className={layout.container} dir={isFA ? "rtl" : "ltr"}>
        {/* دو ستونه: متن + عکس */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* متن درباره من */}
          <div>
            <article
              className={prose.base}
              dangerouslySetInnerHTML={{ __html: about.contentHtml }}
            />
            <div className="mt-8 flex gap-3">
              <Button as="a" href={site.booking.cal.free}>
                {isFA
                  ? "رزرو جلسه اکتشافی رایگان"
                  : "Book a Free Discovery Call"}
              </Button>
              <Button
                as="a"
                variant="outline"
                href={`/${params.locale}/contact`}
              >
                {isFA ? "تماس" : "Contact"}
              </Button>
            </div>
          </div>

          {/* عکس پرتره */}
          {about.portrait && (
            <div className="flex justify-center md:justify-end">
              <img
                src={about.portrait}
                alt="Portrait"
                className="
                  max-h-[500px] w-auto
                  rounded-2xl
                  border-2 border-[rgb(var(--color-border))]
                  shadow-card-glow
                  object-cover
                "
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
