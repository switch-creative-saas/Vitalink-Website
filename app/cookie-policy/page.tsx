import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how VitaLink uses cookies and similar technologies for security, preferences, analytics, and optional marketing.",
  alternates: {
    canonical: "https://vitalink.africa/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | VitaLink",
    description:
      "Learn how VitaLink uses cookies and similar technologies for security, preferences, analytics, and optional marketing.",
    url: "https://vitalink.africa/cookie-policy",
  },
};

const cookieSections = [
  { id: "introduction", title: "Introduction" },
  { id: "what-are-cookies", title: "What Are Cookies" },
  { id: "why-we-use-cookies", title: "Why We Use Cookies" },
  { id: "types-of-cookies", title: "Types of Cookies We Use" },
  { id: "essential-cookies", title: "Essential Cookies" },
  { id: "analytics-cookies", title: "Analytics Cookies" },
  { id: "functional-cookies", title: "Functional Cookies" },
  { id: "marketing-cookies", title: "Marketing Cookies" },
  { id: "managing-preferences", title: "Managing Cookie Preferences" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "data-retention", title: "Data Retention" },
  { id: "changes-to-policy", title: "Changes To This Policy" },
  { id: "contact-information", title: "Contact Information" },
];

export default function CookiePolicyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <LegalPageLayout
        title="Cookie Policy"
        lastUpdated="June 15, 2026"
        sections={cookieSections}
        acceptanceText="You can update your cookie choices at any time through the Cookie Preferences link in the footer."
      >
        <section id="introduction" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            This Cookie Policy explains how VitaLink uses cookies and similar technologies on our website. It supports our commitment to transparency, healthcare privacy expectations, GDPR principles, and Nigeria Data Protection Regulation (NDPR) principles.
          </p>
        </section>

        <section id="what-are-cookies" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">2. What Are Cookies</h2>
          <p className="text-muted-foreground">
            Cookies are small text files stored on your device when you visit a website. Similar technologies, such as local storage, may also remember preferences, support security, and help us understand how the website performs.
          </p>
        </section>

        <section id="why-we-use-cookies" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Why We Use Cookies</h2>
          <p className="text-muted-foreground mb-4">
            VitaLink uses cookies to keep the website secure, improve usability, remember your choices, and understand how visitors interact with our content.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Protect the website and support essential functionality</li>
            <li>Remember cookie preferences and user interface choices</li>
            <li>Measure traffic and improve content performance</li>
            <li>Support relevant communications where consent has been given</li>
          </ul>
        </section>

        <section id="types-of-cookies" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Types of Cookies We Use</h2>
          <p className="text-muted-foreground">
            We group cookies into four categories: essential, analytics, functional, and marketing. Essential cookies are always enabled. Optional categories remain disabled until you consent.
          </p>
        </section>

        <section id="essential-cookies" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Essential Cookies</h2>
          <p className="text-muted-foreground">
            Essential cookies are required for core website functionality, including page navigation, security, consent storage, and reliable access to VitaLink pages. These cookies cannot be disabled through our preference center because the website depends on them to function properly.
          </p>
        </section>

        <section id="analytics-cookies" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">6. Analytics Cookies</h2>
          <p className="text-muted-foreground">
            Analytics cookies help us understand aggregate website traffic, page performance, and content usefulness. VitaLink only enables analytics after you consent, and we use these insights to improve the website experience.
          </p>
        </section>

        <section id="functional-cookies" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">7. Functional Cookies</h2>
          <p className="text-muted-foreground">
            Functional cookies remember choices that improve convenience, such as interface preferences or form-related settings. These cookies are optional and remain off unless you enable them.
          </p>
        </section>

        <section id="marketing-cookies" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">8. Marketing Cookies</h2>
          <p className="text-muted-foreground">
            Marketing cookies may help measure campaign performance or support relevant communications. VitaLink does not enable marketing cookies unless you opt in.
          </p>
        </section>

        <section id="managing-preferences" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">9. Managing Cookie Preferences</h2>
          <p className="text-muted-foreground mb-4">
            You can accept all cookies, reject all non-essential cookies, or customize optional categories. Your choices are stored in your browser using local storage and a consent cookie.
          </p>
          <p className="text-muted-foreground">
            To change your choices later, use the Cookie Preferences link in the website footer. Changes apply immediately in your current browser.
          </p>
        </section>

        <section id="third-party-services" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">10. Third-Party Services</h2>
          <p className="text-muted-foreground">
            VitaLink may use trusted third-party services for analytics, embedded forms, hosting, security, and website performance. Where these services involve optional cookies or similar technologies, they are governed by your consent choices and applicable privacy terms.
          </p>
        </section>

        <section id="data-retention" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">11. Data Retention</h2>
          <p className="text-muted-foreground">
            Cookie consent preferences are stored for up to 180 days unless you clear your browser data or update your preferences sooner. Optional analytics, functional, and marketing data are retained according to their purpose, legal requirements, and our privacy commitments.
          </p>
        </section>

        <section id="changes-to-policy" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes To This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Cookie Policy as our website, services, or legal obligations evolve. When we make material changes, we will update the date above and may ask you to review your preferences again.
          </p>
        </section>

        <section id="contact-information" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Information</h2>
          <div className="bg-[#F8FAFC] border border-border rounded-lg p-6">
            <p className="text-muted-foreground mb-2">
              <strong>Email:</strong> privacy@vitalink.africa
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Address:</strong> Lagos, Nigeria
            </p>
            <p className="text-muted-foreground">
              Contact us if you have questions about this Cookie Policy or how VitaLink uses cookies and similar technologies.
            </p>
          </div>
        </section>
      </LegalPageLayout>
      <FooterSection />
    </main>
  );
}
