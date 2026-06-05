"use client";

import { Check } from "lucide-react";
import { SectionContainer } from "./section-container";

const criticalDetails = [
  "Allergies",
  "Medications",
  "Medical History",
  "Emergency Contacts",
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-border">
      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-12 items-center min-w-0">
          <blockquote className="min-w-0">
            <p className="text-2xl sm:text-3xl font-medium text-foreground leading-relaxed text-balance">
              &ldquo;When the patient can&apos;t speak, we still need answers fast. With
              VitaLink, critical allergies and medications appear instantly after a
              tap.&rdquo;
            </p>
            <footer className="mt-6">
              <p className="font-semibold text-foreground">Dr. Emeka Okafor</p>
              <p className="text-sm text-muted-foreground">Emergency Medicine</p>
            </footer>
          </blockquote>

          <div className="card-surface p-6 lg:p-8 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Critical details in seconds
            </h3>
            <ul className="space-y-4">
              {criticalDetails.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#2563EB] shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
