import { setRequestLocale } from "next-intl/server";

import { siteLegal } from "@/lib/legal/config";

export default async function ImprintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const op = siteLegal.operator;
  const t = <T,>(de: T, en: T) => (locale === "de" ? de : en);

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">{t("Impressum", "Imprint")}</h1>

      <section className="mt-8 space-y-4 text-sm">
        <p className="text-muted-foreground">
          {t("Angaben gemäß § 5 DDG", "Information per § 5 DDG (German Digital Services Act)")}
        </p>

        <div>
          <p className="font-medium">{op.legalName}</p>
          <p>{op.street}</p>
          <p>{op.zip} {op.city}</p>
          <p>{op.country}</p>
        </div>

        <Field label={t("Vertreten durch", "Represented by")}>{op.representative}</Field>

        <div>
          <p className="font-medium">{t("Kontakt", "Contact")}</p>
          <p>E-Mail: {op.email}</p>
          {op.phone && <p>{t("Telefon", "Phone")}: {op.phone}</p>}
        </div>

        {siteLegal.vatId && (
          <Field label={t("Umsatzsteuer-ID", "VAT ID")}>
            {t("USt-IdNr. nach § 27a UStG: ", "Per § 27a UStG: ")}{siteLegal.vatId}
          </Field>
        )}

        {siteLegal.contentResponsible && (
          <Field label={t("Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV", "Editorially responsible per § 18 (2) MStV")}>
            {siteLegal.contentResponsible}
          </Field>
        )}

        <div className="pt-4 text-xs text-muted-foreground space-y-2">
          <p>
            {t(
              "Streitschlichtung: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:",
              "Dispute resolution: The European Commission provides an online dispute resolution platform:",
            )}{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              ec.europa.eu/consumers/odr
            </a>
          </p>
          <p>
            {t(
              "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
              "We are not willing or obligated to participate in dispute resolution proceedings before a consumer arbitration board.",
            )}
          </p>
        </div>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-medium">{label}</p>
      <p>{children}</p>
    </div>
  );
}
