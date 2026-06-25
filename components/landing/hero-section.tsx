"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Globe, HeartPulse, Users } from "lucide-react";
import { GlobeBackground } from "@/components/GlobeBackground";
import { SectionContainer } from "./section-container";
import { VitaCardMockup } from "./vita-card-mockup";
import { trackDemoClick } from "@/lib/analytics";
import NewsletterForm from "@/components/NewsletterForm";

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
    <section className="relative overflow-hidden bg-white">
      <GlobeBackground />
      <SectionContainer className="relative z-10 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
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
              <a
                href="https://calendar.app.google/mpgibQjd3RzayAvx9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-indigo-600 bg-white border-2 border-white hover:bg-indigo-50 hover:border-indigo-100 transition-all duration-200 text-sm"
                onClick={() => trackDemoClick("hero")}
              >
                Request Demo
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-border max-w-sm">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest mb-3">
                Get VitaLink updates
              </p>
              <NewsletterForm variant="hero" placeholder="Your email address" />
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
