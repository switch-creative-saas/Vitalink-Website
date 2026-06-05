// Simple client-side analytics tracking for marketing website
// Stores events in localStorage - no backend required

export type AnalyticsEvent = {
  eventName: string;
  timestamp: number;
  properties?: Record<string, any>;
};

export type WaitlistSignup = {
  id: string;
  timestamp: number;
  country?: string;
  role?: string;
  organizationType?: string;
};

const ANALYTICS_KEY = "vitalink_analytics_events";
const WAITLIST_KEY = "vitalink_waitlist_signups";

// Track an event
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  const events = getEvents();
  const newEvent: AnalyticsEvent = {
    eventName,
    timestamp: Date.now(),
    properties,
  };
  events.push(newEvent);
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
  
  // Also log to console for debugging
  console.log("[Analytics]", eventName, properties);
}

// Get all events
export function getEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ANALYTICS_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Track waitlist signup
export function trackWaitlistSignup(data: WaitlistSignup) {
  const signups = getWaitlistSignups();
  signups.push(data);
  localStorage.setItem(WAITLIST_KEY, JSON.stringify(signups));
  trackEvent("waitlist_form_submitted", data);
}

// Get all waitlist signups
export function getWaitlistSignups(): WaitlistSignup[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(WAITLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Get metrics for admin dashboard
export function getMetrics() {
  const signups = getWaitlistSignups();
  const events = getEvents();

  const totalSignups = signups.length;
  
  // Count by role
  const roleCounts: Record<string, number> = {};
  signups.forEach((signup) => {
    if (signup.role) {
      roleCounts[signup.role] = (roleCounts[signup.role] || 0) + 1;
    }
  });

  // Count by country
  const countryCounts: Record<string, number> = {};
  signups.forEach((signup) => {
    if (signup.country) {
      countryCounts[signup.country] = (countryCounts[signup.country] || 0) + 1;
    }
  });

  // Count page views
  const pageViews = events.filter((e) => e.eventName === "waitlist_page_view").length;

  // Count form starts
  const formStarts = events.filter((e) => e.eventName === "waitlist_form_started").length;

  // Count demo clicks
  const demoClicks = events.filter((e) => e.eventName === "request_demo_clicked").length;

  return {
    totalSignups,
    roleCounts,
    countryCounts,
    countriesRepresented: Object.keys(countryCounts).length,
    pageViews,
    formStarts,
    demoClicks,
    conversionRate: formStarts > 0 ? (totalSignups / formStarts) * 100 : 0,
  };
}

// Clear all analytics data (for testing)
export function clearAnalytics() {
  localStorage.removeItem(ANALYTICS_KEY);
  localStorage.removeItem(WAITLIST_KEY);
}

// Track demo request click
export function trackDemoClick(source?: string) {
  trackEvent("request_demo_clicked", { source });
}
