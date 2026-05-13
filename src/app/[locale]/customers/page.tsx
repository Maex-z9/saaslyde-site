import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { siteLegal } from "@/lib/legal/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "de"
    ? { title: "Käufer", description: "Was nach dem Kauf von Saaslyde passiert — Repo-Invite, Setup, Updates, Discord." }
    : { title: "Customers", description: "What happens after buying Saaslyde — repo invite, setup, updates, Discord." };
}

export default async function CustomersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Customers");

  const steps = [1, 2, 3, 4].map((i) => ({
    title: t(`step${i}Title`),
    body: t(`step${i}Body`),
  }));

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>

      <div className="mt-12 grid gap-4">
        {steps.map((s) => (
          <Card key={s.title}>
            <CardHeader><CardTitle className="text-lg">{s.title}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-primary/30 bg-primary/5">
        <CardHeader><CardTitle className="text-lg">{t("discordTitle")}</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{t("discordBody")}</p>
        </CardContent>
      </Card>

      <div className="mt-10 rounded-lg border bg-muted/30 p-6">
        <h2 className="text-base font-semibold">{t("noLoginTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("noLoginBody")}</p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button render={<a href={`mailto:${siteLegal.operator.email}`} />}>{t("ctaSupport")}</Button>
        <Button variant="outline" render={<Link href="/#pricing" />}>{t("ctaPricing")}</Button>
      </div>
    </main>
  );
}
