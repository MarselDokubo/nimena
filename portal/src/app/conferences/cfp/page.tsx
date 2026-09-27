import type { Metadata } from "next";
import { PortalFrame } from "@/components/portal-frame";
import { AbstractWorkspace } from "./abstract-workspace";

export const metadata: Metadata = { title: "Conference call for papers" };

export default function ConferenceCfpPage() {
  return (
    <PortalFrame eyebrow="Conference module" title="Call for papers">
      <AbstractWorkspace />
    </PortalFrame>
  );
}
