import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Careers at VitaLink",
  description:
    "Join VitaLink and help build the healthcare operating system for Africa. Explore open roles in engineering, product, public health, and operations.",
  alternates: {
    canonical: "https://vitalink.africa/careers",
  },
  openGraph: {
    title: "Careers at VitaLink",
    description:
      "Join the team building Africa's healthcare operating system across engineering, product, public health, and operations.",
    url: "https://vitalink.africa/careers",
  },
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
}
