// Product URLs used across the marketing site.
export const APP_URL = "https://app.vitalink.africa";
export const DEMO_URL = "https://calendar.app.google/mpgibQjd3RzayAvx9";
export const WAITLIST_URL = "/waitlist";

/**
 * Set to true at launch. Until then the site shows no Log in, free trial or plan sign-up links:
 * every call to action goes to the waitlist instead.
 */
export const LAUNCHED = false;

export type PlanId = "free" | "trial" | "starter" | "growth";

/** Workspace sign-up with the plan already chosen, so the app skips its own plan picker. */
export function registerUrl(plan: PlanId, cycle: "monthly" | "annual" = "monthly") {
  if (!LAUNCHED) return WAITLIST_URL;
  const params = new URLSearchParams({ plan });
  if (plan === "starter" || plan === "growth") params.set("cycle", cycle);
  return `${APP_URL}/register?${params.toString()}`;
}

/** The main call to action: the free trial after launch, the waitlist before. */
export const SIGNUP_URL = registerUrl("trial");
export const SIGNUP_LABEL = LAUNCHED ? "Start free trial" : "Join waitlist";
