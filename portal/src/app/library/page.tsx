import type { Metadata } from "next";
import Link from "next/link";
import { ResourceLibrary } from "@/app/library/resource-library";
import { PortalFrame } from "@/components/portal-frame";
import { FeatureGrid, MetricStrip, ServiceIntro } from "@/components/institutional-ui";

export const metadata: Metadata = { title: "Technical library" };

export default function LibraryPage() {
  return (
    <PortalFrame eyebrow="Knowledge services" title="Technical library">
      <div className="page-stack">
        <ServiceIntro
          eyebrow="NIMENA knowledge register"
          title="Search research, standards and proceedings."
          description="One catalogue connecting NIMENA technical reports, professional guidance, policy papers, conference proceedings and journal publications."
          actions={[{ href: "/journals", label: "Open journals", icon: "book", variant: "secondary" }]}
        />
        <MetricStrip items={[
          { label: "Resources", value: "05", note: "Presentation catalogue", icon: "file" },
          { label: "Open access", value: "03", note: "Available without membership", icon: "eye" },
          { label: "Topics", value: "05", note: "Technical and policy themes", icon: "filter" },
          { label: "Latest edition", value: "2026", note: "Current publication cycle", icon: "calendar" },
        ]} />
        <FeatureGrid items={[
          { title: "AJOMENA", description: "African Journal of Offshore, Marine Engineering and Naval Architecture.", icon: "book", meta: "Peer-reviewed journal", href: "/journals/ajomena", action: "Browse journal" },
          { title: "JBESED", description: "Journal of the Blue Economy and Sustainable Energy Development.", icon: "book", meta: "Peer-reviewed journal", href: "/journals/jbesed", action: "Browse journal" },
          { title: "Conference proceedings", description: "Accepted papers, presentation records and published conference outputs.", icon: "calendar", meta: "Institutional archive", href: "/conferences", action: "Explore conferences" },
        ]} />
        <ResourceLibrary />
        <p className="institutional-note">Production downloads will enforce publication rights and member access. Journal manuscripts remain authoritative in OJS. <Link href="/journals/policies">Review publishing policies</Link>.</p>
      </div>
    </PortalFrame>
  );
}
