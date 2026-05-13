import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { siteLegal } from "@/lib/legal/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "de"
    ? { title: "Datenschutz", description: "Datenschutzerklärung gemäß DSGVO für die Saaslyde-Website." }
    : { title: "Privacy Policy", description: "GDPR-compliant privacy policy for the Saaslyde website." };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale === "de" ? <PrivacyDE /> : <PrivacyEN />;
}

function PrivacyDE() {
  const op = siteLegal.operator;
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-sm">
      <h1 className="text-3xl font-bold tracking-tight">Datenschutzerklärung</h1>
      <p className="mt-2 text-muted-foreground">Stand: {new Date().toLocaleDateString("de-DE")}</p>

      <Section title="1. Verantwortlicher">
        <p>{op.legalName}, {op.street}, {op.zip} {op.city}, {op.country}.</p>
        <p>Kontakt: {op.email}{op.phone ? ` · ${op.phone}` : ""}</p>
      </Section>

      <Section title="2. Welche Daten wir auf saaslyde.com erheben">
        <p>
          Beim Besuch unserer Website werden technisch notwendige Daten verarbeitet (IP-Adresse, User-Agent,
          Zeitstempel, abgerufene URL). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an Bereitstellung und Sicherheit der Website). Speicherdauer: maximal 7 Tage in Server-Logs.
        </p>
      </Section>

      <Section title="3. Cookies">
        <p>
          Wir verwenden ausschließlich technisch notwendige Cookies für die Speicherung deiner Cookie-Einstellungen
          (saaslyde-consent). Optionale Cookies für Analyse oder Marketing setzen wir nur nach deiner ausdrücklichen
          Einwilligung (§ 25 Abs. 1 TDDDG). Du kannst deine Einwilligung jederzeit über den Footer-Link
          „Cookie-Einstellungen" widerrufen.
        </p>
      </Section>

      <Section title="4. Empfänger / Auftragsverarbeiter">
        <p>Folgende Dienstleister verarbeiten Daten für saaslyde.com im Rahmen einer Auftragsverarbeitung (Art. 28 DSGVO):</p>
        <ul className="mt-2 list-disc pl-5">
          {siteLegal.subprocessors.map((s) => (
            <li key={s.name}><strong>{s.name}</strong> ({s.country}) — {s.purpose}</li>
          ))}
        </ul>
      </Section>

      <Section title="5. Deine Rechte">
        <p>
          Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung
          (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Anfragen an: {op.email}.
          Beschwerderecht bei der zuständigen Aufsichtsbehörde.
        </p>
      </Section>

      <Section title="6. Geltungsbereich">
        <p>
          Diese Erklärung gilt nur für saaslyde.com selbst. Käufer des Saaslyde-Boilerplates betreiben ihre eigene
          Datenschutzerklärung — Saaslyde liefert dafür eine konfigurierbare Vorlage, ist aber nicht
          Verantwortlicher der dort verarbeiteten Daten.
        </p>
      </Section>
    </main>
  );
}

function PrivacyEN() {
  const op = siteLegal.operator;
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-sm">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US")}</p>

      <Section title="1. Controller">
        <p>{op.legalName}, {op.street}, {op.zip} {op.city}, {op.country}.</p>
        <p>Contact: {op.email}{op.phone ? ` · ${op.phone}` : ""}</p>
      </Section>

      <Section title="2. What we collect on saaslyde.com">
        <p>
          When you visit our website, technically necessary data is processed (IP address, user agent, timestamp,
          requested URL). Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in providing and securing the site).
          Retention: max. 7 days in server logs.
        </p>
      </Section>

      <Section title="3. Cookies">
        <p>
          We only use technically necessary cookies to store your cookie preferences (saaslyde-consent). Optional
          cookies for analytics or marketing are only set with your explicit consent (§ 25 (1) TDDDG / EU ePrivacy).
          You can withdraw consent at any time via the "Cookie settings" link in the footer.
        </p>
      </Section>

      <Section title="4. Recipients / Processors">
        <p>The following processors handle data for saaslyde.com under Art. 28 GDPR data processing agreements:</p>
        <ul className="mt-2 list-disc pl-5">
          {siteLegal.subprocessors.map((s) => (
            <li key={s.name}><strong>{s.name}</strong> ({s.country}) — {s.purpose}</li>
          ))}
        </ul>
      </Section>

      <Section title="5. Your rights">
        <p>
          You have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18),
          data portability (Art. 20) and objection (Art. 21 GDPR). Requests to: {op.email}. Right to lodge a
          complaint with the competent supervisory authority.
        </p>
      </Section>

      <Section title="6. Scope">
        <p>
          This policy covers saaslyde.com only. Buyers of the Saaslyde boilerplate operate their own privacy policy —
          Saaslyde provides a configurable template but is not the controller for data processed by buyers' deployments.
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-2 space-y-2 text-muted-foreground">{children}</div>
    </section>
  );
}
