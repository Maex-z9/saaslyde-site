import { getTranslations } from "next-intl/server";

export async function Faq() {
  const t = await getTranslations("Faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  // schema.org FAQPage — eligible for rich-snippet display in Google search results.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
      <div className="mt-10 flex flex-col gap-3">
        {items.map((item) => (
          <details key={item.q} className="group rounded-lg border bg-card p-5 open:shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between font-medium rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {item.q}
              <span aria-hidden="true" className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  );
}
