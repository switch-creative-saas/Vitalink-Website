"use client";

import { CalendarCheck, Nfc, Wallet, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "./motion";
import { useInView } from "./reveal";
import { SectionContainer } from "./section-container";

const rows = [
  {
    value: <><CountUp value={14} /> days</>,
    label: "14 days",
    tag: "Full Growth plan",
    tagTone: "bg-rose text-white",
    body: "Try every Growth feature, including VitaMind AI, with your own patients. No card needed to start.",
    icon: CalendarCheck,
    tileTone: "bg-primary text-white",
  },
  {
    value: "₦0",
    label: "₦0",
    tag: "Free plan",
    tagTone: "bg-sun text-ink",
    body: "Keep a patient registry, notes and appointments for up to 2 staff and 50 patients, free for as long as you need.",
    icon: Wallet,
    tileTone: "bg-sun text-ink",
  },
  {
    value: "1 tap",
    label: "1 tap",
    tag: "VitaCard",
    tagTone: "bg-primary text-white",
    body: "Is all it takes for a responder to see allergies, blood group and emergency contacts on any NFC phone.",
    icon: Nfc,
    tileTone: "bg-rose text-white",
  },
  {
    value: "0 bars",
    label: "0 bars",
    tag: "Offline-first",
    tagTone: "bg-violet text-white",
    body: "Is enough to keep working. Records are saved on the device and synced when the connection returns.",
    icon: WifiOff,
    tileTone: "bg-ink text-white",
  },
];

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

function NumberRow({ row }: { row: (typeof rows)[number] }) {
  const { ref, inView } = useInView<HTMLLIElement>(0.35);
  const Icon = row.icon;

  return (
    <li
      ref={ref}
      className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 border-b border-border py-8 sm:gap-x-8 lg:grid-cols-[auto_1fr_minmax(0,320px)] lg:py-10"
    >
      <span
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl sm:h-24 sm:w-24 lg:h-28 lg:w-28 lg:rounded-3xl",
          row.tileTone
        )}
        style={{
          transform: inView ? "none" : "scale(0.35) rotate(-12deg)",
          opacity: inView ? 1 : 0,
          transition: `transform 0.9s ${ease}, opacity 0.5s ease`,
        }}
      >
        <Icon className="h-7 w-7 sm:h-10 sm:w-10" />
      </span>

      <div className="relative min-w-0">
        <span
          className={cn(
            "absolute -top-4 left-2 z-10 rounded-lg px-2.5 py-1 text-[11px] font-medium sm:-top-3 sm:left-6 sm:text-xs",
            row.tagTone
          )}
          style={{
            transform: inView ? "rotate(-6deg)" : "translateY(-40px) rotate(-24deg)",
            opacity: inView ? 1 : 0,
            transition: `transform 0.8s ${ease} 0.35s, opacity 0.4s ease 0.35s`,
          }}
        >
          {row.tag}
        </span>
        <p className="overflow-hidden pb-[0.08em] text-5xl font-normal leading-none tracking-[-0.05em] text-ink sm:text-7xl lg:text-[7.5rem]" aria-label={row.label}>
          <span
            aria-hidden="true"
            className="inline-block"
            style={{
              transform: inView ? "none" : "translateY(105%)",
              transition: `transform 1s ${ease} 0.1s`,
            }}
          >
            {row.value}
          </span>
        </p>
      </div>

      <p
        className="col-span-2 text-[15px] leading-relaxed text-muted-foreground lg:col-span-1"
        style={{
          transform: inView ? "none" : "translateY(16px)",
          opacity: inView ? 1 : 0,
          transition: `transform 0.8s ${ease} 0.25s, opacity 0.8s ease 0.25s`,
        }}
      >
        {row.body}
      </p>
    </li>
  );
}

export function NumbersSection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <SectionContainer>
        <ul className="border-t border-border">
          {rows.map((row) => (
            <NumberRow key={row.label} row={row} />
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
