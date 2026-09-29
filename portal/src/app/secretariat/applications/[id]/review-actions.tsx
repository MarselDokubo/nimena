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
  const [message, setMessage] = useState("");
  const allChecksComplete = checks.every((_, index) => checked[index]);

  function record(action: string) {
    setMessage(`${action} recorded in this preview. No real application was changed.`);
  }

  return (
    <section className="panel review-card">
      <div className="panel__head"><div><h2>Review checklist</h2><p>Complete before making a recommendation</p></div></div>
      <div className="panel__body">
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
          {message && <div className="prototype-toast"><Icon name="check" />{message}</div>}
          <div className="decision-actions">
            <button className="button button--secondary button--wide" disabled={!allChecksComplete} onClick={() => record("Committee recommendation")} type="button">Recommend for committee <Icon name="arrow" /></button>
            <button className="button button--outline button--wide" onClick={() => record("Correction request")} type="button">Request correction</button>
            <button className="button button--danger-soft button--wide" onClick={() => record("Hold decision")} type="button">Place on hold</button>
          </div>
          <small className="form-hint">Production decisions will require role permission, a reason and an immutable audit record.</small>
        </div>
      </div>
    </section>
  );
}
