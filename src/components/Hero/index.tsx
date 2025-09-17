// src/components/Hero/index.tsx  (Server Component)
import { getDictionary } from "@/i18n";
import { type Locale } from "@/config/site";
import HeroSection from "./HeroSection";

export default async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  return <HeroSection locale={locale} t={dict.hero} />;
}
