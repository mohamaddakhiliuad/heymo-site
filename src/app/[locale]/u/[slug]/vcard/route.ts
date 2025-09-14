// src/app/api/u/[slug]/vcard/route.ts
import { getClientBySlug } from "@/lib/clients/read";

export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const client = await getClientBySlug(params.slug);
  if (!client) return new Response("Not found", { status: 404 });

  const url = new URL(req.url);
  const origin = url.origin; // برای ساخت آدرس مطلقِ عکس/وب‌سایت

  // داده‌ها
  const name = client.name ?? "";
  const title = client.title ?? "";
  const email = client.contact?.email ?? "";
  const phone = client.contact?.phone ?? "";
  const address = client.contact?.address ?? "";
  const website =
    client.links?.find((l) => l.type === "website")?.url ??
    client.cta?.url ??
    origin;

  const photo =
    client.avatarUrl && client.avatarUrl.startsWith("/")
      ? `${origin}${client.avatarUrl}`
      : client.avatarUrl ?? "";

  const bio = client.bio?.en ?? client.bio?.fa ?? "";

  // vCard 3.0 (UTF-8)
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:;${escapeVC(name)};;;`,
    `FN:${escapeVC(name)}`,
    title ? `TITLE:${escapeVC(title)}` : "",
    email ? `EMAIL;TYPE=INTERNET:${escapeVC(email)}` : "",
    phone ? `TEL;TYPE=CELL:${escapeVC(phone)}` : "",
    website ? `URL:${escapeVC(website)}` : "",
    address ? `ADR;TYPE=HOME:;;${escapeVC(address)};;;;` : "",
    photo ? `PHOTO;VALUE=URI:${escapeVC(photo)}` : "",
    bio ? `NOTE:${escapeVC(bio)}` : "",
    "END:VCARD",
  ].filter(Boolean);

  const vcard = lines.join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${client.slug}.vcf"`,
      "Cache-Control": "public, max-age=60",
    },
  });
}

// ساده‌سازی: کاما/سِمیکالن/خط‌جدید را escape کن
function escapeVC(s: string) {
  return s.replace(/\\|,|;|\n|\r/g, (m) => "\\" + (m === "\n" ? "n" : m));
}
