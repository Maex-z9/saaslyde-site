// Next.js 16 proxy convention (replaces middleware.ts). Marketing site only needs locale routing
// — no Supabase auth chain like the boilerplate.

import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createIntlMiddleware(routing);

export const config = {
  // Exclude /api, Next internals, static-asset extensions, AND the SEO files (sitemap, robots,
  // favicon) — those are emitted by App Router special files and must not be locale-prefixed.
  matcher: ["/((?!api|sitemap.xml|robots.txt|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
