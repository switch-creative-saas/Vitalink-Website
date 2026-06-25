"use client";

import { FormEvent, useState } from "react";

interface NewsletterFormProps {
  variant?: "hero" | "blog" | "inline";
  placeholder?: string;
}

export default function NewsletterForm({
  variant = "inline",
  placeholder = "Enter your email address",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're in! Check your inbox for a welcome email.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-3 ${variant === "hero" ? "justify-start" : "justify-center"}`}>
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className={`text-sm font-medium ${variant === "hero" ? "text-emerald-700" : "text-emerald-700"}`}>
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`flex gap-2 ${
          variant === "hero"
            ? "flex-col sm:flex-row max-w-sm"
            : variant === "blog"
              ? "flex-col w-full"
              : "flex-col sm:flex-row max-w-md mx-auto"
        }`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={status === "loading"}
          className={`w-full min-w-0 flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-60 ${
            variant === "hero"
              ? "bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50"
              : "bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap ${
            variant === "hero" ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-indigo-600 text-white hover:bg-indigo-700"
          } ${variant === "blog" ? "w-full" : ""}`}
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Subscribing...
            </span>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>

      {status === "error" && (
        <p className={`text-xs mt-2 ${variant === "hero" ? "text-red-500" : "text-red-500 text-center"}`}>
          {message}
        </p>
      )}

      <p className={`text-xs mt-2 ${variant === "hero" ? "text-muted-foreground" : "text-gray-400 text-center"}`}>
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
