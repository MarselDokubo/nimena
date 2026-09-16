import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { PortalFrame } from "@/components/portal-frame";
import { applicationDetail, demoApplications } from "@/lib/demo-data";
import { ReviewActions } from "@/app/secretariat/applications/[id]/review-actions";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Review ${id}` };
}

export default async function ApplicationReviewPage({ params }: PageProps) {
  const { id } = await params;
  const summary = demoApplications.find((application) => application.id === id);
  if (!summary) notFound();

  return (
    <PortalFrame eyebrow="Secretariat workspace" role="secretariat" title="Application review">
      <div className="page-stack">
        <header className="detail-header">
          <div>
            <Link className="back-link" href="/secretariat#applications"><Icon name="arrow" /> Back to review queue</Link>
            <h2>{summary.name}</h2>
            <p>{summary.id} · {summary.category} · {summary.chapter} · Submitted {applicationDetail.submitted}</p>
          </div>
          <div className="detail-header__actions">
            <span className="status-chip status-chip--warning">{summary.status}</span>
            <button className="button button--small button--outline" type="button"><Icon name="download" /> Application PDF</button>
          </div>
        </header>

        <div className="notice-strip"><Icon name="shield" /><p><strong>Sample record:</strong> All names, credentials and documents on this screen are fictional demonstration data.</p></div>

        <div className="detail-grid">
          <section className="panel">
            <div className="detail-section">
              <h3>Personal details</h3>
              <dl className="definition-grid">
                {applicationDetail.personal.map(([label, value], index) => (
                  <div className="definition-item" key={label}><dt>{label}</dt><dd>{index === 0 ? summary.name : value}</dd></div>
                ))}
              </dl>
            </div>

            <div className="detail-section">
              <h3>Professional registration</h3>
              <dl className="definition-grid">
                {applicationDetail.registration.map(([label, value]) => (
                  <div className="definition-item" key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </div>

            <div className="detail-section">
              <h3>Academic qualifications</h3>
              <div className="record-list">
                {applicationDetail.education.map((record) => (
                  <article className="record" key={`${record.institution}-${record.year}`}>
                    <div className="record__title"><strong>{record.qualification} · {record.course}</strong><span>{record.year}</span></div>
                    <p>{record.institution}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Employment history</h3>
              <div className="record-list">
                {applicationDetail.employment.map((record) => (
                  <article className="record" key={`${record.employer}-${record.dates}`}>
                    <div className="record__title"><strong>{record.position}</strong><span>{record.dates}</span></div>
                    <p><strong>{record.employer}</strong><br />{record.projects}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Supporting documents</h3>
              <div className="document-list">
                {applicationDetail.documents.map((document) => (
                  <div className="document-item" key={document.name}>
                    <span className="document-icon"><Icon name="file" /></span>
                    <span className="document-item__copy"><strong>{document.name}</strong><span>{document.type} · Sample file</span></span>
                    <span className={`document-state ${document.state === "Verified" ? "document-state--verified" : "document-state--review"}`}>{document.state}</span>
                    <button className="icon-button" type="button" aria-label={`Preview ${document.name}`}><Icon name="eye" /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Applicant declaration</h3>
              <p style={{ margin: 0, color: "var(--ink-700)", fontSize: ".78rem" }}>The applicant confirmed that the supplied information is complete and accurate. Production submissions will record the declaration version, timestamp, authenticated user and audit event.</p>
            </div>
          </section>

          <ReviewActions />
        </div>
      </div>
    </PortalFrame>
  );
}
