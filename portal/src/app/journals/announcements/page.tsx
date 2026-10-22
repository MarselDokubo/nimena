import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Journal Announcements",
  description: "Calls for papers, publishing notices and updates from NIMENA Journals.",
};

const announcements = [
  {
    label: "Call for papers",
    title: "AJOMENA and JBESED welcome scholarly and professional contributions",
    copy: "Review each journal's scope, submission checklist and the announced sponsorship opportunity for selected quality publications.",
    href: "/journals/call-for-papers",
    action: "Read the call",
  },
  {
    label: "Author services",
    title: "A clearer route from manuscript preparation to editorial decision",
    copy: "The redesigned experience brings journal selection, policies, submission guidance and role-based workflow demonstrations into one coherent journey.",
    href: "/journals/author",
    action: "Preview submission",
  },
  {
    label: "Research community",
    title: "Connect journal activity with a NIMENA professional research profile",
    copy: "Members can preview how ORCID, publications, reviewer activity and professional-development recognition may complement—not replace—the OJS record.",
    href: "/research",
    action: "Open research profile",
  },
] as const;

export default function JournalAnnouncementsPage() {
  return (
    <div>
      <section className="journal-page-heading journal-page-heading--image">
        <div><span>Updates & opportunities</span><h1>Journal announcements</h1><p>Calls, author notices and developments across AJOMENA and JBESED.</p></div>
        <a className="button button--primary" href="https://nimenajournals.com" rel="noreferrer" target="_blank">Visit live OJS</a>
      </section>

      <section className="journal-section journal-announcement-list">
        {announcements.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><em>{item.label}</em><h2>{item.title}</h2><p>{item.copy}</p></div>
            <Link href={item.href}>{item.action} <Icon name="arrow" /></Link>
          </article>
        ))}
      </section>

      <section className="journal-section journal-section--tint journal-announcement-note">
        <div><span>Live records</span><h2>Verified notices remain authoritative in OJS.</h2></div>
        <p>This presentation build demonstrates the new information architecture. Submission deadlines, fees, editorial appointments, ISSNs, DOI records and indexing claims should be published only after verification and approval.</p>
      </section>
    </div>
  );
}
