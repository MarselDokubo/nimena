"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { journals, type JournalSlug } from "@/lib/journal-data";

const steps = ["Start", "Files", "Metadata", "Contributors", "Review"] as const;
const storageKey = "nimena.journals.author-draft.v1";

type AuthorDraft = {
  journal: JournalSlug;
  section: string;
  language: string;
  original: boolean;
  anonymous: boolean;
  title: string;
  abstract: string;
  keywords: string;
  authorName: string;
  email: string;
  orcid: string;
  affiliation: string;
  coauthors: string;
  coverLetter: string;
  conflicts: string;
  declarations: boolean[];
};

const initialDraft: AuthorDraft = {
  journal: "ajomena",
  section: "Original research",
  language: "English",
  original: false,
  anonymous: false,
  title: "",
  abstract: "",
  keywords: "",
  authorName: "Dr Amina Yusuf",
  email: "amina.yusuf@example.com",
  orcid: "0000-0000-0000-0000",
  affiliation: "Sample Maritime Research Institute",
  coauthors: "",
  coverLetter: "",
  conflicts: "No conflicts declared for this demonstration.",
  declarations: [false, false, false, false],
};

export function AuthorWorkspace() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<AuthorDraft>(initialDraft);
  const [files, setFiles] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submittedReference, setSubmittedReference] = useState("");

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setDraft(JSON.parse(saved) as AuthorDraft);
      } catch {
        setDraft(initialDraft);
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  const journal = journals[draft.journal];
  const progress = ((step + 1) / steps.length) * 100;
  const canContinue = useMemo(() => {
    if (step === 0) return draft.original && draft.anonymous;
    if (step === 1) return files.length > 0;
    if (step === 2) return draft.title.trim().length >= 10 && draft.abstract.trim().length >= 40 && draft.keywords.trim().length >= 3;
    if (step === 3) return Boolean(draft.authorName && draft.email && draft.affiliation);
    return draft.declarations.every(Boolean);
  }, [draft, files.length, step]);

  function update<K extends keyof AuthorDraft>(key: K, value: AuthorDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setMessage("");
  }

  function selectJournal(value: JournalSlug) {
    setDraft((current) => ({ ...current, journal: value, section: journals[value].sections[0] }));
    setMessage("");
  }

  function saveDraft() {
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
    setMessage("Draft saved in this browser.");
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files ?? []).map((file) => file.name));
    setMessage("");
  }

  function toggleDeclaration(index: number) {
    update("declarations", draft.declarations.map((value, itemIndex) => itemIndex === index ? !value : value));
  }

  function submitPreview() {
    const prefix = draft.journal === "ajomena" ? "AJM" : "JBS";
    setSubmittedReference(`${prefix}-DEMO-2026-0214`);
    window.localStorage.removeItem(storageKey);
  }

  if (submittedReference) {
    return (
      <section className="workflow-success">
        <span><Icon name="check" /></span>
        <small>Submission preview completed</small>
        <h1>{submittedReference}</h1>
        <p>Your fictional manuscript has entered administrative screening. No file, email or personal information was transmitted.</p>
        <div><button className="button button--primary" onClick={() => { setSubmittedReference(""); setStep(0); setDraft(initialDraft); setFiles([]); }} type="button">Start another demonstration</button><Link className="button button--outline" href="/research">View member research profile</Link></div>
      </section>
    );
  }

  return (
    <div className="journal-workspace-page">
      <section className="workflow-heading">
        <div><span>Author workspace · Prototype</span><h1>Submit a manuscript</h1><p>Complete the proposed journal submission journey using fictional information only.</p></div>
        <div className="workflow-profile"><span>AY</span><div><strong>Dr Amina Yusuf</strong><small>Sample author account</small></div></div>
      </section>

      <div className="workflow-layout">
        <aside className="workflow-steps">
          <div className="workflow-steps__head"><span>Submission progress</span><strong>{Math.round(progress)}%</strong><div><i style={{ width: `${progress}%` }} /></div></div>
          <ol>{steps.map((label, index) => <li className={index === step ? "is-active" : index < step ? "is-complete" : ""} key={label}><button onClick={() => index <= step && setStep(index)} type="button"><span>{index < step ? <Icon name="check" /> : index + 1}</span><div><strong>{label}</strong><small>{["Journal and checklist", "Manuscript files", "Title and abstract", "Author details", "Declarations"][index]}</small></div></button></li>)}</ol>
          <div className="workflow-boundary"><Icon name="shield" /><p>Selected files stay on your device. Production OJS will use private storage and permissions.</p></div>
        </aside>

        <section className="workflow-panel">
          <header><div><span>Step {step + 1} of {steps.length}</span><h2>{["Select the journal and section", "Add manuscript files", "Describe the submission", "Identify the contributors", "Review and declare"][step]}</h2></div><em>Prototype</em></header>

          <div className="workflow-panel__body">
            {step === 0 && <div className="author-step">
              <div className="form-grid">
                <div className="form-field"><label htmlFor="author-journal">Journal</label><select className="form-control" id="author-journal" onChange={(event) => selectJournal(event.target.value as JournalSlug)} value={draft.journal}><option value="ajomena">AJOMENA</option><option value="jbesed">JBESED</option></select></div>
                <div className="form-field"><label htmlFor="author-section">Article section</label><select className="form-control" id="author-section" onChange={(event) => update("section", event.target.value)} value={draft.section}>{journal.sections.map((section) => <option key={section}>{section}</option>)}</select></div>
                <div className="form-field"><label htmlFor="author-language">Submission language</label><select className="form-control" id="author-language" onChange={(event) => update("language", event.target.value)} value={draft.language}><option>English</option></select></div>
              </div>
              <div className="author-journal-summary"><span>{journal.acronym}</span><div><strong>{journal.name}</strong><p>{journal.description}</p></div><Link href={`/journals/${journal.slug}`} target="_blank">Review scope <Icon name="arrow" /></Link></div>
              <div className="declaration-stack">
                <label className="declaration"><input checked={draft.original} onChange={(event) => update("original", event.target.checked)} type="checkbox" /><span>This submission is original and is not under consideration by another journal.</span></label>
                <label className="declaration"><input checked={draft.anonymous} onChange={(event) => update("anonymous", event.target.checked)} type="checkbox" /><span>The manuscript file has been anonymised for the proposed double-blind review process.</span></label>
              </div>
            </div>}

            {step === 1 && <div className="author-step">
              <label className="journal-upload-zone" htmlFor="journal-files"><Icon name="upload" /><strong>Select manuscript files</strong><span>Choose a fictional PDF or DOCX file for this browser-only demonstration.</span><input accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" id="journal-files" multiple onChange={handleFiles} type="file" /></label>
              {files.length > 0 && <div className="selected-files">{files.map((file, index) => <article key={`${file}-${index}`}><span><Icon name="file" /></span><div><strong>{file}</strong><small>{index === 0 ? "Main manuscript" : "Supplementary file"} · Not uploaded</small></div><Icon name="check" /></article>)}</div>}
              <div className="file-guidance"><strong>Production controls</strong><p>OJS will validate file type and size, restrict downloads by role, preserve revisions and record every editorial access.</p></div>
            </div>}

            {step === 2 && <div className="author-step"><div className="form-grid">
              <div className="form-field form-field--full"><label htmlFor="submission-title">Manuscript title</label><input className="form-control" id="submission-title" onChange={(event) => update("title", event.target.value)} placeholder="Enter a clear, specific title" value={draft.title} /></div>
              <div className="form-field form-field--full"><label htmlFor="submission-abstract">Abstract</label><textarea className="form-control journal-abstract-input" id="submission-abstract" onChange={(event) => update("abstract", event.target.value)} placeholder="Purpose, approach, principal findings and relevance" value={draft.abstract} /><span className="form-hint">Use at least 40 characters for the prototype.</span></div>
              <div className="form-field form-field--full"><label htmlFor="submission-keywords">Keywords</label><input className="form-control" id="submission-keywords" onChange={(event) => update("keywords", event.target.value)} placeholder="Separate keywords with semicolons" value={draft.keywords} /></div>
              <div className="form-field form-field--full"><label htmlFor="submission-cover">Cover letter</label><textarea className="form-control" id="submission-cover" onChange={(event) => update("coverLetter", event.target.value)} placeholder="Explain the manuscript's fit and contribution" value={draft.coverLetter} /></div>
            </div></div>}

            {step === 3 && <div className="author-step"><div className="form-grid">
              <div className="form-field"><label htmlFor="author-name">Corresponding author</label><input className="form-control" id="author-name" onChange={(event) => update("authorName", event.target.value)} value={draft.authorName} /></div>
              <div className="form-field"><label htmlFor="author-email">Email address</label><input className="form-control" id="author-email" onChange={(event) => update("email", event.target.value)} type="email" value={draft.email} /></div>
              <div className="form-field"><label htmlFor="author-orcid">ORCID iD</label><input className="form-control" id="author-orcid" onChange={(event) => update("orcid", event.target.value)} value={draft.orcid} /></div>
              <div className="form-field"><label htmlFor="author-affiliation">Primary affiliation</label><input className="form-control" id="author-affiliation" onChange={(event) => update("affiliation", event.target.value)} value={draft.affiliation} /></div>
              <div className="form-field form-field--full"><label htmlFor="author-coauthors">Co-authors</label><textarea className="form-control" id="author-coauthors" onChange={(event) => update("coauthors", event.target.value)} placeholder="Name, email, affiliation and contribution for each co-author" value={draft.coauthors} /><span className="form-hint">Production OJS will capture each contributor as a separate structured record.</span></div>
            </div></div>}

            {step === 4 && <div className="author-step">
              <div className="submission-review-card"><div><span>{journal.acronym}</span><strong>{draft.title || "Untitled manuscript"}</strong><p>{draft.section} · {draft.authorName}</p></div><dl><div><dt>Files</dt><dd>{files.length}</dd></div><div><dt>Keywords</dt><dd>{draft.keywords || "Not supplied"}</dd></div><div><dt>ORCID</dt><dd>{draft.orcid || "Not supplied"}</dd></div></dl></div>
              <div className="form-field"><label htmlFor="author-conflicts">Conflict-of-interest statement</label><textarea className="form-control" id="author-conflicts" onChange={(event) => update("conflicts", event.target.value)} value={draft.conflicts} /></div>
              <div className="declaration-stack">
                {["Every listed author approved this submission.", "Funding and conflicts of interest have been disclosed.", "Required ethics and consent approvals have been obtained.", "The manuscript files and metadata are ready for editorial screening."].map((label, index) => <label className="declaration" key={label}><input checked={draft.declarations[index]} onChange={() => toggleDeclaration(index)} type="checkbox" /><span>{label}</span></label>)}
              </div>
            </div>}
          </div>

          <footer><div>{message && <span className="workflow-message"><Icon name="check" />{message}</span>}</div><div><button className="button button--soft" onClick={saveDraft} type="button">Save draft</button>{step > 0 && <button className="button button--outline" onClick={() => setStep((current) => current - 1)} type="button">Back</button>}{step < steps.length - 1 ? <button className="button button--primary" disabled={!canContinue} onClick={() => setStep((current) => current + 1)} type="button">Continue <Icon name="arrow" /></button> : <button className="button button--primary" disabled={!canContinue} onClick={submitPreview} type="button">Submit preview <Icon name="arrow" /></button>}</div></footer>
        </section>
      </div>
    </div>
  );
}
