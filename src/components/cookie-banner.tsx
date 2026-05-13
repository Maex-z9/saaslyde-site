"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link } from "@/i18n/navigation";
import { logConsent } from "@/lib/consent/actions";
import { getClientConsent, setClientConsent } from "@/lib/consent/cookie";

export const COOKIE_PREFERENCES_EVENT = "saaslyde:open-cookie-preferences";

export function CookieBanner() {
  const t = useTranslations("Consent");
  const [show, setShow] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Show on first visit OR when "Cookie settings" elsewhere fires the open event.
  useEffect(() => {
    const existing = getClientConsent();
    if (existing === null) setShow(true);
    else { setAnalytics(existing.analytics); setMarketing(existing.marketing); }

    const openHandler = () => {
      const current = getClientConsent();
      if (current) { setAnalytics(current.analytics); setMarketing(current.marketing); }
      setCustomizing(true);
      setShow(true);
    };
    window.addEventListener(COOKIE_PREFERENCES_EVENT, openHandler);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, openHandler);
  }, []);

  // Escape-to-dismiss (WCAG 2.1.1).
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShow(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  if (!show) return null;

  function persist(c: { analytics: boolean; marketing: boolean }) {
    setClientConsent(c);
    void logConsent({ necessary: true, ...c }); // best-effort server log
    setShow(false);
    setCustomizing(false);
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={t("title")} className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardContent className="flex flex-col gap-4 p-6">
          {!customizing ? (
            <>
              <div>
                <h2 className="text-lg font-semibold">{t("title")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.rich("description", {
                    privacy: (chunks) => <Link href="/privacy" className="underline hover:no-underline">{chunks}</Link>,
                  })}
                </p>
              </div>
              {/* TDDDG § 25(4): "Reject all" must have equal visual prominence to "Accept all". */}
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Button variant="ghost" onClick={() => setCustomizing(true)}>{t("customize")}</Button>
                <Button onClick={() => persist({ analytics: false, marketing: false })}>{t("rejectAll")}</Button>
                <Button onClick={() => persist({ analytics: true, marketing: true })}>{t("acceptAll")}</Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-semibold">{t("customizeTitle")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("customizeSubtitle")}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Row label={t("necessary")} description={t("necessaryDesc")} checked disabled onChange={() => {}} />
                <Row label={t("analytics")} description={t("analyticsDesc")} checked={analytics} onChange={setAnalytics} />
                <Row label={t("marketing")} description={t("marketingDesc")} checked={marketing} onChange={setMarketing} />
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Button variant="ghost" onClick={() => setCustomizing(false)}>{t("back")}</Button>
                <Button onClick={() => persist({ analytics, marketing })}>{t("saveSelection")}</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, description, checked, disabled, onChange }: {
  label: string; description: string; checked: boolean; disabled?: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-md border p-3">
      <Switch checked={checked} disabled={disabled} onCheckedChange={onChange} className="mt-1" />
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
