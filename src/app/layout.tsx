import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saaslyde.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Saaslyde — DSGVO-konformes SaaS-Boilerplate",
    template: "%s · Saaslyde",
  },
  description:
    "Next.js 16 + Supabase + Stripe Boilerplate mit Cookie-Consent, Datenschutz-Generator, Impressum, AVV-PDFs — production-ready für den EU-Markt.",
  keywords: ["SaaS Boilerplate", "DSGVO", "TDDDG", "Next.js 16", "Supabase", "Stripe", "Indie Hacker", "EU"],
  authors: [{ name: "Saaslyde" }],
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Saaslyde",
    title: "Saaslyde — DSGVO-konformes SaaS-Boilerplate",
    description: "Cookie-Consent, Datenschutz-Generator, Impressum, AVV-PDFs — production-ready für den EU-Markt.",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saaslyde — DSGVO-konformes SaaS-Boilerplate",
    description: "Cookie-Consent, Datenschutz-Generator, Impressum, AVV-PDFs — production-ready für den EU-Markt.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.svg" },
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
      </body>
    </html>
  );
}
