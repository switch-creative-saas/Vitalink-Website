"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Globe, HeartPulse, Users } from "lucide-react";
import { SectionContainer } from "./section-container";
import { VitaCardMockup } from "./vita-card-mockup";
import { trackDemoClick } from "@/lib/analytics";

const trustPartners = [
  { label: "Hospitals", icon: Building2 },
  { label: "NGOs", icon: Users },
  { label: "Public Health Agencies", icon: Globe },
  { label: "Healthcare Providers", icon: HeartPulse },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-white overflow-visible">
      <SectionContainer className="py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
          <div
            className={`min-w-0 transition-premium ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold mb-6">
              Healthcare. Connected.
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-foreground text-balance">
              Powering the Next Generation of
              <br />
              <span className="text-gradient-brand">Healthcare.</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
              VitaLink is Africa&apos;s offline-first healthcare infrastructure connecting
              patients, hospitals, public health systems, and AI-powered clinical
              intelligence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-6 font-medium w-full sm:w-auto"
                asChild
              >
                <a href="/waitlist">
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl h-12 px-6 font-medium border-border text-foreground w-full sm:w-auto"
                onClick={() => trackDemoClick("hero")}
                asChild
              >
                <a href="/contact">Request Demo</a>
              </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
                Trusted by
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {trustPartners.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-sm text-muted-foreground min-w-0"
                  >
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`min-w-0 flex justify-center lg:justify-end transition-premium delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <VitaCardMockup className="max-w-[280px] sm:max-w-[320px]" />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
