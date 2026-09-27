"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import {
  institutionalProgrammes,
  type DemoProgrammeSubmission,
  type InstitutionalProgrammeKey,
  type ProgrammeSubmissionStatus,
} from "@/lib/demo-data";

const storageKey = "nimena.portal.programmes.v1";

type FormState = {
  title: string;
  organisation: string;
  contact: string;
  summary: string;
  evidence: string;
  declaration: boolean;
};

const emptyForm: FormState = {
  title: "",
  organisation: "",
  contact: "",
  summary: "",
  evidence: "",
  declaration: false,
};

function prefixFor(programme: InstitutionalProgrammeKey) {
  return {
    accreditation: "ACC",
    innovation: "INN",
    magazine: "MAG",
    partnerships: "PAR",
  }[programme];
}

export function ProgrammeWorkspace() {
  const [selected, setSelected] = useState<InstitutionalProgrammeKey>("accreditation");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submissions, setSubmissions] = useState<DemoProgrammeSubmission[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setSubmissions(JSON.parse(saved) as DemoProgrammeSubmission[]);
    } catch {
      setSubmissions([]);
    }
  }, []);

  const programme = useMemo(
    () => institutionalProgrammes.find((item) => item.key === selected) ?? institutionalProgrammes[0],
    [selected],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function persist(status: ProgrammeSubmissionStatus) {
    const item: DemoProgrammeSubmission = {
      id: `${prefixFor(selected)}-2026-${String(Date.now()).slice(-4)}`,
      programme: selected,
      title: form.title.trim() || "Untitled draft",
      organisation: form.organisation.trim() || "Organisation not supplied",
      submitted: status === "Draft" ? "Saved locally" : new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status,
    };
    const next = [item, ...submissions];
    setSubmissions(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setNotice(status === "Draft" ? "Draft saved in this browser." : "Prototype submission recorded for workflow review.");
    if (status !== "Draft") setForm(emptyForm);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    persist("Submitted for screening");
  }

  return (
    <div className="page-stack">
      <div className="welcome-row programme-intro">
        <div>
          <h2>Professional programmes beyond membership.</h2>
          <p>Submit opportunities and evidence through one clear institutional workflow.</p>
        </div>
        <span className="status-chip status-chip--info">Prototype workflow</span>
      </div>

      <div className="notice-strip">
        <Icon name="shield" />
        <p><strong>Review build:</strong> use sample information only. Files are named for the workflow but are not uploaded.</p>
      </div>

      <section className="programme-tabs" aria-label="Institutional programme options">
        {institutionalProgrammes.map((item, index) => (
          <button
            className={item.key === selected ? "programme-tab is-active" : "programme-tab"}
            key={item.key}
            onClick={() => {
              setSelected(item.key);
              setNotice("");
            }}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.shortTitle}</strong>
          </button>
        ))}
      </section>

      <div className="programme-layout">
        <section className="panel">
          <div className="panel__head">
            <div>
              <h2>{programme.title}</h2>
              <p>{programme.description}</p>
            </div>
          </div>
          <form onSubmit={submit}>
            <div className="panel__body programme-form">
              <div className="programme-guidance">
                <span>What reviewers expect</span>
                <p>{programme.evidence}</p>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="programme-title">Application or proposal title <span>*</span></label>
                  <input className="form-control" id="programme-title" onChange={(event) => update("title", event.target.value)} required value={form.title} />
                </div>
                <div className="form-field">
                  <label htmlFor="programme-organisation">Organisation or author <span>*</span></label>
                  <input className="form-control" id="programme-organisation" onChange={(event) => update("organisation", event.target.value)} required value={form.organisation} />
                </div>
                <div className="form-field form-field--full">
                  <label htmlFor="programme-contact">Contact email <span>*</span></label>
                  <input className="form-control" id="programme-contact" onChange={(event) => update("contact", event.target.value)} required type="email" value={form.contact} />
                </div>
                <div className="form-field form-field--full">
                  <label htmlFor="programme-summary">Purpose and expected outcome <span>*</span></label>
                  <textarea className="form-control" id="programme-summary" onChange={(event) => update("summary", event.target.value)} required value={form.summary} />
                </div>
                <div className="form-field form-field--full">
                  <label htmlFor="programme-evidence">Evidence available</label>
                  <textarea className="form-control" id="programme-evidence" onChange={(event) => update("evidence", event.target.value)} placeholder="List the documents, links, images or records you can provide." value={form.evidence} />
                </div>
              </div>

              <label className="upload-tile programme-upload">
                <Icon name="upload" />
                <strong>Supporting evidence placeholder</strong>
                <small>Production will use private, access-controlled storage.</small>
                <input multiple type="file" />
              </label>

              <label className="declaration">
                <input checked={form.declaration} onChange={(event) => update("declaration", event.target.checked)} required type="checkbox" />
                <span>I confirm that this sample submission is accurate and may be screened under the applicable NIMENA policy.</span>
              </label>
              {notice && <div className="prototype-toast"><Icon name="check" />{notice}</div>}
            </div>

            <div className="form-actions">
              <span className="save-state">No information is sent from this prototype.</span>
              <div className="programme-actions">
                <button className="button button--soft" onClick={() => persist("Draft")} type="button">Save draft</button>
                <button className="button button--primary" type="submit">{programme.action} <Icon name="arrow" /></button>
              </div>
            </div>
          </form>
        </section>

        <aside className="panel programme-activity">
          <div className="panel__head">
            <div><h2>Your activity</h2><p>Drafts and sample submissions saved in this browser</p></div>
          </div>
          <div className="panel__body">
            {submissions.length === 0 ? (
              <div className="programme-empty">
                <Icon name="file" />
                <strong>No programme activity yet</strong>
                <p>Choose a programme and save a draft to see its status here.</p>
              </div>
            ) : (
              <div className="programme-records">
                {submissions.map((item) => (
                  <article className="programme-record" key={item.id}>
                    <span>{item.id}</span>
                    <strong>{item.title}</strong>
                    <small>{item.organisation}</small>
                    <em>{item.status}</em>
                  </article>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
