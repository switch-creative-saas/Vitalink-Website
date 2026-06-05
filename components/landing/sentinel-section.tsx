"use client";

import { Check } from "lucide-react";
import { SectionContainer } from "./section-container";
import { DashboardMockup } from "./dashboard-mockup";

const sentinelFeatures = [
  "Disease Tracking",
  "Outbreak Detection",
  "Heatmaps",
  "Case Reporting",
  "NTD Surveillance",
  "Emergency Operations Dashboard",
];

export function SentinelSection() {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
          <div className="min-w-0">
            <span className="text-xs font-semibold text-[#2563EB] tracking-widest uppercase">
              VitaLink Sentinel
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
              National Disease Intelligence Platform
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              VitaLink Sentinel enables real-time disease surveillance, outbreak
              detection, epidemiological reporting, and public health intelligence.
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sentinelFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 min-w-0">
                  <Check className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground break-words">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <DashboardMockup
              accent="blue"
              title="VitaLink Sentinel — Surveillance"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
