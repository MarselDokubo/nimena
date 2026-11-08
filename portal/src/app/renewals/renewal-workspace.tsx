"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";

const fees = {
  "2027": { dues: 25000, arrears: 0 },
  "2026": { dues: 25000, arrears: 5000 },
} as const;

export function RenewalWorkspace() {
  const [year, setYear] = useState<keyof typeof fees>("2027");
  const [method, setMethod] = useState("Paystack card or transfer");
  const [complete, setComplete] = useState(false);
  const amount = fees[year].dues + fees[year].arrears;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setComplete(true);
  }

  return (
    <div className="institutional-two-column">
      <section className="panel">
        <div className="panel__head">
          <div><h2>Renew membership</h2><p>Review the cycle, fee and payment route before continuing.</p></div>
          <span className="status-chip status-chip--success">Eligible</span>
        </div>
        <form className="panel__body form-stack" onSubmit={submit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="renewal-year">Renewal cycle</label>
              <select className="form-control" id="renewal-year" onChange={(event) => { setYear(event.target.value as keyof typeof fees); setComplete(false); }} value={year}>
                <option value="2027">2027 membership year</option>
                <option value="2026">2026 membership year</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="payment-method">Payment method</label>
              <select className="form-control" id="payment-method" onChange={(event) => { setMethod(event.target.value); setComplete(false); }} value={method}>
                <option>Paystack card or transfer</option>
                <option>Bank transfer with reconciliation</option>
                <option>Secretariat payment desk</option>
              </select>
            </div>
          </div>

          <dl className="renewal-breakdown">
            <div><dt>Annual subscription</dt><dd>₦{fees[year].dues.toLocaleString()}</dd></div>
            <div><dt>Arrears / adjustments</dt><dd>₦{fees[year].arrears.toLocaleString()}</dd></div>
            <div><dt>Total payable</dt><dd>₦{amount.toLocaleString()}</dd></div>
          </dl>

          <label className="consent-line">
            <input required type="checkbox" />
            <span>I confirm that my professional profile and contact information are current.</span>
          </label>

          <button className="button button--primary" type="submit"><Icon name="wallet" /> Continue in test mode</button>
          <p className="form-hint">No payment is taken in this review build. Production will initialize and verify payment on the server.</p>
        </form>
      </section>

      <aside className="dashboard-column">
        {complete ? (
          <section className="panel renewal-confirmation" aria-live="polite">
            <div className="panel__body">
              <span><Icon name="check" /></span>
              <small>Test transaction prepared</small>
              <h2>Renewal ready for payment</h2>
              <p>{year} cycle · {method} · ₦{amount.toLocaleString()}</p>
              <strong>Reference: NIM-RNW-2027-0742</strong>
            </div>
          </section>
        ) : (
          <section className="panel">
            <div className="panel__head"><div><h2>Current standing</h2><p>Amina Yusuf · NIMENA/GM/0742</p></div></div>
            <div className="panel__body timeline">
              <div className="timeline-item"><span className="timeline-item__dot"><Icon name="check" /></span><div><strong>Membership active</strong><p>Graduate Member · Lagos Chapter</p></div><time>2026</time></div>
              <div className="timeline-item"><span className="timeline-item__dot"><Icon name="check" /></span><div><strong>No unresolved sanctions</strong><p>Eligible to renew online</p></div><time>Clear</time></div>
              <div className="timeline-item"><span className="timeline-item__dot timeline-item__dot--next"><Icon name="clock" /></span><div><strong>Next cycle</strong><p>Valid through 31 March 2027 after verification</p></div><time>2027</time></div>
            </div>
          </section>
        )}

        <section className="panel">
          <div className="panel__head"><div><h2>Payment history</h2><p>Receipts and reconciliation status</p></div></div>
          <div className="panel__body document-list">
            <div className="document-item"><span className="document-icon"><Icon name="file" /></span><span className="document-item__copy"><strong>2026 annual subscription</strong><span>Paid · Receipt NIM-R-00684</span></span><Icon name="download" /></div>
            <div className="document-item"><span className="document-icon"><Icon name="file" /></span><span className="document-item__copy"><strong>2025 annual subscription</strong><span>Paid · Receipt NIM-R-00421</span></span><Icon name="download" /></div>
          </div>
        </section>
      </aside>
    </div>
  );
}
