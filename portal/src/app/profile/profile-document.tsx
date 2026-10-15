"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { PortalFrame } from "@/components/portal-frame";

type FormState = Record<string, string | boolean>;

type ProfilePayload = {
  form: FormState;
  professionalRows: number;
  educationRows: number;
  employmentRows: number;
  selectedDocumentNames?: Record<string, string>;
  submittedAt?: string;
  formNumber?: string;
  formRevision?: string;
  applicationReference?: string;
  membershipNumber?: string;
  membershipStatus?: string;
};

const profileStorageKey = "nimena.portal.member-profile.v1";

const sampleProfile: ProfilePayload = {
  form: {
    surname: "Yusuf",
    otherNames: "Amina",
    permanentAddress: "Sample address, Lagos, Nigeria",
    email: "amina.yusuf@example.com",
    telephone: "+234 800 000 0742",
    dateOfBirth: "1994-06-18",
    sex: "Female",
    countryOfOrigin: "Nigeria",
    countryOfResidence: "Nigeria",
    category: "Graduate",
    chapter: "Lagos Chapter",
    "body-0": "Nigerian Society of Engineers",
    "body-type-0": "Graduate Member",
    "body-number-0": "SAMPLE-0742",
    "body-date-0": "2024-04-02",
    corenNumber: "Pending",
    otherCouncilName: "",
    otherCouncilNumber: "",
    "institution-0": "Rivers State University",
    "qualification-0": "B.Tech",
    "course-0": "Marine Engineering",
    "award-year-0": "2022",
    "institution-1": "Sample Maritime Academy",
    "qualification-1": "Certificate",
    "course-1": "Marine Safety Management",
    "award-year-1": "2025",
    "employer-0": "Sample Marine Services Ltd",
    "position-0": "Graduate Marine Engineer",
    "projects-0": "Vessel maintenance planning and machinery-condition reporting",
    "employment-date-0": "January 2024 – present",
    declarationDate: "2026-09-12",
    declaration: true,
  },
  professionalRows: 1,
  educationRows: 2,
  employmentRows: 1,
  formNumber: "Form No. 1",
  formRevision: "Rev. 09 — April 2021",
  applicationReference: "NIM-2026-0142",
  membershipNumber: "NIMENA/GM/0742",
  membershipStatus: "Active",
  submittedAt: "2026-09-12T10:42:00.000Z",
};

export function ProfileDocument() {
  const [profile, setProfile] = useState<ProfilePayload>(sampleProfile);
  const [loadedFromApplication, setLoadedFromApplication] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(profileStorageKey);
      if (!stored) return;

      try {
        setProfile(JSON.parse(stored) as ProfilePayload);
        setLoadedFromApplication(true);
      } catch {
        // Keep the fictional member record if a local prototype record is invalid.
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const { form } = profile;
  const fullName = [text(form.otherNames), text(form.surname)].filter(Boolean).join(" ") || "NIMENA Member";
  const initials = [text(form.otherNames), text(form.surname)]
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase() || "NM";

  const professionalBodies = Array.from({ length: profile.professionalRows }, (_, index) => ({
    body: text(form[`body-${index}`]),
    type: text(form[`body-type-${index}`]),
    number: text(form[`body-number-${index}`]),
    date: formatDate(text(form[`body-date-${index}`])),
  })).filter((row) => row.body || row.type || row.number);

  const qualifications = Array.from({ length: profile.educationRows }, (_, index) => ({
    institution: text(form[`institution-${index}`]),
    qualification: text(form[`qualification-${index}`]),
    course: text(form[`course-${index}`]),
    year: text(form[`award-year-${index}`]),
  })).filter((row) => row.institution || row.qualification);

  const employment = Array.from({ length: profile.employmentRows }, (_, index) => ({
    employer: text(form[`employer-${index}`]),
    position: text(form[`position-${index}`]),
    projects: text(form[`projects-${index}`]),
    dates: text(form[`employment-date-${index}`]),
  })).filter((row) => row.employer || row.position);

  function downloadDataCopy() {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "nimena-member"}-profile.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <PortalFrame eyebrow="Member workspace" title="Professional profile">
      <div className="page-stack profile-page">
        <div className="profile-page__toolbar">
          <div>
            <span className="kicker">Member record</span>
            <h2>{loadedFromApplication ? "Application profile preview" : "Your NIMENA professional profile"}</h2>
            <p>Review the record below, then save the formatted profile as a PDF or download a portable data copy.</p>
          </div>
          <div className="profile-page__actions">
            <button className="button button--primary" onClick={() => window.print()} type="button"><Icon name="download" /> Save profile as PDF</button>
            <button className="button button--outline" onClick={downloadDataCopy} type="button"><Icon name="file" /> Download data copy</button>
            <Link className="button button--soft" href="/apply">Edit application</Link>
          </div>
        </div>

        <div className="profile-save-note"><Icon name="file" /><span><strong>PDF download:</strong> choose “Save as PDF” when your browser&apos;s print window opens. The print layout removes the portal navigation and controls.</span></div>

        <article className="profile-print-sheet">
          <header className="profile-document__header">
            <div className="profile-document__logos">
              <Image alt="NIMENA emblem" height={72} src="/brand/nimena-logo.webp" width={72} />
              <span />
              <Image alt="Nigerian Society of Engineers emblem" height={62} src="/brand/nse-logo.svg" width={62} />
            </div>
            <div>
              <span>Nigerian Institution of Marine Engineers and Naval Architects</span>
              <small>A division of the Nigerian Society of Engineers</small>
              <h1>Member / applicant professional profile</h1>
            </div>
            <p><strong>{profile.formNumber ?? "Form No. 1"}</strong><span>{profile.formRevision ?? "Rev. 09 — April 2021"}</span></p>
          </header>

          <section className="profile-document__identity">
            <span className="profile-document__portrait">{initials}</span>
            <div>
              <span>{profile.membershipStatus ?? (loadedFromApplication ? "Application preview" : "Active")}</span>
              <h2>{fullName}</h2>
              <p>{text(form.category) || "Membership category pending"} · {text(form.chapter) || "Chapter pending"}</p>
            </div>
            <dl>
              <div><dt>Member number</dt><dd>{profile.membershipNumber ?? "Pending approval"}</dd></div>
              <div><dt>Application reference</dt><dd>{profile.applicationReference ?? "NIM-2026-PREVIEW"}</dd></div>
            </dl>
          </section>

          <ProfileSection title="Personal details">
            <div className="profile-definition-grid">
              <ProfileField label="Surname" value={text(form.surname)} />
              <ProfileField label="Other names" value={text(form.otherNames)} />
              <ProfileField label="Email address" value={text(form.email)} />
              <ProfileField label="Telephone" value={text(form.telephone)} />
              <ProfileField label="Date of birth" value={formatDate(text(form.dateOfBirth))} />
              <ProfileField label="Sex" value={text(form.sex)} />
              <ProfileField label="Country of origin" value={text(form.countryOfOrigin)} />
              <ProfileField label="Country of residence" value={text(form.countryOfResidence)} />
              <ProfileField full label="Permanent address" value={text(form.permanentAddress)} />
            </div>
          </ProfileSection>

          <ProfileSection title="Professional membership and registration">
            <div className="profile-definition-grid profile-definition-grid--registrations">
              <ProfileField label="COREN registration number" value={text(form.corenNumber)} />
              <ProfileField label="Other engineering council" value={text(form.otherCouncilName)} />
              <ProfileField label="Other council registration number" value={text(form.otherCouncilNumber)} />
            </div>
            {professionalBodies.length ? (
              <div className="profile-record-table">
                <div className="profile-record-table__head"><span>Professional body</span><span>Membership type</span><span>Number</span><span>Effective date</span></div>
                {professionalBodies.map((record, index) => <div key={`${record.body}-${index}`}><span>{record.body || "—"}</span><span>{record.type || "—"}</span><span>{record.number || "—"}</span><span>{record.date || "—"}</span></div>)}
              </div>
            ) : <p className="profile-empty">No other professional-body membership was supplied.</p>}
          </ProfileSection>

          <ProfileSection title="Academic qualifications">
            <div className="profile-record-table">
              <div className="profile-record-table__head"><span>Institution</span><span>Qualification</span><span>Course of study</span><span>Year</span></div>
              {qualifications.map((record, index) => <div key={`${record.institution}-${index}`}><span>{record.institution || "—"}</span><span>{record.qualification || "—"}</span><span>{record.course || "—"}</span><span>{record.year || "—"}</span></div>)}
            </div>
          </ProfileSection>

          <ProfileSection title="Employment and project history">
            <div className="profile-employment-list">
              {employment.map((record, index) => (
                <article key={`${record.employer}-${index}`}>
                  <div><span>{record.dates || "Service period not supplied"}</span><h3>{record.position || "Position not supplied"}</h3><p>{record.employer || "Employer not supplied"}</p></div>
                  <p><strong>Projects supervised or carried out</strong>{record.projects || "Not supplied"}</p>
                </article>
              ))}
            </div>
          </ProfileSection>

          <footer className="profile-document__footer">
            <div><span>Declaration date</span><strong>{formatDate(text(form.declarationDate)) || "Not supplied"}</strong></div>
            <div><span>Profile generated</span><strong>{new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(new Date())}</strong></div>
            <p>This prototype profile is generated from fictional or browser-local review data. A production profile must be generated from the authenticated NIMENA member record and include verification controls.</p>
          </footer>
        </article>
      </div>
    </PortalFrame>
  );
}

function ProfileSection({ children, title }: { children: React.ReactNode; title: string }) {
  return <section className="profile-document__section"><h2>{title}</h2>{children}</section>;
}

function ProfileField({ full = false, label, value }: { full?: boolean; label: string; value: string }) {
  return <div className={full ? "is-full" : undefined}><span>{label}</span><strong>{value || "Not supplied"}</strong></div>;
}

function text(value: string | boolean | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
