import { getTranslations } from "next-intl/server";

import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { Link } from "@/i18n/navigation";
import { siteLegal } from "@/lib/legal/config";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-auto border-t bg-card/30">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-semibold tracking-tight">Saaslyde</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>
        </div>

        <div>
          <p className="text-sm font-medium">{t("product")}</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground hover:underline">Features</a></li>
            <li><a href="#pricing" className="hover:text-foreground hover:underline">Pricing</a></li>
            <li><a href="#faq" className="hover:text-foreground hover:underline">FAQ</a></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">{t("legal")}</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-foreground hover:underline">{t("privacy")}</Link></li>
            <li><Link href="/imprint" className="hover:text-foreground hover:underline">{t("imprint")}</Link></li>
            <li>
              <CookieSettingsButton className="hover:text-foreground hover:underline">
                {t("cookieSettings")}
              </CookieSettingsButton>
            </li>
            <li>
              <a href={`mailto:${siteLegal.operator.email}`} className="hover:text-foreground hover:underline">
                {t("contact")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Saaslyde · {t("rights")}
      </div>
    </footer>
  );
}
