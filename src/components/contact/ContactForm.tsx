// src/components/contact/ContactForm.tsx
"use client";
import * as React from "react";
import Button from "@/components/ui/Button";
import { form, actions, cn } from "@/styles/formStyles";

type Dict = {
  title: string; intro: string;
  form: {
    name: string; email: string; phone: string; subject: string; message: string;
    agree: string; submit: string; sending: string; successTitle: string; successDesc: string;
    errorTitle: string; errorDesc: string; required: string; invalidEmail: string; minMsg: string;
  };
  alt: { whatsapp: string; email: string; booking: string };
};

export default function ContactForm({
  dict, locale, whatsappUrl, bookingUrl, emailHref,
}: {
  dict: Dict; locale: "fa" | "en";
  whatsappUrl?: string; bookingUrl?: string; emailHref?: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [ok, setOk] = React.useState<null | boolean>(null);
  const [err, setErr] = React.useState<string>("");

  const dir = locale === "fa" ? "rtl" : "ltr";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setOk(null); setErr("");

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as any;

    // ولیدیشن سبک سمت کلاینت
    if (!data.name) return fail(dict.form.required);
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) return fail(dict.form.invalidEmail);
    if (!data.message || String(data.message).trim().length < 10) return fail(dict.form.minMsg);
    if (!data.agree) return fail(dict.form.required);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "send_failed");
      setOk(true);
      (e.currentTarget as HTMLFormElement).reset();
    } catch (er: any) {
      setOk(false);
      setErr(er?.message || "server");
    } finally {
      setLoading(false);
    }
  }

  function fail(msg: string) {
    setLoading(false); setOk(false); setErr(msg);
  }

  return (
    <div className={form.card} dir={dir}>
      <form onSubmit={onSubmit} className={form.grid}>
        {/* Name */}
        <div className={form.field}>
          <label className={form.label} htmlFor="name">{dict.form.name}</label>
          <input className={form.input} id="name" name="name" autoComplete="name" />
        </div>

        {/* Email */}
        <div className={form.field}>
          <label className={form.label} htmlFor="email">{dict.form.email}</label>
          <input className={form.input} id="email" name="email" type="email" autoComplete="email" />
        </div>

        {/* Phone (WhatsApp optional) */}
        <div className={form.field}>
          <label className={form.label} htmlFor="phone">{dict.form.phone}</label>
          <input className={form.input} id="phone" name="phone" />
        </div>

        {/* Subject */}
        <div className={form.field}>
          <label className={form.label} htmlFor="subject">{dict.form.subject}</label>
          <input className={form.input} id="subject" name="subject" />
        </div>

        {/* Message (full width) */}
        <div className="md:col-span-2">
          <div className={form.field}>
            <label className={form.label} htmlFor="message">{dict.form.message}</label>
            <textarea className={form.textarea} id="message" name="message" />
          </div>
        </div>

        {/* Consent */}
        <div className="md:col-span-2">
          <label className={form.agree}>
            <input type="checkbox" name="agree" value="1" className="mt-1" />
            {dict.form.agree}
          </label>
          {ok === false && err && <p className={form.error}>{err}</p>}
          {ok === true && (
            <p className="text-sm text-green-600 mt-1">{dict.form.successDesc}</p>
          )}
        </div>

        {/* Actions */}
        <div className={cn("md:col-span-2", actions.row)}>
          <Button disabled={loading} type="submit">
            {loading ? dict.form.sending : dict.form.submit}
          </Button>

          {bookingUrl && (
            <a className={actions.link} href={bookingUrl}>{dict.alt.booking}</a>
          )}
          {whatsappUrl && (
            <a className={actions.link} href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              {dict.alt.whatsapp}
            </a>
          )}
          {emailHref && (
            <a className={actions.link} href={emailHref}>{dict.alt.email}</a>
          )}
        </div>
      </form>
    </div>
  );
}
