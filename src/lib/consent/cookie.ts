"use client";

import {
  CONSENT_COOKIE_MAX_AGE_SECONDS,
  CONSENT_COOKIE_NAME,
  CONSENT_VERSION,
  type ConsentCategories,
  type ConsentRecord,
} from "./types";

export function getClientConsent(): ConsentRecord | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]+)`),
  );
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as ConsentRecord;
    if (parsed.v !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setClientConsent(
  categories: Omit<ConsentCategories, "necessary"> & { necessary?: true },
): ConsentRecord {
  const record: ConsentRecord = {
    v: CONSENT_VERSION,
    t: new Date().toISOString(),
    necessary: true,
    analytics: categories.analytics,
    marketing: categories.marketing,
  };
  const value = encodeURIComponent(JSON.stringify(record));
  const secure = process.env.NODE_ENV === "production" ? "secure;" : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${value};path=/;max-age=${CONSENT_COOKIE_MAX_AGE_SECONDS};samesite=lax;${secure}`;
  return record;
}
