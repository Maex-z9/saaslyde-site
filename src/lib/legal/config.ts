// Legal config for the Saaslyde marketing site itself (NOT the boilerplate buyers ship).
// Update when the operator entity is incorporated. All fields land verbatim in /imprint
// and the /privacy page.

export const siteLegal = {
  operator: {
    name: "Saaslyde",
    legalName: "TBD — register UG/GmbH or use natural-person Impressum",
    representative: "TBD",
    street: "TBD",
    zip: "",
    city: "",
    country: "Deutschland",
    email: "support@saaslyde.com",
    phone: "",
  },

  // VAT-ID (USt-IdNr nach § 27a UStG) — required when applicable
  vatId: "",

  // Optional: § 18 Abs. 2 MStV (broadcasting law) only if you publish editorial content
  contentResponsible: "",

  // Subprocessors used by saaslyde.com itself — keep short, this list only covers the
  // marketing site's own data flow, NOT what buyers' deployed boilerplate uses.
  subprocessors: [
    { name: "Vercel Inc.", purpose: "Hosting (FRA1 region)", country: "Frankfurt, DE" },
    // Add: Plausible/Umami if analytics, Resend if contact form, etc.
  ],
} as const;
