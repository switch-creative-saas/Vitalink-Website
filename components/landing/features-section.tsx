"use client";

import {
  Building2,
  CreditCard,
  Link2,
  Radar,
  Shield,
  Smartphone,
  Sparkles,
  WifiOff,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionContainer } from "./section-container";

const features = [
  {
    title: "VitaCard Identity",
    description:
      "Secure NFC health identity for instant patient verification and emergency access.",
    icon: CreditCard,
    accent: "blue" as const,
  },
  {
    title: "Patient App",
    description:
      "Appointments, records, telemedicine, insurance, and personal health management.",
    icon: Smartphone,
    accent: "blue" as const,
  },
  {
    title: "Hospital System",
    description:
      "EMR, pharmacy, laboratory, appointments, billing, HR, inventory, and analytics.",
    icon: Building2,
    accent: "blue" as const,
  },
  {
    title: "VitaMind AI",
    description:
      "Clinical intelligence that supports healthcare workers with insights and recommendations.",
    icon: Sparkles,
    accent: "purple" as const,
  },
  {
    title: "VitaLink Sentinel",
    description:
      "Real-time disease surveillance, outbreak intelligence, epidemiology, and public health reporting.",
    icon: Radar,
    accent: "blue" as const,
  },
];

const valueProps = [
  { label: "Offline-First", icon: WifiOff },
  { label: "Secure & Private", icon: Shield },
  { label: "AI-Powered", icon: Brain },
  { label: "Interoperable", icon: Link2 },
];

function FeatureCard({
  feature,
}: {
  feature: (typeof features)[0];
}) {
  const Icon = feature.icon;
  const isPurple = feature.accent === "purple";

  return (
    <div className="card-surface-hover h-full flex flex-col p-6 min-w-0">
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0",
          isPurple ? "bg-violet-50" : "bg-blue-50"
        )}
      >
        <Icon
          className={cn(
            "w-6 h-6",
            isPurple ? "text-[#7C3AED]" : "text-[#2563EB]"
          )}
        />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">
        {feature.description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <SectionContainer>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-[#2563EB] tracking-widest uppercase">
            Platform
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            A Complete Healthcare Infrastructure
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything healthcare needs in one connected ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 min-w-0">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>

        <div className="mt-14 flex gap-8 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {valueProps.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 shrink-0 md:justify-center min-w-[160px] md:min-w-0"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-border flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#2563EB]" />
              </div>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
