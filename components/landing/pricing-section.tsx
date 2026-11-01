"use client";

import { useState } from "react";
import { ArrowRight, Check, Radar } from "lucide-react";
import { cn } from "@/lib/utils";
import { LAUNCHED, registerUrl, type PlanId } from "@/lib/site-links";
import { SplitText } from "./motion";
import { Reveal } from "./reveal";
import { SectionContainer } from "./section-container";

type Cycle = "monthly" | "annual";

type Plan = {
  name: string;
  planId?: PlanId;
  tagline: string;
  monthly: number | null;
  annual: number;
  note?: string;
  highlighted?: boolean;
  features: string[];
  cta: string;
  href?: string;
};

// Prices mirror src/data/pricingTiers.ts in the workspace app.
// Paid plans link to the app's sign-up with the plan chosen; payment follows once the workspace exists.
const plans: Plan[] = [
  {
    name: "Free",
    tagline: "To get started",
    monthly: 0,
    annual: 0,
    note: "Free forever",
    features: ["Up to 2 staff and 50 patients", "Patient registry", "Basic clinical notes", "Appointments"],
    cta: "Start free",
    planId: "free",
  },
  {
    name: "Starter",
    tagline: "Small clinics, 1–2 doctors",
    monthly: 45000,
    annual: 450000,
    features: [
      "Up to 5 staff and 500 patients",
      "EMR, appointments and SMS reminders",
      "Invoicing and receipts",
      "Pharmacy stock tracking",
      "Import from paper registers",
    ],
    cta: "Choose Starter",
    planId: "starter",
  },
  {
    name: "Growth",
    tagline: "Hospitals with 3–15 doctors",
    monthly: 120000,
    annual: 1200000,
    highlighted: true,
    features: [
      "Up to 20 staff, unlimited patients",
      "Full EMR, lab and pharmacy",
      "HMO and insurance claims",
      "Telemedicine",
      "VitaMind AI and consultation scribe",
      "VitaLink Network referrals",
      "Priority email and WhatsApp support",
    ],
    cta: "Choose Growth",
    planId: "growth",
  },
  {
    name: "Enterprise",
    tagline: "Groups, government and NGOs",
    monthly: null,
    annual: 3000000,
    note: "From ₦3,000,000 a year, invoiced annually",
    features: [
      "Unlimited staff",
      "Multi-facility management",
      "Full Sentinel surveillance",
      "Custom integrations",
      "Dedicated onboarding and training",
      "SLA and uptime commitments",
    ],
    cta: "Contact sales",
    href: "/contact",
  },
];

const naira = (value: number) => `₦${value.toLocaleString("en-NG")}`;

export function PricingSection() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <section id="pricing" className="relative z-10 rounded-t-[2.25rem] bg-white py-14 shadow-[0_-30px_60px_-24px_rgba(11,16,32,0.3)] lg:rounded-t-[3rem] lg:py-24">
      <SectionContainer>
        <Reveal className="mx-auto max-w-3xl text-center">
          <SplitText text="Simple pricing in naira" className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-ink text-balance sm:text-5xl lg:text-6xl" />
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            {LAUNCHED
              ? "Pay monthly or yearly through Paystack. Manage your plan from inside your workspace."
              : "Plans open at launch. Join the waitlist for early access; you'll pay monthly or yearly through Paystack."}
          </p>

          <div className="mt-8 inline-flex rounded-full bg-surface p-1" role="group" aria-label="Billing cycle">
            {(["monthly", "annual"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={cycle === option}
                onClick={() => setCycle(option)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  cycle === option ? "bg-ink text-white" : "text-foreground/70 hover:text-foreground"
                )}
              >
                {option === "monthly" ? "Monthly" : "Yearly · 2 months free"}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => {
            const price =
              plan.monthly === null
                ? "Custom"
                : cycle === "monthly"
                  ? naira(plan.monthly)
                  : naira(Math.round(plan.annual / 12));
            const caption =
              plan.note ??
              (cycle === "monthly" ? "per month" : `per month, billed ${naira(plan.annual)} yearly`);

            return (
              <Reveal
                key={plan.name}
                delay={index * 80}
                className={cn(
                  "flex flex-col rounded-[2rem] p-7",
                  plan.highlighted ? "bg-primary text-white" : "bg-surface text-foreground"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-medium">{plan.name}</h3>
                  {plan.highlighted && (
                    <span className="rounded-full bg-sun px-3 py-1 text-xs font-medium text-ink">Most chosen</span>
                  )}
                </div>
                <p className={cn("mt-1 text-sm", plan.highlighted ? "text-white/75" : "text-muted-foreground")}>
                  {plan.tagline}
                </p>

                <p className="mt-8 text-4xl font-normal tracking-[-0.03em]">{price}</p>
                <p className={cn("mt-1 min-h-10 text-xs", plan.highlighted ? "text-white/70" : "text-muted-foreground")}>
                  {caption}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", plan.highlighted ? "text-sun" : "text-primary")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.planId ? registerUrl(plan.planId, cycle) : plan.href}
                  className={cn(
                    "mt-8 rounded-full py-3 text-center text-sm font-medium transition-colors",
                    plan.highlighted
                      ? "bg-white text-primary hover:bg-sun hover:text-ink"
                      : "bg-ink text-white hover:bg-primary"
                  )}
                >
                  {LAUNCHED || !plan.planId ? plan.cta : "Join waitlist"}
                </a>
                {LAUNCHED && plan.planId === "growth" && (
                  <a
                    href={registerUrl("trial")}
                    className="mt-3 text-center text-xs text-white/80 underline-offset-4 hover:text-white hover:underline"
                  >
                    Or try it free for 14 days, no card needed
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <p className="rounded-2xl border border-border px-5 py-4">
            <span className="font-medium text-foreground">Sentinel add-on:</span> full surveillance access for Starter
            and Growth at ₦50,000 a month.
          </p>
          <p className="rounded-2xl border border-border px-5 py-4">
            <span className="font-medium text-foreground">VitaCards:</span> ₦2,500 per card, ordered from your workspace.
          </p>
        </Reveal>

        {/* Sentinel registration for organisations: not open yet */}
        <Reveal className="relative mt-10 overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sun text-ink">
                  <Radar className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sun ring-1 ring-sun/30">
                  Coming soon
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">Sentinel for organisations</h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">
                Ministries, state health agencies, NGOs and research teams will be able to register their organisation
                for VitaLink Sentinel: disease surveillance, case reporting and outbreak alerts.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/15 px-7 py-3.5 text-sm font-medium text-white/60"
              >
                Register your organisation
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-sm text-white/60">
                Registration opens soon.{" "}
                <a href="/contact" className="text-white underline-offset-4 hover:underline">
                  Talk to us
                </a>{" "}
                in the meantime.
              </p>
            </div>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
