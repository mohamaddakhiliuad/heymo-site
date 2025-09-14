// src/app/api/u/[slug]/qrcode/route.ts
import { getClientBySlug } from "@/lib/clients/read";
import QRCode from "qrcode";

export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const client = await getClientBySlug(params.slug);
  if (!client) return new Response("Not found", { status: 404 });

  const url = new URL(req.url);
  const origin = url.origin;
  const locale = (url.searchParams.get("locale") || client.localeDefault || "en") as "en" | "fa";

  // آدرس مقصد QR: صفحه‌ی پروفایل همین مشتری با همان locale
  const target = `${origin}/${locale}/u/${client.slug}`;

  // PNG تمیز با حاشیه کم و اندازه مناسب برای چاپ/نمایش
  const png = await QRCode.toBuffer(target, {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 1,
    scale: 8, // ~ 256px؛ اگر خواستی بزرگتر: 10 یا 12
    color: {
      dark: "#000000",
      light: "#FFFFFF"
    }
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${client.slug}-qr.png"`,
      "Cache-Control": "public, max-age=300" // 5 دقیقه
    }
  });
}
