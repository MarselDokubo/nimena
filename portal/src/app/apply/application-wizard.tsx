"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { chapters, membershipCategories } from "@/lib/demo-data";

const steps = [
  { label: "Pathway", title: "Membership pathway" },
  { label: "Personal", title: "Personal details" },
  { label: "Professional", title: "Professional registration" },
  { label: "Experience", title: "Qualifications and employment" },
  { label: "Documents", title: "Evidence and declaration" },
] as const;

type FormState = Record<string, string | boolean>;

const initialForm: FormState = {
  category: "",
  chapter: "",
  surname: "",
  otherNames: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  sex: "",
  nationality: "Nigerian",
  address: "",
  council: "COREN",
  registrationNumber: "",
  declaration: false,
};

const draftStorageKey = "nimena.portal.application.v1";

const requiredFieldsByStep: Record<number, string[]> = {
  0: ["category", "chapter"],
  1: ["surname", "otherNames", "email", "phone", "dateOfBirth", "sex", "nationality", "address"],
  3: ["institution-0", "qualification-0", "employer-0", "position-0"],
};

const categoryNotes: Record<string, string> = {
  Corporate: "Professional individual membership",
  Associate: "Affiliate professional pathway",
  Graduate: "For eligible engineering graduates",
  Student: "For students in relevant disciplines",
  "Corporate Firm": "Institutional or company membership",
};

export function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [professionalRows, setProfessionalRows] = useState(1);
  const [educationRows, setEducationRows] = useState(1);
  const [employmentRows, setEmploymentRows] = useState(1);
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(draftStorageKey);
      if (stored) {
        try { setForm({ ...initialForm, ...JSON.parse(stored) }); } catch { /* ignore an invalid local draft */ }
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const progress = Math.round(((step + 1) / steps.length) * 100);
  const canContinue = (requiredFieldsByStep[step] ?? []).every((field) => String(form[field] ?? "").trim());

  function update(name: string, value: string | boolean) {
    setSaved(false);
    setForm((current) => ({ ...current, [name]: value }));
  }

  function saveDraft() {
    window.localStorage.setItem(draftStorageKey, JSON.stringify(form));
    setSaved(true);
  }

  function next() {
    saveDraft();
    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitPreview() {
    if (!form.declaration) return;
    window.localStorage.removeItem(draftStorageKey);
    setSubmitted(true);
  }

  return (
    <div className="application-layout">
      <aside className="application-aside">
        <h2>Application progress</h2>
        <p>Your draft stays in this browser during the prototype review.</p>
        <div className="application-steps">
          {steps.map((item, index) => (
            <div className={`application-step${index === step ? " is-active" : ""}${index < step ? " is-complete" : ""}`} key={item.label}>
              <span className="application-step__number">{index < step ? <Icon name="check" /> : index + 1}</span>
              <strong>{item.label}</strong>
            </div>
          ))}
        </div>
        <div style={{ position: "relative", marginTop: 18 }}>
          <div className="progress-meta"><strong>{progress}% complete</strong><span>Step {step + 1} of {steps.length}</span></div>
          <div className="progress-line"><span style={{ width: `${progress}%` }} /></div>
        </div>
      </aside>

      <section className="application-main">
        <div className="application-heading">
          <span className="kicker">Membership application</span>
          <h1>Apply to join NIMENA</h1>
          <p>Complete the official membership information in a clearer, guided format.</p>
        </div>

        <div className="prototype-warning"><Icon name="shield" /><span><strong>Prototype only.</strong> Please use sample information. Documents selected here are not uploaded or transmitted.</span></div>

        {submitted ? (
          <div className="form-card success-state">
            <span className="success-state__icon"><Icon name="check" /></span>
            <h2>Preview application submitted</h2>
            <p>This demonstrates the confirmation state. No information has been sent to NIMENA or stored on a server.</p>
            <span className="success-reference"><small>Sample reference</small><strong>NIM-2026-PREVIEW</strong></span>
            <div><Link className="button button--secondary" href="/dashboard">Open member workspace <Icon name="arrow" /></Link></div>
          </div>
        ) : (
          <div className="form-card">
            <div className="form-card__head"><span>Step {step + 1} of {steps.length}</span><h2>{steps[step].title}</h2></div>
            <div className="form-card__body">
              {step === 0 && (
                <div className="form-grid">
                  <div className="form-field form-field--full">
                    <label>Membership type <span>*</span></label>
                    <div className="choice-grid">
                      {membershipCategories.map((category) => (
                        <label className="choice-card" key={category}>
                          <input checked={form.category === category} name="category" onChange={() => update("category", category)} type="radio" />
                          <span><strong>{category}</strong><small>{categoryNotes[category]}</small></span>
                        </label>
                      ))}
                    </div>
                    <small className="form-hint">Names follow the current NIMENA membership application form. Final eligibility rules and fees still require confirmation.</small>
                  </div>
                  <div className="form-field form-field--full">
                    <label htmlFor="chapter">Preferred chapter <span>*</span></label>
                    <select className="form-control" id="chapter" onChange={(event) => update("chapter", event.target.value)} value={String(form.chapter)}>
                      <option value="">Select a chapter</option>
                      {chapters.map((chapter) => <option key={chapter}>{chapter}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="form-grid">
                  <Field form={form} label="Surname" name="surname" onChange={update} required />
                  <Field form={form} label="Other names" name="otherNames" onChange={update} required />
                  <Field form={form} label="Email address" name="email" onChange={update} required type="email" />
                  <Field form={form} label="Telephone number" name="phone" onChange={update} required type="tel" />
                  <Field form={form} label="Date of birth" name="dateOfBirth" onChange={update} required type="date" />
                  <div className="form-field"><label htmlFor="sex">Sex <span>*</span></label><select className="form-control" id="sex" onChange={(event) => update("sex", event.target.value)} value={String(form.sex)}><option value="">Select</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></div>
                  <Field form={form} label="Nationality" name="nationality" onChange={update} required />
                  <div className="form-field form-field--full"><label htmlFor="address">Permanent address <span>*</span></label><textarea className="form-control" id="address" onChange={(event) => update("address", event.target.value)} value={String(form.address)} /></div>
                </div>
              )}

              {step === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label htmlFor="council">Engineering council status</label><select className="form-control" id="council" onChange={(event) => update("council", event.target.value)} value={String(form.council)}><option>COREN</option><option>Other registration</option><option>Not registered</option></select></div>
                  <Field form={form} label="Registration number" name="registrationNumber" onChange={update} />
                  <div className="form-field form-field--full">
                    <label>Membership of other professional bodies</label>
                    {Array.from({ length: professionalRows }, (_, index) => (
                      <div className="repeat-block" key={index}>
                        <div className="repeat-block__title"><strong>Professional body {index + 1}</strong></div>
                        <div className="form-grid">
                          <Field form={form} label="Professional body" name={`body-${index}`} onChange={update} />
                          <Field form={form} label="Membership type" name={`body-type-${index}`} onChange={update} />
                          <Field form={form} label="Membership number" name={`body-number-${index}`} onChange={update} />
                          <Field form={form} label="Effective date" name={`body-date-${index}`} onChange={update} type="date" />
                        </div>
                      </div>
                    ))}
                    <button className="button button--small button--outline" onClick={() => setProfessionalRows((count) => count + 1)} style={{ marginTop: 12 }} type="button">Add another body</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-grid">
                  <div className="form-field form-field--full">
                    <label>Academic qualifications</label>
                    {Array.from({ length: educationRows }, (_, index) => (
                      <div className="repeat-block" key={index}>
                        <div className="repeat-block__title"><strong>Qualification {index + 1}</strong></div>
                        <div className="form-grid">
                          <Field form={form} label="Institution" name={`institution-${index}`} onChange={update} />
                          <Field form={form} label="Qualification" name={`qualification-${index}`} onChange={update} />
                          <Field form={form} label="Course" name={`course-${index}`} onChange={update} />
                          <Field form={form} label="Year awarded" name={`award-year-${index}`} onChange={update} type="number" />
                        </div>
                      </div>
                    ))}
                    <button className="button button--small button--outline" onClick={() => setEducationRows((count) => count + 1)} style={{ marginTop: 12 }} type="button">Add qualification</button>
                  </div>
                  <div className="form-field form-field--full">
                    <label>Employment history</label>
                    {Array.from({ length: employmentRows }, (_, index) => (
                      <div className="repeat-block" key={index}>
                        <div className="repeat-block__title"><strong>Employment {index + 1}</strong></div>
                        <div className="form-grid">
                          <Field form={form} label="Employer" name={`employer-${index}`} onChange={update} />
                          <Field form={form} label="Position or rank" name={`position-${index}`} onChange={update} />
                          <div className="form-field form-field--full"><label htmlFor={`projects-${index}`}>Projects carried out</label><textarea className="form-control" id={`projects-${index}`} onChange={(event) => update(`projects-${index}`, event.target.value)} value={String(form[`projects-${index}`] ?? "")} /></div>
                          <Field form={form} label="From" name={`employment-from-${index}`} onChange={update} type="month" />
                          <Field form={form} label="To" name={`employment-to-${index}`} onChange={update} type="month" />
                        </div>
                      </div>
                    ))}
                    <button className="button button--small button--outline" onClick={() => setEmploymentRows((count) => count + 1)} style={{ marginTop: 12 }} type="button">Add employment</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="upload-grid">
                    {[
                      ["Passport photograph", "JPG or PNG"],
                      ["Signature", "JPG or PNG"],
                      ["Academic certificates", "PDF"],
                      ["Professional-body evidence", "PDF"],
                      ["COREN or council evidence", "PDF"],
                    ].map(([name, type]) => (
                      <label className="upload-tile" key={name}>
                        <Icon name="upload" />
                        <strong>{name}</strong>
                        <small>{type} · Not uploaded in this prototype</small>
                        <input className="sr-only" type="file" />
                      </label>
                    ))}
                  </div>
                  <label className="declaration">
                    <input checked={Boolean(form.declaration)} onChange={(event) => update("declaration", event.target.checked)} type="checkbox" />
                    <span>I confirm that the information in this prototype application is complete and accurate. I understand that this review build does not submit information to NIMENA. <strong>This declaration will become legally meaningful only in the production portal.</strong></span>
                  </label>
                </div>
              )}
            </div>

            <div className="form-actions">
              <span className="save-state">
                {step < steps.length - 1 && !canContinue
                  ? "Complete the required fields to continue"
                  : step === steps.length - 1 && !form.declaration
                    ? "Accept the declaration to submit"
                    : saved
                      ? <><Icon name="check" /> Draft saved in this browser</>
                      : "Not yet saved"}
              </span>
              <div style={{ display: "flex", gap: 9 }}>
                {step > 0 && <button className="button button--outline" onClick={back} type="button">Back</button>}
                <button className="button button--soft" onClick={saveDraft} type="button">Save draft</button>
                {step < steps.length - 1
                  ? <button className="button button--primary" disabled={!canContinue} onClick={next} type="button">Continue <Icon name="arrow" /></button>
                  : <button className="button button--primary" disabled={!form.declaration} onClick={submitPreview} type="button">Submit preview <Icon name="arrow" /></button>}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ form, label, name, onChange, required = false, type = "text" }: {
  form: FormState;
  label: string;
  name: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label} {required && <span>*</span>}</label>
      <input className="form-control" id={name} onChange={(event) => onChange(name, event.target.value)} required={required} type={type} value={String(form[name] ?? "")} />
    </div>
  );
}
