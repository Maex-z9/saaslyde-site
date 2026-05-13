import { setRequestLocale } from "next-intl/server";

import { siteLegal } from "@/lib/legal/config";

export default async function ImprintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const op = siteLegal.operator;
  const isDe = locale === "de";

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">{isDe ? "Impressum" : "Imprint"}</h1>

      <section className="mt-8 space-y-4 text-sm">
        <p className="text-muted-foreground">
          {isDe ? "Angaben gemäß § 5 DDG" : "Information per § 5 DDG (German Digital Services Act)"}
        </p>

        <div>
          <p className="font-medium">{op.legalName}</p>
          <p>{op.street}</p>
          <p>{op.zip} {op.city}</p>
          <p>{op.country}</p>
        </div>

        <div>
          <p className="font-medium">{isDe ? "Vertreten durch" : "Represented by"}</p>
          <p>{op.representative}</p>
        </div>

        <div>
          <p className="font-medium">{isDe ? "Kontakt" : "Contact"}</p>
          <p>E-Mail: {op.email}</p>
          {op.phone && <p>{isDe ? "Telefon" : "Phone"}: {op.phone}</p>}
        </div>

        {siteLegal.vatId && (
          <div>
            <p className="font-medium">{isDe ? "Umsatzsteuer-ID" : "VAT ID"}</p>
            <p>{isDe ? "USt-IdNr. nach § 27a UStG: " : "Per § 27a UStG: "}{siteLegal.vatId}</p>
          </div>
        )}

        {siteLegal.contentResponsible && (
          <div>
            <p className="font-medium">
              {isDe ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" : "Editorially responsible per § 18 (2) MStV"}
            </p>
            <p>{siteLegal.contentResponsible}</p>
          </div>
        )}

        <div className="pt-4 text-xs text-muted-foreground">
          <p>
            {isDe
              ? "Streitschlichtung: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:"
              : "Dispute resolution: The European Commission provides an online dispute resolution platform:"}{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener" className="underline hover:no-underline">
              ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="mt-2">
            {isDe
              ? "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
              : "We are not willing or obligated to participate in dispute resolution proceedings before a consumer arbitration board."}
          </p>
        </div>
      </section>
    </main>
  );
}
