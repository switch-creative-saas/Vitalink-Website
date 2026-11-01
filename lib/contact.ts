// The contact form posts to the workspace app's Supabase function "website-contact",
// which sends through the app's Resend setup. The anon key is public by design.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ynbdsrazaplzsrllfgym.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYmRzcmF6YXBsenNybGxmZ3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNDUwNDksImV4cCI6MjEwNzcyMTA0OX0.GpapL6Uo_jZ84AY8Z03BVWNhC5AfXsJE_gsDyT201nk";

export type ContactMessage = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** Hidden spam trap; real visitors leave it empty. Named so browsers don't autofill it. */
  vl_trap: string;
};

export async function sendContactMessage(message: ContactMessage) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/website-contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(message),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.sent) {
    throw new Error(typeof data.error === "string" ? data.error : "We could not send your message.");
  }
}
