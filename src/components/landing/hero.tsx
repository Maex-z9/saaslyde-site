import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

export async function Hero() {
  const t = await getTranslations("Hero");
  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL;

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
        {demoUrl && (
          <Button size="lg" variant="outline" render={<a href={demoUrl} target="_blank" rel="noopener noreferrer" />}>
            {t("ctaSecondary")}
          </Button>
        )}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">{t("trust")}</p>
    </section>
  );
}
