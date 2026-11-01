"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3, Bot, Check, Network, Nfc, Pill, Receipt, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion, SplitText } from "./motion";
import { Reveal, useInView } from "./reveal";
import { SectionContainer } from "./section-container";

type Module = {
  id: string;
  tab: string;
  icon: typeof Users;
  tone: string;
  cardTitle: [string, string];
  title: string;
  body: string;
  points: string[];
};

// Each module has a real screen recording of the demo workspace at /product/<id>.webm (poster /product/<id>.jpg).
const modules: Module[] = [
  {
    id: "patients",
    tab: "Patients",
    icon: Users,
    tone: "bg-primary",
    cardTitle: ["Patient", "registry"],
    title: "Patient registry",
    body: "Find any patient in seconds and bring your whole registry in. VitaLink reads Excel and CSV files, exports from other EMRs, and photos of paper registers, then shows you each match before anything is saved.",
    points: ["Search by name, VitaLink ID or phone", "Excel, CSV and EMR imports", "Photos of paper registers read on the device", "Duplicate checks before saving"],
  },
  {
    id: "billing",
    tab: "Billing & HMO",
    icon: Receipt,
    tone: "bg-[#e8772e]",
    cardTitle: ["Billing &", "HMO claims"],
    title: "Billing and HMO claims",
    body: "Services, tests and drugs are added to each patient's bill as the visit happens. Take payments through Paystack, track what's outstanding and prepare HMO claims from the same record.",
    points: ["Running bills built from each visit", "Collected, outstanding and overdue at a glance", "HMO and insurance claims", "Payments and receipts"],
  },
  {
    id: "pharmacy",
    tab: "Pharmacy",
    icon: Pill,
    tone: "bg-rose",
    cardTitle: ["Stock &", "dispensing"],
    title: "Pharmacy and stock",
    body: "Keep every drug, batch and expiry date in one list. Dispense against prescriptions, see low stock and expiring items early, and raise purchase orders.",
    points: ["Inventory by batch and expiry", "Low-stock and expiry alerts", "Dispensing linked to the patient record", "Purchase orders"],
  },
  {
    id: "vitamind",
    tab: "VitaMind AI",
    icon: Bot,
    tone: "bg-violet",
    cardTitle: ["VitaMind", "clinical AI"],
    title: "VitaMind clinical intelligence",
    body: "Describe the presentation, tick the findings and VitaMind suggests possible diagnoses with the evidence behind them. It also drafts consultation notes. The clinician always makes the final call.",
    points: ["Symptom-based differential", "History-aware analysis", "Consultation scribe", "Cited research for each condition"],
  },
  {
    id: "vitacards",
    tab: "VitaCards",
    icon: Nfc,
    tone: "bg-primary",
    cardTitle: ["VitaCards", "tap to identify"],
    title: "VitaCards",
    body: "Give patients an NFC card that opens their emergency profile on any phone. Their PIN unlocks the full record, and every view is logged.",
    points: ["Emergency profile on any NFC phone", "Full record behind a PIN", "Card activity log", "Order cards from the workspace"],
  },
  {
    id: "network",
    tab: "VitaLink Network",
    icon: Network,
    tone: "bg-[#0f8a6a]",
    cardTitle: ["VitaLink", "Network"],
    title: "Referrals between hospitals",
    body: "Find hospitals on the VitaLink Network by service and location, see who is accepting patients, and send referrals and transfers with the patient's consent.",
    points: ["Directory of connected hospitals", "Filter by service and state", "Referrals and transfers", "Records shared with consent"],
  },
  {
    id: "analytics",
    tab: "Analytics",
    icon: BarChart3,
    tone: "bg-ink",
    cardTitle: ["Clinic", "analytics"],
    title: "Analytics and reports",
    body: "See how the facility is doing from its own records: new patients, visits, payments, outstanding bills and lab work, compared with the previous period.",
    points: ["Patients, visits and appointments", "Payments and outstanding bills", "24-hour to 90-day views", "CSV export"],
  },
];

const INTRO_MS = 1300;

export function ModulesSection() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "video">("intro");
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>(0.25);
  const active = modules[index];

  // Title card first, then the recording, as in a guided product tour.
  useEffect(() => {
    setPhase("intro");
    setProgress(0);
    if (!inView) return;
    const timer = window.setTimeout(() => setPhase("video"), prefersReducedMotion() ? 0 : INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [index, inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || phase !== "video") return;
    video.currentTime = 0;
    if (!prefersReducedMotion()) video.play().catch(() => {});
  }, [phase, index]);

  const next = () => setIndex((i) => (i + 1) % modules.length);

  return (
    <section id="product" className="relative bg-white py-14 lg:py-20">
      <SectionContainer>
        <div className="mx-auto max-w-3xl text-center">
          <SplitText
            text="All-in-one hospital workspace"
            className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-ink text-balance sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={150}>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Real screens from the VitaLink demo workspace. Every module shares one patient record.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-12">
          <div ref={sectionRef} className="overflow-hidden rounded-[2rem] bg-surface">
            {/* Module tabs */}
            <div
              role="tablist"
              aria-label="VitaLink modules"
              className="flex overflow-x-auto border-b border-black/5 [scrollbar-width:none]"
            >
              {modules.map(({ id, tab, icon: Icon }, i) => {
                const selected = i === index;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    id={`tab-${id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${id}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "relative flex min-w-[112px] flex-1 flex-col items-center gap-2 px-3 py-4 text-xs font-medium transition-colors sm:text-[13px]",
                      selected ? "bg-white text-primary" : "text-foreground/55 hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 transition-transform duration-300", selected && "scale-110")} />
                    <span className="whitespace-nowrap">{tab}</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black/5">
                      <span
                        className="block h-full bg-primary transition-[width] duration-200 ease-linear"
                        style={{ width: selected ? `${phase === "video" ? progress * 100 : 0}%` : "0%" }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.55fr_1fr] lg:gap-10 lg:p-10"
            >
              {/* Screen recording in a browser frame */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(8,20,70,0.35)] ring-1 ring-black/5">
                <div className="flex items-center gap-2 border-b border-black/5 bg-[#fafbfc] px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-[11px] text-muted-foreground ring-1 ring-black/5">
                    app.vitalink.africa
                  </span>
                </div>
                <div className="relative aspect-[8/5] bg-[#f4f6fb]">
                  <video
                    key={active.id}
                    ref={videoRef}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                      phase === "video" ? "opacity-100" : "opacity-0"
                    )}
                    src={`/product/${active.id}.webm`}
                    poster={`/product/${active.id}.jpg`}
                    muted
                    playsInline
                    preload="metadata"
                    controls={false}
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget;
                      if (v.duration) setProgress(v.currentTime / v.duration);
                    }}
                    onEnded={next}
                    aria-label={`Screen recording: ${active.title} in the VitaLink workspace`}
                  />

                  {/* Title card */}
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white via-white to-[#eef2fd] transition-opacity duration-700",
                      phase === "intro" ? "opacity-100" : "pointer-events-none opacity-0"
                    )}
                    aria-hidden={phase !== "intro"}
                  >
                    <span
                      key={`icon-${active.id}`}
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg animate-in zoom-in-50 fade-in duration-500 sm:h-16 sm:w-16",
                        active.tone
                      )}
                    >
                      <active.icon className="h-7 w-7" />
                    </span>
                    <p
                      key={`title-${active.id}`}
                      className="mt-5 text-center text-2xl font-medium leading-tight tracking-[-0.02em] text-ink animate-in fade-in slide-in-from-bottom-3 delay-200 duration-700 fill-mode-both sm:text-4xl"
                    >
                      {active.cardTitle[0]} <span className="text-primary">{active.cardTitle[1]}</span>
                    </p>
                    <span className="mt-3 h-1 w-14 rounded-full bg-sun animate-in zoom-in-0 delay-500 duration-500 fill-mode-both" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div key={`copy-${active.id}`} className="flex flex-col justify-center px-1 animate-in fade-in slide-in-from-right-4 duration-700">
                <h3 className="text-2xl font-normal leading-tight tracking-[-0.02em] text-ink sm:text-3xl">{active.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{active.body}</p>
                <ul className="mt-6 space-y-3">
                  {active.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
