import type { Metadata } from "next";
import { PortalFrame } from "@/components/portal-frame";
import { MetricStrip, Panel, ServiceIntro } from "@/components/institutional-ui";
import { Icon } from "@/components/icon";
import { governanceDocuments, secretariatDirectory } from "@/lib/institutional-data";

export const metadata: Metadata = { title: "Governance and Secretariat directory" };

export default function GovernancePage() {
  return (
    <PortalFrame eyebrow="Institutional transparency" title="Governance & Secretariat">
      <div className="page-stack">
        <ServiceIntro eyebrow="Clear authority, policies and accountability" title="Find the right document and the right office." description="A public institutional library for governance instruments, strategies, annual reporting, professional policies and responsibility-based Secretariat contacts." />
        <MetricStrip items={[
          { label: "Governance records", value: "05", note: "Published and scheduled", icon: "file" },
          { label: "Secretariat routes", value: "06", note: "Responsibility-based contacts", icon: "users" },
          { label: "Council cycle", value: "Quarterly", note: "Decision and oversight meetings", icon: "calendar" },
          { label: "Audit trail", value: "Enabled", note: "Required for production workflows", icon: "shield" },
        ]} />
        <div className="institutional-two-column institutional-two-column--wide">
          <Panel title="Governance library" description="Authoritative institutional documents">
            <div className="governance-list">
              {governanceDocuments.map((document) => (
                <article key={document.title}>
                  <span><Icon name="file" /></span>
                  <div><small>{document.category}</small><h3>{document.title}</h3><p>{document.edition}</p></div>
                  <button aria-label={`View ${document.title}`} className="icon-button" type="button"><Icon name="eye" /></button>
                </article>
              ))}
            </div>
          </Panel>
          <Panel title="Secretariat directory" description="Contact the office responsible for your enquiry">
            <div className="secretariat-directory">
              {secretariatDirectory.map((entry) => (
                <article key={entry.role}>
                  <span><Icon name="users" /></span>
                  <div><h3>{entry.role}</h3><p>{entry.office}</p><a href={`mailto:${entry.contact}`}>{entry.contact}</a></div>
                </article>
              ))}
            </div>
          </Panel>
        </div>
        <section className="notice-strip"><Icon name="shield" /><p><strong>Production governance rule:</strong> published documents require version control, approval metadata, effective dates and a preserved superseded edition.</p></section>
      </div>
    </PortalFrame>
  );
}
