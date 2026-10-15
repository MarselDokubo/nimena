"use client";

import Link from "next/link";
import { useEffect, useState, type ChangeEvent } from "react";
import { Icon } from "@/components/icon";
import { chapters, membershipCategories } from "@/lib/demo-data";

const steps = [
  { label: "Personal", title: "Personal details" },
  { label: "Membership", title: "Membership category and chapter" },
  { label: "Bodies", title: "Membership of professional bodies" },
  { label: "Registration", title: "Engineering council registration" },
  { label: "Education", title: "Academic qualifications" },
  { label: "Experience", title: "Employment and project history" },
  { label: "Declaration", title: "Declaration and review" },
] as const;

type FormState = Record<string, string | boolean>;

type DraftPayload = {
  form: FormState;
  professionalRows: number;
  educationRows: number;
  employmentRows: number;
};

const initialForm: FormState = {
  surname: "",
  otherNames: "",
  permanentAddress: "",
  email: "",
  telephone: "",
  dateOfBirth: "",
  sex: "",
  countryOfOrigin: "Nigeria",
  countryOfResidence: "Nigeria",
  category: "",
  chapter: "",
  corenNumber: "",
  otherCouncilName: "",
  otherCouncilNumber: "",
  declarationDate: "",
  declaration: false,
};

const draftStorageKey = "nimena.portal.application.form01.v2";
const profileStorageKey = "nimena.portal.member-profile.v1";

const requiredFieldsByStep: Record<number, string[]> = {
  0: [
    "surname",
    "otherNames",
    "permanentAddress",
    "email",
    "telephone",
    "dateOfBirth",
    "sex",
    "countryOfOrigin",
    "countryOfResidence",
  ],
  1: ["category", "chapter"],
  4: ["institution-0", "qualification-0", "course-0", "award-year-0"],
  5: ["employer-0", "position-0", "projects-0", "employment-date-0"],
  6: ["declarationDate"],
};

const categoryNotes: Record<string, string> = {
  Corporate: "Professional individual membership",
  Associate: "Affiliate professional pathway",
  Graduate: "Engineering graduate pathway",
  Student: "Student pathway in a relevant discipline",
  "Corporate Firm": "Institutional or company membership",
};

export function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [professionalRows, setProfessionalRows] = useState(1);
  const [educationRows, setEducationRows] = useState(1);
  const [employmentRows, setEmploymentRows] = useState(1);
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(draftStorageKey);
      if (!stored) return;

      try {
        const draft = JSON.parse(stored) as Partial<DraftPayload>;
        setForm({ ...initialForm, ...(draft.form ?? {}) });
        setProfessionalRows(Math.max(1, draft.professionalRows ?? 1));
        setEducationRows(Math.max(1, draft.educationRows ?? 1));
        setEmploymentRows(Math.max(1, draft.employmentRows ?? 1));
      } catch {
        // Ignore an invalid local prototype draft.
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const progress = Math.round(((step + 1) / steps.length) * 100);
  const requiredComplete = (requiredFieldsByStep[step] ?? []).every((field) =>
    String(form[field] ?? "").trim(),
  );
  const canContinue = step === steps.length - 1
    ? requiredComplete && Boolean(form.declaration)
    : requiredComplete;

  function update(name: string, value: string | boolean) {
    setSaved(false);
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleFile(name: string, event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFileNames((current) => ({ ...current, [name]: selected.name }));
    setSaved(false);
  }

  function saveDraft() {
    const draft: DraftPayload = { form, professionalRows, educationRows, employmentRows };
    window.localStorage.setItem(draftStorageKey, JSON.stringify(draft));
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
    if (!canContinue) return;

    window.localStorage.setItem(profileStorageKey, JSON.stringify({
      form,
      professionalRows,
      educationRows,
      employmentRows,
      selectedDocumentNames: fileNames,
      submittedAt: new Date().toISOString(),
      formNumber: "Form No. 1",
      formRevision: "Rev. 09 — April 2021",
      applicationReference: "NIM-2026-PREVIEW",
    }));
    window.localStorage.removeItem(draftStorageKey);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="application-layout">
      <aside className="application-aside">
        <span className="application-form-code">Form No. 1 · Rev. 09</span>
        <h2>Application progress</h2>
        <p>The online sections follow NIMENA&apos;s official April 2021 membership form.</p>
        <div className="application-steps">
          {steps.map((item, index) => (
            <div className={`application-step${index === step ? " is-active" : ""}${index < step ? " is-complete" : ""}`} key={item.label}>
              <span className="application-step__number">{index < step ? <Icon name="check" /> : index + 1}</span>
              <strong>{item.label}</strong>
            </div>
          ))}
        </div>
        <div className="application-progress">
          <div className="progress-meta"><strong>{progress}% complete</strong><span>Step {step + 1} of {steps.length}</span></div>
          <div className="progress-line"><span style={{ width: `${progress}%` }} /></div>
        </div>
      </aside>

      <section className="application-main">
        <div className="official-form-heading">
          <div>
            <span>Nigerian Institution of Marine Engineers and Naval Architects</span>
            <small>A division of the Nigerian Society of Engineers</small>
          </div>
          <p><strong>Form No. 1</strong><span>Rev. 09 · April 2021</span></p>
        </div>

        <div className="application-heading">
          <span className="kicker">Application for membership</span>
          <h1>Apply to join NIMENA</h1>
          <p>The paper application has been translated into a guided online form without removing its official information requirements.</p>
        </div>

        <div className="prototype-warning"><Icon name="shield" /><span><strong>Prototype only.</strong> Use sample information. Selected documents stay on this device and are not uploaded or transmitted.</span></div>

        {submitted ? (
          <div className="form-card success-state">
            <span className="success-state__icon"><Icon name="check" /></span>
            <span className="application-form-code application-form-code--dark">Form No. 1 preview</span>
            <h2>Application profile prepared</h2>
            <p>Your sample application is now available as a structured profile. No information has been sent to NIMENA or stored on a server.</p>
            <span className="success-reference"><small>Sample reference</small><strong>NIM-2026-PREVIEW</strong></span>
            <div className="success-actions">
              <Link className="button button--primary" href="/profile">View and download profile <Icon name="download" /></Link>
              <Link className="button button--outline" href="/dashboard">Open member workspace <Icon name="arrow" /></Link>
            </div>
          </div>
        ) : (
          <div className="form-card">
            <div className="form-card__head"><span>Section {step + 1} of {steps.length}</span><h2>{steps[step].title}</h2></div>
            <div className="form-card__body">
              {step === 0 && (
                <div className="form-grid">
                  <div className="form-field form-field--full">
                    <UploadTile
                      accept=".jpg,.jpeg,.png"
                      detail="JPG or PNG · Passport-style photograph"
                      fileName={fileNames.passportPhoto}
                      label="Applicant passport photograph"
                      name="passportPhoto"
                      onChange={handleFile}
                    />
                  </div>
                  <Field form={form} label="Surname" name="surname" onChange={update} required />
                  <Field form={form} label="Other names" name="otherNames" onChange={update} required />
                  <div className="form-field form-field--full"><label htmlFor="permanentAddress">Permanent address <span>*</span></label><textarea className="form-control" id="permanentAddress" onChange={(event) => update("permanentAddress", event.target.value)} required value={String(form.permanentAddress)} /></div>
                  <Field form={form} label="Email address" name="email" onChange={update} required type="email" />
                  <Field form={form} label="Telephone number" name="telephone" onChange={update} required type="tel" />
                  <Field form={form} label="Date of birth" name="dateOfBirth" onChange={update} required type="date" />
                  <div className="form-field"><label htmlFor="sex">Sex <span>*</span></label><select className="form-control" id="sex" onChange={(event) => update("sex", event.target.value)} required value={String(form.sex)}><option value="">Select</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></div>
                  <Field form={form} label="Country of origin" name="countryOfOrigin" onChange={update} required />
                  <Field form={form} label="Country of residence" name="countryOfResidence" onChange={update} required />
                </div>
              )}

              {step === 1 && (
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
                    <small className="form-hint">The category names reproduce Form No. 1. Eligibility, evidence and fees remain subject to NIMENA approval.</small>
                  </div>
                  <div className="form-field form-field--full">
                    <label htmlFor="chapter">Chapter <span>*</span></label>
                    <select className="form-control" id="chapter" onChange={(event) => update("chapter", event.target.value)} required value={String(form.chapter)}>
                      <option value="">Select a chapter</option>
                      {chapters.map((chapter) => <option key={chapter}>{chapter}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-field form-field--full">
                  <p className="section-guidance">List each professional institution separately. Leave the first record empty if this section does not apply to you.</p>
                  {Array.from({ length: professionalRows }, (_, index) => (
                    <div className="repeat-block" key={index}>
                      <div className="repeat-block__title">
                        <strong>Professional body {index + 1}</strong>
                        {professionalRows > 1 && index === professionalRows - 1 && <button className="repeat-remove" onClick={() => setProfessionalRows((count) => Math.max(1, count - 1))} type="button">Remove</button>}
                      </div>
                      <div className="form-grid">
                        <Field form={form} label="Name of professional body" name={`body-${index}`} onChange={update} />
                        <Field form={form} label="Membership type" name={`body-type-${index}`} onChange={update} />
                        <Field form={form} label="Membership number" name={`body-number-${index}`} onChange={update} />
                        <Field form={form} label="Effective date" name={`body-date-${index}`} onChange={update} type="date" />
                        <div className="form-field form-field--full"><UploadTile accept=".pdf,.jpg,.jpeg,.png" detail="PDF, JPG or PNG · Evidence of membership" fileName={fileNames[`body-evidence-${index}`]} label="Supporting evidence" name={`body-evidence-${index}`} onChange={handleFile} /></div>
                      </div>
                    </div>
                  ))}
                  <button className="button button--small button--outline repeat-add" onClick={() => setProfessionalRows((count) => count + 1)} type="button">Add another professional body</button>
                </div>
              )}

              {step === 3 && (
                <div className="form-stack">
                  <section className="form-subsection">
                    <div className="form-subsection__heading"><span>01</span><div><h3>COREN registration</h3><p>Provide your Council for the Regulation of Engineering in Nigeria record, where applicable.</p></div></div>
                    <div className="form-grid">
                      <Field form={form} label="COREN registration number" name="corenNumber" onChange={update} />
                      <div className="form-field"><UploadTile accept=".pdf,.jpg,.jpeg,.png" detail="PDF, JPG or PNG · Registration evidence" fileName={fileNames.corenEvidence} label="COREN evidence" name="corenEvidence" onChange={handleFile} /></div>
                    </div>
                  </section>
                  <section className="form-subsection">
                    <div className="form-subsection__heading"><span>02</span><div><h3>Other engineering council</h3><p>Add another national or international engineering council registration, where applicable.</p></div></div>
                    <div className="form-grid">
                      <Field form={form} label="Name of council" name="otherCouncilName" onChange={update} />
                      <Field form={form} label="Registration number" name="otherCouncilNumber" onChange={update} />
                      <div className="form-field form-field--full"><UploadTile accept=".pdf,.jpg,.jpeg,.png" detail="PDF, JPG or PNG · Registration evidence" fileName={fileNames.otherCouncilEvidence} label="Other council evidence" name="otherCouncilEvidence" onChange={handleFile} /></div>
                    </div>
                  </section>
                </div>
              )}

              {step === 4 && (
                <div className="form-field form-field--full">
                  <p className="section-guidance">Start with your most relevant qualification and attach the corresponding certificate to each record.</p>
                  {Array.from({ length: educationRows }, (_, index) => (
                    <div className="repeat-block" key={index}>
                      <div className="repeat-block__title">
                        <strong>Academic qualification {index + 1}</strong>
                        {educationRows > 1 && index === educationRows - 1 && <button className="repeat-remove" onClick={() => setEducationRows((count) => Math.max(1, count - 1))} type="button">Remove</button>}
                      </div>
                      <div className="form-grid">
                        <Field form={form} label="Institution" name={`institution-${index}`} onChange={update} required={index === 0} />
                        <Field form={form} label="Qualification" name={`qualification-${index}`} onChange={update} required={index === 0} />
                        <Field form={form} label="Course of study" name={`course-${index}`} onChange={update} required={index === 0} />
                        <Field form={form} label="Year of award" name={`award-year-${index}`} onChange={update} required={index === 0} type="number" />
                        <div className="form-field form-field--full"><UploadTile accept=".pdf,.jpg,.jpeg,.png" detail="PDF, JPG or PNG · Academic certificate" fileName={fileNames[`certificate-${index}`]} label="Certificate" name={`certificate-${index}`} onChange={handleFile} /></div>
                      </div>
                    </div>
                  ))}
                  <button className="button button--small button--outline repeat-add" onClick={() => setEducationRows((count) => count + 1)} type="button">Add another qualification</button>
                </div>
              )}

              {step === 5 && (
                <div className="form-field form-field--full">
                  <p className="section-guidance">Record employment and the engineering projects you supervised or carried out. Start with the most recent position.</p>
                  {Array.from({ length: employmentRows }, (_, index) => (
                    <div className="repeat-block" key={index}>
                      <div className="repeat-block__title">
                        <strong>Employment record {index + 1}</strong>
                        {employmentRows > 1 && index === employmentRows - 1 && <button className="repeat-remove" onClick={() => setEmploymentRows((count) => Math.max(1, count - 1))} type="button">Remove</button>}
                      </div>
                      <div className="form-grid">
                        <Field form={form} label="Employer" name={`employer-${index}`} onChange={update} required={index === 0} />
                        <Field form={form} label="Position or rank" name={`position-${index}`} onChange={update} required={index === 0} />
                        <div className="form-field form-field--full"><label htmlFor={`projects-${index}`}>Projects supervised or carried out {index === 0 && <span>*</span>}</label><textarea className="form-control" id={`projects-${index}`} onChange={(event) => update(`projects-${index}`, event.target.value)} required={index === 0} value={String(form[`projects-${index}`] ?? "")} /></div>
                        <Field form={form} label="Dates / service period" name={`employment-date-${index}`} onChange={update} required={index === 0} placeholder="e.g. March 2021 – present" />
                      </div>
                    </div>
                  ))}
                  <button className="button button--small button--outline repeat-add" onClick={() => setEmploymentRows((count) => count + 1)} type="button">Add another employment record</button>
                </div>
              )}

              {step === 6 && (
                <div className="form-stack">
                  <section className="application-review-summary">
                    <div><span>Applicant</span><strong>{String(form.surname || "Surname")}, {String(form.otherNames || "Other names")}</strong></div>
                    <div><span>Membership type</span><strong>{String(form.category || "Not selected")}</strong></div>
                    <div><span>Chapter</span><strong>{String(form.chapter || "Not selected")}</strong></div>
                    <div><span>Records supplied</span><strong>{professionalRows} professional · {educationRows} academic · {employmentRows} employment</strong></div>
                  </section>

                  <div className="form-grid">
                    <div className="form-field"><UploadTile accept=".jpg,.jpeg,.png" detail="JPG or PNG · Applicant signature" fileName={fileNames.signature} label="Applicant signature" name="signature" onChange={handleFile} /></div>
                    <Field form={form} label="Declaration date" name="declarationDate" onChange={update} required type="date" />
                  </div>

                  <label className="declaration">
                    <input checked={Boolean(form.declaration)} onChange={(event) => update("declaration", event.target.checked)} type="checkbox" />
                    <span>I hereby declare that the information provided in this application is true and complete to the best of my knowledge. I understand that false or misleading information may affect this application or any membership granted. <strong>In production, acceptance will be recorded with the authenticated applicant, form version, date and time.</strong></span>
                  </label>

                  <section className="official-use-block" aria-label="For official use only">
                    <div className="official-use-block__head"><Icon name="shield" /><div><span>For official use only</span><h3>Membership Committee and National Chairman</h3></div></div>
                    <p>Applicants cannot edit this part of Form No. 1. After submission, authorised officers will record the date received, date reviewed, recommendation, membership number and the required committee and National Chairman approvals.</p>
                    <div className="official-use-fields"><span>Date received</span><span>Date reviewed</span><span>Recommendation</span><span>Membership number</span></div>
                  </section>
                </div>
              )}
            </div>

            <div className="form-actions">
              <span className="save-state" aria-live="polite">
                {!canContinue
                  ? step === steps.length - 1
                    ? "Complete the declaration and required date"
                    : "Complete the required fields to continue"
                  : saved
                    ? <><Icon name="check" /> Draft saved in this browser</>
                    : "Ready to continue"}
              </span>
              <div className="form-action-buttons">
                {step > 0 && <button className="button button--outline" onClick={back} type="button">Back</button>}
                <button className="button button--soft" onClick={saveDraft} type="button">Save draft</button>
                {step < steps.length - 1
                  ? <button className="button button--primary" disabled={!canContinue} onClick={next} type="button">Continue <Icon name="arrow" /></button>
                  : <button className="button button--primary" disabled={!canContinue} onClick={submitPreview} type="button">Submit preview <Icon name="arrow" /></button>}
              </div>
            </div>
          </div>
        )}

        <div className="official-form-contact">
          <span>Membership enquiries</span>
          <a href="mailto:membership@nimena.org.ng">membership@nimena.org.ng</a>
          <a href="tel:+2347081500161">+234 708 150 0161</a>
        </div>
      </section>
    </div>
  );
}

function Field({ form, label, name, onChange, placeholder, required = false, type = "text" }: {
  form: FormState;
  label: string;
  name: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label} {required && <span>*</span>}</label>
      <input className="form-control" id={name} onChange={(event) => onChange(name, event.target.value)} placeholder={placeholder} required={required} type={type} value={String(form[name] ?? "")} />
    </div>
  );
}

function UploadTile({ accept, detail, fileName, label, name, onChange }: {
  accept: string;
  detail: string;
  fileName?: string;
  label: string;
  name: string;
  onChange: (name: string, event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className={`upload-tile${fileName ? " has-file" : ""}`}>
      <Icon name={fileName ? "check" : "upload"} />
      <span><strong>{label}</strong><small>{fileName ?? detail}</small></span>
      <input accept={accept} className="sr-only" onChange={(event) => onChange(name, event)} type="file" />
    </label>
  );
}
