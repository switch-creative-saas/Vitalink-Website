"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Nfc, Shield, Smartphone, Wallet } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";
import { DEMO_URL, LAUNCHED, SIGNUP_URL } from "@/lib/site-links";
import { trackEvent } from "@/lib/analytics";

// After launch this page is only for the patient app; before launch it is the waitlist for everything.
const planned = LAUNCHED
  ? [
      { title: "Your records in one place", body: "Visits, results and prescriptions from VitaLink hospitals.", icon: Smartphone },
      { title: "Health wallet", body: "Save towards care and pay hospital bills from your phone.", icon: Wallet },
      { title: "Micro-insurance", body: "Simple cover options, in development.", icon: Shield },
    ]
  : [
      { title: "Hospital workspace", body: "Records, EMR, lab, pharmacy, billing and HMO claims for your facility.", icon: Building2 },
      { title: "VitaCards", body: "NFC cards that open a patient's emergency profile on any phone.", icon: Nfc },
      { title: "Patient app (later)", body: "Records, a health wallet and simple cover for patients.", icon: Smartphone },
    ];

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackEvent("waitlist_page_view");

    // The embedded Tally form posts this message when it is submitted.
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "Tally.FormSubmitted") {
        setSubmitted(true);
        trackEvent("waitlist_form_submitted");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-white">
      <Navigation />

      {submitted ? (
        <PageHero
          eyebrow="Waitlist"
          title="You're on the list"
          lead={
            LAUNCHED
              ? "Thank you. We'll email you when the patient app is ready, and before then if there's a pilot near you."
              : "Thank you. We'll be in touch with early access as we open VitaLink to more facilities."
          }
        >
          <div className="flex flex-col items-center gap-6">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary"
            >
              Back to home
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </PageHero>
      ) : (
        <>
          <PageHero
            eyebrow={LAUNCHED ? "Patient app · coming later" : "Early access"}
            title={LAUNCHED ? "Join the patient app waitlist" : "Join the VitaLink waitlist"}
            lead={
              LAUNCHED
                ? "We're building an app for patients to carry their records, pay for care and get simple cover. It isn't available yet. Join the list to hear first."
                : "We're onboarding our first hospitals and clinics. Join the list for early access, and to hear first when VitaLink opens to everyone."
            }
          />

          <section className="bg-white pb-14 lg:pb-20">
            <SectionContainer className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
              <div className="space-y-3">
                {planned.map(({ title, body, icon: Icon }, index) => (
                  <Reveal key={title} delay={index * 90} className="flex items-start gap-4 rounded-[1.5rem] bg-surface p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-medium text-ink">{title}</h2>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </Reveal>
                ))}
                <Reveal delay={300} className="rounded-[1.5rem] bg-primary p-5 text-white">
                  <p className="text-sm text-white/80">{LAUNCHED ? "Run a hospital or clinic?" : "Want to see it first?"}</p>
                  <a
                    href={LAUNCHED ? SIGNUP_URL : DEMO_URL}
                    {...(LAUNCHED ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="mt-1 inline-flex items-center gap-2 text-lg font-medium"
                  >
                    {LAUNCHED ? "The workspace is available now" : "Book a demo"} <ArrowRight className="h-4 w-4" />
                  </a>
                </Reveal>
              </div>

              <Reveal delay={150} className="rounded-[2rem] border border-border bg-white p-4 sm:p-6">
                <iframe
                  src="https://tally.so/embed/D4apVE?alignLeft=1&hideTitle=1&transparentBackground=1"
                  width="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="VitaLink waitlist form"
                  style={{ minHeight: "600px", border: "none" }}
                />
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  By joining you agree to receive updates from VitaLink. Read our{" "}
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and{" "}
                  <a href="/terms" className="text-primary hover:underline">Terms</a>.
                </p>
              </Reveal>
            </SectionContainer>
          </section>
        </>
      )}

      <FooterSection />
    </main>
  );
}
