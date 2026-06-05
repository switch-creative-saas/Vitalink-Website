import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "footer" | "nav";
};

export function SectionContainer({
  children,
  className,
  id,
  as: Component = "div",
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "mx-auto w-full max-w-[1280px] min-w-0 px-4 sm:px-6 md:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}
