"use client";

import { useEffect, useState } from "react";
import { Check, Cookie, Shield, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CookieCategory = "essential" | "analytics" | "functional" | "marketing";

type CookiePreferences = Record<CookieCategory, boolean>;

type CookieCategoryConfig = {
  id: CookieCategory;
  title: string;
  description: string;
  required?: boolean;
};

const CONSENT_STORAGE_KEY = "vitalink_cookie_preferences";
const CONSENT_COOKIE_KEY = "vitalink_cookie_consent";

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  functional: false,
  marketing: false,
};

const allPreferences: CookiePreferences = {
  essential: true,
  analytics: true,
  functional: true,
  marketing: true,
};

const cookieCategories: CookieCategoryConfig[] = [
  {
    id: "essential",
    title: "Essential Cookies",
    description:
      "Required for core site security, page navigation, consent storage, and reliable website operation. These cannot be disabled.",
    required: true,
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description:
      "Help us understand website traffic and improve VitaLink experiences using aggregated usage insights.",
  },
  {
    id: "functional",
    title: "Functional Cookies",
    description:
      "Remember preferences such as form choices and interface settings to make repeat visits smoother.",
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description:
      "Support relevant communications and campaign measurement. These remain disabled unless you opt in.",
  },
];

function readCookieConsent(): CookiePreferences | null {
  if (typeof document === "undefined") return null;

  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${CONSENT_COOKIE_KEY}=`))
    ?.split("=")[1];

  if (!cookieValue) return null;

  try {
    return {
      ...defaultPreferences,
      ...JSON.parse(decodeURIComponent(cookieValue)),
      essential: true,
    };
  } catch {
    return null;
  }
}

function readStoredConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const localValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  if (localValue) {
    try {
      return {
        ...defaultPreferences,
        ...JSON.parse(localValue),
        essential: true,
      };
    } catch {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    }
  }

  return readCookieConsent();
}

function writeConsent(preferences: CookiePreferences) {
  const normalized = { ...preferences, essential: true };
  const value = JSON.stringify(normalized);
  const maxAge = 60 * 60 * 24 * 180;

  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  document.cookie = `${CONSENT_COOKIE_KEY}=${encodeURIComponent(
    value
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

function PreferenceToggle({
  category,
  checked,
  onChange,
}: {
  category: CookieCategoryConfig;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground">{category.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {category.description}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={category.required}
          onClick={() => onChange(!checked)}
          className={cn(
            "relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2",
            checked ? "bg-primary" : "bg-slate-200",
            category.required && "cursor-not-allowed opacity-80"
          )}
        >
          <span
            className={cn(
              "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
              checked ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>
      {category.required && (
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium text-[#4338CA]">
          <Shield className="h-3.5 w-3.5" />
          Always enabled
        </p>
      )}
    </div>
  );
}

export function CookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsent, setHasConsent] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedConsent = readStoredConsent();

    if (storedConsent) {
      setPreferences(storedConsent);
      setHasConsent(true);
    } else {
      setPreferences(defaultPreferences);
      setHasConsent(false);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    const openPreferences = () => {
      setPreferences(readStoredConsent() ?? defaultPreferences);
      setShowModal(true);
      setHasConsent(true);
    };

    window.addEventListener("vitalink:open-cookie-preferences", openPreferences);
    return () => {
      window.removeEventListener("vitalink:open-cookie-preferences", openPreferences);
    };
  }, []);

  const commitPreferences = (nextPreferences: CookiePreferences) => {
    const normalized = { ...nextPreferences, essential: true };
    writeConsent(normalized);
    setPreferences(normalized);
    setHasConsent(true);
    setShowModal(false);
  };

  const acceptAll = () => commitPreferences(allPreferences);
  const rejectNonEssential = () => commitPreferences(defaultPreferences);
  const savePreferences = () => commitPreferences(preferences);

  const updatePreference = (category: CookieCategory, enabled: boolean) => {
    if (category === "essential") return;
    setPreferences((current) => ({
      ...current,
      [category]: enabled,
      essential: true,
    }));
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      {!hasConsent && (
        <div className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#8B5CF6]/20 bg-white/95 shadow-2xl shadow-[#4F46E5]/15 backdrop-blur-xl">
            <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-end lg:p-7">
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
                    <Cookie className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl font-bold text-foreground">Your Privacy Matters</h2>
                </div>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  VitaLink uses cookies and similar technologies to improve security, enhance user experience, analyze website traffic, and remember your preferences. You can manage your cookie settings at any time.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button className="rounded-xl bg-primary px-5 text-white hover:bg-primary/90" onClick={acceptAll}>
                  Accept All
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-border bg-white text-foreground hover:bg-[#F8FAFC]"
                  onClick={rejectNonEssential}
                >
                  Reject Non-Essential
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-xl text-primary hover:bg-[#EEF2FF]"
                  onClick={() => setShowModal(true)}
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Customize Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
          <div className="mx-auto flex min-h-full max-w-3xl items-center">
            <div className="w-full rounded-3xl border border-[#8B5CF6]/20 bg-white shadow-2xl shadow-[#4F46E5]/15">
              <div className="flex items-start justify-between gap-4 border-b border-border p-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Privacy controls
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-foreground">
                    Cookie Preferences
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Choose which optional cookies VitaLink may use. Essential cookies remain active for security and core website functionality.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close cookie preferences"
                  onClick={() => setShowModal(false)}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-[#F8FAFC] hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[65vh] space-y-4 overflow-y-auto p-6">
                {cookieCategories.map((category) => (
                  <PreferenceToggle
                    key={category.id}
                    category={category}
                    checked={preferences[category.id]}
                    onChange={(checked) => updatePreference(category.id, checked)}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-border p-6 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  className="rounded-xl bg-white"
                  onClick={rejectNonEssential}
                >
                  Reject All Non-Essential
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl bg-white"
                  onClick={acceptAll}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Accept All
                </Button>
                <Button className="rounded-xl bg-primary text-white hover:bg-primary/90" onClick={savePreferences}>
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
