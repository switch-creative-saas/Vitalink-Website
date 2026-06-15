"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/landing/section-container";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const termsSections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "description", title: "Description of Services" },
  { id: "eligibility", title: "Eligibility" },
  { id: "registration", title: "Account Registration" },
  { id: "healthcare-disclaimer", title: "Healthcare Disclaimer" },
  { id: "ai-disclaimer", title: "VitaMind AI Disclaimer" },
  { id: "vitacard-terms", title: "VitaCard Terms" },
  { id: "telemedicine-terms", title: "Telemedicine Terms" },
  { id: "user-responsibilities", title: "User Responsibilities" },
  { id: "hospital-responsibilities", title: "Hospital Responsibilities" },
  { id: "government-accounts", title: "Government & NGO Accounts" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "service-availability", title: "Service Availability" },
  { id: "limitation-liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "termination", title: "Suspension & Termination" },
  { id: "regulatory-compliance", title: "Regulatory Compliance" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact Information" },
];

export default function TermsOfUse() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <LegalPageLayout
      title="Terms of Use"
      lastUpdated="June 4, 2026"
      sections={termsSections}
      acceptanceText="By continuing to use VitaLink, you acknowledge and accept these Terms of Use."
    >
      <section id="acceptance" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground mb-4">
          By accessing or using VitaLink services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
        </p>
        <p className="text-muted-foreground">
          VitaLink reserves the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms. We will notify users of material changes via email or through the platform.
        </p>
      </section>

      <section id="description" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Services</h2>
        <p className="text-muted-foreground mb-4">
          VitaLink provides the following healthcare technology services:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Electronic Medical Records (EMR) system</li>
          <li>Telemedicine and virtual consultations</li>
          <li>Patient mobile application</li>
          <li>VitaCard NFC identity cards</li>
          <li>VitaMind AI clinical intelligence</li>
          <li>VitaLink Sentinel disease surveillance</li>
          <li>Insurance integration services</li>
          <li>Healthcare analytics and reporting</li>
        </ul>
      </section>

      <section id="eligibility" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">3. Eligibility</h2>
        <p className="text-muted-foreground mb-4">
          To use VitaLink services, you must:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Be at least 18 years old, or have parental/guardian consent if under 18</li>
          <li>Have the legal capacity to enter into a binding agreement</li>
          <li>Not be prohibited from using the service under applicable laws</li>
          <li>Provide accurate and complete registration information</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Healthcare providers must have valid professional licenses and regulatory approvals to use clinical features of the platform.
        </p>
      </section>

      <section id="registration" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">4. Account Registration</h2>
        <p className="text-muted-foreground mb-4">
          Users are responsible for:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Maintaining the confidentiality of their password and account credentials</li>
          <li>All activities that occur under their account</li>
          <li>Providing accurate, current, and complete information during registration</li>
          <li>Updating account information to keep it accurate and current</li>
          <li>Not sharing account credentials with unauthorized individuals</li>
          <li>Immediately notifying VitaLink of any unauthorized account access</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Healthcare providers must verify their professional credentials before accessing clinical features.
        </p>
      </section>

      <section id="healthcare-disclaimer" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">5. Healthcare Disclaimer</h2>
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-6 mb-4">
          <p className="text-[#991B1B] font-semibold mb-2">IMPORTANT DISCLAIMER</p>
        </div>
        <p className="text-muted-foreground mb-4">
          <strong>VitaLink is a technology platform, not a healthcare provider.</strong> We do not practice medicine, provide medical diagnoses, or offer medical treatment.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Medical decisions remain the sole responsibility of licensed healthcare professionals</li>
          <li>VitaLink does not guarantee the accuracy or completeness of medical information on the platform</li>
          <li>Users should always seek professional medical advice for health concerns</li>
          <li><strong>Emergency services should not be delayed</strong> while using the platform – call emergency services immediately in life-threatening situations</li>
          <li>The platform is not a substitute for in-person medical examination and diagnosis</li>
        </ul>
      </section>

      <section id="ai-disclaimer" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">6. VitaMind AI Disclaimer</h2>
        <p className="text-muted-foreground mb-4">
          VitaMind AI provides clinical decision support to assist healthcare professionals:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>AI recommendations are <strong>informational only</strong> and do not constitute medical advice</li>
          <li>All AI outputs must be reviewed and validated by qualified healthcare personnel</li>
          <li>VitaLink is not liable for clinical decisions made solely based on AI output without professional review</li>
          <li>AI may produce incorrect or incomplete information – professional judgment is always required</li>
          <li>AI does not replace the need for thorough clinical examination and patient assessment</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          By using VitaMind AI, healthcare providers acknowledge that they remain fully responsible for all clinical decisions and patient care.
        </p>
      </section>

      <section id="vitacard-terms" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">7. VitaCard Terms</h2>
        <p className="text-muted-foreground mb-4">
          Terms specific to VitaCard NFC identity cards:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Lost or stolen cards must be reported immediately to VitaLink support</li>
          <li>VitaCard does not contain complete medical records – only secure identifiers</li>
          <li>Emergency information on the card is limited to what you have explicitly enabled</li>
          <li>Cards remain the property of VitaLink and must be surrendered upon request</li>
          <li>Unauthorized reproduction or modification of cards is prohibited</li>
          <li>Card replacement fees may apply for lost or damaged cards</li>
        </ul>
      </section>

      <section id="telemedicine-terms" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">8. Telemedicine Terms</h2>
        <p className="text-muted-foreground mb-4">
          Terms for telemedicine and virtual consultation services:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Explicit patient consent is required before telemedicine consultations</li>
          <li>Consultations may be recorded where legally permitted and with appropriate consent</li>
          <li>Telemedicine is not appropriate for emergency medical situations</li>
          <li>Users must ensure they have a stable internet connection for consultations</li>
          <li>Healthcare providers determine if telemedicine is appropriate for each case</li>
          <li>Prescriptions via telemedicine follow applicable regulatory requirements</li>
        </ul>
      </section>

      <section id="user-responsibilities" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">9. User Responsibilities</h2>
        <p className="text-muted-foreground mb-4">
          Users agree not to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Access the platform through unauthorized means or hacking attempts</li>
          <li>Share their account credentials with others</li>
          <li>Use the platform for any unlawful or fraudulent purpose</li>
          <li>Submit false or misleading information</li>
          <li>Impersonate any person or entity</li>
          <li>Interfere with or disrupt the service or servers</li>
          <li>Attempt to reverse-engineer or copy the platform's technology</li>
          <li>Use the platform to transmit malware or harmful code</li>
          <li>Violate any applicable laws or regulations</li>
        </ul>
      </section>

      <section id="hospital-responsibilities" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">10. Hospital Responsibilities</h2>
        <p className="text-muted-foreground mb-4">
          Healthcare facilities using VitaLink agree that:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>They remain the custodians of clinical decisions and patient care</li>
          <li>They must maintain proper licensing and regulatory approvals</li>
          <li>They are responsible for training their staff on proper platform use</li>
          <li>They must comply with all applicable healthcare regulations</li>
          <li>Patient consent must be obtained before sharing data through the platform</li>
          <li>They must implement appropriate access controls for their staff</li>
        </ul>
      </section>

      <section id="government-accounts" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">11. Government & NGO Accounts</h2>
        <p className="text-muted-foreground mb-4">
          Government agencies and NGOs using VitaLink agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Use data solely for authorized healthcare and public health activities</li>
          <li>Comply with all applicable data protection laws</li>
          <li>Maintain appropriate security measures for accessed data</li>
          <li>Not use data for political or discriminatory purposes</li>
          <li>Respect patient privacy and confidentiality</li>
        </ul>
      </section>

      <section id="intellectual-property" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">12. Intellectual Property</h2>
        <p className="text-muted-foreground mb-4">
          All content, features, and functionality of the VitaLink platform, including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Software, code, and algorithms</li>
          <li>Text, graphics, logos, and designs</li>
          <li>Trademarks and service marks</li>
          <li>Patents and patent applications</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          are the exclusive property of VitaLink or its licensors and are protected by intellectual property laws. Users may not copy, modify, distribute, or create derivative works without explicit written permission.
        </p>
      </section>

      <section id="service-availability" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">13. Service Availability</h2>
        <p className="text-muted-foreground mb-4">
          Regarding service availability:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>VitaLink does not guarantee uninterrupted or error-free service</li>
          <li>Scheduled maintenance may be required with advance notice where possible</li>
          <li>Service may be temporarily unavailable due to technical issues, updates, or circumstances beyond our control</li>
          <li>Offline features are available where supported, but synchronization requires internet connectivity</li>
          <li>We are not liable for damages resulting from service interruptions</li>
        </ul>
      </section>

      <section id="limitation-liability" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">14. Limitation of Liability</h2>
        <p className="text-muted-foreground mb-4">
          To the maximum extent permitted by law, VitaLink's liability is limited as follows:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>We are not liable for indirect, incidental, special, or consequential damages</li>
          <li>We are not liable for lost revenues, profits, or business opportunities</li>
          <li>We are not liable for data losses resulting from user negligence or unauthorized access</li>
          <li>Our total liability is limited to the amount paid by you for the service in the 12 months preceding the claim</li>
          <li>Some jurisdictions do not allow exclusion of certain damages – the above exclusions may not apply to you</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Nothing in these terms limits our liability for death or personal injury resulting from our negligence, or for fraud.
        </p>
      </section>

      <section id="indemnification" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">15. Indemnification</h2>
        <p className="text-muted-foreground mb-4">
          You agree to indemnify and hold harmless VitaLink, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Your use or misuse of the service</li>
          <li>Your violation of these Terms of Use</li>
          <li>Your violation of any third-party rights</li>
          <li>Your violation of applicable laws or regulations</li>
        </ul>
      </section>

      <section id="termination" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">16. Suspension & Termination</h2>
        <p className="text-muted-foreground mb-4">
          VitaLink reserves the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Suspend or terminate your account for violation of these terms</li>
          <li>Suspend service for security or maintenance reasons</li>
          <li>Terminate accounts that have been inactive for an extended period</li>
          <li>Refuse service to anyone at our sole discretion</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Upon termination, your right to use the service immediately ceases. We may retain your data as required by law or for legitimate business purposes.
        </p>
      </section>

      <section id="regulatory-compliance" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">17. Regulatory Compliance</h2>
        <p className="text-muted-foreground mb-4">
          VitaLink complies with applicable regulations including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Nigeria Data Protection Act (NDPA)</li>
          <li>Nigeria Data Protection Regulation (NDPR)</li>
          <li>Medical and Dental Council of Nigeria regulations</li>
          <li>Other applicable healthcare and data protection regulations</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Users must also comply with all applicable laws and regulations in their use of the platform.
        </p>
      </section>

      <section id="governing-law" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">18. Governing Law</h2>
        <p className="text-muted-foreground mb-4">
          These Terms of Use are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.
        </p>
        <p className="text-muted-foreground">
          For international users, local laws may provide additional protections that cannot be waived by these terms.
        </p>
      </section>

      <section id="contact" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">19. Contact Information</h2>
        <p className="text-muted-foreground mb-4">
          For questions about these Terms of Use, please contact:
        </p>
        <div className="bg-[#F8FAFC] border border-border rounded-lg p-6">
          <p className="text-muted-foreground mb-2">
            <strong>Email:</strong> legal@vitalink.africa
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Address:</strong> Lagos, Nigeria
          </p>
          <p className="text-muted-foreground">
            We will respond to your inquiry within a reasonable time.
          </p>
        </div>
      </section>
    </LegalPageLayout>
      <FooterSection />
    </main>
  );
}
