import Image from "next/image";
import Link from "next/link";
import { layout, card, button, cn } from "@/styles/formStyles";
import type { Metadata } from "next";

type Params = { params: { locale: "en" | "fa" } };

export const metadata: Metadata = {
  title: "Projects — heymo",
  description: "Rumilander, Change Club, Trial Match — selected works",
};

async function getProjects(locale: "en" | "fa") {
  const data = await import(`@/content/${locale}/projects.json`);
  return data.default as Array<{
    slug: string; title: string; summary: string; image: string; url?: string; highlights: string[];
  }>;
}

export default async function ProjectsPage({ params }: Params) {
  const { locale } = params;
  const rtl = locale === "fa";
  const projects = await getProjects(locale);

  return (
    <main dir={rtl ? "rtl" : "ltr"}>
      <section className={cn(layout.container, "py-10 md:py-14")}>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">{rtl ? "پروژه‌ها" : "Projects"}</h1>
          <p className="text-text-muted mt-2">
            {rtl ? "نمونه‌هایی از کارهای اخیر با تمرکز بر سرعت، سادگی و رشد." :
                    "Recent work focused on speed, clarity, and growth."}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article key={p.slug} className={cn(card.base, "p-0 overflow-hidden")}>
              <div className="relative aspect-[4/3]">
                <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-text-muted mt-1">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 rounded-full text-xs bg-surface-muted">{h}</span>
                  ))}
                </div>
                <div className="mt-4">
                  {p.url ? (
                    <Link href={p.url} className={button.link} target="_blank" rel="noopener">
                      {rtl ? "مشاهده" : "View"}
                    </Link>
                  ) : (
                    <span className="text-sm text-text-muted">{rtl ? "به‌زودی…" : "Coming soon…"}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
