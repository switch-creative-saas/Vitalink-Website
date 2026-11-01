"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackDemoClick } from "@/lib/analytics";
import { DEMO_URL, SIGNUP_URL } from "@/lib/site-links";
import { clamp, easeInOut, onScrollFrame, prefersReducedMotion } from "./motion";
import { SectionContainer } from "./section-container";
import { WorkspaceMockup, type MockupView } from "./workspace-mockup";

// Order the cursor visits the modules in, and what each step shows.
const steps: { view: MockupView; caption: string }[] = [
  { view: "patients", caption: "Import a whole registry, even from photos of a paper register" },
  { view: "lab", caption: "Lab results go straight back to the patient's record" },
  { view: "billing", caption: "Bills build from the visit, and HMO claims come from the same record" },
  { view: "cards", caption: "A tap on any phone shows the patient's emergency profile" },
  { view: "vitamind", caption: "VitaMind drafts the consultation note for the doctor to sign" },
];

// Scroll progress (0–1 across the pinned stretch) at which each phase happens.
// The demo ends just before the next section starts sliding over the pinned stage.
const EXPAND_END = 0.14;
const DEMO_START = 0.17;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function HeroSection() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MockupView>("dashboard");
  const stepRef = useRef(-1);
  const [view, setView] = useState<MockupView>("dashboard");
  const [step, setStep] = useState(-1);
  const [ripple, setRipple] = useState<{ key: number; x: number; y: number } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const track = trackRef.current;
    const stage = stageRef.current;
    const mock = mockRef.current;
    const cursor = cursorRef.current;
    if (!track || !stage || !mock || !cursor) return;

    const reduced = prefersReducedMotion();

    // Start the tilted cards below the headline, leaving room for the tilt to lift their right-hand corner.
    const placePanel = () => {
      const headline = headlineRef.current;
      if (!headline) return;
      const bottom = headline.offsetTop + headline.offsetHeight;
      const lift = stage.offsetWidth * Math.sin((5 * Math.PI) / 180) + 40;
      stage.style.setProperty("--panel-top", `${Math.round(Math.max(bottom + lift + 24, window.innerHeight * 0.55))}px`);
    };
    placePanel();
    window.addEventListener("resize", placePanel);

    // Centre of a visible module button inside the mockup, in the mockup's own (unscaled) pixels.
    const targetPoint = (id: MockupView) => {
      const box = mock.getBoundingClientRect();
      const scale = box.width / mock.offsetWidth || 1;
      const candidates = mock.querySelectorAll<HTMLElement>(`[data-target="${id}"]`);
      for (const el of candidates) {
        if (el.offsetParent === null) continue;
        const r = el.getBoundingClientRect();
        return {
          x: (r.left + Math.min(r.width * 0.35, 40) - box.left) / scale,
          y: (r.top + r.height / 2 - box.top) / scale,
        };
      }
      return { x: mock.offsetWidth / 2, y: mock.offsetHeight / 2 };
    };

    const stop = onScrollFrame(() => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const pinned = track.offsetHeight - vh;
      const p = clamp(-rect.top / pinned);
      const overlapStart = (pinned - vh) / pinned;
      const demoEnd = overlapStart - 0.03;

      const expand = reduced ? 1 : easeInOut(clamp(p / EXPAND_END));
      const overlap = clamp((p - overlapStart) / (1 - overlapStart));
      stage.style.setProperty("--e", expand.toFixed(4));
      stage.style.setProperty("--o", (reduced ? 0 : overlap).toFixed(4));

      // Which step is the cursor on, and how far through it?
      const demo = (p - DEMO_START) / (demoEnd - DEMO_START);
      const raw = clamp(demo, 0, 0.9999) * steps.length;
      const index = Math.floor(raw);
      const local = demo >= 1 ? 1 : raw - index;
      const clicked = demo > 0 && local >= 0.6;

      const start = { x: mock.offsetWidth * 0.62, y: mock.offsetHeight * 0.9 };
      const from = index === 0 ? start : targetPoint(steps[index - 1].view);
      const to = targetPoint(steps[index].view);
      const move = easeInOut(clamp(local / 0.55));
      const pressed = local > 0.52 && local < 0.66;
      const x = demo <= 0 ? start.x : lerp(from.x, to.x, move);
      const y = demo <= 0 ? start.y : lerp(from.y, to.y, move);

      cursor.style.transform = `translate(${x}px, ${y}px) scale(${pressed ? 0.82 : 1})`;
      cursor.style.opacity = reduced ? "0" : clamp((p - EXPAND_END * 0.8) / 0.04).toFixed(3);

      const activeStep = demo <= 0 ? -1 : clicked ? index : index - 1;
      const nextView: MockupView = activeStep < 0 ? "dashboard" : steps[activeStep].view;
      if (nextView !== viewRef.current) {
        const forward = activeStep > stepRef.current;
        viewRef.current = nextView;
        stepRef.current = activeStep;
        setView(nextView);
        setStep(activeStep);
        if (forward && !reduced) setRipple({ key: performance.now(), x: to.x, y: to.y });
      }
    });
    return () => {
      stop();
      window.removeEventListener("resize", placePanel);
    };
  }, []);

  return (
    <section ref={trackRef} className="relative h-[480svh] bg-white lg:h-[560svh]" aria-label="VitaLink workspace">
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden bg-white [--panel-inset:12px] [--panel-top:max(74svh,600px)] sm:[--panel-inset:4vw]"
        style={{ "--e": 0, "--o": 0 } as React.CSSProperties}
      >
        <div
          className="h-full w-full origin-top"
          style={{ transform: "scale(calc(1 - var(--o) * 0.06))" }}
        >
          {/* Headline: leaves upwards as the panel takes over */}
          <SectionContainer
            ref={headlineRef}
            className={cn(
              "relative z-10 pt-28 text-center transition-opacity duration-1000 sm:pt-32",
              loaded ? "opacity-100" : "opacity-0"
            )}
          >
            <div style={{ opacity: "calc(1 - var(--e) * 1.8)", transform: "translateY(calc(var(--e) * -90px))" }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-foreground/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Hospital management for Nigerian healthcare
              </span>

              <h1 className="mx-auto mt-6 max-w-4xl text-[2.5rem] font-normal leading-[1.05] tracking-[-0.035em] text-ink text-balance sm:text-6xl lg:text-[5.25rem]">
                Run your whole hospital from one workspace
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Patient records, EMR, lab, pharmacy, billing and HMO claims in one place. VitaLink keeps working
                when the network drops and syncs when it returns.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={SIGNUP_URL}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-deep sm:w-auto"
                >
                  Start 14-day free trial
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDemoClick("hero")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-border bg-white px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 sm:w-auto"
                >
                  Book a demo
                </a>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">No card required. Free plan available after the trial.</p>
            </div>
          </SectionContainer>

          {/* Coloured cards behind the panel, straightening out as it grows */}
          {[
            { color: "bg-sun", lift: 34, turn: -5 },
            { color: "bg-rose", lift: 16, turn: -3.2 },
          ].map(({ color, lift, turn }) => (
            <div
              key={color}
              aria-hidden="true"
              className={cn("pointer-events-none absolute bottom-0 origin-bottom-left rounded-[2.25rem]", color)}
              style={{
                top: "calc((1 - var(--e)) * var(--panel-top))",
                left: "calc((1 - var(--e)) * var(--panel-inset) + 1%)",
                right: "calc((1 - var(--e)) * var(--panel-inset) + 1%)",
                opacity: "calc(1 - var(--e))",
                transform: `translateY(calc((1 - var(--e)) * -${lift}px)) rotate(calc((1 - var(--e)) * ${turn}deg))`,
              }}
            />
          ))}

          {/* The product panel: grows from a tilted card to the full screen */}
          <div
            className="absolute bottom-0 origin-bottom-left overflow-hidden bg-primary"
            style={{
              top: "calc((1 - var(--e)) * var(--panel-top))",
              left: "calc((1 - var(--e)) * var(--panel-inset))",
              right: "calc((1 - var(--e)) * var(--panel-inset))",
              borderRadius: "calc((1 - var(--e)) * 2.25rem) calc((1 - var(--e)) * 2.25rem) 0 0",
              transform: "rotate(calc((1 - var(--e)) * -1.6deg))",
            }}
          >
            <div className="absolute left-1/2 top-0 h-[100svh] w-screen -translate-x-1/2">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/20" />
              <div className="pointer-events-none absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#3a6af0] blur-3xl" />

              <div className="relative flex h-full items-center justify-center px-3 pb-20 pt-24 sm:px-8 lg:pb-24">
                <div
                  ref={mockRef}
                  className="relative w-full max-w-5xl"
                  style={{ transform: "scale(calc(0.93 + var(--e) * 0.07))", transformOrigin: "50% 0%" }}
                >
                  <WorkspaceMockup view={view} className="h-[min(540px,calc(100svh-190px))]" />

                  {/* Demo cursor, driven by scroll */}
                  <div
                    ref={cursorRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 z-20 opacity-0 transition-transform duration-100"
                    style={{ willChange: "transform" }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" className="-ml-1 -mt-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">
                      <path
                        d="M4 2.5 19.5 11l-6.6 1.6 3.9 7.3-2.6 1.4-3.9-7.3L5.6 19z"
                        fill="#0b1020"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {ripple && (
                    <span
                      key={ripple.key}
                      aria-hidden="true"
                      className="pointer-events-none absolute z-10 h-12 w-12 rounded-full bg-primary/30 ring-2 ring-primary/40 animate-cursor-click"
                      style={{ left: ripple.x, top: ripple.y }}
                    />
                  )}
                </div>
              </div>

              {/* Step caption and progress, like story segments */}
              <div
                className="absolute inset-x-0 bottom-5 flex justify-center px-4 sm:bottom-7"
                style={{ opacity: "calc((var(--e) - 0.85) * 6.7)" }}
              >
                <div className="w-full max-w-xl rounded-2xl bg-white/10 px-4 py-3 text-center text-white ring-1 ring-white/15 backdrop-blur-md">
                  <div className="flex gap-1.5">
                    {steps.map((s, i) => (
                      <span key={s.view} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                        <span
                          className="block h-full rounded-full bg-sun transition-all duration-500"
                          style={{ width: i <= step ? "100%" : "0%" }}
                        />
                      </span>
                    ))}
                  </div>
                  <p key={step} className="mt-2.5 text-[13px] leading-snug animate-in fade-in duration-500 sm:text-sm">
                    {step < 0 ? "Scroll to see a day in the workspace" : steps[step].caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Darkens slightly as the next section slides over */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ink"
          style={{ opacity: "calc(var(--o) * 0.45)" }}
        />
      </div>
    </section>
  );
}
