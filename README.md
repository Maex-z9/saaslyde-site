# saaslyde-site

Marketing site for **Saaslyde** — the DSGVO-compliant Next.js + Supabase + Stripe boilerplate for indie hackers shipping to European markets.

Live at **https://saaslyde.com** (once domain + deploy are live).

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript 5.9
- Tailwind 4 + Shadcn UI on Base UI
- next-intl 4.11 (DE + EN)
- next-themes (light/dark)

## Local dev

```bash
bun install
bun dev          # http://localhost:3000
bun run build
bun run lint
```

## Pages

- `/` — Landing (Hero, Why, Pricing, FAQ)
- `/imprint` — § 5 DDG Impressum from `src/lib/legal/config.ts`
- `/privacy` — DSGVO-compliant privacy policy

The Pricing CTA buttons are intentionally disabled (`disabled` attribute) until the Lemon Squeezy listing goes live; replace the `<Button disabled>` with the Lemon Squeezy buy URL when ready.

## Updating legal info

Edit `src/lib/legal/config.ts` — single source of truth for operator name, address, VAT ID, and subprocessor list. Both `/imprint` and `/privacy` derive from it.

## License

The marketing-site code is MIT — feel free to fork the layout. The Saaslyde **boilerplate product itself** (separate private repo) is commercially licensed.
