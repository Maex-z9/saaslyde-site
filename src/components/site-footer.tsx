import { getTranslations } from "next-intl/server";

import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { Link } from "@/i18n/navigation";
import { siteLegal } from "@/lib/legal/config";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const linkClass = "hover:text-foreground hover:underline";

  return (
    <footer className="mt-auto border-t bg-card/30">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-semibold tracking-tight">Saaslyde</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>
        </div>

        <Column title={t("product")}>
          <a href="#features" className={linkClass}>Features</a>
          <a href="#pricing" className={linkClass}>Pricing</a>
          <a href="#faq" className={linkClass}>FAQ</a>
        </Column>

        <Column title={t("legal")}>
          <Link href="/privacy" className={linkClass}>{t("privacy")}</Link>
          <Link href="/imprint" className={linkClass}>{t("imprint")}</Link>
          <CookieSettingsButton className={linkClass}>{t("cookieSettings")}</CookieSettingsButton>
          <a href={`mailto:${siteLegal.operator.email}`} className={linkClass}>{t("contact")}</a>
        </Column>
      </div>

      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Saaslyde · {t("rights")}
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
        {Array.isArray(children) ? children.map((c, i) => <li key={i}>{c}</li>) : <li>{children}</li>}
      </ul>
    </div>
  );
}
