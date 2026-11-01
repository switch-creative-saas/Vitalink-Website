import { ArrowRight, Building2, CloudOff, Gauge, Lock, Nfc, RefreshCw } from "lucide-react";
import { SplitText } from "./motion";
import { Reveal } from "./reveal";
import { SectionContainer } from "./section-container";

export function BentoSection() {
  return (
    <section id="solutions" className="bg-white py-14 lg:py-20">
      <SectionContainer>
        <Reveal className="mx-auto max-w-3xl text-center">
          <SplitText text="Made for how care works here" className="text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-ink text-balance sm:text-5xl lg:text-6xl" />
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Unreliable power and data, patients moving between facilities, emergencies with no history to hand.
            VitaLink was designed around them.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Offline */}
          <Reveal className="rounded-[2rem] bg-surface p-6 sm:p-8 lg:col-span-2">
            <div className="flex h-full flex-col gap-8 sm:flex-row sm:items-end">
              <div className="flex flex-1 flex-col self-stretch">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <CloudOff className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-2xl font-normal tracking-[-0.02em] text-ink sm:mt-auto sm:pt-6 sm:text-3xl">Offline-first</h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                  Keep registering, consulting and billing with no connection. Everything syncs automatically
                  once the network is back.
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-3 sm:w-64">
                <div className="col-span-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Saved on this device</span>
                    <RefreshCw className="h-3.5 w-3.5" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">14 changes waiting to sync</p>
                </div>
                <div className="rounded-2xl bg-sun p-4 text-ink">
                  <p className="text-[11px] opacity-75">Status</p>
                  <p className="mt-2 text-2xl font-normal tracking-tight">Offline</p>
                </div>
                <div className="rounded-2xl bg-ink p-4 text-white">
                  <p className="text-[11px] opacity-70">Records</p>
                  <p className="mt-2 text-2xl font-normal tracking-tight">Usable</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* VitaCards */}
          <Reveal delay={100} className="relative overflow-hidden rounded-[2rem] bg-primary p-6 text-white sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <Nfc className="h-5 w-5" />
            </span>
            <h3 className="mt-6 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">VitaCards</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">
              Tap a patient&apos;s card on any phone to see their emergency profile. Their PIN opens the full
              record.
            </p>
            <div className="relative mt-8 h-36">
              <div className="absolute left-2 top-4 h-28 w-44 rotate-[-8deg] rounded-2xl bg-rose shadow-xl" />
              <div className="absolute left-10 top-0 flex h-28 w-48 rotate-[4deg] flex-col justify-between rounded-2xl bg-white p-4 text-ink shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">VitaCard</span>
                  <Nfc className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Adaeze Okonkwo</p>
                  <p className="text-[11px] text-muted-foreground">Tap for emergency profile</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Network */}
          <Reveal className="rounded-[2rem] bg-surface p-6 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
              <Building2 className="h-5 w-5" />
            </span>
            <h3 className="mt-6 text-2xl font-normal tracking-[-0.02em] text-ink sm:text-3xl">VitaLink Network</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Refer patients to other facilities on VitaLink and send the history with them.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <div className="flex-1 rounded-2xl bg-white p-3 text-center shadow-sm ring-1 ring-black/5">
                <p className="text-[11px] text-muted-foreground">From</p>
                <p className="mt-1 truncate text-sm font-medium text-foreground">Family clinic</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
              <div className="flex-1 rounded-2xl bg-white p-3 text-center shadow-sm ring-1 ring-black/5">
                <p className="text-[11px] text-muted-foreground">To</p>
                <p className="mt-1 truncate text-sm font-medium text-foreground">Teaching hospital</p>
              </div>
            </div>
          </Reveal>

          {/* Low data + security */}
          <Reveal delay={100} className="rounded-[2rem] bg-surface p-6 sm:p-8 lg:col-span-2">
            <div className="grid h-full gap-8 sm:grid-cols-2">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <Gauge className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-2xl font-normal tracking-[-0.02em] text-ink sm:text-3xl">Low-data mode</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Switch it on to cut data use on slow or expensive connections, so the clinic day
                  keeps moving.
                </p>
              </div>
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <Lock className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-2xl font-normal tracking-[-0.02em] text-ink sm:text-3xl">Private by default</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Staff see only what their role needs, and opening a patient record asks for a two-step code.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}
