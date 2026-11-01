"use client";

import { ArrowRight, Nfc } from "lucide-react";
import { trackDemoClick } from "@/lib/analytics";
import { DEMO_URL, SIGNUP_URL } from "@/lib/site-links";
import { SplitText, useScrollVars } from "./motion";

export function CtaSection() {
  const panelRef = useScrollVars<HTMLDivElement>();

  return (
    <section className="bg-white px-3 pb-8 pt-4 sm:px-6" aria-labelledby="cta-heading">
      <div
        ref={panelRef}
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-[#4a6ae0] lg:rounded-[2.75rem]"
        style={{ transform: "scale(calc(0.86 + var(--enter-eased, 1) * 0.14))", transformOrigin: "50% 100%" }}
      >
        <div className="grid items-center gap-10 px-6 py-14 sm:px-12 lg:grid-cols-[1.1fr_1fr] lg:px-20 lg:py-20">
          <div className="text-center lg:text-left">
            <SplitText id="cta-heading" text="Give your team one place to care for every patient" className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-white text-balance sm:text-5xl lg:text-[3.5rem]" />
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
              <a
                href={SIGNUP_URL}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-sun hover:text-ink sm:w-auto"
              >
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDemoClick("cta_section")}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/60 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Book a demo
              </a>
            </div>
          </div>

          <div className="relative mx-auto hidden h-72 w-full max-w-sm sm:block" aria-hidden="true">
            <div className="absolute right-6 top-2 h-16 w-16 rounded-full bg-sun" />
            <div className="absolute left-4 top-16 h-44 w-72 -rotate-[10deg] rounded-3xl bg-primary shadow-2xl" />
            <div className="absolute left-14 top-10 flex h-44 w-72 rotate-[4deg] animate-float-slow flex-col justify-between rounded-3xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="" className="h-6 w-6" />
                  <span className="text-sm font-semibold text-ink">VitaCard</span>
                </div>
                <Nfc className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium text-ink">Emergency profile</p>
                <p className="text-xs text-muted-foreground">Tap any NFC phone · PIN for full record</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
