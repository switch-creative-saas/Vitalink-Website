"use client";

import { BookOpen, GraduationCap, MessageCircle, Upload } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SplitText } from "./motion";
import { Reveal } from "./reveal";
import { SectionContainer } from "./section-container";

const support = [
  {
    title: "Setup and data import",
    body: "Help moving patients over from spreadsheets, another EMR or paper registers.",
    icon: Upload,
  },
  {
    title: "Staff training",
    body: "Guided tours inside the workspace, plus training sessions for larger teams.",
    icon: GraduationCap,
  },
  {
    title: "Email and WhatsApp",
    body: "Reach a real person when something isn't working. Growth plans get priority replies.",
    icon: MessageCircle,
  },
  {
    title: "Help centre",
    body: "Guides in the Help section of your workspace, written for clinical and front-desk staff.",
    icon: BookOpen,
  },
];

const faqs = [
  {
    q: "Does VitaLink work without internet?",
    a: "Yes. The workspace is offline-first: staff can keep registering patients, writing notes and billing with no connection. Changes are stored on the device and sync automatically when the connection comes back. Low-data mode reduces usage on slow or costly connections.",
  },
  {
    q: "Can we bring our existing patient records?",
    a: "Yes. You can import Excel or CSV files, exports from other EMRs, or photos of paper registers, which are read on the device. You review the matches and possible duplicates before anything is saved.",
  },
  {
    q: "What is a VitaCard?",
    a: "An NFC card linked to a patient's record. Tapping it on any NFC phone shows their emergency profile, such as allergies and emergency contacts. The full record only opens with the patient's PIN. Cards are ₦2,500 each, ordered from your workspace.",
  },
  {
    q: "How is patient data protected?",
    a: "Staff only see what their role allows, opening patient records asks for a two-step code. Data is encrypted in transit, and Enterprise workspaces also keep audit logs.",
  },
  {
    q: "How do payments and HMO claims work?",
    a: "Bills are built from each visit's services, tests and drugs. Patients pay through Paystack, and on the Growth plan HMO and insurance claims are prepared from the same record.",
  },
  {
    q: "Can we try it before paying?",
    a: "Every new workspace gets 14 days of the Growth plan with no card required. After that you can choose a paid plan or stay on the Free plan.",
  },
  {
    q: "Is there an app for patients?",
    a: "Not yet. A patient app is planned. You can join the waitlist to hear when it launches.",
  },
];

export function SupportFaqSection() {
  return (
    <>
      <section className="bg-white py-14 lg:py-20">
        <SectionContainer>
          <Reveal className="max-w-3xl">
            <SplitText text="People behind the software" className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-ink text-balance sm:text-5xl lg:text-6xl" />
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Changing how a facility works is hard. We help your team get there.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {support.map(({ title, body, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 80} className="rounded-[1.75rem] bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-8 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </Reveal>
            ))}
          </div>
        </SectionContainer>
      </section>

      <section id="faq" className="bg-white py-14 lg:py-20">
        <SectionContainer>
          <Reveal className="mx-auto max-w-3xl text-center">
            <SplitText text="Frequently asked questions" className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl" />
          </Reveal>

          <Reveal delay={100} className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map(({ q, a }) => (
                <AccordionItem key={q} value={q} className="border-border">
                  <AccordionTrigger className="py-6 text-base font-normal text-ink hover:no-underline sm:text-lg">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pr-8 text-[15px] leading-relaxed text-muted-foreground">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </SectionContainer>
      </section>
    </>
  );
}
