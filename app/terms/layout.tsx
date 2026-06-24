import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "VitaLink's terms of service govern use of the healthcare platform, including Health Identity, EMR, Telemedicine, VitaMind AI, and Sentinel.",
  alternates: {
    canonical: "https://vitalink.africa/terms",
  },
  openGraph: {
    title: "Terms of Service | VitaLink",
    description:
      "Terms governing use of VitaLink's healthcare infrastructure platform and related services.",
    url: "https://vitalink.africa/terms",
  },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
