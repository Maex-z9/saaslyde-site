import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/landing/hero";
import { Why } from "@/components/landing/why";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Why />
      <Pricing />
      <Faq />
    </main>
  );
}
