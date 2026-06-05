"use client";

import { Check } from "lucide-react";
import { SectionContainer } from "./section-container";
import { DashboardMockup } from "./dashboard-mockup";

const vitamindFeatures = [
  "Clinical Recommendations",
  "Differential Diagnosis Support",
  "Medical Documentation Assistance",
  "Triage Support",
  "Public Health Analytics",
  "Disease Risk Prediction",
];

export function VitamindSection() {
  return (
    <section id="vitamind" className="py-20 lg:py-28 bg-white">
      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
          <div className="min-w-0 order-2 lg:order-1">
            <DashboardMockup
              accent="purple"
              title="VitaMind AI — Clinical Intelligence"
            />
          </div>

          <div className="min-w-0 order-1 lg:order-2">
            <span className="text-xs font-semibold text-[#7C3AED] tracking-widest uppercase">
              VitaMind AI
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
              Clinical Intelligence for Better Healthcare
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              VitaMind helps healthcare professionals make faster, safer, and more
              informed decisions.
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vitamindFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 min-w-0">
                  <Check className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground break-words">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
