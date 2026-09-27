"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import { demoConferences } from "@/lib/demo-data";

type DelegateCategory = "member" | "non-member" | "student";

export function ConferenceCentre() {
  const conference = demoConferences[0];
  const [view, setView] = useState<"catalogue" | "register" | "attendance">("catalogue");
  const [category, setCategory] = useState<DelegateCategory>("member");
  const [name, setName] = useState("Amina Yusuf");
  const [email, setEmail] = useState("amina.yusuf@example.com");
  const [memberNumber, setMemberNumber] = useState("NIMENA/GM/0742");
  const [registered, setRegistered] = useState(false);
  const [checkInCode, setCheckInCode] = useState("");
  const [attendanceMessage, setAttendanceMessage] = useState("");

  const fee = category === "member" ? conference.memberFee : category === "student" ? conference.studentFee : conference.nonMemberFee;

  function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const record = { conference: conference.id, category, name, email, memberNumber, fee, reference: "REG-DEMO-0742" };
    window.localStorage.setItem("nimena.portal.conference-registration.v1", JSON.stringify(record));
    setRegistered(true);
  }

  function checkAttendance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttendanceMessage(checkInCode.trim().toUpperCase() === "NIMENA-DEMO" ? "Sample check-in confirmed. CPD and certificate remain pending until the event closes." : "Code not recognised in this prototype. Try NIMENA-DEMO.");
  }

  return (
    <div className="page-stack">
      <div className="welcome-row">
        <div><h2>From registration to CPD evidence.</h2><p>A single conference workspace for members and invited non-members.</p></div>
        <span className="status-chip status-chip--info">Demonstration event</span>
      </div>

      <div className="conference-nav" role="tablist" aria-label="Conference workspace">
        <button aria-selected={view === "catalogue"} className={view === "catalogue" ? "is-active" : ""} onClick={() => setView("catalogue")} role="tab" type="button">Conference</button>
        <button aria-selected={view === "register"} className={view === "register" ? "is-active" : ""} onClick={() => setView("register")} role="tab" type="button">Registration</button>
        <Link href="/conferences/cfp">Call for papers</Link>
        <button aria-selected={view === "attendance"} className={view === "attendance" ? "is-active" : ""} onClick={() => setView("attendance")} role="tab" type="button">Attendance &amp; CPD</button>
      </div>

      <div className="notice-strip"><Icon name="shield" /><p><strong>Prototype only:</strong> dates, venue, prices and payment controls are sample information. No payment will be collected.</p></div>

      {view === "catalogue" && (
        <div className="conference-detail-layout">
          <section className="conference-hero-card">
            <span>{conference.label}</span>
            <h3>{conference.title}</h3>
            <p>A proposed multidisciplinary gathering for research, professional practice, standards, technology and Nigeria’s maritime future.</p>
            <dl><div><dt>Date</dt><dd>{conference.date}</dd></div><div><dt>Venue</dt><dd>{conference.venue}</dd></div><div><dt>Format</dt><dd>{conference.mode}</dd></div></dl>
            <div className="conference-hero-card__actions"><button className="button button--primary" onClick={() => setView("register")} type="button">Register interest <Icon name="arrow" /></button><Link className="button button--outline" href="/conferences/cfp">Submit an abstract</Link></div>
          </section>
          <aside className="panel">
            <div className="panel__head"><div><h2>Conference tracks</h2><p>Sample technical programme</p></div></div>
            <div className="panel__body"><ol className="numbered-topics">{conference.tracks.map((track, index) => <li key={track}><span>{String(index + 1).padStart(2, "0")}</span>{track}</li>)}</ol></div>
          </aside>
        </div>
      )}

      {view === "register" && (
        <div className="conference-form-layout">
          <section className="panel">
            <div className="panel__head"><div><h2>Delegate registration</h2><p>Available to members and non-members</p></div></div>
            {!registered ? (
              <form onSubmit={register}>
                <div className="panel__body conference-registration-form">
                  <fieldset className="conference-category"><legend>Delegate category</legend>
                    <label><input checked={category === "member"} name="category" onChange={() => setCategory("member")} type="radio" /><span><strong>NIMENA member</strong><small>₦{conference.memberFee.toLocaleString()}</small></span></label>
                    <label><input checked={category === "non-member"} name="category" onChange={() => setCategory("non-member")} type="radio" /><span><strong>Non-member</strong><small>₦{conference.nonMemberFee.toLocaleString()}</small></span></label>
                    <label><input checked={category === "student"} name="category" onChange={() => setCategory("student")} type="radio" /><span><strong>Student</strong><small>₦{conference.studentFee.toLocaleString()}</small></span></label>
                  </fieldset>
                  <div className="form-grid">
                    <div className="form-field"><label htmlFor="delegate-name">Full name <span>*</span></label><input className="form-control" id="delegate-name" onChange={(event) => setName(event.target.value)} required value={name} /></div>
                    <div className="form-field"><label htmlFor="delegate-email">Email <span>*</span></label><input className="form-control" id="delegate-email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></div>
                    <div className="form-field form-field--full"><label htmlFor="delegate-member">Member number {category !== "member" && "(optional)"}</label><input className="form-control" id="delegate-member" onChange={(event) => setMemberNumber(event.target.value)} required={category === "member"} value={memberNumber} /></div>
                  </div>
                  <label className="declaration"><input required type="checkbox" /><span>I consent to conference administration, attendance recording and event communications for this sample registration.</span></label>
                </div>
                <div className="form-actions"><span className="save-state">Paystack will be connected only in production test mode.</span><button className="button button--primary" type="submit">Continue with sample ₦{fee.toLocaleString()}</button></div>
              </form>
            ) : (
              <div className="success-state"><span className="success-state__icon"><Icon name="check" /></span><h2>Registration recorded</h2><p>Your sample registration is saved in this browser. No payment was attempted.</p><span className="success-reference"><small>Reference</small><strong>REG-DEMO-0742</strong></span><div><button className="button button--outline" onClick={() => setRegistered(false)} type="button">Edit registration</button></div></div>
            )}
          </section>
          <aside className="panel fee-summary"><div className="panel__head"><div><h2>Fee summary</h2><p>Demonstration pricing</p></div></div><div className="panel__body"><div><span>Category</span><strong>{category}</strong></div><div><span>Registration</span><strong>₦{fee.toLocaleString()}</strong></div><div className="fee-summary__total"><span>Sample total</span><strong>₦{fee.toLocaleString()}</strong></div><p>Production pricing, taxes, discounts, refunds and payment authority still require NIMENA approval.</p></div></aside>
        </div>
      )}

      {view === "attendance" && (
        <div className="conference-form-layout">
          <section className="panel">
            <div className="panel__head"><div><h2>Attendance check-in</h2><p>QR codes will resolve to signed, single-use attendance tokens in production</p></div></div>
            <form onSubmit={checkAttendance}><div className="panel__body attendance-check"><div className="qr-placeholder" aria-hidden="true"><span>N</span></div><div><div className="form-field"><label htmlFor="attendance-code">Check-in code</label><input className="form-control" id="attendance-code" onChange={(event) => setCheckInCode(event.target.value)} placeholder="Try NIMENA-DEMO" required value={checkInCode} /></div><button className="button button--primary" type="submit">Confirm sample attendance</button></div></div>{attendanceMessage && <div className="prototype-toast conference-message"><Icon name="check" />{attendanceMessage}</div>}</form>
          </section>
          <aside className="panel"><div className="panel__head"><div><h2>After the event</h2><p>Evidence generated from verified attendance</p></div></div><div className="panel__body"><ul className="portal-list"><li>Session-level attendance record</li><li>Approved CPD hours</li><li>Downloadable attendance certificate</li><li>Receipt and payment history</li><li>Proceedings and presentation links</li></ul></div></aside>
        </div>
      )}
    </div>
  );
}
