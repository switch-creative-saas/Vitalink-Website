"use client";

import { ArrowUpRight, LayoutDashboard, Nfc, Radar } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_URL } from "@/lib/site-links";
import { SplitText, useScrollVars } from "./motion";
import { SectionContainer } from "./section-container";

type Product = {
  number: string;
  name: string;
  lead: string;
  body: string;
  /** Only products with their own public address link out. */
  href?: string;
  domain?: string;
  icon: typeof Nfc;
  tone: string;
  offset: string;
  rise: number;
  drift: number;
};

const products: Product[] = [
  {
    number: "01",
    name: "Workspace",
    lead: "Run the facility",
    body: "Records, EMR, lab, pharmacy, billing, telemedicine and VitaMind AI for your whole team.",
    href: APP_URL,
    domain: "app.vitalink.africa",
    icon: LayoutDashboard,
    tone: "bg-primary text-white",
    offset: "lg:mt-16",
    rise: 140,
    drift: 40,
  },
  {
    number: "02",
    name: "VitaCard",
    lead: "Carry the record",
    body: "NFC cards that open a patient's emergency profile on any phone, with the full record behind a PIN.",
    icon: Nfc,
    tone: "bg-rose text-white",
    offset: "",
    rise: 240,
    drift: 90,
  },
  {
    number: "03",
    name: "Sentinel",
    lead: "Watch for outbreaks",
    body: "Disease surveillance that turns clinic data into case reports, heatmaps and outbreak alerts.",
    icon: Radar,
    tone: "bg-sun text-ink",
    offset: "lg:mt-16",
    rise: 180,
    drift: 60,
  },
];

const chipWords = ["Workspace", "VitaCard", "Sentinel"];

export function ProductsSection() {
  const headRef = useScrollVars<HTMLDivElement>();
  const gridRef = useScrollVars<HTMLDivElement>();

  return (
    <section className="overflow-hidden bg-white py-14 lg:py-24">
      <SectionContainer>
        <div ref={headRef} className="relative flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center">
          {/* A card that flies in towards the heading */}
          <span
            aria-hidden="true"
            className="absolute -top-12 left-[2%] flex h-12 w-16 items-center justify-center rounded-xl bg-primary text-white shadow-xl sm:left-[4%] lg:-top-20 lg:h-16 lg:w-24"
            style={{
              transform:
                "translate(calc((1 - var(--enter-eased, 1)) * -120px), calc((1 - var(--enter-eased, 1)) * 140px)) rotate(calc(-14deg + var(--enter-eased, 1) * 6deg)) scale(calc(0.3 + var(--enter-eased, 1) * 0.7))",
              opacity: "var(--enter-eased, 1)",
            }}
          >
            <Nfc className="h-6 w-6 lg:h-8 lg:w-8" />
          </span>

          <SplitText
            text="One platform"
            className="text-5xl font-normal tracking-[-0.04em] text-ink sm:text-7xl lg:text-[7rem] lg:leading-none"
          />

          {/* Highlight chip that opens up as you scroll, with the product names running through it */}
          <span
            className="relative inline-flex h-[1.15em] items-center overflow-hidden rounded-2xl bg-sun text-4xl font-normal tracking-[-0.04em] text-ink sm:text-6xl lg:text-[6rem]"
            style={{ width: "calc(var(--enter-eased, 1) * 5.2em)" }}
            aria-label="three tools: Workspace, VitaCard, Sentinel"
          >
            <span aria-hidden="true" className="flex shrink-0 whitespace-nowrap animate-chip-marquee">
              {[0, 1].map((copy) => (
                <span key={copy} className="flex shrink-0">
                  {chipWords.map((word) => (
                    <span key={word} className="px-[0.25em]">
                      {word} ·
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </span>
        </div>

        <div ref={gridRef} className="mt-16 grid gap-4 md:grid-cols-3 lg:mt-24 lg:gap-6">
          {products.map(({ number, name, lead, body, href, domain, icon: Icon, tone, offset, rise, drift }) => (
            <div
              key={name}
              className={cn("rounded-[2rem] bg-surface p-3 will-change-transform", offset)}
              style={{
                transform: `translateY(calc((1 - var(--enter-eased, 1)) * ${rise}px + (var(--pass, 0.5) - 0.5) * -${drift}px)) scale(calc(0.9 + var(--enter-eased, 1) * 0.1))`,
                opacity: "calc(0.2 + var(--enter-eased, 1) * 0.8)",
              }}
            >
              <div className="px-4 pb-5 pt-4">
                <p className="text-sm text-muted-foreground">{lead}</p>
                <h3 className="mt-1 text-2xl font-normal tracking-[-0.02em] text-ink">{name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
              </div>
              {(() => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-medium opacity-80">{domain}</span>
                      <Icon className="h-10 w-10 opacity-90" />
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-7xl font-light leading-none tracking-[-0.05em]">{number}</span>
                      {href && (
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:rotate-45">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </>
                );
                const panel = cn("relative flex h-48 flex-col justify-between overflow-hidden rounded-[1.5rem] p-5", tone);
                return href ? (
                  <a href={href} className={cn("group transition-transform hover:-translate-y-1", panel)}>
                    {inner}
                  </a>
                ) : (
                  <div className={panel}>{inner}</div>
                );
              })()}
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
