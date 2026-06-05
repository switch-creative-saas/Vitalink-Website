"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterSignupProps {
  variant?: "sidebar" | "hero" | "inline";
  className?: string;
}

export function NewsletterSignup({ variant = "sidebar", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // TODO: Integrate with newsletter service (e.g., Mailchimp, ConvertKit, etc.)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setEmail("");
      setName("");
    }, 1000);
  };

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
        {submitted ? (
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Subscribed successfully!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#2563EB] hover:bg-white/90"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}
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
        {submitted ? (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Subscribed successfully!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-white text-[#2563EB] hover:bg-white/90 whitespace-nowrap"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}
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
      {submitted ? (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>Subscribed successfully!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] hover:bg-[#2563EB]/90"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
    </div>
  );
}
