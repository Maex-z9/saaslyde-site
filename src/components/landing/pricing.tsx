import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Plan = {
  name: string; price: string; features: string[]; cta: string;
  badge?: string; highlight?: boolean;
};

export async function Pricing() {
  const t = await getTranslations("Pricing");

  const plans: Plan[] = [
    { name: t("starterName"), price: t("starterPrice"), features: t.raw("starterFeatures"), cta: t("starterCta") },
    { name: t("proName"), price: t("proPrice"), features: t.raw("proFeatures"), cta: t("proCta"),
      badge: t("proBadge"), highlight: true },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
        {plans.map((p) => <PlanCard key={p.name} {...p} />)}
      </div>

      <div className="mx-auto mt-10 max-w-md text-center">
        <p className="text-sm text-muted-foreground">{t("comingSoon")}</p>
        <Waitlist placeholder={t("waitlistPlaceholder")} submit={t("waitlistSubmit")} fallback={t("waitlistFallback")} />
      </div>
    </section>
  );
}

// Renders the form only when NEXT_PUBLIC_FORMSPREE_ID is set in the deployment env.
// Stops the placeholder action from silently swallowing submits in preview deploys.
function Waitlist({ placeholder, submit, fallback }: { placeholder: string; submit: string; fallback: string }) {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (!id) {
    return <p className="mt-3 text-xs italic text-muted-foreground">{fallback}</p>;
  }
  return (
    <form action={`https://formspree.io/f/${id}`} method="POST" className="mt-3 flex gap-2">
      <Input name="email" type="email" required placeholder={placeholder} />
      <Button type="submit">{submit}</Button>
    </form>
  );
}

function PlanCard({ name, price, features, cta, badge, highlight }: Plan) {
  return (
    <Card className={highlight ? "border-primary shadow-md" : undefined}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-2xl">{name}</CardTitle>
          {badge && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              {badge}
            </span>
          )}
        </div>
        <CardDescription className="mt-2">
          <span className="text-4xl font-bold text-foreground">{price}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2 text-sm">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {/* Disabled until Lemon Squeezy listing is live; replace with checkout URL then. */}
        <Button className="w-full" variant={highlight ? "default" : "outline"} disabled>{cta}</Button>
      </CardFooter>
    </Card>
  );
}
