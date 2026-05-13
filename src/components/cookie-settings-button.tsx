"use client";

import { COOKIE_PREFERENCES_EVENT } from "./cookie-banner";

export function CookieSettingsButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(COOKIE_PREFERENCES_EVENT))}
    >
      {children}
    </button>
  );
}
