"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import {
  demoProgrammeSubmissions,
  institutionalProgrammes,
  type InstitutionalProgrammeKey,
} from "@/lib/demo-data";

export function ProgrammeQueue() {
  const [query, setQuery] = useState("");
  const [programme, setProgramme] = useState<"all" | InstitutionalProgrammeKey>("all");
  const [selectedId, setSelectedId] = useState(demoProgrammeSubmissions[0].id);
  const [notes, setNotes] = useState("");
  const [decision, setDecision] = useState("Return for evidence");
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return demoProgrammeSubmissions.filter((item) => {
      const matchesProgramme = programme === "all" || item.programme === programme;
      const matchesText = !needle || [item.id, item.title, item.organisation, item.status].join(" ").toLowerCase().includes(needle);
      return matchesProgramme && matchesText;
    });
  }, [programme, query]);

  const selected = demoProgrammeSubmissions.find((item) => item.id === selectedId) ?? filtered[0] ?? demoProgrammeSubmissions[0];
  const definition = institutionalProgrammes.find((item) => item.key === selected.programme);

  return (
    <div className="page-stack">
      <div className="welcome-row">
        <div>
          <h2>Screen institutional programme submissions.</h2>
          <p>One queue, with programme-specific evidence and decision controls.</p>
        </div>
        <span className="status-chip status-chip--warning">{demoProgrammeSubmissions.length} sample records</span>
      </div>

      <div className="programme-review-layout">
        <section className="panel">
          <div className="panel__head">
            <div><h2>Submission queue</h2><p>Accreditation, innovation, editorial and partnership requests</p></div>
          </div>
          <div className="filter-bar">
            <div className="search-box">
              <Icon name="search" />
              <input aria-label="Search submissions" onChange={(event) => setQuery(event.target.value)} placeholder="Search reference, title or organisation" value={query} />
            </div>
            <select aria-label="Filter by programme" className="filter-select" onChange={(event) => setProgramme(event.target.value as "all" | InstitutionalProgrammeKey)} value={programme}>
              <option value="all">All programmes</option>
              {institutionalProgrammes.map((item) => <option key={item.key} value={item.key}>{item.shortTitle}</option>)}
            </select>
          </div>
          <div className="programme-queue">
            {filtered.map((item) => (
              <button className={item.id === selected.id ? "programme-queue__item is-active" : "programme-queue__item"} key={item.id} onClick={() => { setSelectedId(item.id); setSaved(false); }} type="button">
                <span className="programme-queue__reference">{item.id}</span>
                <strong>{item.title}</strong>
                <small>{item.organisation}</small>
                <em>{item.status}</em>
              </button>
            ))}
            {filtered.length === 0 && <div className="programme-empty"><strong>No matching submissions</strong><p>Adjust the search or programme filter.</p></div>}
          </div>
        </section>

        <aside className="panel programme-review">
          <div className="panel__head">
            <div><h2>Screening record</h2><p>{selected.id}</p></div>
            <span className="status-chip status-chip--info">{definition?.shortTitle}</span>
          </div>
          <div className="panel__body">
            <div className="programme-review__summary">
              <span>Submission</span>
              <h3>{selected.title}</h3>
              <p>{selected.organisation}</p>
            </div>

            <div className="review-checklist">
              <label><input type="checkbox" /> Identity and authority confirmed</label>
              <label><input type="checkbox" /> Required evidence present</label>
              <label><input type="checkbox" /> Conflict-of-interest check complete</label>
              <label><input type="checkbox" /> Correct technical reviewers assigned</label>
            </div>

            <div className="form-field">
              <label htmlFor="programme-decision">Screening outcome</label>
              <select className="form-control" id="programme-decision" onChange={(event) => setDecision(event.target.value)} value={decision}>
                <option>Return for evidence</option>
                <option>Advance to technical review</option>
                <option>Advance to editorial review</option>
                <option>Advance to partnership discussion</option>
                <option>Recommend decline</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="programme-notes">Decision notes</label>
              <textarea className="form-control" id="programme-notes" onChange={(event) => setNotes(event.target.value)} placeholder="Record the reason, evidence gaps and next action." value={notes} />
            </div>
            <button className="button button--primary button--wide" onClick={() => setSaved(true)} type="button">Record screening decision</button>
            {saved && <div className="prototype-toast"><Icon name="check" />Sample decision recorded: {decision}.</div>}
          </div>
        </aside>
      </div>
    </div>
  );
}
