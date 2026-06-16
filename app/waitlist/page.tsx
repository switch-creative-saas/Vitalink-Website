"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { VitaLinkLogo } from "@/components/landing/vitalink-logo";
import { GlobeBackground } from "@/components/GlobeBackground";
import { trackEvent } from "@/lib/analytics";

export default function WaitlistPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Track page view
    trackEvent("waitlist_page_view");

    // Listen for Tally form submission
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "Tally.FormSubmitted") {
        setShowSuccess(true);
        setShowConfetti(true);
        // Track form submission
        trackEvent("waitlist_form_submitted");
        // Hide confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (showSuccess) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-white">
        <Navigation />
        <section className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24 min-h-[72vh] flex items-center">
          <GlobeBackground />
          <SectionContainer>
            <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: ['#2563EB', '#7C3AED', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)],
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          {/* Logo */}
          <VitaLinkLogo size="lg" className="justify-center mb-8" />

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            You're on the list 🎉
          </h1>

          {/* Message */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto">
            Thank you for joining the VitaLink waitlist. You'll be among the first to receive updates, early access opportunities, pilot programs, and launch announcements.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-xl h-12 px-8 font-medium"
              asChild
            >
              <a href="/">Return Home</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/10 rounded-xl h-12 px-8 font-medium"
              asChild
            >
              <a
                href="https://calendar.app.google/mpgibQjd3RzayAvx9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request Demo
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-foreground hover:bg-[#F8FAFC] rounded-xl h-12 px-8 font-medium"
              asChild
            >
              <a href="/about">Learn More</a>
            </Button>
          </div>
            </div>
          </SectionContainer>
        </section>
        <FooterSection />

        <style jsx global>{`
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) rotate(720deg);
              opacity: 0;
            }
          }

          .animate-float {
            animation: float linear forwards;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <section className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24">
        <GlobeBackground />
        <SectionContainer>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-white/85 border border-[#8B5CF6]/15 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
              VitaLink Waitlist
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
              Join the VitaLink Waitlist
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Be among the first to experience Africa's next-generation healthcare infrastructure.
            </p>
          </div>
        </SectionContainer>
      </section>

      <SectionContainer className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Tally Form Container */}
          <div className="bg-white rounded-[20px] shadow-lg border border-border p-6 sm:p-8 max-w-[800px] mx-auto">
            <div className="w-full" style={{ minHeight: "600px" }}>
              <iframe
                src="https://tally.so/embed/D4apVE?alignLeft=1&hideTitle=1&transparentBackground=1"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="VitaLink Waitlist Form"
                className="rounded-lg"
                style={{
                  minHeight: "600px",
                  border: "none",
                }}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>By joining the waitlist, you agree to receive updates from VitaLink.</p>
            <p className="mt-2">
              Read our <a href="/privacy" className="text-[#2563EB] hover:underline">Privacy Policy</a> and <a href="/terms" className="text-[#2563EB] hover:underline">Terms of Use</a>.
            </p>
          </div>
        </div>
      </SectionContainer>
      <FooterSection />
    </main>
  );
}
