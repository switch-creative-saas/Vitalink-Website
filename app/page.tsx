import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { SentinelSection } from "@/components/landing/sentinel-section";
import { VitamindSection } from "@/components/landing/vitamind-section";
import { TrustMarquee } from "@/components/landing/trust-marquee";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: {
    absolute: "VitaLink | Healthcare Infrastructure Platform for Africa",
  },
  description:
    "VitaLink is building Africa's healthcare operating system — connecting patient identity, EMR, telemedicine, AI-powered clinical intelligence, and public health surveillance into one secure, offline-first platform.",
  keywords: [
    "VitaLink",
    "healthcare infrastructure Africa",
    "digital health identity",
    "EMR Africa",
    "telemedicine Nigeria",
    "healthcare technology Africa",
  ],
  alternates: {
    canonical: "https://vitalink.africa",
  },
  openGraph: {
    title: "VitaLink | Healthcare Infrastructure Platform for Africa",
    description:
      "Connecting patients, hospitals, and public health systems across Africa through one secure healthcare operating system.",
    url: "https://vitalink.africa",
    siteName: "VitaLink",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VitaLink — Healthcare Infrastructure for Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaLink | Healthcare Infrastructure Platform for Africa",
    description:
      "Building Africa's healthcare operating system — patient identity, EMR, telemedicine, and AI clinical intelligence in one platform.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "VitaLink",
            url: "https://vitalink.africa",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://vitalink.africa/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <SentinelSection />
      <VitamindSection />
      <TrustMarquee />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
