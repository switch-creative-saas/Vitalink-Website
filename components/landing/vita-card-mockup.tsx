import { Shield, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

type VitaCardMockupProps = {
  className?: string;
  compact?: boolean;
};

export function VitaCardMockup({ className, compact = false }: VitaCardMockupProps) {
  return (
    <div className={cn("relative w-full max-w-sm mx-auto min-w-0", className)}>
      <div className="absolute inset-0 bg-[#2563EB]/10 rounded-3xl blur-3xl scale-90 pointer-events-none" />

      <div
        className={cn(
          "relative mx-auto bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-[#BFDBFE] rounded-3xl shadow-premium-lg overflow-hidden",
          compact ? "w-48 h-60" : "w-full max-w-[280px] aspect-[5/7]"
        )}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
              <span className="text-xs font-semibold text-[#2563EB] tracking-wide">
                VitaLink
              </span>
            </div>
            <p className="text-lg font-semibold text-[#0F172A] leading-tight">
              Digital Health Identity
            </p>
            <p className="text-xs text-[#64748B] mt-1">NFC Enabled</p>
          </div>

          <div className="flex justify-center py-4">
            <div className="w-16 h-16 rounded-full border-2 border-[#2563EB]/30 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border border-[#2563EB]/40 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#2563EB]/20" />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="w-12 h-8 rounded bg-[#FDE68A]/80 border border-[#FCD34D]" />
            <span className="text-[10px] text-[#64748B] font-mono">•••• 4821</span>
          </div>
        </div>
      </div>

      {!compact && (
        <>
          <div className="absolute -left-2 top-1/4 bg-white border border-border rounded-xl px-3 py-2 shadow-md flex items-center gap-2 text-xs font-medium text-foreground max-w-[140px]">
            <WifiOff className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            <span className="truncate">Offline First</span>
          </div>
          <div className="absolute -right-2 bottom-1/4 bg-white border border-border rounded-xl px-3 py-2 shadow-md flex items-center gap-2 text-xs font-medium text-foreground max-w-[120px]">
            <Shield className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
            <span className="truncate">Secure</span>
          </div>
        </>
      )}
    </div>
  );
}
