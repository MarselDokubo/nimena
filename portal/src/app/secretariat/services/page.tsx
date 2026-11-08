import type { Metadata } from "next";
import Link from "next/link";
import { PortalFrame } from "@/components/portal-frame";
import { FeatureGrid, MetricStrip, ServiceIntro } from "@/components/institutional-ui";

export const metadata: Metadata = { title: "Institutional service operations" };

export default function InstitutionalServiceOperationsPage() {
  return (
    <PortalFrame eyebrow="Secretariat workspace" role="secretariat" title="Institutional services">
      <div className="page-stack">
        <ServiceIntro eyebrow="One operational control centre" title="Manage the services behind professional membership." description="Queues for membership records, renewals, learning, conferences, recognition, careers, partnerships, governance and journal integration share one permissions and audit model." />
        <MetricStrip items={[
          { label: "Open queues", value: "09", note: "Across institutional services", icon: "file" },
          { label: "Awaiting review", value: "31", note: "Applications and proposals", icon: "eye" },
          { label: "Due this week", value: "08", note: "Time-sensitive actions", icon: "clock" },
          { label: "System alerts", value: "02", note: "Configuration decisions required", icon: "settings" },
        ]} />
        <FeatureGrid items={[
          { title: "Member register & verification", description: "Control public-profile consent, active standing, grades and verification history.", meta: "Membership", icon: "card", href: "/verify-member", action: "Open verification preview" },
          { title: "Renewals & reconciliation", description: "Review payment exceptions, arrears, receipts and annual standing.", meta: "Finance", icon: "wallet", href: "/renewals", action: "Open renewal workflow" },
          { title: "Chapters & communities", description: "Maintain chapters, officers, student groups, committees and volunteer roles.", meta: "Community", icon: "users", href: "/community", action: "Open directory" },
          { title: "CPD & learning", description: "Publish courses, verify attendance, award credits and issue certificates.", meta: "Education", icon: "book", href: "/learning", action: "Open catalogue" },
          { title: "Conference operations", description: "Registration, CFP review, scheduling, check-in, certificates and proceedings.", meta: "Events", icon: "calendar", href: "/secretariat/conferences", action: "Open event operations" },
          { title: "Journal integration", description: "OJS remains authoritative while the portal synchronises identities, benefits and status links.", meta: "Publishing", icon: "book", href: "/journals/editor", action: "Open editorial preview" },
          { title: "Awards & scholarships", description: "Configure programmes, receive nominations, route review and publish recipients.", meta: "Recognition", icon: "shield", href: "/recognition", action: "Open recognition centre" },
          { title: "Careers & mentoring", description: "Moderate vacancies, internships, profiles and mentor matches.", meta: "Careers", icon: "users", href: "/careers", action: "Open career centre" },
          { title: "Affiliates & sponsorship", description: "Review partner proposals, manage benefits and document outcomes.", meta: "Partnerships", icon: "chart", href: "/partners", action: "Open partnership centre" },
          { title: "Governance library", description: "Version policies, publish approved documents and manage responsibility contacts.", meta: "Governance", icon: "file", href: "/governance", action: "Open governance centre" },
          { title: "Technical library", description: "Catalogue reports, standards, proceedings and access rights.", meta: "Knowledge", icon: "search", href: "/library", action: "Open resource library" },
        ]} />
        <section className="panel">
          <div className="panel__head"><div><h2>Production configuration decisions</h2><p>These settings must be approved before real data or payments are enabled.</p></div></div>
          <div className="panel__body configuration-list">
            <div><strong>Membership fees and grades</strong><span>Awaiting Council-approved schedule</span><em>Required</em></div>
            <div><strong>Public verification fields</strong><span>Consent, retention and dispute procedure</span><em>Required</em></div>
            <div><strong>Paystack settlement account</strong><span>Finance ownership and webhook signing secret</span><em>Required</em></div>
            <div><strong>OJS administrator access</strong><span>Staging copy, API capability and theme deployment path</span><em>External</em></div>
            <div><strong>Chapter and officer register</strong><span>Official names, regions, officers and contact routes</span><em>Content</em></div>
          </div>
          <div className="panel__body" style={{ borderTop: "1px solid var(--line)" }}><Link className="button button--outline" href="/secretariat">Return to membership operations</Link></div>
        </section>
      </div>
    </PortalFrame>
  );
}
