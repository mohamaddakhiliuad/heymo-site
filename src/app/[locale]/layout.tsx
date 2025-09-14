// src/app/[locale]/layout.tsx


import "@/app/globals.css";
import "@/styles/theme";
import { getBaseUrl } from "@/lib/url";
import type { Metadata, Viewport } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";

import site from "@/config/site";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

import I18nProvider from "@/i18n/I18nProvider";
import { getDictionary } from "@/i18n";
import SiteChrome from "@/components/layout/SiteChrome"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Static params for locales
export async function generateStaticParams() {
  return site.brand.locales.map((l) => ({ locale: l }));
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // برای Safe Area در iOS
};

export async function generateMetadata(
  props: { params: Promise<{ locale: "fa" | "en" }> }
): Promise<Metadata> {
  const { locale } = await props.params;
  const { seo, brand } = site;
  const domain = brand.domain || "";
  const base = getBaseUrl();
  return {
    title: { default: seo?.title ?? brand.name, template: `%s — ${brand.name}` },
    description: seo?.description,
    metadataBase: base ? new URL(base) : undefined,
    openGraph: {
      title: seo?.title ?? brand.name,
      description: seo?.description,
      images: seo?.ogImage ? [seo.ogImage] : [],
      url: domain ? `https://${domain}/${locale}` : undefined,
    },
    alternates: domain
      ? { languages: { fa: `https://${domain}/fa`, "en-CA": `https://${domain}/en` } }
      : undefined,
  };
}
export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: "fa" | "en" }>;
  }
) {
  const { locale } = await props.params;
  const dir = locale === "fa" ? "rtl" : "ltr";
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={dir}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3H9YDPTXC1" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3H9YDPTXC1');
          `}
        </Script>
      </head>

      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))]",
          locale === "fa" ? "font-fa" : "",
        ].join(" ")}
      >
        <I18nProvider value={{ locale, dict }}>
          {/* هدر/فوتر فقط وقتی می‌آیند که سگمنت اول بعد از locale ≠ 'u' باشد */}
          <SiteChrome>
            <Header />
          </SiteChrome>

          <main>{props.children}</main>

          <SiteChrome>
            <Footer />
          </SiteChrome>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "rgb(var(--color-surface))",
                color: "rgb(var(--color-text))",
                border: "1px solid var(--color-border)",
              },
            }}
          />
        </I18nProvider>

        <Analytics />
      </body>
    </html>
  );
}