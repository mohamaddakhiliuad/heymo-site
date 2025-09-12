// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { site } from "@/config/site";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, agree, locale } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    if (!agree) {
      return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 });
    }

    // 1) اگر webhook تعریف شده:
    if (site.contact.webhook) {
      await fetch(site.contact.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message, locale, ts: Date.now() }),
      });
    }

    // 2) اگر RESEND_API_KEY ست است، ایمیل بفرست:
    if (process.env.RESEND_API_KEY && process.env.CONTACT_FROM && site.contact.emailTo) {
      const payload = {
        from: process.env.CONTACT_FROM,
        to: [site.contact.emailTo, site.contact.emailCc].filter(Boolean),
        subject: `[CONTACT] ${subject || "(no subject)"} — ${name}`,
        text:
          `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nLocale: ${locale}\n\n${message}`,
      };

      // بدون نصب SDK: مستقیم به Resend API
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
