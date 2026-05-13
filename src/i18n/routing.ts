import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  // "as-needed" omits the prefix for the default locale (/page) and adds it for others (/en/page).
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
