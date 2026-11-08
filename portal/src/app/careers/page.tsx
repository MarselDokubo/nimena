import type { Metadata } from "next";
import { CareerCentre } from "@/app/careers/career-centre";
import { PortalFrame } from "@/components/portal-frame";
import { MetricStrip, ServiceIntro } from "@/components/institutional-ui";

export const metadata: Metadata = { title: "Careers and mentoring" };

export default function CareersPage() {
  return (
    <PortalFrame eyebrow="Professional advancement" title="Careers & mentoring">
      <div className="page-stack">
        <ServiceIntro eyebrow="From student to technical leader" title="Connect talent with maritime opportunity." description="A focused career centre for vacancies, internships, professional mentoring, volunteer service and member-controlled career profiles." />
        <MetricStrip items={[
          { label: "Open roles", value: "03", note: "Presentation opportunities", icon: "file" },
          { label: "Internships", value: "01", note: "Applications open", icon: "book" },
          { label: "Mentors", value: "24", note: "Across six disciplines", icon: "users" },
          { label: "Saved roles", value: "00", note: "Build your shortlist", icon: "card" },
        ]} />
        <CareerCentre />
      </div>
    </PortalFrame>
  );
}
