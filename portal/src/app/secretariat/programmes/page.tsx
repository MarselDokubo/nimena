import type { Metadata } from "next";
import { PortalFrame } from "@/components/portal-frame";
import { ProgrammeQueue } from "./programme-queue";

export const metadata: Metadata = {
  title: "Programme reviews",
  description: "Screen NIMENA accreditation, innovation, magazine and partnership submissions.",
};

export default function ProgrammeReviewsPage() {
  return (
    <PortalFrame eyebrow="Secretariat workspace" role="secretariat" title="Programme reviews">
      <ProgrammeQueue />
    </PortalFrame>
  );
}
