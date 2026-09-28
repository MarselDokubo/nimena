import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Journal Policies" };

const policyGroups = [
  {
    title: "For authors",
    items: ["Authorship and contributorship", "Originality and prior publication", "Conflicts of interest", "Research ethics and consent", "Data and materials availability", "Corrections and retractions"],
  },
  {
    title: "For reviewers",
    items: ["Confidentiality", "Expertise and availability", "Conflict disclosure", "Constructive and evidence-based review", "Use of generative AI", "Research-integrity concerns"],
  },
  {
    title: "For editors",
    items: ["Editorial independence", "Fair and timely assessment", "Reviewer selection", "Appeals and complaints", "Misconduct handling", "Complete decision records"],
  },
] as const;

export default function PoliciesPage() {
  return (
    <div>
      <section className="journal-page-heading">
        <div><span>Publication governance</span><h1>Journal policies</h1><p>A presentation framework for the policies AJOMENA and JBESED need before accepting live submissions.</p></div>
        <Link className="button button--primary" href="/journals/author">Preview submission</Link>
      </section>

      <section className="journal-section policy-intro">
        <div><span>Policy status</span><h2>Clear rules before publication begins.</h2></div>
        <p>The sections below are a prototype information architecture, not approved NIMENA policy. Each policy will require named ownership, approval, versioning and a publication date before launch.</p>
      </section>

      <section className="journal-section journal-section--tint policy-grid">
        {policyGroups.map((group, groupIndex) => (
          <article key={group.title}>
            <span>{String(groupIndex + 1).padStart(2, "0")}</span><h2>{group.title}</h2>
            <ul>{group.items.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="journal-section ethics-framework">
        <div className="journal-section__head"><div><span>Core standards</span><h2>Minimum publication safeguards.</h2></div></div>
        <div>
          <article><strong>Peer review</strong><p>Define the review model, confidentiality, reviewer selection, deadlines and decision authority.</p></article>
          <article><strong>Research integrity</strong><p>Publish processes for plagiarism, fabrication, image manipulation, authorship disputes and suspected misconduct.</p></article>
          <article><strong>Appeals</strong><p>Provide a documented route for appeals and complaints that is independent of the original decision where possible.</p></article>
          <article><strong>Corrections</strong><p>Protect the scholarly record through transparent corrections, expressions of concern and retractions.</p></article>
          <article><strong>Copyright</strong><p>Approve licences, author rights, permissions and any article-processing charges before submissions open.</p></article>
          <article><strong>Preservation</strong><p>Configure long-term preservation, backups, metadata exports and recovery procedures.</p></article>
        </div>
      </section>
    </div>
  );
}
