import type { Metadata } from "next";
import { PortalFrame } from "@/components/portal-frame";
import { ConferenceManagement } from "./conference-management";

export const metadata: Metadata = { title: "Conference management" };

export default function ConferenceManagementPage() {
  return (
    <PortalFrame eyebrow="Secretariat workspace" role="secretariat" title="Conference management">
      <ConferenceManagement />
    </PortalFrame>
  );
}
