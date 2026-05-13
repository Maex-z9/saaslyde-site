"use server";

// Marketing site has no database — consent log lives client-side in the cookie only.
// If you ever wire a Supabase or analytics destination, append to it here.
export async function logConsent(_categories: { necessary: true; analytics: boolean; marketing: boolean }) {
  // no-op
}
