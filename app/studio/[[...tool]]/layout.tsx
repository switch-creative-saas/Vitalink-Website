import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "VitaLink Studio",
  description: "Internal VitaLink Sanity Studio content management workspace.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}
