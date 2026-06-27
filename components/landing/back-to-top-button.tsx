"use client";

import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#2563EB] transition-colors"
    >
      <ArrowUp className="h-4 w-4" />
      Take me back to top
    </button>
  );
}
