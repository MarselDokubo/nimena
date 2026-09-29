"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { editorialPipeline } from "@/lib/journal-data";

type EditorView = "pipeline" | "review" | "production" | "configuration";

export function EditorWorkspace() {
  const [view, setView] = useState<EditorView>("pipeline");
  const [selectedReference, setSelectedReference] = useState<string>(editorialPipeline[0].reference);
  const [stage, setStage] = useState<string>(editorialPipeline[0].stage);
  const [message, setMessage] = useState("");
  const [decision, setDecision] = useState("Request major revisions");
  const [query, setQuery] = useState("");
  const [journalFilter, setJournalFilter] = useState("All journals");
  const selected = editorialPipeline.find((item) => item.reference === selectedReference) ?? editorialPipeline[0];
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPipeline = editorialPipeline.filter((item) => {
    const matchesJournal = journalFilter === "All journals" || item.journal === journalFilter;
    const matchesQuery = !normalizedQuery || `${item.reference} ${item.title}`.toLowerCase().includes(normalizedQuery);
    return matchesJournal && matchesQuery;
  });

  function selectSubmission(reference: string) {
    const submission = editorialPipeline.find((item) => item.reference === reference);
    if (!submission) return;
    setSelectedReference(reference);
    setStage(submission.stage);
    setMessage("");
  }

  function recordAction(action: string, nextStage?: string) {
    if (nextStage) setStage(nextStage);
    setMessage(`${action} recorded in this browser-only preview.`);
  }

  return (
    <div className="journal-workspace-page">
      <section className="workflow-heading editor-heading">
        <div><span>Editorial workspace · Prototype</span><h1>Journal operations</h1><p>Screen submissions, coordinate peer review, record decisions and prepare accepted work for publication.</p></div>
        <div className="workflow-profile"><span>EN</span><div><strong>Prof. Ebiye Nwankwo</strong><small>Sample Editor-in-Chief</small></div></div>
      </section>

      <nav className="editor-tabs" aria-label="Editorial workspace sections">
        {([['pipeline', 'Submissions'], ['review', 'Peer review'], ['production', 'Production'], ['configuration', 'Journal setup']] as const).map(([key, label]) => <button aria-selected={view === key} className={view === key ? "is-active" : ""} key={key} onClick={() => { setView(key); setMessage(""); }} role="tab" type="button">{label}</button>)}
      </nav>

      {view === "pipeline" && <>
        <section className="editor-metrics"><article><span>New submissions</span><strong>07</strong><small>Awaiting screening</small></article><article><span>In peer review</span><strong>12</strong><small>Across both journals</small></article><article><span>Revisions due</span><strong>05</strong><small>Author action</small></article><article><span>In production</span><strong>04</strong><small>Copyediting and proofing</small></article></section>
        <div className="editor-layout">
          <section className="editor-queue">
            <header><div><span>Editorial pipeline</span><h2>Active submissions</h2></div><button className="icon-button" type="button" aria-label="Filter submissions"><Icon name="filter" /></button></header>
            <div className="editor-queue__filters"><label><Icon name="search" /><input aria-label="Search submissions" onChange={(event) => setQuery(event.target.value)} placeholder="Search reference or title" value={query} /></label><select aria-label="Filter by journal" onChange={(event) => setJournalFilter(event.target.value)} value={journalFilter}><option>All journals</option><option>AJOMENA</option><option>JBESED</option></select></div>
            <div className="editor-queue__list">{filteredPipeline.map((item) => <button className={selectedReference === item.reference ? "is-active" : ""} key={item.reference} onClick={() => selectSubmission(item.reference)} type="button"><span>{item.reference}</span><div><strong>{item.title}</strong><small>{item.journal} · Owner: {item.owner}</small></div><em>{item.stage}</em><b>{item.age}</b></button>)}{filteredPipeline.length === 0 && <p className="editor-queue__empty">No submissions match this filter.</p>}</div>
          </section>

          <aside className="editor-detail">
            <header><div><span>{selected.reference} · {selected.journal}</span><h2>Editorial summary</h2></div><em>{stage}</em></header>
            <div className="editor-detail__body">
              <h3>{selected.title}</h3><p>Fictional manuscript record for demonstrating editorial controls, responsibility and audit history.</p>
              <dl><div><dt>Section</dt><dd>Original research</dd></div><div><dt>Submitting author</dt><dd>Fictional blinded record</dd></div><div><dt>Files</dt><dd>3 versioned files</dd></div><div><dt>Similarity screening</dt><dd>Editor review required</dd></div></dl>
              <div className="editor-checklist"><label><input defaultChecked type="checkbox" />Journal scope confirmed</label><label><input defaultChecked type="checkbox" />Required metadata supplied</label><label><input type="checkbox" />Ethics and declarations checked</label><label><input type="checkbox" />Blinded file verified</label></div>
              <div className="editor-actions"><button onClick={() => recordAction("Two reviewer invitations", "Reviewer assignment")} type="button"><Icon name="users" /><span><strong>Assign reviewers</strong><small>Create confidential invitations</small></span></button><button onClick={() => { setView("review"); setMessage(""); }} type="button"><Icon name="book" /><span><strong>Open peer review</strong><small>Compare reports and recommendations</small></span></button><button onClick={() => recordAction("Author correction request", "Corrections requested")} type="button"><Icon name="file" /><span><strong>Request corrections</strong><small>Return administrative issues</small></span></button></div>
              {message && <div className="prototype-toast"><Icon name="check" />{message}</div>}
            </div>
          </aside>
        </div>
      </>}

      {view === "review" && <div className="editor-review-layout">
        <section className="workflow-panel">
          <header><div><span>{selected.reference} · Decision workspace</span><h2>{selected.title}</h2></div><em>Two reviews returned</em></header>
          <div className="workflow-panel__body editor-reports">
            <article><header><span>Reviewer A</span><em>Major revisions</em></header><div><strong>16/20</strong><p>The technical approach is relevant, but the methods and limitations require clearer explanation before the findings can be assessed fully.</p></div></article>
            <article><header><span>Reviewer B</span><em>Minor revisions</em></header><div><strong>18/20</strong><p>The contribution is suitable for the journal. Clarify the validation dataset and improve two figures.</p></div></article>
            <section><span>Editorial assessment</span><textarea className="form-control review-comments" defaultValue="The reports identify a valuable contribution but require a documented response and revised methods section." /><div className="form-grid"><div className="form-field"><label htmlFor="editor-decision">Decision</label><select className="form-control" id="editor-decision" onChange={(event) => setDecision(event.target.value)} value={decision}><option>Request minor revisions</option><option>Request major revisions</option><option>Resubmit for review</option><option>Accept submission</option><option>Decline submission</option></select></div><div className="form-field"><label htmlFor="editor-due">Author response due</label><input className="form-control" id="editor-due" type="date" /></div></div></section>
          </div>
          <footer><div>{message && <span className="workflow-message"><Icon name="check" />{message}</span>}</div><div><button className="button button--outline" onClick={() => setView("pipeline")} type="button">Return to pipeline</button><button className="button button--primary" onClick={() => recordAction(decision, decision)} type="button">Record decision <Icon name="arrow" /></button></div></footer>
        </section>
        <aside className="review-guidance"><section><span>Decision responsibility</span><h3>The editor decides.</h3><p>Reviewer recommendations inform but do not replace editorial judgement. Every production decision requires a reason and audit event.</p></section><section><span>Decision history</span><ul><li><Icon name="check" />Submission screened</li><li><Icon name="check" />Two reviewers assigned</li><li><Icon name="check" />Two reports returned</li><li><Icon name="clock" />Editorial decision pending</li></ul></section></aside>
      </div>}

      {view === "production" && <section className="production-board">
        <div className="production-board__head"><div><span>Accepted work</span><h2>Production board</h2><p>Move approved articles through copyediting, layout, proofing and scheduling.</p></div><Link className="button button--outline" href="/journals/ajomena/issues">Preview published issue</Link></div>
        <div className="production-columns">{[
          ["Copyediting", "JBS-2026-089", "Community indicators for coastal adaptation projects", "Language edit in progress"],
          ["Layout", "AJM-2026-171", "Inspection planning for ageing coastal vessels", "HTML and PDF galleys"],
          ["Author proof", "JBS-2026-081", "Energy access for small island port communities", "Proof due in 2 days"],
          ["Scheduled", "AJM-2026-166", "Machinery-space fire risk assessment", "Volume 1 · Number 1"],
        ].map(([column, reference, title, status]) => <section key={column}><header><span>{column}</span><strong>01</strong></header><article><em>{reference}</em><h3>{title}</h3><p>{status}</p><button onClick={() => setMessage(`${reference} opened in the production preview.`)} type="button">Open task <Icon name="arrow" /></button></article></section>)}</div>
        {message && <div className="prototype-toast production-message"><Icon name="check" />{message}</div>}
      </section>}

      {view === "configuration" && <section className="configuration-page">
        <div className="production-board__head"><div><span>Pre-launch readiness</span><h2>Journal configuration</h2><p>Items requiring verification or formal approval before the live OJS site can accept submissions.</p></div><Link className="button button--outline" href="/journals/policies">Review policy architecture</Link></div>
        <div className="configuration-grid">{[
          ["Journal identity", "Names and scopes drafted", "In review"],
          ["ISSN records", "Print and electronic identifiers", "Verify"],
          ["DOI registration", "Prefix, deposits and landing pages", "Configure"],
          ["Editorial boards", "Appointments, affiliations and terms", "Approve"],
          ["Peer-review model", "Double-blind workflow and timelines", "Approve"],
          ["Email delivery", "Editorial templates and sender domain", "Test"],
          ["ORCID", "Author identity connection", "Configure"],
          ["Preservation", "Backups and long-term archiving", "Configure"],
          ["Indexing claims", "Only verified services may be displayed", "Verify"],
          ["Fees and waivers", "APCs, sponsorship and exemptions", "Approve"],
          ["Privacy and consent", "Data processing and retention", "Approve"],
          ["Roles and access", "Least privilege and staff MFA", "Test"],
        ].map(([title, copy, status]) => <article key={title}><span>{status}</span><h3>{title}</h3><p>{copy}</p><button onClick={() => setMessage(`${title} selected for configuration review.`)} type="button">Open configuration <Icon name="arrow" /></button></article>)}</div>
        {message && <div className="prototype-toast production-message"><Icon name="check" />{message}</div>}
      </section>}
    </div>
  );
}
