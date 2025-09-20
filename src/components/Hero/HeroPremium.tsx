// src/components/Hero/HeroPremium.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { cx, theme } from "@/styles/theme";
import { TrendingUp, Layers, Bot, Play } from "lucide-react";
import type { Locale } from "@/config/site";

type Feature = { icon?: "TrendingUp" | "Layers" | "Bot"; title: string };
type T = {
  kicker: string;
  title_a: string;
  title_b_em: string;
  title_c: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  microproof: string;
  features?: Feature[];
  badges: {
    a_value: string; a_label: string;
    b_value: string; b_label: string;
    c_value: string; c_label: string;
  };
  // اختیاری: کپشن ویدیو/آلترناتیو
  videoCta?: string; // مثل: "Watch 45s"
};

const ICONS = { TrendingUp, Layers, Bot };

export default function HeroPremium({
  locale,
  t,
  media = "/media/hero-mock.png", // تصویر سبک یا اسکرین‌شات
  videoId,                         // اگر داشتی، یوتیوب/ویزور MP4
}: {
  locale: Locale;
  t: T;
  media?: string;
  videoId?: string;
}) {
  const prefix = `/${locale}`;

  return (
   <section className="relative overflow-hidden bg-hero-gradient text-white">
      {/* container */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT: copy */}
          <div>
            <p className="text-sm md:text-base text-white/70">{t.kicker}</p>

            <h1
              className={cx(
                theme.typography.headingOnHero,
                "mt-2 text-balance leading-[1.1] text-[clamp(2rem,5.2vw,46px)] max-w-[20ch]"
              )}
            >
              {t.title_a}
              <span className="underline decoration-white/30 underline-offset-4 text-[rgb(var(--color-cta))]">
                {t.title_b_em}
              </span>
              {t.title_c}
            </h1>

            <p className="mt-5 text-base md:text-lg text-white/90 max-w-[62ch]">
              {t.subtitle}
            </p>

            {/* feature pills */}
            {t.features?.length ? (
              <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                {t.features.slice(0, 3).map((f, i) => {
                  const Ico = f.icon ? ICONS[f.icon] : TrendingUp;
                  return (
                    <li key={i} className="flex items-center gap-2 text-white/90">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                        <Ico className="h-4 w-4" />
                      </span>
                      <span className="text-sm">{f.title}</span>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`${prefix}/booking`}
                aria-label={t.ctaPrimary}
                className={cx(theme.button.cta, "h-11 px-6")}
              >
                {t.ctaPrimary}
              </Link>

              <Link
                href={`${prefix}/projects`}
                aria-label={t.ctaSecondary}
                className={cx(
                  theme.button.outline,
                  "h-11 px-6",
                  "border-white/40 text-white hover:bg-white/10"
                )}
              >
                {t.ctaSecondary}
              </Link>

              {/* optional: video CTA */}
              {videoId ? (
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className={cx(
                    theme.button.outline,
                    "h-11 px-4 border-white/30 text-white/90 hover:bg-white/10 flex items-center gap-2"
                  )}
                  aria-label={t.videoCta || "Watch video"}
                >
                  <Play className="h-4 w-4" />
                  <span>{t.videoCta || "Watch 45s"}</span>
                </a>
              ) : null}
            </div>

            <p className="mt-3 text-sm text-white/70">{t.microproof}</p>

            {/* trust badges */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-3 text-white/85">
              <li className="flex items-baseline gap-2">
                <span className="text-lg font-semibold">{t.badges.a_value}</span>
                <span className="text-sm">{t.badges.a_label}</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-lg font-semibold">{t.badges.b_value}</span>
                <span className="text-sm">{t.badges.b_label}</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-lg font-semibold">{t.badges.c_value}</span>
                <span className="text-sm">{t.badges.c_label}</span>
              </li>
            </ul>
          </div>

          {/* RIGHT: media (image / mock device / poster of video) */}
          <div className="relative mx-auto w-full max-w-[580px]">
            {/* mock device frame */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_40px_120px_-30px_rgba(0,0,0,.6)] backdrop-blur-sm">
              {/* gradient overlay for depth */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
              {/* media */}
              <Image
                src={media}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              {/* corner glow */}
              <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[rgb(var(--glow-sage))] opacity-20 blur-[100px]" />
            </div>

            {/* small caption badges under media */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Headless Shopify</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">NFC Smart Profiles</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Fast Tech Stack</span>
            </div>
          </div>
        </div>
      </div>

      {/* (اختیاری) اگر لوگو مارکـی داری، پایین سکشن بذار */}
      {/* <LogoMarquee /> */}
    </section>
  );
}
