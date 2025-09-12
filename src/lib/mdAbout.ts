// src/lib/mdAbout.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import externalLinks from "remark-external-links";
import type { Locale } from "./mdLoader"; // reuse

function resolveAboutFile(locale: Locale) {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "content", locale, "about.md"),
    path.join(cwd, "src", "content", locale, "about.md"),
    path.join(cwd, "content", "about", `${locale}.md`),
    path.join(cwd, "src", "content", "about", `${locale}.md`),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(`❌ About file not found for locale "${locale}"`);
}

export async function getAbout(locale: Locale) {
  const file = resolveAboutFile(locale);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(externalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
    .use(remarkHtml)
    .process(content);

  return {
    title: data.title ?? "About",
    description: data.description ?? "",
    portrait: data.portrait ?? "",
    contentHtml: processed.toString(),
    locale,
  };
}
