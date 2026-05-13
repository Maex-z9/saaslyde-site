import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saaslyde.com";
const PATHS = ["", "/imprint", "/privacy"] as const;

const url = (locale: string, path: string) =>
  `${SITE}${locale === routing.defaultLocale ? "" : `/${locale}`}${path}`;

const langKey = (l: string) => (l === "de" ? "de-DE" : "en-US");

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: url(locale, path),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.5,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [langKey(l), url(l, path)])),
      },
    })),
  );
}
