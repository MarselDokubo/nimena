"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import { demoConferences } from "@/lib/demo-data";

export function AbstractWorkspace() {
  const conference = demoConferences[0];
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [track, setTrack] = useState<string>(conference.tracks[0]);
  const [type, setType] = useState<string>("Abstract");
  const [draftNotice, setDraftNotice] = useState("");

  function saveDraft() {
    window.localStorage.setItem("nimena.portal.conference-cfp.v1", JSON.stringify({ title, track, type, status: "Draft" }));
    setDraftNotice("Draft saved in this browser.");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem("nimena.portal.conference-cfp.v1", JSON.stringify({ title, track, type, reference: "CFP-DEMO-104", status: "Administrative screening" }));
    setDraftNotice("");
    setSubmitted(true);
  }

  return (
    <div className="page-stack">
      <div className="welcome-row"><div><h2>Submit once. Track every decision.</h2><p>Abstracts and full papers follow the conference workflow—not the journal peer-review workflow.</p></div><Link className="button button--outline" href="/conferences">Back to conference</Link></div>
      <div className="notice-strip"><Icon name="shield" /><p><strong>Prototype only:</strong> files are not uploaded and reviewer assignments are fictional.</p></div>
      <div className="cfp-layout">
        <section className="panel">
          <div className="panel__head"><div><h2>Conference submission</h2><p>{conference.title} · {conference.abstractDeadline}</p></div></div>
          {!submitted ? (
            <form onSubmit={submit}>
              <div className="panel__body cfp-form">
                <div className="form-grid">
                  <div className="form-field form-field--full"><label htmlFor="cfp-title">Paper or presentation title <span>*</span></label><input className="form-control" id="cfp-title" onChange={(event) => setTitle(event.target.value)} required value={title} /></div>
                  <div className="form-field"><label htmlFor="cfp-track">Track <span>*</span></label><select className="form-control" id="cfp-track" onChange={(event) => setTrack(event.target.value)} value={track}>{conference.tracks.map((item) => <option key={item}>{item}</option>)}</select></div>
                  <div className="form-field"><label htmlFor="cfp-type">Submission type <span>*</span></label><select className="form-control" id="cfp-type" onChange={(event) => setType(event.target.value)} value={type}><option>Abstract</option><option>Extended abstract</option><option>Full paper</option><option>Poster</option></select></div>
                  <div className="form-field"><label htmlFor="cfp-author">Presenting author <span>*</span></label><input className="form-control" id="cfp-author" required /></div>
                  <div className="form-field"><label htmlFor="cfp-affiliation">Affiliation <span>*</span></label><input className="form-control" id="cfp-affiliation" required /></div>
                  <div className="form-field form-field--full"><label htmlFor="cfp-authors">Co-authors and affiliations</label><textarea className="form-control" id="cfp-authors" placeholder="One author per line" /></div>
                  <div className="form-field form-field--full"><label htmlFor="cfp-abstract">Abstract <span>*</span></label><textarea className="form-control cfp-abstract" id="cfp-abstract" minLength={100} required /></div>
                  <div className="form-field form-field--full"><label htmlFor="cfp-keywords">Keywords <span>*</span></label><input className="form-control" id="cfp-keywords" placeholder="Separate keywords with semicolons" required /></div>
                </div>
                <label className="upload-tile programme-upload"><Icon name="upload" /><strong>Manuscript or supporting file placeholder</strong><small>PDF or DOCX controls will use private storage in production.</small><input type="file" /></label>
                <div className="declaration-stack"><label className="declaration"><input required type="checkbox" /><span>The work is original and all authors have approved this submission.</span></label><label className="declaration"><input required type="checkbox" /><span>Conflicts, funding and use of generative AI have been disclosed where applicable.</span></label></div>
                {draftNotice && <div className="prototype-toast"><Icon name="check" />{draftNotice}</div>}
              </div>
              <div className="form-actions"><span className="save-state">Sample records remain in this browser.</span><div><button className="button button--soft" onClick={saveDraft} type="button">Save draft</button><button className="button button--primary" type="submit">Submit for screening <Icon name="arrow" /></button></div></div>
            </form>
          ) : (
            <div className="success-state"><span className="success-state__icon"><Icon name="check" /></span><h2>Submission recorded</h2><p>Your sample abstract entered administrative screening. Conference acceptance does not equal journal acceptance.</p><span className="success-reference"><small>Reference</small><strong>CFP-DEMO-104</strong></span><div><button className="button button--outline" onClick={() => setSubmitted(false)} type="button">Edit sample submission</button></div></div>
          )}
        </section>
        <aside className="dashboard-column">
          <section className="panel"><div className="panel__head"><div><h2>Review pathway</h2><p>Proposed conference workflow</p></div></div><div className="panel__body"><ol className="vertical-steps"><li><span>01</span><div><strong>Administrative screening</strong><small>Scope, completeness, anonymity and ethics</small></div></li><li><span>02</span><div><strong>Blind review</strong><small>Relevance, quality, originality and clarity</small></div></li><li><span>03</span><div><strong>Decision or revision</strong><small>Acceptance, revision, rejection or resubmission</small></div></li><li><span>04</span><div><strong>Scheduling</strong><small>Speaker confirmation and programme placement</small></div></li></ol></div></section>
          <section className="panel"><div className="panel__head"><div><h2>Publication options</h2><p>After conference acceptance</p></div></div><div className="panel__body"><ul className="portal-list"><li>Conference programme and abstract book</li><li>Proceedings, subject to a separate review</li><li>Optional invitation to an OJS special issue</li><li>No automatic journal acceptance</li></ul></div></section>
        </aside>
      </div>
    </div>
  );
}
