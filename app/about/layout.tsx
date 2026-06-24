import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About VitaLink",
  description:
    "Learn about VitaLink's mission to build connected healthcare infrastructure across Africa, our founding story, and the team building the continent's healthcare operating system.",
  alternates: {
    canonical: "https://vitalink.africa/about",
  },
  openGraph: {
    title: "About VitaLink",
    description: "Our mission to build connected healthcare infrastructure across Africa.",
    url: "https://vitalink.africa/about",
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
