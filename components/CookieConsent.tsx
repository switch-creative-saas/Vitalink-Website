"use client";

import { useEffect, useState } from "react";
import { Check, Cookie, Shield, SlidersHorizontal, X } from "lucide-react";
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
    title: "Essential cookies",
    description:
      "Required for core site security, page navigation, consent storage, and reliable website operation. These cannot be disabled.",
    required: true,
  },
  {
    id: "analytics",
    title: "Analytics cookies",
    description:
      "Help us understand website traffic and improve VitaLink experiences using aggregated usage insights.",
  },
  {
    id: "functional",
    title: "Functional cookies",
    description:
      "Remember preferences such as form choices and interface settings to make repeat visits smoother.",
  },
  {
    id: "marketing",
    title: "Marketing cookies",
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
    <div className="rounded-[1.5rem] bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-ink">{category.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {category.description}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={category.title}
          disabled={category.required}
          onClick={() => onChange(!checked)}
          className={cn(
            "relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
            checked ? "bg-primary" : "bg-black/15",
            category.required && "cursor-not-allowed opacity-70"
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
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-primary">
          <Shield className="h-3.5 w-3.5" />
          Always on
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
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[70] animate-in fade-in slide-in-from-bottom-6 duration-700 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[420px]"
        >
          <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_24px_60px_-20px_rgba(11,16,32,0.35)] ring-1 ring-black/5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sun text-ink">
                <Cookie className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-normal tracking-[-0.02em] text-ink">We use cookies</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Essential cookies keep the site secure and working. With your permission we also use analytics and other
              optional cookies to improve it. Change this any time from the footer.{" "}
              <a href="/cookie-policy" className="text-primary underline-offset-4 hover:underline">
                Cookie policy
              </a>
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-ink px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-full bg-surface px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-black/10"
              >
                Essential only
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Choose which cookies
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-ink/40 px-3 py-6 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowModal(false);
          }}
        >
          <div className="mx-auto flex min-h-full max-w-2xl items-center">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-preferences-title"
              className="w-full rounded-[2rem] bg-white shadow-[0_30px_80px_-24px_rgba(11,16,32,0.45)] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500"
            >
              <div className="flex items-start justify-between gap-4 p-6 pb-2 sm:p-8 sm:pb-2">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-foreground/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Privacy
                  </span>
                  <h2
                    id="cookie-preferences-title"
                    className="mt-4 text-3xl font-normal tracking-[-0.03em] text-ink sm:text-4xl"
                  >
                    Cookie preferences
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Choose which optional cookies VitaLink may use. Essential cookies stay on for security and core
                    site features.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close cookie preferences"
                  onClick={() => setShowModal(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-foreground/70 transition-colors hover:bg-black/10 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[60vh] space-y-2.5 overflow-y-auto px-6 py-5 sm:px-8">
                {cookieCategories.map((category) => (
                  <PreferenceToggle
                    key={category.id}
                    category={category}
                    checked={preferences[category.id]}
                    onChange={(checked) => updatePreference(category.id, checked)}
                  />
                ))}
              </div>

              <div className="flex flex-col-reverse gap-2 p-6 pt-2 sm:flex-row sm:justify-end sm:p-8 sm:pt-2">
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="rounded-full bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-black/10"
                >
                  Essential only
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-black/10"
                >
                  <Check className="h-4 w-4" />
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
                >
                  Save preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
