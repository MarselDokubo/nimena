"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import { partnershipTiers } from "@/lib/institutional-data";

export function PartnershipCentre() {
  const [selected, setSelected] = useState(partnershipTiers[0].name);
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="partnership-tier-grid">
        {partnershipTiers.map((tier, index) => (
          <article className={selected === tier.name ? "is-active" : ""} key={tier.name}>
            <span>0{index + 1}</span>
            <h3>{tier.name}</h3>
            <p>{tier.audience}</p>
            <ul>{tier.benefits.map((benefit) => <li key={benefit}><Icon name="check" /> {benefit}</li>)}</ul>
            <button className="button button--small button--outline" onClick={() => { setSelected(tier.name); setSubmitted(false); }} type="button">Select pathway</button>
          </article>
        ))}
      </section>

      <section className="panel">
        <div className="panel__head"><div><h2>Partnership enquiry</h2><p>{selected}</p></div><span className="status-chip status-chip--info">Structured review</span></div>
        {submitted ? (
          <div className="panel__body submission-success" aria-live="polite"><span><Icon name="check" /></span><h3>Proposal recorded</h3><p>Presentation reference <strong>PAR-2026-0031</strong> has been created for Secretariat screening.</p><button className="button button--outline" onClick={() => setSubmitted(false)} type="button">Edit proposal</button></div>
        ) : (
          <form className="panel__body form-stack" onSubmit={submit}>
            <div className="form-grid">
              <div className="form-field"><label htmlFor="organisation">Organisation</label><input className="form-control" id="organisation" required /></div>
              <div className="form-field"><label htmlFor="contact">Official contact email</label><input className="form-control" id="contact" required type="email" /></div>
              <div className="form-field"><label htmlFor="objective">Shared objective</label><input className="form-control" id="objective" required /></div>
              <div className="form-field"><label htmlFor="contribution">Proposed contribution</label><input className="form-control" id="contribution" required /></div>
              <div className="form-field form-field--full"><label htmlFor="proposal">Partnership or sponsorship proposal</label><textarea className="form-control institutional-textarea" id="proposal" required /></div>
            </div>
            <button className="button button--primary" type="submit"><Icon name="shield" /> Save proposal draft</button>
          </form>
        )}
      </section>
    </>
  );
}
