export const TAWK_PROPERTY_ID = "6a3ac4d3ad14dc1d441d02fe";
export const TAWK_WIDGET_ID = "1jrqp1mu6";
export const TAWK_WIDGET_URL = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;

export const tawkBranding = {
  brandName: "VitaLink Support",
  colors: {
    primary: "#2563EB",
    secondary: "#312E81",
    accent: "#7C3AED",
  },
} as const;

export const tawkKnowledgeBase = {
  helpCenter: null,
  faq: null,
  documentation: null,
  tutorials: null,
} as const;

export type TawkUser = {
  name?: string;
  email?: string;
  phone?: string;
  userId?: string;
  role?: "patient" | "hospital" | "doctor" | "ngo" | "government" | "admin" | string;
  organization?: string;
};

export type TawkAttributes = Record<string, string | number | boolean | null | undefined>;

function getTawkApi() {
  if (typeof window === "undefined") return null;
  window.Tawk_API = window.Tawk_API || {};
  return window.Tawk_API;
}

export function setUser(user: TawkUser) {
  const api = getTawkApi();
  if (!api) return;

  api.visitor = {
    name: user.name,
    email: user.email,
  };

  setAttributes({
    userId: user.userId,
    phone: user.phone,
    role: user.role,
    organization: user.organization,
  });
}

export function setAttributes(attributes: TawkAttributes) {
  const api = getTawkApi();
  if (!api?.setAttributes) return;

  const cleanAttributes: Record<string, string | number | boolean> = Object.fromEntries(
    Object.entries(attributes).filter(([, value]) => value !== undefined && value !== null)
  ) as Record<string, string | number | boolean>;

  if (Object.keys(cleanAttributes).length === 0) return;

  api.setAttributes(cleanAttributes, (error) => {
    if (error && process.env.NODE_ENV !== "production") {
      console.warn("Tawk.to setAttributes failed", error);
    }
  });
}

export function logout() {
  const api = getTawkApi();
  if (!api) return;

  if (api.logout) {
    api.logout();
    return;
  }

  api.visitor = undefined;
}
