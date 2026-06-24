import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Join the VitaLink Waitlist",
  description:
    "Be among the first to access VitaLink, Africa's next-generation healthcare infrastructure platform for identity, records, telemedicine, and AI support.",
  alternates: {
    canonical: "https://vitalink.africa/waitlist",
  },
  openGraph: {
    title: "Join the VitaLink Waitlist",
    description:
      "Join the waitlist for early access to VitaLink's connected healthcare infrastructure platform.",
    url: "https://vitalink.africa/waitlist",
  },
};

export default function WaitlistLayout({ children }: { children: ReactNode }) {
  return children;
}
