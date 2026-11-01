import { ArrowRight } from "lucide-react";
import { LAUNCHED, SIGNUP_LABEL, SIGNUP_URL } from "@/lib/site-links";
import { SplitText } from "./motion";
import { Reveal } from "./reveal";
import { SectionContainer } from "./section-container";

const steps = [
  {
    number: "01",
    title: "Create your workspace",
    body: "Sign up, name your facility and invite your staff with the roles they need.",
  },
  {
    number: "02",
    title: "Bring in your patients",
    body: "Import a spreadsheet or EMR export, or photograph your paper register.",
  },
  {
    number: "03",
    title: "Start seeing patients",
    body: "Book, consult, dispense and bill from the same day.",
  },
];

export function OnboardingSection() {
  return (
    <section className="bg-white px-3 py-8 sm:px-6 [@media(min-width:1024px)_and_(min-height:820px)]:sticky [@media(min-width:1024px)_and_(min-height:820px)]:top-0">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] bg-primary text-white lg:rounded-[2.75rem]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <SectionContainer className="relative py-16 lg:py-24">
          <Reveal className="max-w-3xl">
            <SplitText text="Live in a day, not a quarter" className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl" />
            <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">
              No installation, no hardware to buy for the workspace and no long contract.
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.number} delay={index * 120} className="rounded-[1.5rem] bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-sm lg:p-8">
                <span className="text-6xl font-light leading-none tracking-[-0.05em] text-sun">{step.number}</span>
                <h3 className="mt-8 text-xl font-medium">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{step.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-sun hover:text-ink"
            >
              {SIGNUP_LABEL}
              <ArrowRight className="h-4 w-4" />
            </a>
            <span className="text-sm text-white/70">
              {LAUNCHED ? "14 days of the Growth plan. No card required." : "Early access for the first facilities on the list."}
            </span>
          </Reveal>
        </SectionContainer>
      </div>
    </section>
  );
}
