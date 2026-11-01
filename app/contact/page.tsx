"use client";

import { useState } from "react";
import { ArrowRight, Building2, CalendarDays, CheckCircle2, Clock, Globe, HelpCircle, Loader2, Mail, Shield, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackDemoClick } from "@/lib/analytics";
import { DEMO_URL } from "@/lib/site-links";
import { sendContactMessage } from "@/lib/contact";
import { SectionContainer } from "@/components/landing/section-container";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PageHero, SectionHeading } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";

const contactCards = [
  { title: "General", email: "hello@vitalink.africa", icon: Mail },
  { title: "Support", email: "support@vitalink.africa", icon: HelpCircle },
  { title: "Partnerships", email: "partnerships@vitalink.africa", icon: Users },
  { title: "Investors", email: "investors@vitalink.africa", icon: Building2 },
  { title: "Privacy", email: "privacy@vitalink.africa", icon: Shield },
  { title: "Careers", email: "careers@vitalink.africa", icon: Globe },
];

// Topics must match the list in the app's website-contact function.
const subjects = [
  "Product demo",
  "Pricing or Enterprise plan",
  "Technical support",
  "Hospital or NGO partnership",
  "Government partnership",
  "Investor relations",
  "Privacy or data request",
  "Careers",
  "Something else",
];

const faqs = [
  {
    q: "How does a hospital get started?",
    a: "Sign up at app.vitalink.africa for a 14-day trial of the Growth plan. No card is needed. If you'd like a walkthrough first, book a demo and we'll show you the workspace with your own workflows in mind.",
  },
  {
    q: "Can you help us move our existing records?",
    a: "Yes. The workspace imports Excel, CSV and exports from other EMRs, and can read photos of paper registers. Our team can help with larger migrations.",
  },
  {
    q: "How do VitaCards work?",
    a: "Each NFC card is linked to a patient's record. Tapping it on any NFC phone shows the emergency profile. The full record only opens with the patient's PIN.",
  },
  {
    q: "Can NGOs and governments use Sentinel?",
    a: "Yes. Full Sentinel surveillance is part of the Enterprise plan and available as an add-on for Starter and Growth. Contact partnerships to discuss a rollout.",
  },
];

const fieldClass =
  "w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10";

export default function ContactPage() {
  const empty = { fullName: "", organization: "", email: "", phone: "", subject: "", message: "", vl_trap: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await sendContactMessage(form);
      setStatus("sent");
      setForm(empty);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "We could not send your message.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-white">
      <Navigation />

      <PageHero
        eyebrow="Contact"
        title="Talk to the VitaLink team"
        lead="Questions about the workspace, pricing, partnerships or support. We reply on working days, usually within one business day."
      />

      <section className="bg-white pb-14 lg:pb-20">
        <SectionContainer className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <Reveal className="rounded-[2rem] bg-surface p-5 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-normal tracking-[-0.02em] text-ink sm:text-3xl">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">We reply on working days, usually within one business day.</p>
            {status === "sent" ? (
              <div className="mt-8 rounded-2xl bg-white p-6 text-center" role="status">
                <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
                <p className="mt-4 text-lg font-medium text-ink">Message sent</p>
                <p className="mt-1 text-sm text-muted-foreground">Thanks for getting in touch. We&apos;ll reply to your email.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30"
                >
                  Send another message
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Honeypot: hidden from people, bots tend to fill it in */}
              <input
                type="text"
                name="vl_trap"
                value={form.vl_trap}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="new-password"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-foreground">Full name *</span>
                  <input name="fullName" required value={form.fullName} onChange={handleChange} className={fieldClass} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-foreground">Organisation</span>
                  <input name="organization" value={form.organization} onChange={handleChange} className={fieldClass} placeholder="Hospital or company" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-foreground">Email *</span>
                  <input type="email" name="email" required value={form.email} onChange={handleChange} className={fieldClass} placeholder="you@example.com" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-foreground">Phone</span>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={fieldClass} placeholder="+234" />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">What is it about? *</span>
                <select name="subject" required value={form.subject} onChange={handleChange} className={fieldClass}>
                  <option value="">Choose a topic</option>
                  {subjects.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">Message *</span>
                <textarea name="message" required rows={6} value={form.message} onChange={handleChange} className={`${fieldClass} resize-none`} placeholder="How can we help?" />
              </label>
              {status === "error" && (
                <p role="alert" className="rounded-2xl bg-[#fbe6f3] px-4 py-3 text-sm text-[#a3226f]">
                  {error} You can also email{" "}
                  <a href="mailto:hello@vitalink.africa" className="font-medium underline">hello@vitalink.africa</a>.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-deep disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    Sending
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
            )}
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={100} className="relative overflow-hidden rounded-[2rem] bg-primary p-6 text-white sm:p-8">
              <CalendarDays className="h-7 w-7" />
              <h2 className="mt-6 text-2xl font-normal tracking-[-0.02em]">Book a demo</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                See the workspace with a member of the team and get your questions answered live.
              </p>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDemoClick("contact_page")}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-sun hover:text-ink"
              >
                Pick a time
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>

            <Reveal delay={160} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {contactCards.map(({ title, email, icon: Icon }) => (
                <a
                  key={title}
                  href={`mailto:${email}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-primary/40"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">{title}</span>
                    <span className="block truncate text-xs text-muted-foreground group-hover:text-primary">{email}</span>
                  </span>
                </a>
              ))}
            </Reveal>

            <Reveal delay={220} className="flex flex-col gap-3 rounded-2xl bg-surface p-5 text-sm text-foreground sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Abuja, Nigeria
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Mon–Fri, 9am–6pm WAT
              </span>
            </Reveal>
          </div>
        </SectionContainer>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <SectionContainer>
          <SectionHeading title="Common questions" className="mx-auto text-center" />
          <Reveal delay={100} className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map(({ q, a }) => (
                <AccordionItem key={q} value={q} className="border-border">
                  <AccordionTrigger className="py-6 text-base font-normal text-ink hover:no-underline sm:text-lg">{q}</AccordionTrigger>
                  <AccordionContent className="pb-6 pr-8 text-[15px] leading-relaxed text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </SectionContainer>
      </section>

      <FooterSection />
    </main>
  );
}
