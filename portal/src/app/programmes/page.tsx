import type { Metadata } from "next";
import { PortalFrame } from "@/components/portal-frame";
import { ProgrammeWorkspace } from "./programme-workspace";

export const metadata: Metadata = {
  title: "Institutional programmes",
  description: "Access NIMENA accreditation, innovation, magazine and partnership workflows.",
};

export default function ProgrammesPage() {
  return (
    <PortalFrame eyebrow="Member workspace" title="Institutional programmes">
      <ProgrammeWorkspace />
    </PortalFrame>
  );
}
