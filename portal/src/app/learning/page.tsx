import type { Metadata } from "next";
import { LearningBrowser } from "@/app/learning/learning-browser";
import { PortalFrame } from "@/components/portal-frame";
import { MetricStrip, Panel, ServiceIntro } from "@/components/institutional-ui";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "CPD and learning" };

export default function LearningPage() {
  return (
    <PortalFrame eyebrow="Professional development" title="CPD & learning">
      <div className="page-stack">
        <ServiceIntro
          eyebrow="Competence throughout your career"
          title="Learn, record and demonstrate professional development."
          description="A connected catalogue for courses, webinars, assessments, CPD credits and certificates recognised within the NIMENA member record."
        />
        <MetricStrip items={[
          { label: "Annual target", value: "30 hours", note: "Current membership cycle", icon: "clock" },
          { label: "Verified", value: "18 hours", note: "60% of annual target", icon: "check" },
          { label: "Certificates", value: "04", note: "Available for download", icon: "file" },
          { label: "Enrolments", value: "02", note: "One course in progress", icon: "book" },
        ]} />
        <div className="institutional-two-column institutional-two-column--wide">
          <LearningBrowser />
          <div className="dashboard-column">
            <Panel title="CPD progress" description="2026 / 2027 cycle">
              <div className="progress-meta"><strong>18 of 30 verified hours</strong><span>60%</span></div>
              <div className="progress-line"><span style={{ width: "60%" }} /></div>
              <div className="cpd-ledger">
                <div><span><Icon name="check" /></span><p><strong>Technical learning</strong><small>10 hours verified</small></p></div>
                <div><span><Icon name="check" /></span><p><strong>Professional practice</strong><small>6 hours verified</small></p></div>
                <div><span><Icon name="clock" /></span><p><strong>Ethics & safety</strong><small>2 of 4 target hours</small></p></div>
              </div>
            </Panel>
            <Panel title="Certificate centre" description="Verified learning evidence">
              <div className="document-list">
                <div className="document-item"><span className="document-icon"><Icon name="file" /></span><span className="document-item__copy"><strong>Maritime Standards Workshop</strong><span>6 CPD hours · 18 Aug 2026</span></span><Icon name="download" /></div>
                <div className="document-item"><span className="document-icon"><Icon name="file" /></span><span className="document-item__copy"><strong>Engineering Ethics Webinar</strong><span>2 CPD hours · 4 Jun 2026</span></span><Icon name="download" /></div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </PortalFrame>
  );
}
