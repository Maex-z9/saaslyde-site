export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentRecord = ConsentCategories & {
  /** Schema version. Bump this when you add/remove categories — old cookies become invalid and re-prompt. */
  v: number;
  /** ISO timestamp when consent was given. */
  t: string;
};

export const CONSENT_VERSION = 1;
export const CONSENT_COOKIE_NAME = "saaslyde-consent";
export const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year
