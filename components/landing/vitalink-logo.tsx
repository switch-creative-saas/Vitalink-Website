import { cn } from "@/lib/utils";

type VitaLinkLogoProps = {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

export function VitaLinkLogo({
  className,
  showText = true,
  size = "md",
}: VitaLinkLogoProps) {
  const iconSizes = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  const textSizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };

  return (
    <div className={cn("flex items-center gap-2.5 min-w-0", className)}>
      <img
        src="/logo.png"
        alt="VitaLink Logo"
        className={cn(
          iconSizes[size],
          "shrink-0"
        )}
      />
      {showText && (
        <span
          className={cn(
            textSizes[size],
            "font-semibold text-foreground tracking-tight truncate"
          )}
        >
          VitaLink
        </span>
      )}
    </div>
  );
}
