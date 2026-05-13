// Next.js 16 proxy convention (replaces middleware.ts). Marketing site only needs locale routing
// — no Supabase auth chain like the boilerplate.

import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createIntlMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
