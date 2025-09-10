// src/lib/programs.ts
import type { Locale } from "@/config/site";

export type ProgramItem = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  startDate?: string;     // ISO
  duration?: string;
  location?: string;
  price?: { currency: string; tuition: number };
  image?: string;         // /images/programs/*.jpg
  href?: string;          // absolute within locale
  ctaLabel?: string;      // UI label per-locale (ok for content level)
};

export type ProgramSection = {
  title?: string;
  items: ProgramItem[];
};

export type ProgramsData = { sections: ProgramSection[] };

export async function getPrograms(locale: Locale): Promise<ProgramsData> {
  switch (locale) {
    case "fa":
      return (await import("@/content/fa/programs.json")).default as ProgramsData;
    case "en":
    default:
      return (await import("@/content/en/programs.json")).default as ProgramsData;
  }
}
