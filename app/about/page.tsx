"use client";

import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  CloudOff,
  Globe,
  HeartPulse,
  LayoutDashboard,
  Lock,
  MapPin,
  Nfc,
  Radar,
  Smartphone,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackDemoClick } from "@/lib/analytics";
import { DEMO_URL, SIGNUP_LABEL, SIGNUP_URL } from "@/lib/site-links";
import { SectionContainer } from "@/components/landing/section-container";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { CtaSection } from "@/components/landing/cta-section";
import { PageHero, SectionHeading } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";

const problems = [
  "Many patients' histories still live on paper, in one building.",
  "Hospitals run separate systems that don't talk to each other.",
  "Patients arrive in emergencies with no record anyone can read.",
  "Public health teams often learn about outbreaks weeks late.",
];

const products = [
  {
    title: "Workspace",
    description: "Records, EMR, lab, pharmacy, billing with HMO claims, telemedicine and VitaMind AI for hospitals and clinics.",
    icon: LayoutDashboard,
    tone: "bg-primary text-white",
  },
  {
    title: "VitaCard",
    description: "NFC cards that show a patient's emergency profile on any phone, with the full record behind a PIN.",
    icon: Nfc,
    tone: "bg-rose text-white",
  },
  {
    title: "VitaMind AI",
    description: "Clinical decision support and a consultation scribe that drafts notes for the doctor to sign.",
    icon: Bot,
    tone: "bg-violet text-white",
  },
  {
    title: "Sentinel",
    description: "Disease surveillance, case reporting and outbreak alerts built from clinic data.",
    icon: Radar,
    tone: "bg-sun text-ink",
  },
  {
    title: "Patient app (planned)",
    description: "A health wallet for patients is in development. It is not available yet.",
    icon: Smartphone,
    tone: "bg-surface text-foreground",
  },
];

const audiences = [
  { title: "Private clinics", icon: HeartPulse },
  { title: "Hospitals", icon: Building2 },
  { title: "Hospital groups", icon: Building2 },
  { title: "State facilities", icon: Globe },
  { title: "NGOs", icon: Users },
  { title: "Public health teams", icon: Activity },
];

const principles = [
  {
    title: "Works offline first",
    description: "Built for clinics where power and data come and go. Work continues and syncs later.",
    icon: CloudOff,
  },
  {
    title: "Private by design",
    description: "Role-based access, a two-step code to open records, and PINs on VitaCards.",
    icon: Lock,
  },
  {
    title: "Built in Nigeria",
    description: "Naira pricing, Paystack payments, HMO claims and workflows that match local practice.",
    icon: MapPin,
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-white">
      <Navigation />

      <PageHero
        eyebrow="About VitaLink"
        title="Connected care for every Nigerian hospital"
        lead="VitaLink is an offline-first healthcare platform. It gives hospitals one workspace to run their facility, gives patients a record they can carry, and gives public health teams earlier warning of outbreaks."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SIGNUP_URL}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-deep sm:w-auto"
          >
            {SIGNUP_LABEL}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDemoClick("about_page")}
            className="inline-flex w-full items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 sm:w-auto"
          >
            Book a demo
          </a>
        </div>
      </PageHero>

      {/* Why we built it */}
      <section className="bg-white py-14 lg:py-20">
        <SectionContainer className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading title="Why we built VitaLink" lead="Care in Nigeria is often fragmented. We kept seeing the same problems." />
          <ul className="space-y-3">
            {problems.map((problem, index) => (
              <Reveal as="li" key={problem} delay={index * 90} className="flex items-start gap-4 rounded-2xl bg-surface p-5">
                <span className="text-3xl font-light leading-none tracking-[-0.04em] text-primary">0{index + 1}</span>
                <p className="pt-1 text-[15px] leading-relaxed text-foreground">{problem}</p>
              </Reveal>
            ))}
          </ul>
        </SectionContainer>
      </section>

      {/* Mission statement band */}
      <section className="bg-white px-3 py-6 sm:px-6">
        <Reveal className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-white sm:px-12 lg:rounded-[2.75rem] lg:px-20 lg:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
          />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm text-white/70">Our mission</p>
              <p className="mt-3 text-2xl font-normal leading-snug tracking-[-0.02em] sm:text-3xl">
                Make healthcare connected, accessible and data-driven, starting with the hospitals that need it most.
              </p>
            </div>
            <div>
              <p className="text-sm text-white/70">Our vision</p>
              <p className="mt-3 text-2xl font-normal leading-snug tracking-[-0.02em] sm:text-3xl">
                A health record that follows every patient, and earlier warning for every outbreak.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* What we build */}
      <section className="bg-white py-14 lg:py-20">
        <SectionContainer>
          <SectionHeading title="What we build" lead="One platform, used by hospitals, patients and public health teams." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(({ title, description, icon: Icon, tone }, index) => (
              <Reveal key={title} delay={index * 80} className="flex flex-col rounded-[1.75rem] bg-surface p-6">
                <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", tone)}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-8 text-xl font-normal tracking-[-0.02em] text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Who we serve */}
      <section className="bg-white py-14 lg:py-20">
        <SectionContainer>
          <SectionHeading title="Who we work with" />
          <div className="mt-10 flex flex-wrap gap-2.5">
            {audiences.map(({ title, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 60}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-[15px] text-foreground">
                  <Icon className="h-4 w-4 text-primary" />
                  {title}
                </span>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Principles */}
      <section className="bg-white py-14 lg:py-20">
        <SectionContainer>
          <SectionHeading title="How we build" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 100} className="rounded-[1.75rem] border border-border p-6 lg:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-8 text-xl font-normal tracking-[-0.02em] text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      <CtaSection />
      <FooterSection />
    </main>
  );
}
