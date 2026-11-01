import {
  Activity,
  Bot,
  CalendarDays,
  Check,
  CreditCard,
  FileSpreadsheet,
  FlaskConical,
  LayoutDashboard,
  Lock,
  Mic,
  Nfc,
  Receipt,
  Search,
  Users,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type MockupView = "dashboard" | "patients" | "lab" | "billing" | "cards" | "vitamind";

const sidebar: { id: MockupView | "appointments"; label: string; icon: typeof Users }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "patients", label: "Patients", icon: Users },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "lab", label: "Laboratory", icon: FlaskConical },
  { id: "billing", label: "Billing", icon: Receipt },
  { id: "cards", label: "VitaCards", icon: CreditCard },
  { id: "vitamind", label: "VitaMind AI", icon: Bot },
];

// Shorter names for the module pills shown on small screens.
const shortLabels: Partial<Record<string, string>> = { lab: "Lab", cards: "Cards", vitamind: "VitaMind" };

const titles: Record<MockupView, string> = {
  dashboard: "Today at the clinic",
  patients: "Import patients",
  lab: "Laboratory",
  billing: "Billing",
  cards: "VitaCards",
  vitamind: "VitaMind scribe",
};

function Pill({ children, tone }: { children: React.ReactNode; tone: string }) {
  return <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", tone)}>{children}</span>;
}

const green = "bg-emerald-50 text-emerald-700";
const blue = "bg-brand-soft text-primary";
const amber = "bg-[#fff6d6] text-[#8a6400]";
const pink = "bg-[#fbe6f3] text-[#a3226f]";

function Row({ title, sub, pill, tone }: { title: string; sub?: string; pill: string; tone: string }) {
  return (
    <li className="flex items-center gap-3 border-b border-black/5 px-3 py-2 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium text-foreground">{title}</p>
        {sub && <p className="truncate text-[10px] text-muted-foreground">{sub}</p>}
      </div>
      <Pill tone={tone}>{pill}</Pill>
    </li>
  );
}

function Card({ title, aside, children, className }: { title: string; aside?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl ring-1 ring-black/5", className)}>
      <div className="flex items-center justify-between border-b border-black/5 px-3 py-2">
        <p className="text-[12px] font-semibold text-foreground">{title}</p>
        {aside && <p className="text-[10px] text-muted-foreground">{aside}</p>}
      </div>
      {children}
    </div>
  );
}

function DashboardView() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          ["Seen today", "48", blue],
          ["In queue", "7", amber],
          ["Lab pending", "12", pink],
          ["HMO claims", "9", "bg-[#ece6fb] text-violet"],
        ].map(([label, value, tone]) => (
          <div key={label} className={cn("rounded-xl px-3 py-2.5", tone)}>
            <p className="text-[10px] font-medium opacity-80">{label}</p>
            <p className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <Card title="Patient queue" aside="4 of 7">
          <ul>
            <Row title="Adaeze Okonkwo" sub="VL-20481 · Follow-up" pill="With doctor" tone={blue} />
            <Row title="Musa Ibrahim" sub="VL-20477 · Lab review" pill="Results ready" tone={green} />
            <Row title="Folake Adeyemi" sub="VL-20463 · Antenatal" pill="Waiting" tone={amber} />
            <Row title="Chinedu Eze" sub="VL-20452 · New patient" pill="Triage" tone={pink} />
          </ul>
        </Card>
        <div className="hidden rounded-xl bg-ink p-3 text-white lg:block">
          <p className="text-[12px] font-semibold">This week</p>
          <div className="mt-4 flex h-24 items-end gap-1.5">
            {[40, 62, 55, 78, 70, 90, 66].map((h, i) => (
              <span key={i} className="flex-1 rounded-t bg-white/20" style={{ height: `${h}%` }}>
                <span className="block h-full rounded-t bg-sun" style={{ height: `${h > 75 ? 100 : 0}%` }} />
              </span>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-white/60">Visits per day</p>
        </div>
      </div>
    </>
  );
}

function PatientsView() {
  return (
    <>
      <div className="flex items-center gap-3 rounded-xl bg-sun px-4 py-3 text-ink">
        <FileSpreadsheet className="h-5 w-5 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold">register-2024.xlsx</p>
          <p className="truncate text-[11px] opacity-75">1,284 rows · 1,262 ready · 22 to review</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full w-[86%] rounded-full bg-ink" />
          </div>
        </div>
      </div>
      <Card title="Review matches" aside="Before saving" className="mt-3">
        <ul>
          <Row title="Ngozi Umeh · F · 34" sub="Phone and date of birth found" pill="Ready" tone={green} />
          <Row title="Ibrahim Sani · M · 52" sub="From paper register photo" pill="Ready" tone={green} />
          <Row title="Bisi Alade · F · 29" sub="Similar to VL-18820" pill="Possible duplicate" tone={amber} />
          <Row title="Emeka Obi · M · 61" sub="From EMR export" pill="Ready" tone={green} />
        </ul>
      </Card>
    </>
  );
}

function LabView() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <Card title="Orders" aside="Today">
        <ul>
          <Row title="Full blood count" sub="Musa Ibrahim" pill="Result ready" tone={green} />
          <Row title="Malaria RDT" sub="Folake Adeyemi" pill="In progress" tone={blue} />
          <Row title="Lipid profile" sub="Chinedu Eze" pill="Sample taken" tone={amber} />
          <Row title="Urinalysis" sub="Adaeze Okonkwo" pill="Ordered" tone="bg-surface text-foreground/70" />
        </ul>
      </Card>
      <Card title="Full blood count · Musa Ibrahim" aside="Posted to record">
        <ul className="px-3 py-1 text-[11px]">
          {[
            ["Haemoglobin", "13.8 g/dL", false],
            ["White cells", "11.9 ×10⁹/L", true],
            ["Platelets", "245 ×10⁹/L", false],
          ].map(([name, value, flag]) => (
            <li key={name as string} className="flex items-center justify-between border-b border-black/5 py-2 last:border-b-0">
              <span className="text-muted-foreground">{name}</span>
              <span className={cn("font-medium", flag ? "text-[#a3226f]" : "text-foreground")}>{value}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function BillingView() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-xl bg-primary p-4 text-white">
        <p className="text-[11px] opacity-75">Invoice INV-30912 · Musa Ibrahim</p>
        <p className="mt-2 text-3xl font-normal tracking-tight">₦38,500</p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px]">
          <Check className="h-3 w-3" /> Paid via Paystack
        </p>
      </div>
      <Card title="Items">
        <ul>
          <Row title="Consultation" pill="₦15,000" tone="bg-surface text-foreground/70" />
          <Row title="Full blood count" pill="₦8,500" tone="bg-surface text-foreground/70" />
          <Row title="Drugs dispensed" pill="₦15,000" tone="bg-surface text-foreground/70" />
          <Row title="HMO claim prepared" sub="From this visit" pill="Submitted" tone={blue} />
        </ul>
      </Card>
    </div>
  );
}

function CardsView() {
  return (
    <div className="grid items-center gap-4 lg:grid-cols-[auto_1fr]">
      <div className="mx-auto w-44 rounded-[1.6rem] bg-ink p-2 shadow-xl">
        <div className="rounded-[1.2rem] bg-white p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-primary">
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-tap-ring" />
              <Nfc className="h-3.5 w-3.5" />
            </span>
            <p className="text-[11px] font-semibold text-foreground">Emergency profile</p>
          </div>
          <p className="mt-3 text-[13px] font-semibold text-foreground">Adaeze Okonkwo</p>
          <div className="mt-2 space-y-1.5 text-[10px]">
            <p className="rounded-md bg-[#fbe6f3] px-2 py-1 text-[#a3226f]">Allergy: Penicillin</p>
            <p className="rounded-md bg-surface px-2 py-1 text-foreground/80">Blood group O+</p>
            <p className="rounded-md bg-surface px-2 py-1 text-foreground/80">Contact: Chuka · 0803…</p>
          </div>
          <p className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground">
            <Lock className="h-3 w-3" /> PIN opens full record
          </p>
        </div>
      </div>
      <Card title="Cards" aside="Linked to patient records">
        <ul>
          <Row title="VC-1042 · Adaeze Okonkwo" sub="Tapped just now" pill="Active" tone={green} />
          <Row title="VC-1041 · Musa Ibrahim" pill="Active" tone={green} />
          <Row title="VC-1040 · Folake Adeyemi" pill="Ready to link" tone={amber} />
        </ul>
      </Card>
    </div>
  );
}

function VitaMindView() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-xl bg-violet p-4 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Mic className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13px] font-semibold">Listening</p>
            <p className="text-[10px] opacity-75">Consultation · 06:12</p>
          </div>
        </div>
        <div className="mt-4 flex h-8 items-center gap-1">
          {[30, 70, 45, 90, 60, 35, 80, 50, 65, 40, 75, 55].map((h, i) => (
            <span key={i} className="w-1.5 rounded-full bg-white/70" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <Card title="Draft note" aside="Doctor reviews and signs">
        <ul className="space-y-1.5 p-3 text-[11px]">
          {["Presenting complaint: fever for 3 days", "Assessment: possible malaria", "Plan: malaria RDT, review results"].map((line) => (
            <li key={line} className="flex items-start gap-2 rounded-md bg-surface px-2 py-1.5 text-foreground">
              <Activity className="mt-0.5 h-3 w-3 shrink-0 text-violet" />
              {line}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

const views: Record<MockupView, () => React.ReactElement> = {
  dashboard: DashboardView,
  patients: PatientsView,
  lab: LabView,
  billing: BillingView,
  cards: CardsView,
  vitamind: VitaMindView,
};

export function WorkspaceMockup({ view = "dashboard", className }: { view?: MockupView; className?: string }) {
  const View = views[view];

  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-[0_30px_80px_-20px_rgba(8,20,70,0.45)] ring-1 ring-black/5",
        className
      )}
      aria-hidden="true"
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-black/5 bg-[#fafbfc] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden truncate rounded-md bg-white px-3 py-1 text-[11px] text-muted-foreground ring-1 ring-black/5 sm:block">
          app.vitalink.africa
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-48 shrink-0 border-r border-black/5 bg-[#fafbfc] p-3 md:block">
          <p className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Lekki Family Clinic
          </p>
          <ul className="space-y-0.5">
            {sidebar.map(({ id, label, icon: Icon }) => {
              const active = id === view;
              return (
                <li
                  key={id}
                  data-target={id}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] transition-colors duration-300",
                    active ? "bg-white font-medium text-foreground shadow-sm ring-1 ring-black/5" : "text-muted-foreground"
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", active && "text-primary")} />
                  {label}
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
          {/* Module switcher shown instead of the sidebar on small screens */}
          <div className="-mx-1 mb-3 flex gap-1.5 overflow-hidden px-1 md:hidden">
            {sidebar
              .filter(({ id }) => id !== "appointments" && id !== "dashboard")
              .map(({ id, label }) => (
                <span
                  key={id}
                  data-target={id}
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors duration-300",
                    id === view ? "bg-ink text-white" : "bg-surface text-foreground/70"
                  )}
                >
                  {shortLabels[id] ?? label}
                </span>
              ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground">Good morning, Dr. Bello</p>
              <p className="truncate text-sm font-semibold text-foreground sm:text-base">{titles[view]}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[11px] text-muted-foreground sm:flex">
                <Search className="h-3 w-3" />
                Find a patient
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[11px] font-medium text-emerald-700">
                <Wifi className="h-3 w-3" />
                Synced
              </span>
            </div>
          </div>

          <div key={view} className="mt-4 min-h-0 flex-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <View />
          </div>
        </div>
      </div>
    </div>
  );
}
