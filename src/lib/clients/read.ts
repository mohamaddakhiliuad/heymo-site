import path from "node:path";
import fs from "node:fs/promises";
import { ClientRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "src", "content", "clients", "data");

// اجازه‌ی پروتکل‌های امن برای لینک‌ها
const URL_OK = /^(https?:\/\/|mailto:|tel:|sms:|whatsapp:|wtai:|\/|#|$)/i;
// اجازه‌ی wa.me (واتساپ کوتاه)
const URL_WA = /^https?:\/\/wa\.me\//i;

function isSafeUrl(url?: string) {
  if (!url) return true;
  return URL_OK.test(url) || URL_WA.test(url);
}

// کش خیلی ساده در حافظه‌ی سرور
let cache: { at: number; list: ClientRecord[] } | null = null;
const TTL_MS = 60_000;

async function readAll(): Promise<ClientRecord[]> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.list;

  const files = await fs.readdir(DATA_DIR);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  const list: ClientRecord[] = [];
  for (const file of jsonFiles) {
    try {
      const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
      const data = JSON.parse(raw) as ClientRecord;

      // حداقل ولیدیشن
      if (!data?.slug || !data?.name || !data?.title) continue;
      if (data.links) {
        data.links = data.links.filter((l) => isSafeUrl(l.url));
      }
      if (data.cta && !isSafeUrl(data.cta.url)) {
        delete data.cta.url;
      }
      list.push(data);
    } catch {
      // فایل خراب را نادیده بگیر
    }
  }

  cache = { at: now, list };
  return list;
}

export async function getClientBySlug(slug: string) {
  const all = await readAll();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function listClientSlugs() {
  const all = await readAll();
  return all.map((c) => c.slug);
}
