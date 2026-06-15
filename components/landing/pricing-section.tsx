"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import TiltCards from "@/components/TiltCards";
import { cn } from "@/lib/utils";
import { SectionContainer } from "./section-container";

const individualBenefits = [
  "Emergency Access",
  "Health Records",
  "Telemedicine",
  "Insurance Integration",
  "Secure Identity",
];

const hospitalPlans = [
  {
    name: "Starter",
    price: "₦25,000",
    suffix: "/month",
    popular: false,
    features: [
      "Patient Management",
      "Basic EMR",
      "Appointments",
      "Reporting",
    ],
    cta: "Start Free",
  },
  {
    name: "Professional",
    price: "₦100,000",
    suffix: "/month",
    popular: true,
    features: [
      "Advanced EMR",
      "Pharmacy",
      "Laboratory",
      "Telemedicine",
      "Billing",
      "Analytics",
    ],
    cta: "Subscribe Now",
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    suffix: "",
    popular: false,
    features: [
      "Multi-Branch",
      "Sentinel",
      "VitaMind AI",
      "API Access",
      "Dedicated Support",
      "Government Integrations",
    ],
    cta: "Contact Sales",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <SectionContainer>
        {/* Individuals */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 min-w-0">
          <div className="min-w-0">
            <span className="text-xs font-semibold text-[#2563EB] tracking-widest uppercase">
              For Individuals
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
              Join the VitaCard Waitlist
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Be among the first to access Africa&apos;s next-generation digital health
              identity.
            </p>

            <ul className="mt-8 space-y-3">
              {individualBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#2563EB] shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-8 font-medium w-full sm:w-auto"
              asChild
            >
              <a href="/waitlist">Join Waitlist</a>
            </Button>
          </div>

          {/* VitaCard card cluster */}
          <div className="flex justify-center min-w-0">
            <div className="flex items-center justify-center w-full h-full min-h-[380px]">
              <TiltCards />
            </div>
          </div>
        </div>

        {/* Hospitals */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#2563EB] tracking-widest uppercase">
            For Hospitals & Institutions
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
            Seamless access for healthcare organizations
          </h2>
          <p className="mt-4 text-muted-foreground">
            Choose the plan that fits your facility. Scale as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
          {hospitalPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl bg-white border p-6 lg:p-8 min-w-0 h-full",
                plan.popular
                  ? "border-[#2563EB] ring-2 ring-[#2563EB] shadow-premium-lg"
                  : "border-border shadow-sm"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded-full">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-bold text-foreground break-words">
                  {plan.price}
                </span>
                {plan.suffix && (
                  <span className="text-muted-foreground text-sm ml-1">{plan.suffix}</span>
                )}
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 min-w-0">
                    <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground break-words">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className={cn(
                  "w-full rounded-xl h-11 font-medium",
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-white border border-border text-foreground hover:bg-[#F8FAFC]"
                )}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <a href={plan.cta === "Contact Sales" ? "/contact" : "/waitlist"}>{plan.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
