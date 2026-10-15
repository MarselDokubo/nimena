"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";

const checks = [
  "Identity and contact details reviewed",
  "Membership pathway appears appropriate",
  "Academic evidence reviewed",
  "Professional registration reviewed",
  "Employment history reviewed",
  "Supporting documents are legible",
];

export function ReviewActions() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [note, setNote] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [membershipNumber, setMembershipNumber] = useState("");
  const [message, setMessage] = useState("");
  const allChecksComplete = checks.every((_, index) => checked[index]);

  function record(action: string) {
    setMessage(`${action} recorded in this preview. No real application was changed.`);
  }

  return (
    <section className="panel review-card">
      <div className="panel__head"><div><h2>For official use only</h2><p>Form No. 1 review and approval record</p></div></div>
      <div className="panel__body">
        <div className="official-review-form">
          <div className="form-field"><label htmlFor="received-date">Date received</label><input className="form-control" defaultValue="2026-09-12" id="received-date" type="date" /></div>
          <div className="form-field"><label htmlFor="reviewed-date">Date reviewed</label><input className="form-control" id="reviewed-date" type="date" /></div>
          <div className="form-field form-field--full"><label htmlFor="recommendation">Recommendation</label><select className="form-control" id="recommendation" onChange={(event) => setRecommendation(event.target.value)} value={recommendation}><option value="">Select recommendation</option><option>Recommend approval</option><option>Request correction</option><option>Do not recommend</option><option>Defer for further evidence</option></select></div>
          <div className="form-field form-field--full"><label htmlFor="membership-number">Membership number</label><input className="form-control" id="membership-number" onChange={(event) => setMembershipNumber(event.target.value)} placeholder="Assigned after approval" value={membershipNumber} /></div>
        </div>

        <h3 className="official-review-subtitle">Membership Committee checklist</h3>
        <div className="review-checklist">
          {checks.map((label, index) => (
            <label className="review-check" key={label}>
              <input checked={Boolean(checked[index])} onChange={(event) => setChecked((current) => ({ ...current, [index]: event.target.checked }))} type="checkbox" />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div className="decision-form">
          <label htmlFor="review-note">Internal review note</label>
          <textarea className="form-control" id="review-note" onChange={(event) => setNote(event.target.value)} placeholder="Record evidence checked, exceptions and recommendation rationale…" value={note} />
          <div className="official-signoff-grid">
            <div><span>Chairman, Membership Committee</span><strong>Pending authorised sign-off</strong><small>Name, decision date and audit identity</small></div>
            <div><span>National Chairman</span><strong>Pending authorised approval</strong><small>Name, approval date and audit identity</small></div>
          </div>
          {message && <div className="prototype-toast"><Icon name="check" />{message}</div>}
          <div className="decision-actions">
            <button className="button button--secondary button--wide" disabled={!allChecksComplete || !recommendation} onClick={() => record("Committee recommendation")} type="button">Record committee recommendation <Icon name="arrow" /></button>
            <button className="button button--outline button--wide" onClick={() => record("Correction request")} type="button">Request correction</button>
            <button className="button button--danger-soft button--wide" onClick={() => record("Hold decision")} type="button">Place on hold</button>
          </div>
          <small className="form-hint">Production decisions will require role permission, a reason and an immutable audit record.</small>
        </div>
      </div>
    </section>
  );
}
