import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saaslyde.com";
const TITLE = "Saaslyde — DSGVO-konformes SaaS-Boilerplate";
const DESC = "Cookie-Consent, Datenschutz-Generator, Impressum, AVV-PDFs — production-ready für den EU-Markt.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · Saaslyde" },
  description: DESC,
  keywords: ["SaaS Boilerplate", "DSGVO", "TDDDG", "Next.js 16", "Supabase", "Stripe", "Indie Hacker", "EU"],
  authors: [{ name: "Saaslyde" }],
  alternates: { canonical: "/", languages: { "de-DE": "/", "en-US": "/en" } },
  openGraph: { type: "website", siteName: "Saaslyde", title: TITLE, description: DESC, locale: "de_DE", alternateLocale: ["en_US"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/favicon.svg" },
};

// schema.org Organization — surfaces brand info in Google's Knowledge Panel + AI search.
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Saaslyde",
  url: SITE,
  logo: `${SITE}/favicon.svg`,
  description: DESC,
  sameAs: ["https://github.com/Maex-z9/saaslyde-site"],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </body>
    </html>
  );
}
