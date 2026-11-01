import { Activity, Building2, FileLock2, HeartHandshake, KeyRound, Landmark, Network, ScrollText, Stethoscope, WifiOff, Wallet } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionContainer } from "./section-container";

const audiences = [
  { label: "Private clinics", icon: Stethoscope },
  { label: "Hospitals", icon: Building2 },
  { label: "Hospital groups", icon: Network },
  { label: "State facilities", icon: Landmark },
  { label: "NGOs", icon: HeartHandshake },
  { label: "Public health teams", icon: Activity },
];

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
        <Reveal>
          <p className="text-center text-sm text-muted-foreground">Built for every kind of care provider</p>
          {/* Endless row: four copies slide left by half, so the loop never shows a gap. Pauses on hover. */}
          <div
            className="group mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            aria-label={`For ${audiences.map((a) => a.label).join(", ")}`}
            role="list"
          >
            <div
              className="flex w-max animate-chip-marquee group-hover:[animation-play-state:paused]"
              style={{ animationDuration: "40s" }}
            >
              {[0, 1, 2, 3].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy > 0}>
                  {audiences.map(({ label, icon: Icon }) => (
                    <span
                      key={label}
                      role={copy === 0 ? "listitem" : undefined}
                      className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-white px-5 py-3 text-[15px] text-foreground"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
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
