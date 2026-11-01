import { Building2, FileLock2, KeyRound, ScrollText, WifiOff, Wallet } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionContainer } from "./section-container";

const audiences = ["Private clinics", "Hospitals", "Hospital groups", "State facilities", "NGOs", "Public health teams"];

const safeguards = [
  { label: "Two-step code to open patient records", icon: KeyRound },
  { label: "Role-based staff permissions", icon: FileLock2 },
  { label: "Audit logs on Enterprise", icon: ScrollText },
  { label: "Works offline, syncs later", icon: WifiOff },
  { label: "Payments through Paystack", icon: Wallet },
];

export function TrustStrip() {
  return (
    <section className="relative z-20 -mt-[100svh] rounded-t-[2.25rem] bg-white pb-14 pt-16 shadow-[0_-30px_60px_-24px_rgba(11,16,32,0.35)] lg:rounded-t-[3rem] lg:pb-20 lg:pt-24">
      <SectionContainer>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">Built for every kind of care provider</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {audiences.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground"
              >
                <Building2 className="h-3.5 w-3.5 text-primary" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2 lg:grid-cols-5">
          {safeguards.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 bg-surface px-5 py-5 lg:flex-col lg:items-start lg:gap-4 lg:py-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-sm leading-snug text-foreground">{label}</p>
            </div>
          ))}
        </Reveal>
      </SectionContainer>
    </section>
  );
}
