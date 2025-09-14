// src/app/[locale]/u/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getClientBySlug } from "@/lib/clients/read";
import { getDictionary } from "@/i18n";

// اگر lucide-react داری، این ایمپورت‌ها اوکی هستند.
// اگر نداری، موقتاً این بخش را کامنت کن یا از آیکون‌های ساده استفاده کن.
import {
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MessageCircle,
  Youtube,
  Send,
  Github,
  Link2,
} from "lucide-react";

export const runtime = "nodejs";

type Params = { locale: "en" | "fa"; slug: string };

// ─────────────────────────────────────────────────────────────────────────────
// Metadata (hreflang + OG)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params; // ✅ باید await شود
  const t = await getDictionary(locale);
  const client = await getClientBySlug(slug);
  if (!client) return { title: t.profile?.notFound ?? "Profile" };

  const pick = (en?: string, fa?: string) =>
    (locale === "fa" ? fa : en) ?? en ?? fa ?? "";

  const name =
    pick((client as any).name_i18n?.en, (client as any).name_i18n?.fa) ||
    client.name ||
    "";
  const title =
    pick((client as any).title_i18n?.en, (client as any).title_i18n?.fa) ||
    client.title ||
    "";
  const description = pick(client.bio?.en, client.bio?.fa) || "";

  const robots = client.indexable ? "index,follow" : "noindex,nofollow";
  const urls = {
    en: `/en/u/${client.slug}`,
    fa: `/fa/u/${client.slug}`,
  };

  return {
    title: `${name} — ${title}`,
    description,
    robots,
    alternates: {
      canonical: urls[locale],
      languages: { en: urls.en, fa: urls.fa },
    },
    openGraph: {
      title: `${name} — ${title}`,
      description,
      url: urls[locale],
      images: client.avatarUrl ? [{ url: client.avatarUrl }] : undefined,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: icon per link type
// ─────────────────────────────────────────────────────────────────────────────
function LinkIcon({ type }: { type: string }) {
  const t = type.toLowerCase();
  if (t === "website") return <Globe className="h-4 w-4" aria-hidden />;
  if (t === "instagram") return <Instagram className="h-4 w-4" aria-hidden />;
  if (t === "linkedin") return <Linkedin className="h-4 w-4" aria-hidden />;
  if (t === "email") return <Mail className="h-4 w-4" aria-hidden />;
  if (t === "phone") return <Phone className="h-4 w-4" aria-hidden />;
  if (t === "whatsapp") return <MessageCircle className="h-4 w-4" aria-hidden />;
  if (t === "youtube") return <Youtube className="h-4 w-4" aria-hidden />;
  if (t === "telegram") return <Send className="h-4 w-4" aria-hidden />;
  if (t === "github") return <Github className="h-4 w-4" aria-hidden />;
  return <Link2 className="h-4 w-4" aria-hidden />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default async function ProfilePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params; // ✅ باید await شود
  const dict = await getDictionary(locale);
  const client = await getClientBySlug(slug);
  if (!client) notFound();

  const isFa = locale === "fa";
  const enHref = `/en/u/${client.slug}`;
  const faHref = `/fa/u/${client.slug}`;

  const pick = (en?: string, fa?: string) =>
    (isFa ? fa : en) ?? en ?? fa ?? "";

  const displayName =
    pick((client as any).name_i18n?.en, (client as any).name_i18n?.fa) ||
    client.name ||
    "";
  const displayTitle =
    pick((client as any).title_i18n?.en, (client as any).title_i18n?.fa) ||
    client.title ||
    "";
  const bio = pick(client.bio?.en, client.bio?.fa) || "";

  const L = dict.profile;
  const links = (client.links || []).filter((l: any) => !!l?.url);

  return (
    <main className="mx-auto max-w-xl px-4 pt-12 py-10">
      {/* Language Switcher - fixed, glassy */}
      <nav
        aria-label="Language"
        className={[
          "fixed z-50",
          "top-[max(0.75rem,env(safe-area-inset-top))]",
          isFa ? "left-3" : "right-3",
        ].join(" ")}
      >
        <div className="flex items-center gap-1 rounded-full border border-accent/30 bg-surface/80 backdrop-blur px-1 py-1 shadow-soft">
          <a
            href={enHref}
            aria-current={locale === "en" ? "page" : undefined}
            className={[
              "inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold transition",
              locale === "en"
                ? "bg-accent text-accent-on shadow-soft"
                : "text-accent hover:bg-accent/10",
            ].join(" ")}
          >
            EN
          </a>
          <a
            href={faHref}
            aria-current={locale === "fa" ? "page" : undefined}
            className={[
              "inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold transition",
              locale === "fa"
                ? "bg-accent text-accent-on shadow-soft"
                : "text-accent hover:bg-accent/10",
            ].join(" ")}
          >
            FA
          </a>
        </div>
      </nav>

      <section className="rounded-2xl bg-surface-raise p-6 shadow-soft ring-1 ring-black/5">
        <div className="flex items-center gap-4">
          {client.avatarUrl && (
            <Image
              src={client.avatarUrl}
              alt={displayName}
              width={72}
              height={72}
              className="h-18 w-18 rounded-xl object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl font-semibold text-text">{displayName}</h1>
            {displayTitle && <p className="text-text-muted">{displayTitle}</p>}
          </div>
        </div>

        {bio && <p className="mt-4 text-text">{bio}</p>}

        {/* Links */}
        {!!links.length && (
          <div className="mt-6 space-y-2">
            <h2 className="text-sm font-medium text-text-muted">{L.links}</h2>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {links.map((link: any, i: number) => {
                const type = String(link.type || "custom");
                const label =
                  type === "custom"
                    ? (isFa ? link.label_fa : link.label_en) ?? link.url
                    : (L as any)[type] ?? type;

                return (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-accent/30 bg-surface px-4 py-2 text-accent hover:border-accent/50"
                  >
                    <span className="inline-flex items-center gap-2">
                      <LinkIcon type={type} />
                      <span>{label}</span>
                    </span>
                    <span className="text-text-muted text-xs truncate max-w-[50%]">
                      {link.url}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact */}
        {(client.contact?.email ||
          client.contact?.phone ||
          client.contact?.whatsapp ||
          client.contact?.address) && (
          <div className="mt-6">
            <h2 className="text-sm font-medium text-text-muted">{L.contact}</h2>
            <ul className="mt-2 space-y-1 text-text">
              {client.contact?.email && (
                <li>
                  {L.email}: {client.contact.email}
                </li>
              )}
              {client.contact?.phone && (
                <li>
                  {L.phone}: {client.contact.phone}
                </li>
              )}
              {client.contact?.whatsapp && (
                <li>
                  {L.whatsapp}: {client.contact.whatsapp}
                </li>
              )}
              {client.contact?.address && (
                <li>
                  {L.address}: {client.contact.address}
                </li>
              )}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 flex flex-wrap gap-2">
         
          {client.cta?.url && (
            <a
              href={client.cta.url}
              className="inline-flex rounded-xl border border-accent/30 px-4 py-2 font-semibold text-accent hover:border-accent/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              {(isFa ? client.cta.label_fa : client.cta.label_en) || L.cta}
            </a>
            
          )}
          {/* Download QR */}
  <a
    href={`/api/u/${client.slug}/qrcode?locale=${params.locale}`}
    className="inline-flex rounded-xl border border-accent/30 px-4 py-2 font-semibold text-accent hover:border-accent/50"
    download
  >
    {isFa ? "دانلود QR" : "Download QR"}
  </a>

        </div>
      </section>
    </main>
  );
}
