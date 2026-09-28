import type { Metadata } from "next";
import { JournalShell } from "@/components/journal-shell";

export const metadata: Metadata = {
  title: {
    default: "NIMENA Journals Prototype",
    template: "%s | NIMENA Journals",
  },
  description:
    "Interactive prototype for AJOMENA, JBESED and NIMENA's proposed scholarly publishing workflows.",
};

export default function JournalsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <JournalShell>{children}</JournalShell>;
}
