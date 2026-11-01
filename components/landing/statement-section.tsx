"use client";

import { useEffect, useRef, useState } from "react";
import { FlaskConical, Pill, Receipt, Building2, WifiOff } from "lucide-react";
import { SectionContainer } from "./section-container";

const statement =
  "One record follows the patient from the front desk to the lab, the pharmacy, the bill and the next hospital, even when the network doesn't.";
const words = statement.split(" ");

// Small icons placed after these words, popping in as the sentence lights up.
const icons: Record<number, { icon: typeof Pill; tone: string }> = {
  11: { icon: FlaskConical, tone: "bg-sun text-ink" },
  13: { icon: Pill, tone: "bg-rose text-white" },
  15: { icon: Receipt, tone: "bg-primary text-white" },
  19: { icon: Building2, tone: "bg-violet text-white" },
  23: { icon: WifiOff, tone: "bg-ink text-white" },
};

export function StatementSection() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(words.length);
      return;
    }

    // Light up words as the paragraph travels from the bottom of the viewport to the middle.
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const end = window.innerHeight * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height * 0.5)));
      setLit(Math.round(progress * words.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="bg-white py-14 lg:py-24">
      <SectionContainer>
        <p
          ref={ref}
          aria-label={statement}
          className="word-reveal mx-auto max-w-5xl text-center text-3xl font-normal leading-[1.18] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[3.4rem]"
        >
          {words.map((word, index) => {
            const extra = icons[index];
            const Icon = extra?.icon;
            return (
              <span key={index} aria-hidden="true" data-lit={index < lit}>
                {word}{" "}
                {Icon && (
                  <span
                    className={`mr-[0.25em] inline-flex h-[0.95em] w-[0.95em] items-center justify-center rounded-full align-[-0.12em] ${extra.tone}`}
                    style={{
                      transform: index < lit ? "scale(1) rotate(0deg)" : "scale(0.2) rotate(-40deg)",
                      transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <Icon className="h-[0.5em] w-[0.5em]" />
                  </span>
                )}
              </span>
            );
          })}
        </p>
      </SectionContainer>
    </section>
  );
}
