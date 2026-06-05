import { cn } from "@/lib/utils";

type DashboardMockupProps = {
  accent?: "blue" | "purple";
  className?: string;
  title?: string;
};

export function DashboardMockup({
  accent = "blue",
  className,
  title = "Dashboard",
}: DashboardMockupProps) {
  const accentColor = accent === "blue" ? "#2563EB" : "#7C3AED";
  const accentBg = accent === "blue" ? "bg-blue-50" : "bg-violet-50";
  const accentBar = accent === "blue" ? "bg-[#2563EB]" : "bg-[#7C3AED]";

  return (
    <div
      className={cn(
        "w-full min-w-0 rounded-2xl border border-border bg-white shadow-premium overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#F8FAFC]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
        </div>
        <span className="text-xs text-muted-foreground ml-2 truncate">{title}</span>
      </div>

      <div className="flex min-h-[220px] sm:min-h-[260px]">
        <div className="w-14 sm:w-16 shrink-0 border-r border-border bg-[#F8FAFC] p-2 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={cn(
                "h-6 rounded-md",
                i === 1 ? accentBar : "bg-[#E2E8F0]"
              )}
            />
          ))}
        </div>

        <div className="flex-1 min-w-0 p-4 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={cn("rounded-lg p-2", accentBg)}>
                <div
                  className="h-2 w-8 rounded mb-2"
                  style={{ backgroundColor: accentColor, opacity: 0.6 }}
                />
                <div className="h-4 w-12 bg-[#E2E8F0] rounded" />
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border p-3">
            <div className="flex items-end gap-1.5 h-20">
              {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                <div
                  key={i}
                  className={cn("flex-1 rounded-t-sm min-w-0", accentBar)}
                  style={{ height: `${h}%`, opacity: 0.4 + i * 0.07 }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="h-2 flex-1 bg-[#E2E8F0] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
