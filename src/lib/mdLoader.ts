// src/lib/mdLoader.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import externalLinks from "remark-external-links";

export type Locale = "fa" | "en";
const SUPPORTED_EXT = [".md", ".mdx"];
const DEFAULT_LOCALE: Locale = "en";

// پوشه‌های احتمالی محتوا (هر دو الگو را پوشش می‌دهیم)
function resolvePostsDirectory(locale: Locale) {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "content", locale, "blog"),
    path.join(cwd, "src", "content", locale, "blog"),
    path.join(cwd, "content", "blog", locale),
    path.join(cwd, "src", "content", "blog", locale),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(
    `❌ Blog content folder not found for locale "${locale}". Checked: ${candidates.join(", ")}`
  );
}

const norm = (s: string) =>
  s.replace(/\.[^.]+$/, "").trim().toLowerCase().replace(/[_\s]+/g, "-").replace(/-+/g, "-");

function findFileBySlug(dir: string, inputSlug: string) {
  const want = norm(inputSlug);
  const files = fs.readdirSync(dir);
  return files.find((f) => {
    const ext = path.extname(f).toLowerCase();
    if (!SUPPORTED_EXT.includes(ext)) return false;
    return norm(path.parse(f).name) === want;
  });
}

// ——— API ———
export function getAllPosts(locale: Locale = DEFAULT_LOCALE) {
  const dir = resolvePostsDirectory(locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => SUPPORTED_EXT.includes(path.extname(f).toLowerCase()));

  const posts = files
    .map((file) => {
      const full = path.join(dir, file);
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);
      const slug = path.parse(file).name;
      if (!data.title || !data.date) {
        console.warn(`⚠️ Skipping "${file}" – missing title or date`);
        return null;
      }
      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt ?? content.slice(0, 180),
        coverImage: data.coverImage ?? "",
        tags: data.tags ?? [],
        locale,
      };
    })
    .filter(Boolean) as any[];

  // جدیدترین‌ها اول
  posts.sort((a, b) => (new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1));
  return posts;
}

export async function getPostBySlug(locale: Locale, slug: string) {
  const dir = resolvePostsDirectory(locale);
  const hit = findFileBySlug(dir, slug);
  if (!hit) {
    throw new Error(`❌ Post not found: ${slug}`);
  }
  const full = path.join(dir, hit);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(externalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
    .use(remarkHtml)
    .process(content);

  return {
    slug: path.parse(hit).name,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt ?? "",
    coverImage: data.coverImage ?? "",
    tags: data.tags ?? [],
    contentHtml: processed.toString(),
    locale,
  };
}
