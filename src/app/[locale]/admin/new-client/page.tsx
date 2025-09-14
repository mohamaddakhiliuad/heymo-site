"use client";
import { useState } from "react";
import { button, field, card, cn, actions } from "@/styles/formStyles";

type LinkItem = { type: string; url: string };

const LINK_TYPES = [
  "website","linkedin","instagram","youtube","telegram","github","email","phone","whatsapp","x","facebook",
];

export default function NewClientPage() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // --- defaults
  const [slug, setSlug] = useState("ali-6472");
  const [localeDefault, setLocaleDefault] = useState<"en" | "fa">("en");

  const [nameEn, setNameEn] = useState("Ali Rezaei");
  const [nameFa, setNameFa] = useState("علی رضایی");

  const [titleEn, setTitleEn] = useState("Digital Marketer");
  const [titleFa, setTitleFa] = useState("متخصص بازاریابی دیجیتال");

  const [avatarUrl, setAvatarUrl] = useState("/clients/ali-6472.jpg");

  const [bioEn, setBioEn] = useState("Helping businesses grow online through SEO and paid campaigns.");
  const [bioFa, setBioFa] = useState("کمک به رشد کسب‌وکارها از طریق سئو و کمپین‌های تبلیغاتی.");

  const [email, setEmail] = useState("ali@example.com");
  const [phone, setPhone] = useState("+1-416-123-4567");
  const [whatsapp, setWhatsapp] = useState("+1-416-123-4567");
  const [address, setAddress] = useState("Toronto, Canada");

  const [ctaUrl, setCtaUrl] = useState(`/api/u/${slug}/vcard`);
  const [ctaLabelEn, setCtaLabelEn] = useState("Add to Contacts");
  const [ctaLabelFa, setCtaLabelFa] = useState("افزودن به مخاطبین");

  const [indexable, setIndexable] = useState(false);

  const [links, setLinks] = useState<LinkItem[]>([
    { type: "website",  url: "https://example.com" },
    { type: "linkedin", url: "https://linkedin.com/in/ali" },
    { type: "email",    url: "mailto:ali@example.com" },
    { type: "phone",    url: "tel:+14161234567" },
  ]);

  function setSlugNormalized(v: string) {
    const norm = v.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    setSlug(norm);
    setCtaUrl(`/api/u/${norm}/vcard`);
  }

  function updateLink(i: number, key: keyof LinkItem, value: string) {
    setLinks(prev => prev.map((l, idx) => idx === i ? { ...l, [key]: value } : l));
  }
  function addLink() {
    setLinks(prev => [...prev, { type: "website", url: "" }]);
  }
  function removeLink(i: number) {
    setLinks(prev => prev.filter((_, idx) => idx !== i));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);

    const data = {
      slug,
      localeDefault,
      name: nameEn,
      title: titleEn,
      name_i18n: { en: nameEn, fa: nameFa },
      title_i18n: { en: titleEn, fa: titleFa },
      avatarUrl,
      bio: { en: bioEn, fa: bioFa },
      links: links.map(l => ({
        type: l.type,
        url:
          l.type === "email" ? (l.url.startsWith("mailto:") ? l.url : `mailto:${l.url}`) :
          l.type === "phone" || l.type === "whatsapp" ? (l.url.startsWith("tel:") ? l.url : `tel:${l.url}`) :
          l.url
      })),
      contact: { email, phone, whatsapp, address },
      cta: { url: ctaUrl, label_en: ctaLabelEn, label_fa: ctaLabelFa },
      indexable,
    };

    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? ""}`,
        },
        body: JSON.stringify({ slug, data }),
      });
      const j = await res.json();
      setMsg(j.ok ? `✅ Saved: ${j.path}` : `❌ ${j.error || res.status}`);
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={cn("max-w-3xl mx-auto my-10", card.base, card.padded)}>
      <h1 className="text-2xl font-semibold mb-4">New/Update Client (Local Writer)</h1>

      <form onSubmit={onSubmit} className="grid gap-6">
        {/* Basics */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className={field.group}>
            <label className={field.label}>Slug (lowercase)</label>
            <input className={field.input} value={slug} onChange={e=>setSlugNormalized(e.target.value)} />
          </div>
          <div className={field.group}>
            <label className={field.label}>Default Locale</label>
            <select className={field.select} value={localeDefault} onChange={e=>setLocaleDefault(e.target.value as any)}>
              <option value="en">en</option>
              <option value="fa">fa</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className={field.group}>
            <label className={field.label}>Name (EN)</label>
            <input className={field.input} value={nameEn} onChange={e=>setNameEn(e.target.value)} />
          </div>
          <div className={field.group}>
            <label className={field.label}>Name (FA)</label>
            <input dir="rtl" className={field.input} value={nameFa} onChange={e=>setNameFa(e.target.value)} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className={field.group}>
            <label className={field.label}>Title (EN)</label>
            <input className={field.input} value={titleEn} onChange={e=>setTitleEn(e.target.value)} />
          </div>
          <div className={field.group}>
            <label className={field.label}>Title (FA)</label>
            <input dir="rtl" className={field.input} value={titleFa} onChange={e=>setTitleFa(e.target.value)} />
          </div>
        </div>

        <div className={field.group}>
          <label className={field.label}>Avatar URL (public/clients/...)</label>
          <input className={field.input} value={avatarUrl} onChange={e=>setAvatarUrl(e.target.value)} />
        </div>

        {/* Bio */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className={field.group}>
            <label className={field.label}>Bio (EN)</label>
            <textarea className={field.textarea} value={bioEn} onChange={e=>setBioEn(e.target.value)} />
          </div>
          <div className={field.group}>
            <label className={field.label}>Bio (FA)</label>
            <textarea dir="rtl" className={field.textarea} value={bioFa} onChange={e=>setBioFa(e.target.value)} />
          </div>
        </div>

        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className={field.group}><label className={field.label}>Email</label>
            <input className={field.input} value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className={field.group}><label className={field.label}>Phone</label>
            <input className={field.input} value={phone} onChange={e=>setPhone(e.target.value)} />
          </div>
          <div className={field.group}><label className={field.label}>WhatsApp</label>
            <input className={field.input} value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} />
          </div>
          <div className={field.group}><label className={field.label}>Address</label>
            <input className={field.input} value={address} onChange={e=>setAddress(e.target.value)} />
          </div>
        </div>

        {/* Links (dynamic) */}
        <div className={card.base + " p-4"}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Links</h3>
            <button type="button" onClick={addLink} className={button.outline}>Add Link</button>
          </div>
          <div className="grid gap-3">
            {links.map((l, i) => (
              <div key={i} className="grid md:grid-cols-[160px_1fr_auto] gap-3 items-center">
                <select className={field.select} value={l.type} onChange={e=>updateLink(i,"type",e.target.value)}>
                  {LINK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input className={field.input} placeholder="https:// | mailto: | tel:" value={l.url} onChange={e=>updateLink(i,"url",e.target.value)} />
                <button type="button" onClick={()=>removeLink(i)} className={button.ghost}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className={field.group}>
            <label className={field.label}>CTA URL</label>
            <input className={field.input} value={ctaUrl} onChange={e=>setCtaUrl(e.target.value)} />
          </div>
          <div className={field.group}>
            <label className={field.label}>CTA Label (EN)</label>
            <input className={field.input} value={ctaLabelEn} onChange={e=>setCtaLabelEn(e.target.value)} />
          </div>
          <div className={field.group}>
            <label className={field.label}>CTA Label (FA)</label>
            <input dir="rtl" className={field.input} value={ctaLabelFa} onChange={e=>setCtaLabelFa(e.target.value)} />
          </div>
        </div>

        {/* Indexable */}
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={indexable} onChange={e=>setIndexable(e.target.checked)} />
          <span>Indexable (allow search engines)</span>
        </label>

        {/* Actions */}
        <div className={actions.row}>
          <button className={button.primary} disabled={busy}>
            {busy ? "Saving..." : "Save JSON"}
          </button>
          {msg && <span className="text-sm">{msg}</span>}
        </div>
      </form>

      <p className="text-sm text-text-muted mt-4">* Local only. On Vercel use DB / Git automation.</p>
    </div>
  );
}
