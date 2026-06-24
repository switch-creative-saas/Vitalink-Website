"use client";

import { useState, useEffect } from "react";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobeBackground } from "@/components/GlobeBackground";
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

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-20">
        <GlobeBackground />
        <SectionContainer>
          <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {title}
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExportPDF}
              className="bg-white text-foreground hover:bg-[#F8FAFC] border-border"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              className="bg-white text-foreground hover:bg-[#F8FAFC] border-border"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
          </div>
        </SectionContainer>
      </div>

      {/* Content */}
      <SectionContainer className="py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents - Sticky on Desktop */}
          <aside className="lg:w-72 shrink-0">
            <nav className="lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold text-foreground mb-4">
                Table of Contents
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
        <div className="bg-[#F8FAFC] border-t border-border py-6">
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
