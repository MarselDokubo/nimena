import type { Metadata } from "next";
import { DirectoryBrowser } from "@/app/community/directory-browser";
import { PortalFrame } from "@/components/portal-frame";
import { FeatureGrid, MetricStrip, ServiceIntro } from "@/components/institutional-ui";

export const metadata: Metadata = { title: "Chapters and professional communities" };

export default function CommunityPage() {
  return (
    <PortalFrame eyebrow="Professional network" title="Chapters & communities">
      <div className="page-stack">
        <ServiceIntro
          eyebrow="A connected national institution"
          title="Find your professional home within NIMENA."
          description="Participate through regional chapters, student chapters, the Young Professionals Network and specialist technical committees."
        />
        <MetricStrip items={[
          { label: "Chapters", value: "03", note: "Including one emerging chapter", icon: "users" },
          { label: "Communities", value: "04", note: "Professional and technical groups", icon: "shield" },
          { label: "Active members", value: "568", note: "Sample presentation register", icon: "card" },
          { label: "Next activity", value: "18 Nov", note: "Lagos technical forum", icon: "calendar" },
        ]} />
        <FeatureGrid items={[
          { title: "Young Professionals", description: "Mentoring, leadership, workplace skills and early-career representation.", icon: "users", meta: "Career community", action: "Join the network" },
          { title: "Student Chapters", description: "Campus leadership, design challenges, internships and faculty-adviser support.", icon: "book", meta: "Student community", action: "Explore student chapters" },
          { title: "Technical Committees", description: "Contribute to standards, publications, policy, research and professional programmes.", icon: "shield", meta: "Volunteer service", action: "View committee opportunities" },
        ]} />
        <DirectoryBrowser />
      </div>
    </PortalFrame>
  );
}
