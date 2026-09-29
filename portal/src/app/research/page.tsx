import type { Metadata } from "next";
import { PortalFrame } from "@/components/portal-frame";
import { ResearchWorkspace } from "./research-workspace";

export const metadata: Metadata = {
  title: "Research profile",
  description: "Manage research identity, publications, reviewer activity and links to NIMENA journals.",
};

export default function ResearchPage() {
  return (
    <PortalFrame eyebrow="Member workspace" title="Research profile">
      <ResearchWorkspace />
    </PortalFrame>
  );
}
