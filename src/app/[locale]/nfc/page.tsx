import { layout, card, button, cn } from "@/styles/formStyles";
import Link from "next/link";

type Params = { params: { locale: "en" | "fa" } };

export default function NFCPage({ params }: Params) {
  const { locale } = params;
  const rtl = locale === "fa";

  const t = {
    en: {
      hero: {
        title: "NFC Smart Business Cards",
        subtitle:
          "Upgrade from paper to digital. One tap connects your clients to everything about you — forever.",
        cta: "Get Your Card",
      },
      sections: {
        why: {
          title: "Why NFC is Better Than Paper Cards",
          items: [
            {
              h: "Never lost or forgotten",
              d: "Paper cards end up in drawers or trash. An NFC profile lives online forever.",
            },
            {
              h: "One-tap connection",
              d: "Your client adds you to contacts instantly, no typing or scanning hassles.",
            },
            {
              h: "Always updated",
              d: "Change your info anytime — no reprinting, no waste.",
            },
            {
              h: "Eco-friendly",
              d: "One card replaces hundreds of paper cards, saving money and the planet.",
            },
          ],
        },
        seo: {
          title: "More Than a Card — A Digital Growth Tool",
          items: [
            {
              h: "Boosts credibility",
              d: "A branded profile link (heymo.ca/u/yourname) shows you’re professional and modern.",
            },
            {
              h: "Local SEO ready",
              d: "Your phone, address, WhatsApp, and map links are indexable and boost local search.",
            },
            {
              h: "Customer lifetime value",
              d: "Clients never lose your contact; they stay connected long-term with one tap.",
            },
            {
              h: "Shareable & scalable",
              d: "One digital profile can be shared infinitely — unlike a single paper card.",
            },
          ],
        },
        packages: {
          title: "Packages",
          items: [
            {
              h: "Basic",
              d: "1 NFC card + EN profile + QR code",
            },
            {
              h: "Pro",
              d: "1 NFC card + EN/FA profile + custom CTA + 3 free updates",
            },
            {
              h: "Team",
              d: "3+ cards + team index page + branded short links + basic analytics",
            },
          ],
        },
        faq: {
          title: "Frequently Asked Questions",
          qas: [
            ["Do I need an app to use the card?", "No. Just tap with any modern smartphone."],
            ["Can I update info after printing?", "Yes, your profile is always editable online."],
            ["Is it only one language?", "No, profiles support EN + FA."],
            ["Do you offer team bundles?", "Yes, the Team package includes a company page."],
            ["Can I use my QR on posters?", "Yes, every profile includes a downloadable QR code."],
          ],
        },
      },
    },
    fa: {
      hero: {
        title: "کارت‌های هوشمند NFC",
        subtitle:
          "از کارت کاغذی به کارت دیجیتال ارتقا دهید. فقط با یک لمس مشتری برای همیشه به شما وصل می‌شود.",
        cta: "سفارش کارت",
      },
      sections: {
        why: {
          title: "چرا NFC بهتر از کارت کاغذی است؟",
          items: [
            { h: "هیچ‌وقت گم نمی‌شود", d: "کارت‌های کاغذی دور انداخته می‌شوند؛ پروفایل NFC همیشه آنلاین است." },
            { h: "اتصال با یک لمس", d: "مشتری شما را فوری به مخاطبین اضافه می‌کند، بدون تایپ و دردسر." },
            { h: "همیشه قابل بروزرسانی", d: "هر زمان خواستید تغییر دهید، بدون چاپ مجدد." },
            { h: "دوستدار محیط زیست", d: "یک کارت NFC جای صدها کارت کاغذی را می‌گیرد." },
          ],
        },
        seo: {
          title: "بیشتر از یک کارت — ابزاری برای رشد دیجیتال",
          items: [
            { h: "اعتبارسازی برند", d: "داشتن لینک اختصاصی (heymo.ca/u/نام‌تان) تصویری مدرن و حرفه‌ای می‌سازد." },
            { h: "سئوی محلی", d: "اطلاعات تماس شما ایندکس می‌شود و به بهبود سرچ محلی کمک می‌کند." },
            { h: "ارزش طول عمر مشتری", d: "مشتری‌ها هیچ‌وقت شما را گم نمی‌کنند؛ همیشه وصل می‌مانند." },
            { h: "قابل اشتراک‌گذاری", d: "یک لینک دیجیتال بی‌نهایت بار قابل اشتراک است." },
          ],
        },
        packages: {
          title: "پکیج‌ها",
          items: [
            { h: "پایه", d: "۱ کارت NFC + پروفایل انگلیسی + QR" },
            { h: "حرفه‌ای", d: "۱ کارت NFC + پروفایل فارسی/انگلیسی + CTA اختصاصی + ۳ بار بروزرسانی رایگان" },
            { h: "تیمی", d: "۳ کارت به بالا + صفحه تیمی + لینک کوتاه + آمار بازدید" },
          ],
        },
        faq: {
          title: "سؤالات متداول",
          qas: [
            ["آیا باید اپ نصب کنم؟", "خیر، هر گوشی مدرن پشتیبانی می‌کند."],
            ["امکان تغییر اطلاعات بعد از چاپ هست؟", "بله، پروفایل آنلاین همیشه قابل ویرایش است."],
            ["فقط یک زبان دارد؟", "خیر، پروفایل دو زبانه (فارسی/انگلیسی) است."],
            ["سفارش تیمی دارید؟", "بله، در پکیج تیمی صفحه شرکت هم ساخته می‌شود."],
            ["QR را کجا می‌توانم استفاده کنم؟", "می‌توانید روی پوستر یا بروشور چاپ کنید."],
          ],
        },
      },
    },
  }[locale];

  return (
    <main dir={rtl ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className={cn(layout.container, "py-20 text-center")}>
        <h1 className="text-3xl md:text-5xl font-bold">{t.hero.title}</h1>
        <p className="mt-4 text-lg text-text-muted">{t.hero.subtitle}</p>
        <div className="mt-6">
          <Link href={`/${locale}/contact`} className={button.primary}>
            {t.hero.cta}
          </Link>
        </div>
      </section>

      {/* Why NFC */}
      <section className={cn(layout.container, "py-12")}>
        <h2 className="text-2xl font-semibold mb-6">{t.sections.why.title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {t.sections.why.items.map((b) => (
            <div key={b.h} className={cn(card.base, card.padded)}>
              <h3 className="font-semibold">{b.h}</h3>
              <p className="text-text-muted">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Digital Benefits */}
      <section className={cn(layout.container, "py-12")}>
        <h2 className="text-2xl font-semibold mb-6">{t.sections.seo.title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {t.sections.seo.items.map((b) => (
            <div key={b.h} className={cn(card.base, card.padded)}>
              <h3 className="font-semibold">{b.h}</h3>
              <p className="text-text-muted">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className={cn(layout.container, "py-12")}>
        <h2 className="text-2xl font-semibold mb-6">{t.sections.packages.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.sections.packages.items.map((p) => (
            <div key={p.h} className={cn(card.base, card.padded, "text-center")}>
              <h3 className="text-xl font-semibold">{p.h}</h3>
              <p className="mt-2 text-text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={cn(layout.container, "py-12")}>
        <h2 className="text-2xl font-semibold mb-6">{t.sections.faq.title}</h2>
        <div className="grid gap-4">
          {t.sections.faq.qas.map(([q, a]) => (
            <div key={q} className={card.base + " p-4"}>
              <p className="font-semibold">{q}</p>
              <p className="text-text-muted mt-1">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
