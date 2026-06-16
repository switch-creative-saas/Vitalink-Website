"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "./section-container";
import { VitaCardMockup } from "./vita-card-mockup";
import { trackDemoClick } from "@/lib/analytics";

export function CtaSection() {
  return (
    <section
      id="waitlist"
      className="relative py-20 lg:py-28 overflow-hidden bg-[#1e3a8a]"
      aria-labelledby="waitlist-heading"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <SectionContainer className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-w-0">
          <div className="min-w-0">
            <h2
              id="waitlist-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance"
            >
              One Tap. Critical Records.
            </h2>
            <p className="mt-4 text-lg text-blue-100 leading-relaxed max-w-lg">
              Join healthcare innovators building Africa&apos;s connected health
              infrastructure. Be first to access VitaLink.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
              <Button
                className="h-12 px-6 rounded-xl bg-white text-[#1e3a8a] hover:bg-blue-50 font-semibold shrink-0 w-full sm:w-auto"
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
                onClick={() => trackDemoClick("cta_section")}
              >
                Request Demo
              </a>
            </div>
          </div>

          <div className="hidden sm:flex justify-center lg:justify-end min-w-0">
            <VitaCardMockup className="opacity-95" />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
