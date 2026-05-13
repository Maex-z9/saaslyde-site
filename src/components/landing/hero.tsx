import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
      <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">
        {t("headline")}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
        {t("subhead")}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button size="lg" render={<a href="#pricing" />}>{t("ctaPrimary")}</Button>
        <Button size="lg" variant="outline" render={<a href="https://demo.saaslyde.com" target="_blank" rel="noopener" />}>
          {t("ctaSecondary")}
        </Button>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">{t("trust")}</p>
    </section>
  );
}
