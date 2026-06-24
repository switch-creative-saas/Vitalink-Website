import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact VitaLink",
  description:
    "Get in touch with the VitaLink team for partnerships, demos, support, or media inquiries. We're building Africa's healthcare infrastructure together.",
  alternates: {
    canonical: "https://vitalink.africa/contact",
  },
  openGraph: {
    title: "Contact VitaLink",
    description:
      "Contact VitaLink for partnerships, product demos, support, media inquiries, and healthcare infrastructure collaboration.",
    url: "https://vitalink.africa/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
