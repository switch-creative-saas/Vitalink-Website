"use client";

import { useRef, type MouseEvent } from "react";

interface CardData {
  icon: string;
  label: string;
  title: string;
  subtitle: string;
  rows: { key: string; value: string; variant?: "blue" | "purple" | "green" }[];
  badge: string;
  badgeVariant: "blue" | "purple" | "green";
}

const card: CardData = {
  icon: "🪪",
  label: "Health Identity",
  title: "John Doe",
  subtitle: "VitaLink ID · NFC VitaCard",
  rows: [
    { key: "Blood Type", value: "O+", variant: "blue" },
    { key: "Allergies", value: "Penicillin", variant: "purple" },
    { key: "Condition", value: "Asthma", variant: "purple" },
  ],
  badge: "Active Identity",
  badgeVariant: "blue",
};

const variantStyles = {
  blue: {
    badge: "bg-indigo-50 text-indigo-700 border-indigo-100",
    value: "bg-indigo-50 text-indigo-600 border-indigo-100",
    pulse: "bg-indigo-500",
  },
  purple: {
    badge: "bg-purple-50 text-purple-700 border-purple-100",
    value: "bg-purple-50 text-purple-600 border-purple-100",
    pulse: "bg-purple-500",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    value: "bg-emerald-50 text-emerald-600 border-emerald-100",
    pulse: "bg-emerald-500",
  },
};

export default function TiltCards() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 16;
    const rotateX = -((y - centerY) / centerY) * 12;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    el.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.035, 1.035, 1.035)`;
    el.style.boxShadow = `
      ${-rotateY * 1.3}px ${rotateX * 1.1}px 55px rgba(79, 70, 229, 0.16),
      0 30px 70px rgba(109, 40, 217, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.9)
    `;

    if (shineRef.current) {
      shineRef.current.style.opacity = "1";
      shineRef.current.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.92) 0%, rgba(196,181,253,0.30) 22%, rgba(129,140,248,0.10) 42%, transparent 62%)`;
    }

    if (depthRef.current) {
      depthRef.current.style.transform = `translate3d(${rotateY * -0.4}px, ${rotateX * 0.45 + 18}px, -40px) scale(0.94)`;
      depthRef.current.style.opacity = "0.9";
    }
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)";
    el.style.boxShadow = "0 22px 60px rgba(79, 70, 229, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)";

    if (shineRef.current) {
      shineRef.current.style.opacity = "0";
    }

    if (depthRef.current) {
      depthRef.current.style.transform = "translate3d(0, 18px, -40px) scale(0.94)";
      depthRef.current.style.opacity = "0.65";
    }
  };

  const badgeVariant = variantStyles[card.badgeVariant];

  return (
    <div className="relative flex min-h-[380px] w-full items-center justify-center overflow-visible [perspective:1200px]">
      <div className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-purple-200/45 via-indigo-100/35 to-blue-100/40 blur-3xl" />
      <div className="absolute bottom-10 h-12 w-72 rounded-full bg-indigo-950/10 blur-2xl" />

      <div className="relative h-[380px] w-[300px] sm:w-[330px] [transform-style:preserve-3d]">
        <div
          ref={depthRef}
          className="absolute inset-x-6 top-8 h-[320px] rounded-[2rem] bg-gradient-to-br from-indigo-200/55 to-purple-200/55 blur-sm transition-all duration-500 ease-out"
          style={{
            transform: "translate3d(0, 18px, -40px) scale(0.94)",
            opacity: 0.65,
          }}
        />

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-full w-full cursor-default overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-white via-[#F8F5FF] to-[#EAF0FF] p-6 shadow-[0_22px_60px_rgba(79,70,229,0.12)] transition-[transform,box-shadow] duration-300 ease-out [transform-style:preserve-3d]"
          style={{
            boxShadow: "0 22px 60px rgba(79, 70, 229, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
          }}
        >
          <div
            ref={shineRef}
            className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300"
          />
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-purple-300/25 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-indigo-300/20 blur-2xl" />

          <div className="relative z-10 flex h-full flex-col [transform:translateZ(42px)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-100 bg-white/85 text-2xl shadow-sm">
                {card.icon}
              </div>
              <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${badgeVariant.badge}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${badgeVariant.pulse}`} />
                Live
              </div>
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-500">
              {card.label}
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-indigo-950">
              {card.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{card.subtitle}</p>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />

            <div className="space-y-3">
              {card.rows.map((row) => {
                const rowVariant = variantStyles[row.variant ?? "blue"];

                return (
                  <div
                    key={row.key}
                    className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/65 px-4 py-3 shadow-sm backdrop-blur"
                  >
                    <span className="text-xs font-medium text-slate-500">{row.key}</span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${rowVariant.value}`}>
                      {row.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto pt-6">
              <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${badgeVariant.badge}`}>
                <span className={`h-2 w-2 rounded-full ${badgeVariant.pulse} animate-pulse`} />
                {card.badge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
