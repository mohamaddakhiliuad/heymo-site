// src/lib/content.ts
import type { Locale } from "@/config/site";

type Keys = "mbsr";

export async function getContent(locale: Locale, key: Keys) {
  switch (locale) {
    case "fa": {
      switch (key) {
        case "mbsr":
          return (await import("@/content/fa/mbsr.json")).default;
      }
      break;
    }
    case "en":
    default: {
      switch (key) {
        case "mbsr":
          return (await import("@/content/en/mbsr.json")).default;
      }
    }
  }
  throw new Error(`Content not found for ${locale}/${key}`);
}
