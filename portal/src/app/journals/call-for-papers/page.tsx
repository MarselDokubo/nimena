import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { journalList } from "@/lib/journal-data";

export const metadata: Metadata = {
  title: "Call for Papers",
  description: "Prototype Call for Papers for AJOMENA and JBESED.",
};

export default function CallForPapersPage() {
  return (
    <div>
      <section className="cfp-journal-hero">
        <div>
          <span className="kicker kicker--light">Call for papers</span>
          <h1>Research that advances maritime practice.</h1>
          <p>AJOMENA and JBESED invite original research, technical studies, review articles and professional practice contributions within their proposed scopes.</p>
          <div><Link className="button button--primary" href="/journals/author">Start a submission <Icon name="arrow" /></Link><Link className="button journal-button--light" href="/journals/policies">Read author guidance</Link></div>
        </div>
        <aside><strong>20</strong><span>quality publications proposed for NIMENA sponsorship</span><small>Eligibility, selection, APC coverage and final terms require written institutional approval.</small></aside>
      </section>

      <section className="journal-section">
        <div className="journal-section__head"><div><span>Choose a journal</span><h2>Find the right home for your work.</h2></div><p>Authors should select the journal whose aims and readership most closely match the manuscript.</p></div>
        <div className="cfp-journal-grid">
          {journalList.map((journal) => (
            <article key={journal.slug}>
              <span>{journal.acronym}</span><h3>{journal.name}</h3><p>{journal.description}</p>
              <ul>{journal.scope.slice(0, 4).map((topic) => <li key={topic}>{topic}</li>)}</ul>
              <div><Link href={`/journals/${journal.slug}`}>Explore scope</Link><Link href={`/journals/author`}>Submit to {journal.acronym} <Icon name="arrow" /></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="journal-section journal-section--tint">
        <div className="journal-section__head"><div><span>Before submission</span><h2>Prepare a complete manuscript.</h2></div></div>
        <div className="submission-requirements">
          {[
            ["Manuscript", "An anonymised main file with title, abstract, keywords, body, references, tables and figure captions."],
            ["Author details", "Names, affiliations, countries, email addresses, contribution statements and ORCID iDs where available."],
            ["Supporting files", "Separate figures, data or supplementary material where required by the article type."],
            ["Declarations", "Originality, conflicts of interest, funding, ethics, data availability and author approval."],
            ["Cover letter", "Why the manuscript fits the selected journal and any information the editor should consider."],
            ["References", "Accurate, complete and consistently formatted citations that can be verified during copyediting."],
          ].map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="journal-section cfp-timeline-section">
        <div className="journal-section__head"><div><span>Proposed workflow</span><h2>What happens after submission.</h2></div><Link className="journal-text-link" href="/journals/reviewer">Preview reviewer workspace <Icon name="arrow" /></Link></div>
        <ol className="cfp-timeline">
          <li><span>01</span><div><strong>Administrative check</strong><p>Completeness, format, declarations and authorship information.</p></div></li>
          <li><span>02</span><div><strong>Editorial screening</strong><p>Scope, scholarly contribution, ethics and suitability for review.</p></div></li>
          <li><span>03</span><div><strong>Peer review</strong><p>Independent technical assessment and confidential recommendations.</p></div></li>
          <li><span>04</span><div><strong>Revision and decision</strong><p>Author response followed by a documented editorial decision.</p></div></li>
          <li><span>05</span><div><strong>Production</strong><p>Copyediting, layout, author proofing, metadata and publication.</p></div></li>
        </ol>
      </section>
    </div>
  );
}
