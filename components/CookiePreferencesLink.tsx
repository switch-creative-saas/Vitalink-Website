"use client";

type CookiePreferencesLinkProps = {
  className?: string;
};

export function CookiePreferencesLink({ className }: CookiePreferencesLinkProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("vitalink:open-cookie-preferences"))}
    >
      Cookie Preferences
    </button>
  );
}
