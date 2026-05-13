import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "@/i18n/navigation";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">Saaslyde</Link>
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" render={<a href="#features" />}>{t("features")}</Button>
          <Button variant="ghost" size="sm" render={<a href="#pricing" />}>{t("pricing")}</Button>
          <Button variant="ghost" size="sm" render={<a href="#faq" />}>{t("faq")}</Button>
          <Button variant="ghost" size="sm" render={<a href="https://demo.saaslyde.com" target="_blank" rel="noopener" />}>
            {t("demo")}
          </Button>
          <LocaleSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
