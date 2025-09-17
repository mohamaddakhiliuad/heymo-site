// src/components/Hero/HeroSection.tsx
"use client";

import Link from "next/link";
import { cx, theme } from "@/styles/theme";
import LogoMarquee from "./LogoMarquee";
import { TrendingUp, Layers, Bot } from "lucide-react";
import type { Locale } from "@/config/site";
import OrnamentWave from "./OrnamentWave"
const ICONS = { TrendingUp, Layers, Bot };

type Feature = { icon: keyof typeof ICONS | string; title: string };
type T = {
  kicker: string;
  title_a: string;       // e.g. "Grow Faster with "
  title_b_em: string;    // e.g. "Clean Strategy"
  title_c: string;       // e.g. ", Fast Tech & Smart Marketing"
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
};

export default function HeroSection({ locale, t }: { locale: Locale; t: T }) {
  const prefix = `/${locale}`;

  return (
    <section
      className={cx(
        "relative overflow-hidden",
        "bg-hero-gradient bg-[rgb(var(--hero-mid))] text-white"
      )}
    >
      {/* subtle radial glow */}
        <OrnamentWave />
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-0",
          "before:absolute before:-top-32 before:-left-20 before:size-[520px] before:rounded-full before:bg-white/5 before:blur-3xl",
          "after:absolute after:-bottom-24 after:-right-24 after:size-[420px] after:rounded-full after:bg-emerald-300/10 after:blur-3xl"
        )}
      />

      {/* container */}
      <div className={cx("relative mx-auto max-w-6xl px-4 py-14 md:py-20")}>
        <p className="text-sm md:text-base text-white/70">{t.kicker}</p>

        {/* H1 — balanced, no duplicate words */}
        <h1
          className={cx(
            theme.typography.headingOnHero,
            "mt-2 text-balance leading-[1.12] text-[clamp(2rem,5.2vw,44px)] max-w-[20ch]"
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

        {/* Feature pills */}
        {t.features?.length ? (
          <ul className="mt-6 grid gap-2 sm:grid-cols-3">
            {t.features.map((f, i) => {
              const Icon =
                ICONS[(f.icon as keyof typeof ICONS) ?? "TrendingUp"] ?? TrendingUp;
              return (
                <li key={i} className="flex items-center gap-2 text-white/90">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <Icon className="h-4 w-4" />
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
        </div>

        <p className="mt-3 text-sm text-white/70">{t.microproof}</p>

        {/* Trust badges */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-3 text-white/85">
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

      {/* Social proof marquee (logos) */}
      <LogoMarquee />
    </section>
  );
}
