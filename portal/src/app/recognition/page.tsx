import type { Metadata } from "next";
import { RecognitionCentre } from "@/app/recognition/recognition-centre";
import { PortalFrame } from "@/components/portal-frame";
import { MetricStrip, ServiceIntro } from "@/components/institutional-ui";

export const metadata: Metadata = { title: "Awards, fellowship and scholarships" };

export default function RecognitionPage() {
  return (
    <PortalFrame eyebrow="Professional recognition" title="Awards & opportunities">
      <div className="page-stack">
        <ServiceIntro
          eyebrow="Recognising excellence and potential"
          title="Apply, nominate and follow every decision."
          description="A transparent workflow for Fellowship, medals, service awards, student competitions, scholarships and research grants."
        />
        <MetricStrip items={[
          { label: "Open programmes", value: "03", note: "Applications and nominations", icon: "shield" },
          { label: "My drafts", value: "01", note: "Not yet submitted", icon: "file" },
          { label: "Current cycle", value: "2027", note: "Deadlines published", icon: "calendar" },
          { label: "Past recipients", value: "Archive", note: "Searchable public record", icon: "users" },
        ]} />
        <RecognitionCentre />
      </div>
    </PortalFrame>
  );
}
