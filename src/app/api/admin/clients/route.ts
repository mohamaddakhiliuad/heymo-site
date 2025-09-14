// POST /api/admin/clients
// Writes JSON file to src/content/clients/data/{slug}.json (LOCAL ONLY)
// SECURITY: simple bearer token via env: ADMIN_TOKEN
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

type ClientPayload = {
  slug: string;
  data: any; // validate below
};

export async function POST(req: Request) {
  // --- auth guard (very simple) ---
  const auth = req.headers.get("authorization") || "";
  const token = process.env.ADMIN_TOKEN;
  if (!token || auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // --- parse payload ---
  const body = (await req.json()) as ClientPayload;
  const slug = (body.slug || "").trim().toLowerCase();
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ ok: false, error: "Invalid slug" }, { status: 400 });
  }

  // --- minimal schema checks ---
  const d = body.data || {};
  if (!d.name || !d.title || !d.localeDefault) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  // always refresh updatedAt
  d.updatedAt = new Date().toISOString();

  // --- ensure folder + write file ---
  const dir = join(process.cwd(), "src/content/clients/data");
  const filePath = join(dir, `${slug}.json`);
  await mkdir(dir, { recursive: true });
  await writeFile(filePath, JSON.stringify(d, null, 2), "utf8");

  return NextResponse.json({ ok: true, path: `src/content/clients/data/${slug}.json` });
}
