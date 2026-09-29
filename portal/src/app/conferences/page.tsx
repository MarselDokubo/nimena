import type { Metadata } from "next";
import { PortalFrame } from "@/components/portal-frame";
import { ConferenceCentre } from "./conference-centre";

export const metadata: Metadata = {
  title: "Conferences",
  description: "Browse NIMENA conferences, register, view payments and manage attendance.",
};

export default function ConferencesPage() {
  return (
    <PortalFrame eyebrow="Professional development" title="Conferences">
      <ConferenceCentre />
    </PortalFrame>
  );
}
