# Saaslyde-Site — Marketing

Sales-Page für Saaslyde. Lebt auf saaslyde.com (sobald deployed). Kein Auth, keine DB, keine Payments — rein statisch + i18n + Cookie-Consent für DSGVO.

> Strategy-Kontext (Pricing, Buyer-Personas, Launch-Plan): siehe Workspace-CLAUDE.md im Parent-Verzeichnis.
> Boilerplate-Code (das Verkaufsprodukt) lebt im Schwester-Repo `Maex-z9/saaslyde` — viele Components hier sind 1:1 Kopien von dort und können DRIFTEN. Vor Änderungen prüfen ob beide Repos gleich-ziehen sollen.

## Quick start

```bash
bun install
bun dev                        # http://localhost:3000 (oder :3001 wenn Boilerplate auf 3000 läuft)
bun run build
bun run lint
```

Copy `.env.example` → `.env.local` falls du Demo/Formspree lokal testen willst (beide optional, App läuft auch ohne).

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + TypeScript 5.9 + React 19.2 |
| UI | Shadcn UI on **Base UI** (NOT Radix) + Tailwind 4 |
| i18n | next-intl 4.11, DE + EN (gleich wie Boilerplate) |
| Theme | next-themes light/dark |
| Hosting | Vercel (FRA1 region — `vercel.json`) |
| **Bewusst weggelassen** | Supabase, Stripe, Resend (Marketing braucht nichts davon) |

## Repository layout

```
.
├── README.md                        # Public README (Stack + bun commands)
├── LICENSE                          # MIT (Marketing-Code ist kein Verkaufsprodukt)
├── components.json                  # Shadcn config (Base UI registry)
├── vercel.json                      # regions: ["fra1"]
├── messages/
│   ├── de.json                      # German (default)
│   └── en.json                      # English
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root: Geist fonts + ThemeProvider + JSON-LD Organization
│   │   ├── globals.css              # Tailwind 4 + Shadcn theme tokens
│   │   ├── sitemap.ts               # Dynamic sitemap (DE+EN, hreflang alternates)
│   │   ├── robots.ts                # allow-all + sitemap pointer
│   │   └── [locale]/
│   │       ├── layout.tsx           # Skip-link + Header + Footer + CookieBanner
│   │       ├── page.tsx             # Home: <Hero> + <Why> + <Pricing> + <Faq>
│   │       ├── customers/page.tsx   # Buyer post-purchase info ("kein Login, du hast Repo-Zugang")
│   │       ├── imprint/page.tsx     # § 5 DDG (eigenes Impressum für saaslyde.com)
│   │       ├── privacy/page.tsx     # DSGVO-Datenschutz (eigenes für saaslyde.com — Eat-own-Dogfood)
│   │       ├── error.tsx
│   │       └── not-found.tsx
│   ├── components/
│   │   ├── site-header.tsx          # Sticky nav: anchor links + Customers + LocaleSwitcher + ThemeToggle
│   │   ├── site-footer.tsx          # 3-col: Tagline / Product / Legal
│   │   ├── locale-switcher.tsx      # Globe icon dropdown
│   │   ├── theme-provider.tsx       # next-themes wrapper
│   │   ├── theme-toggle.tsx         # Sun/Moon dropdown
│   │   ├── cookie-banner.tsx        # TDDDG-konform (aria-modal, Esc-dismiss, equal-prominence)
│   │   ├── cookie-settings-button.tsx
│   │   └── landing/
│   │       ├── hero.tsx             # Headline + 2 CTAs (primary → #pricing, secondary → demo URL if env set)
│   │       ├── why.tsx              # 3 Cards: DSGVO / Stripe+SEPA / Auth+RLS (data via t.raw)
│   │       ├── pricing.tsx          # 2 Tier-Cards (disabled buttons until LS live) + <Waitlist>
│   │       └── faq.tsx              # <details>/<summary> + JSON-LD FAQPage schema
│   ├── i18n/
│   │   ├── routing.ts               # locales: ["de","en"], defaultLocale "de", as-needed prefix
│   │   ├── navigation.ts            # locale-aware Link/redirect/usePathname
│   │   └── request.ts               # getRequestConfig
│   ├── lib/
│   │   ├── utils.ts                 # cn() helper
│   │   ├── legal/
│   │   │   └── config.ts            # ⭐ siteLegal — TBD-Werte für saaslyde.com selbst (NICHT Buyer-Config)
│   │   └── consent/
│   │       ├── types.ts             # ConsentRecord, CONSENT_VERSION
│   │       ├── cookie.ts            # Client get/set saaslyde-consent cookie
│   │       └── actions.ts           # logConsent — NO-OP STUB (kein DB)
│   └── proxy.ts                     # next-intl middleware ONLY (kein Supabase chain wie im Boilerplate)
├── .env.example
└── package.json
```

## Environment variables

Alle optional — App läuft ohne. Nur was wirklich gesetzt ist, schaltet Features frei.

| Var | Default-Verhalten | Effekt wenn gesetzt |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://saaslyde.com` | Wird für `metadataBase`, sitemap, robots, OG-tags benutzt. In Dev nicht nötig. |
| `NEXT_PUBLIC_DEMO_URL` | unset | Hero-CTA "Live-Demo" + Header "Live-Demo"-Link werden NUR sichtbar wenn gesetzt. Sonst hidden statt 404. Z.B. `https://demo.saaslyde.com` oder `http://localhost:3001` für Dev. |
| `NEXT_PUBLIC_FORMSPREE_ID` | unset | Pricing-Waitlist-Form rendert NUR wenn gesetzt. Sonst zeigt fallback "schreib uns direkt @ support@…". |

## Pages

- `/` — Landing (Hero + Why + Pricing + FAQ)
- `/customers` — Was passiert nach dem Kauf (Repo-Invite, Setup, Updates, Discord)
- `/imprint` — § 5 DDG für saaslyde.com selbst
- `/privacy` — DSGVO-Erklärung für saaslyde.com selbst
- `/sitemap.xml` — App-Router special file (statisch generiert mit hreflang)
- `/robots.txt` — App-Router special file

## Gotchas

- **Proxy matcher MUSS exkludieren: `api`, `auth`, `sitemap.xml`, `robots.txt`.** Sonst rewriteted next-intl die zu `/de/sitemap.xml` etc. → 404. Aktueller matcher: `/((?!api|sitemap.xml|robots.txt|_next/static|...).*)`. (Same Bug-Klasse wie im Boilerplate für `/auth/*`.)
- **Components sind Kopien aus `Maex-z9/saaslyde` Boilerplate.** Cookie-Banner, Locale-Switcher, Theme-Toggle, ConsentTypes/Cookie sind 1:1. Wenn du im Boilerplate Bug-Fixes machst, **manuell hier nachziehen** (kein shared Package — premature optimization).
- **`logConsent` ist No-Op-Stub.** Marketing-Site hat keine DB. Wenn du später Plausible/Umami einbaust, wire den Hit dort statt in der Stub-Action.
- **DSGVO-Banner-Pre-Load-Caveat:** Der Banner rendert erst nach Page-Load. Solange die Site KEINE 3rd-Party-Tracking-Scripts lädt (aktueller Stand), ist das fine. Sobald du Analytics einführst, **MUST** du sie via `getServerConsent()` server-side gaten — nicht client-side erst dann blocken wenn Banner anwirft.
- **`siteLegal` hat TBD-Werte.** `src/lib/legal/config.ts` enthält Operator-Stub (Name, Adresse, Repräsentant). VOR Production live-schalten **PFLICHT** — sonst Impressumspflicht-Verstoß § 5 DDG.
- **Pricing-Buttons sind disabled.** Bewusst — solange Lemon Squeezy nicht live ist, würden Klicks ins Leere gehen. Wenn LS-Listing fertig ist, `<Button disabled>` durch `<Button asChild>` mit LS-URL ersetzen (siehe pricing.tsx).
- **Demo-URL + Formspree-ID env-gated.** Hero-CTA "Live-Demo" + Pricing-Waitlist-Form rendern nur wenn die jeweiligen `NEXT_PUBLIC_*` Vars gesetzt sind. Sonst hidden — kein 404, kein "submit ins Leere". Pattern bei künftigen externen Integrationen wiederverwenden.
- **Privacy/Imprint Legal-Text ist hardcoded in JSX, NICHT in messages JSON.** Zu lang für Translation-Files. Existieren als `PrivacyDE` / `PrivacyEN` Helper + im Imprint via `t(de, en)` shorthand. Section-Headers + Field-Labels kommen aus Code.
- **JSON-LD an zwei Stellen:** Organization-Schema in `app/layout.tsx`, FAQPage-Schema in `landing/faq.tsx`. Beide via `dangerouslySetInnerHTML` — Werte sind statisch hier, keine User-Inputs → safe.
- **DE/EN i18n-Parität:** Jede neue Page/Section muss in BEIDE `messages/{de,en}.json`. Audit-Agent hat aktuell 0 Drift-Findings — halten.
- **Tailwind 4 + Base UI Pattern:** Buttons komponieren via `render` prop, NICHT `asChild` (Radix-Pattern). `<Button render={<Link href="..." />}>{label}</Button>`.

## Common patterns

### Add a new translated section to the landing

1. Component nach `src/components/landing/<name>.tsx`. Server-Component (kein "use client" wenn nicht nötig).
2. `const t = await getTranslations("Namespace");` — Namespace muss in BEIDE messages JSON existieren.
3. Import in `src/app/[locale]/page.tsx` und in JSX einreihen.
4. Anchor-ID setzen (`<section id="newSection">`) → in `site-header.tsx` Anchor-Link hinzufügen + in `messages.Nav.<key>`.

### Add a new top-level page

1. `src/app/[locale]/<route>/page.tsx`.
2. `await params`, `setRequestLocale(locale)`.
3. Optional: `export async function generateMetadata({params})` für per-page title/description.
4. `src/app/sitemap.ts` PATHS-Array erweitern → automatisch in DE+EN URLs.
5. Footer-Link in `site-footer.tsx` + i18n-Key in beide messages.

### Add an env-gated CTA / form

Pattern: Variable lesen, Component nur rendern wenn vorhanden:

```tsx
const url = process.env.NEXT_PUBLIC_SOMETHING;
if (!url) return null;  // oder return <FallbackHint />;
return <Button render={<a href={url} />}>...</Button>;
```

`.env.example` aktualisieren mit Doc-Comment (pattern: was passiert wenn unset, wo den Wert herkriegen).

### Render JSON-LD structured data

Beispiele in `app/layout.tsx` (Organization) und `landing/faq.tsx` (FAQPage):

```tsx
const schema = { "@context": "https://schema.org", "@type": "...", ... };
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
```

Werte sollten statisch oder server-controlled sein — sonst HTML-escapen!

### Update a translation

Edit BEIDE `messages/de.json` UND `messages/en.json` mit demselben Key-Path. Wenn nur eine Sprache touched → next-intl rendert literal Key-String in der anderen Locale → User-sichtbarer Bug.

### Sync with boilerplate (`Maex-z9/saaslyde`)

Wenn ein Bugfix im Boilerplate (z.B. cookie-banner a11y) gemacht wird, identische Datei hier aktualisieren:

```bash
diff /home/maex/Schreibtisch/web/saaslyde/src/components/cookie-banner.tsx \
     /home/maex/Schreibtisch/web/saaslyde-site/src/components/cookie-banner.tsx
```

Nicht alles synct: marketing-site `cookie-banner` linkt auf `/privacy` der Marketing-Site, boilerplate-version linkt auf den Buyer-Privacy-Path. Inhalts-Drift erlaubt; Pattern-Drift vermeiden.
