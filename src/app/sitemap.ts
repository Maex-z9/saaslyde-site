import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saaslyde.com";

const PATHS = ["", "/imprint", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE}${locale === routing.defaultLocale ? "" : `/${locale}`}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.5,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l === "de" ? "de-DE" : "en-US",
            `${SITE}${l === routing.defaultLocale ? "" : `/${l}`}${path}`,
          ]),
        ),
      },
    })),
  );
}
