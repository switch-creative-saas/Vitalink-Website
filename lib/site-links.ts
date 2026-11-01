// Product URLs used across the marketing site.
export const APP_URL = "https://app.vitalink.africa";
export const DEMO_URL = "https://calendar.app.google/mpgibQjd3RzayAvx9";

export type PlanId = "free" | "trial" | "starter" | "growth";

/** Workspace sign-up with the plan already chosen, so the app skips its own plan picker. */
export function registerUrl(plan: PlanId, cycle: "monthly" | "annual" = "monthly") {
  const params = new URLSearchParams({ plan });
  if (plan === "starter" || plan === "growth") params.set("cycle", cycle);
  return `${APP_URL}/register?${params.toString()}`;
}

/** Every "Start free trial" button: 14 days of Growth, no payment. */
export const SIGNUP_URL = registerUrl("trial");
