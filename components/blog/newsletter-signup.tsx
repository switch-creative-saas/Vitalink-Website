"use client";

import { Mail } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

interface NewsletterSignupProps {
  variant?: "sidebar" | "hero" | "inline";
  className?: string;
}

export function NewsletterSignup({ variant = "sidebar", className = "" }: NewsletterSignupProps) {
  if (variant === "sidebar") {
    return (
      <div className={`bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-xl p-6 text-white ${className}`}>
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Stay Updated
        </h3>
        <p className="text-sm text-white/90 mb-4">
          Get the latest healthcare insights delivered to your inbox.
        </p>
        <NewsletterForm variant="blog" placeholder="Enter your email" />
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={`bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-xl p-8 text-white ${className}`}>
        <h2 className="text-2xl font-bold mb-2">Stay Updated With Healthcare Innovation</h2>
        <p className="text-white/90 mb-6">
          Get the latest healthcare insights delivered to your inbox.
        </p>
        <NewsletterForm variant="blog" placeholder="Enter your email" />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-6 border border-border shadow-sm ${className}`}>
      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
        <Mail className="w-5 h-5 text-[#2563EB]" />
        Newsletter
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Get the latest healthcare insights delivered to your inbox.
      </p>
      <NewsletterForm />
    </div>
  );
}
