"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Brain, Briefcase, Clock, GraduationCap, HeartPulse, MapPin, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionContainer } from "@/components/landing/section-container";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PageHero, SectionHeading } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";

const RECRUITMENT_EMAIL = "careers@vitalink.africa";

// Set to true when hiring opens. While false, the roles below stay in the code but aren't shown.
const HIRING = false;
const applyLink = (subject: string) => `mailto:${RECRUITMENT_EMAIL}?subject=${encodeURIComponent(subject)}`;

const whyWorkHere = [
  { title: "Work that matters", description: "Software that hospitals use to treat patients, and that public health teams use to spot outbreaks.", icon: HeartPulse },
  { title: "Real problems", description: "Offline-first sync, low-data clinics, HMO billing, outbreak signals. Hard problems with real users.", icon: Target },
  { title: "New ground", description: "On-device record reading, AI clinical support and NFC identity, built for local conditions.", icon: Brain },
  { title: "Remote-friendly", description: "Flexible working with teammates across Nigeria.", icon: Zap },
  { title: "Room to grow", description: "Take ownership early and grow with the company.", icon: Briefcase },
  { title: "Learning", description: "Mentorship, training and time to learn the healthcare side properly.", icon: GraduationCap },
];

const openPositions = [
  { title: "Senior Software Engineer", department: "Engineering", location: "Remote (Nigeria)", type: "Full-time" },
  { title: "Product Manager", department: "Product", location: "Lagos, Nigeria", type: "Full-time" },
  { title: "Public Health Analyst", department: "Public Health", location: "Abuja, Nigeria", type: "Full-time" },
  { title: "Clinical Operations Lead", department: "Clinical Operations", location: "Remote (Nigeria)", type: "Full-time" },
  { title: "Sales Representative", department: "Sales", location: "Lagos, Nigeria", type: "Full-time" },
  { title: "Customer Success Manager", department: "Customer Success", location: "Remote (Nigeria)", type: "Full-time" },
];

const internships = [
  { title: "Public Health Intern", department: "Public Health", location: "Abuja, Nigeria" },
  { title: "Software Engineering Intern", department: "Engineering", location: "Remote (Nigeria)" },
  { title: "Product Design Intern", department: "Product", location: "Lagos, Nigeria" },
  { title: "Data Analyst Intern", department: "Data", location: "Remote (Nigeria)" },
  { title: "Community Health Intern", department: "Public Health", location: "Abuja, Nigeria" },
];

const hiringProcess = [
  { title: "Apply", description: "Send your CV and a short note about why the role interests you." },
  { title: "Review", description: "The hiring team reads every application." },
  { title: "Interview", description: "A conversation with the people you'd work with." },
  { title: "Task", description: "A short, role-specific exercise or case study." },
  { title: "Offer", description: "We make a decision quickly and tell you either way." },
];

const departments = ["All", ...Array.from(new Set(openPositions.map((p) => p.department)))];

export default function CareersPage() {
  const [department, setDepartment] = useState("All");
  const roles = department === "All" ? openPositions : openPositions.filter((p) => p.department === department);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-white">
      <Navigation />

      <PageHero
        eyebrow="Careers"
        title="Build the software Nigerian hospitals run on"
        lead="Join a small team building records, billing, AI support and disease surveillance for care providers who need it to work every day."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={HIRING ? "#open-positions" : "#hiring-status"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-deep sm:w-auto"
          >
            {HIRING ? "See open roles" : "Hiring status"}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${RECRUITMENT_EMAIL}`}
            className="inline-flex w-full items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 sm:w-auto"
          >
            Contact recruitment
          </a>
        </div>
      </PageHero>

      <section className="bg-white py-14 lg:py-20">
        <SectionContainer>
          <SectionHeading title="Why work at VitaLink" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyWorkHere.map(({ title, description, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 70} className="rounded-[1.75rem] bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-8 text-xl font-normal tracking-[-0.02em] text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      {HIRING ? (
        <>
      <section id="open-positions" className="bg-white py-14 lg:py-20">
        <SectionContainer>
          <SectionHeading title="Open roles" lead="Apply by email. We read every application." />
          <Reveal className="mt-8 flex flex-wrap gap-2">
            {departments.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={department === name}
                onClick={() => setDepartment(name)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  department === name ? "bg-ink text-white" : "bg-surface text-foreground/70 hover:text-foreground"
                )}
              >
                {name}
              </button>
            ))}
          </Reveal>

          <ul className="mt-8 border-t border-border">
            {roles.map((position) => (
              <li key={position.title}>
                <a
                  href={applyLink(`Application: ${position.title}`)}
                  className="group flex flex-col gap-4 border-b border-border py-6 transition-colors md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="text-xl font-normal tracking-[-0.02em] text-ink transition-colors group-hover:text-primary sm:text-2xl">
                      {position.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{position.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{position.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{position.type}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors group-hover:bg-primary group-hover:text-white md:self-auto">
                    Apply
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </SectionContainer>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <SectionContainer>
          <SectionHeading title="Internships" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internships.map((internship, index) => (
              <Reveal key={internship.title} delay={index * 70}>
                <a
                  href={applyLink(`Internship Application: ${internship.title}`)}
                  className="group flex h-full flex-col justify-between gap-6 rounded-[1.75rem] border border-border p-6 transition-colors hover:border-primary/40"
                >
                  <div>
                    <h3 className="text-lg font-medium text-ink">{internship.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {internship.department} · {internship.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Apply <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section className="bg-white px-3 py-6 sm:px-6">
        <Reveal className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-white sm:px-12 lg:rounded-[2.75rem] lg:px-20 lg:py-20">
          <h2 className="text-3xl font-normal tracking-[-0.03em] sm:text-4xl lg:text-5xl">How hiring works</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {hiringProcess.map((step, index) => (
              <li key={step.title} className="rounded-[1.5rem] bg-white/10 p-5 ring-1 ring-white/15">
                <span className="text-4xl font-light tracking-[-0.05em] text-sun">0{index + 1}</span>
                <h3 className="mt-6 text-lg font-medium">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/75">{step.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

        </>
      ) : (
        <section id="hiring-status" className="bg-white px-3 py-6 sm:px-6">
          <Reveal className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-white sm:px-12 lg:rounded-[2.75rem] lg:px-20 lg:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
            />
            <div className="relative max-w-2xl">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">No open roles right now</span>
              <h2 className="mt-6 text-3xl font-normal tracking-[-0.03em] sm:text-4xl lg:text-5xl">We&apos;re not hiring yet</h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                There are no open positions or internships at the moment. When we start hiring, roles will be listed
                here. You&apos;re welcome to send your CV in the meantime and we&apos;ll keep it on file.
              </p>
              <a
                href={applyLink("CV for future roles")}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-sun hover:text-ink"
              >
                Send your CV to {RECRUITMENT_EMAIL}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </section>
      )}

      {HIRING && (
        <section className="bg-white py-14 lg:py-20">
          <SectionContainer className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              title="Don't see your role?"
              lead="Send an open application and tell us what you'd like to work on."
            />
            <Reveal className="flex flex-col justify-between gap-8 rounded-[1.75rem] bg-surface p-6 sm:p-8">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                VitaLink is an equal opportunity employer. We do not discriminate on the basis of race, religion, colour, national
                origin, gender, sexual orientation, age, marital status or disability.
              </p>
              <a
                href={applyLink("Open Application")}
                className="inline-flex items-center gap-2 self-start rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary"
              >
                Send an open application
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </SectionContainer>
        </section>
      )}

      <FooterSection />
    </main>
  );
}
