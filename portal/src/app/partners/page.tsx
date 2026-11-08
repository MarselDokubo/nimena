import type { Metadata } from "next";
import { PartnershipCentre } from "@/app/partners/partnership-centre";
import { PortalFrame } from "@/components/portal-frame";
import { FeatureGrid, MetricStrip, ServiceIntro } from "@/components/institutional-ui";

export const metadata: Metadata = { title: "Affiliates, partners and sponsors" };

export default function PartnersPage() {
  return (
    <PortalFrame eyebrow="Industry engagement" title="Partners & sponsors">
      <div className="page-stack">
        <ServiceIntro eyebrow="Structured institutional collaboration" title="Build programmes with measurable professional impact." description="Corporate and academic affiliates, programme partners and sponsors can use one route to define objectives, contributions, benefits and reporting expectations." />
        <MetricStrip items={[
          { label: "Pathways", value: "03", note: "Academic, corporate and strategic", icon: "shield" },
          { label: "Programme areas", value: "06", note: "Learning, research, events and innovation", icon: "chart" },
          { label: "Active proposals", value: "04", note: "Secretariat review queue", icon: "file" },
          { label: "Impact reports", value: "Annual", note: "Outcomes and beneficiary evidence", icon: "book" },
        ]} />
        <FeatureGrid items={[
          { title: "Technical learning", description: "Sponsor member CPD, student training, laboratories and professional courses.", meta: "Skills", icon: "book" },
          { title: "Research & standards", description: "Fund technical reports, standards development, journals and industry studies.", meta: "Knowledge", icon: "file" },
          { title: "Events & innovation", description: "Support conferences, challenges, startup showcases and investor engagement.", meta: "Visibility", icon: "calendar" },
        ]} />
        <PartnershipCentre />
      </div>
    </PortalFrame>
  );
}
