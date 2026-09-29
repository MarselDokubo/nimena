"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { demoConferenceSubmissions } from "@/lib/demo-data";

export function ConferenceManagement() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [selectedReference, setSelectedReference] = useState<string>(demoConferenceSubmissions[0].reference);
  const [reviewer, setReviewer] = useState("Reviewer pool — Marine Systems");
  const [relevance, setRelevance] = useState(4);
  const [quality, setQuality] = useState(4);
  const [originality, setOriginality] = useState(3);
  const [decision, setDecision] = useState("Request revision");
  const [room, setRoom] = useState("Technical Hall A");
  const [sessionTime, setSessionTime] = useState("09:30");
  const [message, setMessage] = useState("");
  const [operationsMessage, setOperationsMessage] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return demoConferenceSubmissions.filter((item) => {
      const matchesQuery = !needle || [item.reference, item.title, item.presenter, item.track, item.status].join(" ").toLowerCase().includes(needle);
      const matchesStatus = statusFilter === "All statuses" || item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const selected = demoConferenceSubmissions.find((item) => item.reference === selectedReference) ?? filtered[0] ?? demoConferenceSubmissions[0];
  const total = relevance + quality + originality;

  return (
    <div className="page-stack">
      <div className="welcome-row"><div><h2>Manage the complete conference cycle.</h2><p>Screen submissions, assign blind reviewers, make decisions and build the technical programme.</p></div><span className="status-chip status-chip--warning">Sample records</span></div>
      <section className="conference-admin-metrics"><article><span>Registrations</span><strong>184</strong><small>132 sample payments verified</small></article><article><span>Submissions</span><strong>47</strong><small>11 awaiting assignment</small></article><article><span>Accepted</span><strong>19</strong><small>Programme placement pending</small></article><article><span>Checked in</span><strong>0</strong><small>Event not started</small></article></section>
      <div className="notice-strip"><Icon name="shield" /><p><strong>Separation of systems:</strong> this conference decision does not create a journal publication. Invited manuscripts must enter OJS as separate records.</p></div>

      <div className="conference-admin-layout">
        <section className="panel">
          <div className="panel__head"><div><h2>Abstract and paper queue</h2><p>Blind-review and scheduling workspace</p></div></div>
          <div className="filter-bar"><div className="search-box"><Icon name="search" /><input aria-label="Search conference submissions" onChange={(event) => setQuery(event.target.value)} placeholder="Search reference, title, presenter or track" value={query} /></div><select className="filter-select" aria-label="Filter submission status" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}><option>All statuses</option><option>Reviewer assignment</option><option>Under review</option><option>Revision requested</option><option>Accepted</option></select></div>
          <div className="conference-submission-queue">
            {filtered.map((item) => <button className={item.reference === selected.reference ? "is-active" : ""} key={item.reference} onClick={() => { setSelectedReference(item.reference); setMessage(""); }} type="button"><span>{item.reference}</span><div><strong>{item.title}</strong><small>{item.presenter} · {item.track}</small></div><em>{item.status}</em><b>{item.score ? `${item.score}%` : "—"}</b></button>)}
            {filtered.length === 0 && <div className="queue-empty">No sample submissions match these filters.</div>}
          </div>
        </section>

        <aside className="panel conference-review-card">
          <div className="panel__head"><div><h2>Review and schedule</h2><p>{selected.reference}</p></div><span className="status-chip status-chip--info">{selected.type}</span></div>
          <div className="panel__body conference-review-form">
            <div className="programme-review__summary"><span>Submission</span><h3>{selected.title}</h3><p>{selected.presenter} · {selected.track}</p></div>
            <div className="form-field"><label htmlFor="assigned-reviewer">Blind reviewer assignment</label><select className="form-control" id="assigned-reviewer" onChange={(event) => setReviewer(event.target.value)} value={reviewer}><option>Reviewer pool — Marine Systems</option><option>Reviewer pool — Naval Architecture</option><option>Reviewer pool — Offshore &amp; Energy</option><option>Reviewer pool — Blue Economy</option></select></div>
            <div className="conference-score-grid">
              <label>Relevance <input max="5" min="1" onChange={(event) => setRelevance(Number(event.target.value))} type="range" value={relevance} /><strong>{relevance}/5</strong></label>
              <label>Technical quality <input max="5" min="1" onChange={(event) => setQuality(Number(event.target.value))} type="range" value={quality} /><strong>{quality}/5</strong></label>
              <label>Originality <input max="5" min="1" onChange={(event) => setOriginality(Number(event.target.value))} type="range" value={originality} /><strong>{originality}/5</strong></label>
            </div>
            <div className="conference-score-total"><span>Screening score</span><strong>{total}/15</strong></div>
            <div className="form-field"><label htmlFor="conference-decision">Decision recommendation</label><select className="form-control" id="conference-decision" onChange={(event) => setDecision(event.target.value)} value={decision}><option>Request revision</option><option>Accept presentation</option><option>Accept poster</option><option>Reject</option><option>Escalate to programme chair</option></select></div>
            <div className="form-field"><label htmlFor="decision-notes">Decision notes</label><textarea className="form-control" id="decision-notes" placeholder="Evidence, reviewer feedback and next action" /></div>
            <div className="schedule-fields"><div className="form-field"><label htmlFor="session-room">Room</label><input className="form-control" id="session-room" onChange={(event) => setRoom(event.target.value)} value={room} /></div><div className="form-field"><label htmlFor="session-time">Time</label><input className="form-control" id="session-time" onChange={(event) => setSessionTime(event.target.value)} type="time" value={sessionTime} /></div></div>
            <button className="button button--primary button--wide" onClick={() => setMessage(`${decision} recorded. Proposed slot: ${room}, ${sessionTime}.`)} type="button">Record sample decision</button>
            {message && <div className="prototype-toast"><Icon name="check" />{message}</div>}
          </div>
        </aside>
      </div>

      <div className="dashboard-grid">
        <section className="panel"><div className="panel__head"><div><h2>Programme readiness</h2><p>Controls required before publication</p></div></div><div className="panel__body"><ul className="portal-list"><li>Accepted speakers confirmed</li><li>Conflicts and reviewer anonymity checked</li><li>Session chair and rooms assigned</li><li>Accessibility and presentation needs recorded</li><li>Public programme approved before release</li></ul></div></section>
        <section className="panel"><div className="panel__head"><div><h2>Attendance operations</h2><p>QR check-in and evidence controls</p></div></div><div className="panel__body conference-operations"><button className="quick-action" onClick={() => setOperationsMessage("Sample check-in desk opened. Production will require signed, single-use QR tokens.")} type="button"><Icon name="card" /><span>Open check-in desk</span></button><button className="quick-action" onClick={() => setOperationsMessage("Sample delegate export prepared. Production exports will be permission-checked and audited.")} type="button"><Icon name="download" /><span>Export delegate register</span></button><button className="quick-action" onClick={() => setOperationsMessage("Certificate run held for attendance and CPD audit, as required.")} type="button"><Icon name="file" /><span>Issue certificates after audit</span></button>{operationsMessage && <div className="prototype-toast conference-message"><Icon name="check" />{operationsMessage}</div>}</div></section>
      </div>
    </div>
  );
}
