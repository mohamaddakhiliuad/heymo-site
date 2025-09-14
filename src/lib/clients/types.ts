export type BuiltInLinkType =
  | "website" | "instagram" | "linkedin" | "whatsapp" | "email" | "phone" | "x" | "tiktok";

export type LinkItem =
  | { type: BuiltInLinkType; url: string }
  | { type: "custom"; url: string; label_en?: string; label_fa?: string };

export type ClientRecord = {
  slug: string;
  localeDefault: "en" | "fa";
  name: string;
  title: string;
  avatarUrl?: string;
  bio?: { en?: string; fa?: string };
  links?: LinkItem[];
  contact?: { email?: string; phone?: string; whatsapp?: string; address?: string };
  cta?: { url?: string; label_en?: string; label_fa?: string };
  indexable?: boolean;
  updatedAt?: string;
};
