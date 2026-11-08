"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import { recognitionProgrammes } from "@/lib/institutional-data";

export function RecognitionCentre() {
  const [selected, setSelected] = useState(recognitionProgrammes[0].title);
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="institutional-two-column institutional-two-column--wide">
      <section className="panel">
        <div className="panel__head"><div><h2>Open programmes</h2><p>Review eligibility, deadlines and nomination routes.</p></div></div>
        <div className="recognition-list">
          {recognitionProgrammes.map((programme) => (
            <button className={selected === programme.title ? "is-active" : ""} key={programme.title} onClick={() => { setSelected(programme.title); setSubmitted(false); }} type="button">
              <span>{programme.type}</span>
              <strong>{programme.title}</strong>
              <p>{programme.description}</p>
              <small>Closes {programme.deadline}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__head"><div><h2>Start application</h2><p>{selected}</p></div></div>
        {submitted ? (
          <div className="panel__body submission-success" aria-live="polite">
            <span><Icon name="check" /></span>
            <h3>Draft created</h3>
            <p>Your presentation application has been saved as <strong>REC-2027-0018</strong>.</p>
            <button className="button button--outline" onClick={() => setSubmitted(false)} type="button">Continue editing</button>
          </div>
        ) : (
          <form className="panel__body form-stack" onSubmit={submit}>
            <div className="form-field"><label htmlFor="candidate">Candidate or nominee</label><input className="form-control" defaultValue="Amina Yusuf" id="candidate" required /></div>
            <div className="form-field"><label htmlFor="statement">Nomination statement</label><textarea className="form-control institutional-textarea" id="statement" placeholder="Summarise the candidate's distinction, impact and service." required /></div>
            <div className="form-field"><label htmlFor="evidence">Supporting evidence</label><input className="form-control institutional-file" id="evidence" type="file" /></div>
            <label className="consent-line"><input required type="checkbox" /><span>I confirm the information is accurate and the nominee has consented where required.</span></label>
            <button className="button button--primary" type="submit"><Icon name="file" /> Save application draft</button>
            <p className="form-hint">Files are not uploaded in this review build.</p>
          </form>
        )}
      </section>
    </div>
  );
}
