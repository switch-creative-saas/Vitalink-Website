import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "VitaLink's privacy policy explains how we collect, use, and protect personal and health data in line with NDPR and healthcare privacy expectations.",
  alternates: {
    canonical: "https://vitalink.africa/privacy",
  },
  openGraph: {
    title: "Privacy Policy | VitaLink",
    description:
      "How VitaLink collects, uses, and protects personal and health data across its healthcare platform.",
    url: "https://vitalink.africa/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
