"use client";

const trustItems = [
  "Clinics",
  "Health Centers",
  "NGOs",
  "Government Agencies",
  "Medical Schools",
  "Research Institutes",
  "Public Health",
  "Hospitals",
];

export function TrustMarquee() {
  // Duplicate the array to ensure seamless infinite loop
  const marqueeContent = [...trustItems, ...trustItems, ...trustItems];

  return (
    <section className="bg-white overflow-hidden py-12 lg:py-16">
      <div className="text-center mb-8">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">
          Trusted by Healthcare Providers
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {marqueeContent.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-8 lg:mx-12 text-2xl lg:text-3xl font-light text-muted-foreground/70"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}
