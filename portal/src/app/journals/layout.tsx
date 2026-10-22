import type { Metadata } from "next";
import { JournalShell } from "@/components/journal-shell";

export const metadata: Metadata = {
  title: {
    default: "NIMENA Research & Journals",
    template: "%s | NIMENA Journals",
  },
  description:
    "Explore AJOMENA, JBESED, calls for papers and NIMENA's scholarly publishing pathways.",
  openGraph: {
    title: "NIMENA Research & Journals",
    description: "Research and professional knowledge for maritime engineering, the blue economy and sustainable energy.",
    images: [{ url: "/media/journals-hero.webp", width: 1920, height: 1080, alt: "Maritime engineering and shipyard activity" }],
  },
};

export default function JournalsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <JournalShell>{children}</JournalShell>;
}
