import type { Locale } from "@/config/site";

export type Block =
  | { type: "hero"; blurb?: string; image?: string;
      primaryCtaHref?: string; primaryCtaLabel?: string;
      secondaryCtaHref?: string; secondaryCtaLabel?: string }
  | { type: "bullets"; title?: string; items: string[] }
  | { type: "schedule"; title?: string; rows: Array<{ label: string; value: string }> }
  | { type: "curriculum"; title?: string;
      weeks: Array<{ week: number; title: string; topics?: string[]; homework?: string }> }
  | { type: "pricing"; currency: string; tuition: number; notes?: string }
  | { type: "faq"; title?: string; items: Array<{ q: string; a: string }> }
  | { type: "rich"; title?: string; html?: string };

export type ProgramDetail = {
  title: string;
  subtitle?: string;
  blocks: Block[];
};

export async function getProgramDetail(locale: Locale, slug: string): Promise<ProgramDetail> {
  switch (locale) {
    case "fa": {
      switch (slug) {
        case "mbsr-8-week":
          return (await import("@/content/fa/mbsr.json")).default as ProgramDetail;
        case "book-club":
          return (await import("@/content/fa/programs/book-club.json")).default as ProgramDetail;
        case "retreats":
          return (await import("@/content/fa/programs/retreats.json")).default as ProgramDetail;
        case "webinars":
          return (await import("@/content/fa/programs/webinars.json")).default as ProgramDetail;
        default:
          throw new Error(`Unknown program slug: ${slug} (fa)`);
      }
    }
    case "en":
    default: {
      switch (slug) {
        case "mbsr-8-week":
          return (await import("@/content/en/mbsr.json")).default as ProgramDetail;
        case "book-club":
          return (await import("@/content/en/programs/book-club.json")).default as ProgramDetail;
        case "retreats":
          return (await import("@/content/en/programs/retreats.json")).default as ProgramDetail;
        case "webinars":
          return (await import("@/content/en/programs/webinars.json")).default as ProgramDetail;
        default:
          throw new Error(`Unknown program slug: ${slug} (en)`);
      }
    }
  }
}
