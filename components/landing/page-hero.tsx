"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SplitText } from "./motion";
import { SectionContainer } from "./section-container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
};

/** Shared opening block for inner pages: pill eyebrow, masked headline, lead, optional actions. */
export function PageHero({ eyebrow, title, lead, children, align = "center", className }: PageHeroProps) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(true);
  }, []);

  const centered = align === "center";

  return (
    <section className={cn("relative overflow-hidden bg-white pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-40", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-primary/10 lg:h-[28rem] lg:w-[28rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-36 h-40 w-40 rounded-full border border-primary/10 lg:h-64 lg:w-64"
      />
      <SectionContainer className="relative">
        <div className={cn("max-w-4xl", centered && "mx-auto text-center")}>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-foreground/70 transition-all duration-700",
              shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>

          <SplitText
            as="h1"
            text={title}
            className="mt-6 text-[2.4rem] font-normal leading-[1.05] tracking-[-0.035em] text-ink text-balance sm:text-6xl lg:text-[4.75rem]"
          />

          {lead && (
            <div
              className={cn(
                "mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground transition-all delay-300 duration-1000 sm:text-lg",
                centered && "mx-auto",
                shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              {lead}
            </div>
          )}

          {children && (
            <div
              className={cn(
                "mt-9 transition-all delay-500 duration-1000",
                shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              {children}
            </div>
          )}
        </div>
      </SectionContainer>
    </section>
  );
}

/** Large section heading used across inner pages. */
export function SectionHeading({ title, lead, className }: { title: string; lead?: string; className?: string }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <SplitText
        text={title}
        className="text-3xl font-normal leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-5xl"
      />
      {lead && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{lead}</p>}
    </div>
  );
}
