import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function Why() {
  const t = await getTranslations("Why");
  const cards = [1, 2, 3].map((i) => ({
    title: t(`card${i}Title`),
    items: t.raw(`card${i}Items`) as string[],
  }));

  return (
    <section id="features" className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader><CardTitle className="text-xl">{c.title}</CardTitle></CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 text-sm">
                {c.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
