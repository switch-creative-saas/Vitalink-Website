"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/landing/section-container";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const privacySections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-information", title: "How We Use Information" },
  { id: "legal-basis", title: "Legal Basis for Processing" },
  { id: "data-sharing", title: "Data Sharing" },
  { id: "vitacard-privacy", title: "VitaCard Privacy" },
  { id: "emergency-access", title: "Emergency Access" },
  { id: "ai-services", title: "AI Services (VitaMind)" },
  { id: "disease-surveillance", title: "Disease Surveillance (VitaLink Sentinel)" },
  { id: "security-measures", title: "Security Measures" },
  { id: "user-rights", title: "User Rights" },
  { id: "data-retention", title: "Data Retention" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "international-transfers", title: "International Transfers" },
  { id: "breach-notification", title: "Breach Notification" },
  { id: "contact-information", title: "Contact Information" },
];

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="June 4, 2026"
      sections={privacySections}
      acceptanceText="By continuing to use VitaLink, you acknowledge and accept this Privacy Policy."
    >
      <section id="introduction" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
        <p className="text-muted-foreground mb-4">
          VitaLink provides a comprehensive healthcare technology platform designed to connect patients, healthcare providers, and public health systems across Africa. Our services include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Electronic Medical Records (EMR)</li>
          <li>Health Identity Services</li>
          <li>VitaCard NFC Identity</li>
          <li>Patient Mobile Applications</li>
          <li>Telemedicine Services</li>
          <li>Insurance Integration</li>
          <li>VitaMind AI (Clinical Intelligence)</li>
          <li>VitaLink Sentinel (Disease Surveillance)</li>
          <li>Healthcare Analytics</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          This Privacy Policy explains how we collect, use, protect, and share your personal and health information in accordance with applicable data protection laws, including the Nigeria Data Protection Act (NDPA), Nigeria Data Protection Regulation (NDPR), and GDPR principles where applicable.
        </p>
      </section>

      <section id="information-we-collect" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
        
        <h3 className="text-lg font-semibold text-foreground mb-3">Patient Information</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Full Name</li>
          <li>Date of Birth</li>
          <li>Gender</li>
          <li>Contact Information (phone, email, address)</li>
          <li>Next of Kin details</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground mb-3">Medical Information</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Medical diagnoses and conditions</li>
          <li>Current and past medications</li>
          <li>Laboratory test results</li>
          <li>Clinical notes and observations</li>
          <li>Allergies and adverse reactions</li>
          <li>Immunization records</li>
          <li>Vital signs and health metrics</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground mb-3">Technical Information</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Device information and type</li>
          <li>Browser information</li>
          <li>IP address</li>
          <li>Login history and timestamps</li>
          <li>Audit logs of system access</li>
          <li>Location data (with consent)</li>
        </ul>
      </section>

      <section id="how-we-use-information" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Information</h2>
        <p className="text-muted-foreground mb-4">
          We use your information for the following purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Patient Care:</strong> To enable healthcare providers to access your medical records for diagnosis and treatment</li>
          <li><strong>Healthcare Operations:</strong> To manage appointments, referrals, and care coordination</li>
          <li><strong>Appointment Management:</strong> To schedule and remind you of medical appointments</li>
          <li><strong>Clinical Decision Support:</strong> To provide healthcare professionals with relevant clinical information</li>
          <li><strong>Disease Surveillance:</strong> To monitor and track disease patterns for public health purposes (anonymized where required)</li>
          <li><strong>Insurance Administration:</strong> To process insurance claims and verify coverage</li>
          <li><strong>Security Monitoring:</strong> To detect and prevent unauthorized access or fraudulent activity</li>
          <li><strong>Regulatory Reporting:</strong> To comply with legal and regulatory requirements</li>
          <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our services</li>
        </ul>
      </section>

      <section id="legal-basis" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">4. Legal Basis for Processing</h2>
        <p className="text-muted-foreground mb-4">
          Our processing of personal data is based on the following legal grounds under the Nigeria Data Protection Act (NDPA) and Nigeria Data Protection Regulation (NDPR):
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Consent:</strong> When you explicitly consent to the processing of your data for specific purposes</li>
          <li><strong>Contract:</strong> When processing is necessary for the performance of our services under a contract</li>
          <li><strong>Legal Obligation:</strong> When required by law for healthcare reporting, public health, or regulatory compliance</li>
          <li><strong>Vital Interests:</strong> When necessary to protect your life or in emergency medical situations</li>
          <li><strong>Public Task:</strong> When processing is necessary for public health surveillance and disease control</li>
          <li><strong>Legitimate Interests:</strong> For fraud prevention, security, and service improvement, where your interests do not override</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          For international users, we also comply with GDPR principles where applicable, including lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, storage limitation, and accountability.
        </p>
      </section>

      <section id="data-sharing" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Sharing</h2>
        <p className="text-muted-foreground mb-4">
          <strong>VitaLink never sells personal health information.</strong> We only share your data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Authorized Healthcare Providers:</strong> Doctors, nurses, and other medical professionals involved in your care</li>
          <li><strong>Patient-Approved Parties:</strong> Individuals or organizations you have explicitly authorized to access your information</li>
          <li><strong>Insurance Providers:</strong> To process claims and verify coverage when you have authorized insurance integration</li>
          <li><strong>Government Authorities:</strong> When required by law, court order, or regulatory investigation</li>
          <li><strong>Public Health Agencies:</strong> For disease surveillance and public health monitoring (anonymized or aggregated where possible)</li>
          <li><strong>Emergency Access:</strong> When emergency medical personnel need access to critical health information</li>
          <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our platform, under strict confidentiality agreements</li>
        </ul>
      </section>

      <section id="vitacard-privacy" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">6. VitaCard Privacy</h2>
        <p className="text-muted-foreground mb-4">
          The VitaCard NFC card is designed for secure, offline identity verification and emergency access. Important privacy features:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>VitaCard NFC cards <strong>do not contain complete medical records</strong></li>
          <li>Cards only store <strong>secure identifiers</strong> that link to encrypted records on VitaLink servers</li>
          <li>Emergency access information is stored on the card only if you have explicitly enabled this feature</li>
          <li>Full medical records remain <strong>encrypted on VitaLink servers</strong> and are not stored on the physical card</li>
          <li>Card readers require proper authentication to access any information</li>
          <li>Lost or stolen cards can be immediately deactivated through your account or by contacting support</li>
        </ul>
      </section>

      <section id="emergency-access" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">7. Emergency Access</h2>
        <p className="text-muted-foreground mb-4">
          VitaLink provides emergency access functionality to allow medical personnel to obtain critical health information in life-threatening situations when you cannot provide consent.
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-3">Emergency Access Workflow</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Emergency personnel can access limited critical information (blood type, allergies, major conditions) using your VitaCard or through emergency access protocols</li>
          <li>All emergency access events are <strong>logged with timestamp, location, and requesting personnel</strong></li>
          <li>Patients can review their complete emergency access history at any time</li>
          <li>You may choose to enable or disable emergency access features in your account settings</li>
          <li>You can specify what information is visible during emergency access</li>
        </ul>
        <p className="text-muted-foreground">
          Emergency access is strictly limited to situations where immediate medical attention is required and you are unable to provide consent.
        </p>
      </section>

      <section id="ai-services" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">8. AI Services (VitaMind)</h2>
        <p className="text-muted-foreground mb-4">
          VitaMind AI provides clinical decision support to assist healthcare professionals. Important considerations:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>AI assists healthcare professionals</strong> – it does not replace licensed medical practitioners</li>
          <li>AI recommendations are informational and must be reviewed by qualified healthcare personnel</li>
          <li><strong>Clinical decisions remain the responsibility of healthcare professionals</strong></li>
          <li>VitaLink is not liable for clinical decisions made solely based on AI outputs without professional review</li>
          <li>AI processing may involve analyzing anonymized data to improve accuracy and performance</li>
          <li>AI interactions are logged for audit and quality improvement purposes</li>
        </ul>
      </section>

      <section id="disease-surveillance" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">9. Disease Surveillance (VitaLink Sentinel)</h2>
        <p className="text-muted-foreground mb-4">
          VitaLink Sentinel is our disease surveillance and public health monitoring system. Privacy protections include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Sentinel uses <strong>anonymized and aggregated data</strong> for disease tracking and public health monitoring</li>
          <li>Used for outbreak detection, trend analysis, and early warning systems</li>
          <li><strong>No personally identifiable information is disclosed</strong> without explicit authorization or legal requirement</li>
          <li>Data shared with public health agencies follows strict de-identification protocols</li>
          <li>Surveillance data is used solely for public health purposes and research</li>
        </ul>
      </section>

      <section id="security-measures" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">10. Security Measures</h2>
        <p className="text-muted-foreground mb-4">
          VitaLink implements industry-standard security measures to protect your health information:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Encryption at Rest:</strong> All data is encrypted using AES-256 encryption when stored</li>
          <li><strong>Encryption in Transit:</strong> All data transfers use TLS 1.3 encryption</li>
          <li><strong>Multi-Factor Authentication (MFA):</strong> Required for all healthcare provider accounts</li>
          <li><strong>Role-Based Access Control (RBAC):</strong> Strict access controls based on user roles and permissions</li>
          <li><strong>Comprehensive Audit Logs:</strong> All access, modifications, and downloads are logged</li>
          <li><strong>Secure Backups:</strong> Regular encrypted backups with disaster recovery capabilities</li>
          <li><strong>Continuous Monitoring:</strong> 24/7 security monitoring and intrusion detection</li>
          <li><strong>Penetration Testing:</strong> Regular security assessments by independent third parties</li>
          <li><strong>Employee Training:</strong> All staff undergo security and privacy training</li>
        </ul>
      </section>

      <section id="user-rights" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">11. User Rights</h2>
        <p className="text-muted-foreground mb-4">
          Under the NDPA, NDPR, and applicable data protection laws, you have the following rights:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
          <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
          <li><strong>Right to Deletion:</strong> Request deletion of your data where legally permissible</li>
          <li><strong>Right to Portability:</strong> Request transfer of your data to another service</li>
          <li><strong>Right to Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
          <li><strong>Right to Restrict Processing:</strong> Request restriction of processing in certain circumstances</li>
          <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
          <li><strong>Right to Lodge a Complaint:</strong> File a complaint with the Nigeria Data Protection Commission or relevant authority</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          To exercise these rights, contact us at privacy@vitalink.health. Some rights may be limited by legal requirements, particularly for medical records that must be retained for healthcare purposes.
        </p>
      </section>

      <section id="data-retention" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">12. Data Retention</h2>
        <p className="text-muted-foreground mb-4">
          We retain your data in accordance with legal and healthcare requirements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Medical Records:</strong> Retained according to healthcare regulatory requirements (typically minimum of 10-20 years, or longer for certain conditions)</li>
          <li><strong>Account Data:</strong> Retained while your account is active and for a reasonable period after closure</li>
          <li><strong>Audit Logs:</strong> Retained for security and compliance purposes (typically 7 years)</li>
          <li><strong>Marketing Data:</strong> Retained only while you have not opted out of marketing communications</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Data is securely deleted or anonymized when retention periods expire, unless longer retention is required by law.
        </p>
      </section>

      <section id="childrens-privacy" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">13. Children's Privacy</h2>
        <p className="text-muted-foreground mb-4">
          VitaLink services may be used by minors with parental or guardian consent. For children under 18:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>We require parental or guardian consent for creating accounts and processing personal data</li>
          <li>Parents and guardians have the right to access, review, and request deletion of their child's data</li>
          <li>We limit data collection from children to what is necessary for healthcare services</li>
          <li>We do not knowingly market to children or collect data for commercial purposes from minors</li>
        </ul>
      </section>

      <section id="international-transfers" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">14. International Transfers</h2>
        <p className="text-muted-foreground mb-4">
          VitaLink primarily stores and processes data within Nigeria. However, we may transfer data internationally in the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>When you access services while traveling abroad</li>
          <li>When using cloud services with international data centers (with appropriate safeguards)</li>
          <li>When required for emergency medical care outside Nigeria</li>
          <li>When sharing with international health organizations for public health purposes (anonymized where required)</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          All international transfers comply with NDPA requirements and include appropriate safeguards such as Standard Contractual Clauses or adequacy decisions where applicable.
        </p>
      </section>

      <section id="breach-notification" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">15. Breach Notification</h2>
        <p className="text-muted-foreground mb-4">
          In the event of a data security breach that poses a risk to your rights and freedoms:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>We will notify you within 72 hours of becoming aware of the breach, as required by NDPA</li>
          <li>Notification will include the nature of the breach, categories of data affected, and recommended actions</li>
          <li>We will also notify the Nigeria Data Protection Commission as required by law</li>
          <li>We will take immediate steps to contain the breach and mitigate any harm</li>
        </ul>
      </section>

      <section id="contact-information" className="mb-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-foreground mb-4">16. Contact Information</h2>
        <p className="text-muted-foreground mb-4">
          For questions, concerns, or requests regarding this Privacy Policy or your personal data:
        </p>
        <div className="bg-[#F8FAFC] border border-border rounded-lg p-6">
          <p className="text-muted-foreground mb-2">
            <strong>Email:</strong> privacy@vitalink.africa
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Address:</strong> Lagos, Nigeria
          </p>
          <p className="text-muted-foreground">
            We will respond to your inquiry within 30 days as required by the NDPA.
          </p>
        </div>
      </section>
    </LegalPageLayout>
      <FooterSection />
    </main>
  );
}
