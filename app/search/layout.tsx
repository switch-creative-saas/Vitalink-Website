import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Search VitaLink",
  description:
    "Search VitaLink insights, healthcare infrastructure articles, public health intelligence, and digital health transformation resources.",
  alternates: {
    canonical: "https://vitalink.africa/search",
  },
  openGraph: {
    title: "Search VitaLink",
    description: "Search VitaLink articles and healthcare infrastructure resources.",
    url: "https://vitalink.africa/search",
  },
};

export default function SearchLayout({ children }: { children: ReactNode }) {
  return children;
}
