"use client";

import { useState, useEffect } from "react";
import { Printer } from "lucide-react";
import { SplitText } from "@/components/landing/motion";
import { SectionContainer } from "@/components/landing/section-container";
import { cn } from "@/lib/utils";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  sections: Array<{ id: string; title: string }>;
  children: React.ReactNode;
  acceptanceText?: string;
};

export function LegalPageLayout({
  title,
  lastUpdated,
  sections,
  children,
  acceptanceText,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-white pb-12 pt-28 sm:pt-32 lg:pb-16 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-primary/10 lg:h-[26rem] lg:w-[26rem]" />
        <SectionContainer className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Legal
          </span>
          <SplitText
            as="h1"
            text={title}
            className="mt-6 text-[2.4rem] font-normal leading-[1.05] tracking-[-0.035em] text-ink sm:text-6xl lg:text-7xl"
          />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Last updated {lastUpdated}</span>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-brand-soft hover:text-primary print:hidden"
            >
              <Printer className="h-4 w-4" />
              Print or save as PDF
            </button>
          </div>
        </SectionContainer>
      </div>

      {/* Content */}
      <SectionContainer className="py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents - Sticky on Desktop */}
          <aside className="lg:w-72 shrink-0 print:hidden">
            <nav className="rounded-[1.5rem] bg-surface p-5 lg:sticky lg:top-24">
              <h2 className="text-sm font-medium text-ink mb-4">
                On this page
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "text-sm text-left w-full transition-colors hover:text-primary",
                        activeSection === section.id
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="prose prose-lg max-w-none">
              {children}
            </div>
          </main>
        </div>
      </SectionContainer>

      {/* Acceptance Banner */}
      {acceptanceText && (
        <div className="bg-surface py-6">
          <SectionContainer>
            <p className="text-sm text-muted-foreground text-center">
              {acceptanceText}
            </p>
          </SectionContainer>
        </div>
      )}
    </div>
  );
}
