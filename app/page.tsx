import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustStrip } from "@/components/landing/trust-strip";
import { ModulesSection } from "@/components/landing/modules-section";
import { BentoSection } from "@/components/landing/bento-section";
import { StatementSection } from "@/components/landing/statement-section";
import { ProductsSection } from "@/components/landing/products-section";
import { NumbersSection } from "@/components/landing/numbers-section";
import { OnboardingSection } from "@/components/landing/onboarding-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { SupportFaqSection } from "@/components/landing/support-faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: {
    absolute: "VitaLink | Hospital Management Software for Nigeria",
  },
  description:
    "VitaLink is offline-first hospital management software for Nigeria: patient records, EMR, lab, pharmacy, billing with HMO claims, telemedicine, VitaMind AI, VitaCards and Sentinel disease surveillance.",
  keywords: [
    "VitaLink",
    "healthcare infrastructure Africa",
    "digital health identity",
    "EMR Nigeria",
    "hospital management software Nigeria",
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
    <main className="relative min-h-screen overflow-x-clip bg-background">
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
      <TrustStrip />
      <ModulesSection />
      <BentoSection />
      <StatementSection />
      <ProductsSection />
      <NumbersSection />
      <div className="relative">
        <OnboardingSection />
        <PricingSection />
      </div>
      <SupportFaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
