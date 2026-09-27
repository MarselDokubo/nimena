import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { PortalFrame } from "@/components/portal-frame";

export const metadata: Metadata = { title: "Member dashboard" };

const metrics = [
  { label: "Membership", value: "Active", note: "Graduate Member", icon: "card" as const },
  { label: "Renewal", value: "31 Mar 2027", note: "198 days remaining", icon: "calendar" as const },
  { label: "CPD record", value: "18 / 30", note: "12 hours to annual target", icon: "book" as const },
  { label: "Documents", value: "4 verified", note: "1 item needs attention", icon: "file" as const },
];

export default function MemberDashboard() {
  return (
    <PortalFrame eyebrow="Member workspace" title="Overview">
      <div className="page-stack">
        <div className="welcome-row">
          <div>
            <h2>Welcome back, Amina.</h2>
            <p>Your membership is active. One document needs your attention.</p>
          </div>
          <span className="status-chip status-chip--success">Membership active</span>
        </div>

        <div className="notice-strip">
          <Icon name="upload" />
          <p><strong>Action required:</strong> Upload your current COREN evidence to keep your professional record complete.</p>
          <Link className="button button--small button--outline" href="#documents">Upload</Link>
        </div>

        <section className="metrics-grid" aria-label="Membership summary">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <div className="metric-card__top">
                <span>{metric.label}</span>
                <span className="metric-card__icon"><Icon name={metric.icon} /></span>
              </div>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </article>
          ))}
        </section>

        <div className="dashboard-grid">
          <div className="dashboard-column">
            <section className="panel" id="membership">
              <div className="panel__head">
                <div><h2>Membership record</h2><p>Your current professional standing with NIMENA</p></div>
                <Link href="#membership">View profile</Link>
              </div>
              <div className="panel__body">
                <div className="member-card">
                  <div className="member-card__brand">
                    <Image alt="NIMENA emblem" height={56} src="/brand/nimena-logo.webp" width={56} />
                    <span>Nigerian Institution of Marine Engineers and Naval Architects</span>
                  </div>
                  <div className="member-card__name">
                    <strong>Amina Yusuf</strong>
                    <span>Graduate Member · Lagos Chapter</span>
                  </div>
                  <div className="member-card__meta">
                    <div><small>Member number</small><span>NIMENA/GM/0742</span></div>
                    <div><small>Member since</small><span>2024</span></div>
                    <div><small>Valid through</small><span>31 Mar 2027</span></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="panel">
              <div className="panel__head">
                <div><h2>Quick actions</h2><p>Common member services</p></div>
              </div>
              <div className="panel__body quick-actions">
                <Link className="quick-action" href="#payments"><Icon name="wallet" /><span>Pay or renew</span></Link>
                <Link className="quick-action" href="#documents"><Icon name="upload" /><span>Upload document</span></Link>
                <Link className="quick-action" href="#development"><Icon name="calendar" /><span>Find an event</span></Link>
                <Link className="quick-action" href="#development"><Icon name="book" /><span>Record CPD</span></Link>
                <Link className="quick-action" href="#membership"><Icon name="card" /><span>Download ID card</span></Link>
                <Link className="quick-action" href="/programmes"><Icon name="shield" /><span>Institutional programmes</span></Link>
              </div>
            </section>

            <section className="panel" id="development">
              <div className="panel__head">
                <div><h2>Upcoming professional activities</h2><p>Events relevant to your chapter and grade</p></div>
                <Link href="#development">View calendar</Link>
              </div>
              <div className="panel__body event-list">
                <div className="event-item">
                  <span className="event-date"><strong>24</strong><small>Sep</small></span>
                  <span className="event-item__copy"><strong>Technical standards roundtable</strong><span>Online · 2 CPD hours · Registration open</span></span>
                  <Link className="button button--small button--outline" href="#development">Register</Link>
                </div>
                <div className="event-item">
                  <span className="event-date"><strong>08</strong><small>Oct</small></span>
                  <span className="event-item__copy"><strong>Eastern Chapter professional forum</strong><span>Port Harcourt · Chapter event</span></span>
                  <Link className="button button--small button--outline" href="#development">Details</Link>
                </div>
              </div>
            </section>
          </div>

          <div className="dashboard-column">
            <section className="panel">
              <div className="panel__head"><div><h2>Profile completion</h2><p>Keep your professional record current</p></div></div>
              <div className="panel__body">
                <div className="progress-meta"><strong>86% complete</strong><span>1 item remaining</span></div>
                <div className="progress-line"><span style={{ width: "86%" }} /></div>
              </div>
            </section>

            <section className="panel">
              <div className="panel__head"><div><h2>Membership timeline</h2><p>Recent and upcoming milestones</p></div></div>
              <div className="panel__body timeline">
                <div className="timeline-item">
                  <span className="timeline-item__dot"><Icon name="check" /></span>
                  <div><strong>Membership renewed</strong><p>Payment verified and receipt issued</p></div>
                  <time>31 Mar</time>
                </div>
                <div className="timeline-item">
                  <span className="timeline-item__dot"><Icon name="check" /></span>
                  <div><strong>CPD record updated</strong><p>Six hours added from workshop</p></div>
                  <time>18 Aug</time>
                </div>
                <div className="timeline-item">
                  <span className="timeline-item__dot timeline-item__dot--next"><Icon name="clock" /></span>
                  <div><strong>Next renewal window</strong><p>Renewal notice will appear here</p></div>
                  <time>Mar 2027</time>
                </div>
              </div>
            </section>

            <section className="panel" id="documents">
              <div className="panel__head"><div><h2>Documents</h2><p>Your verified professional evidence</p></div><Link href="#documents">Manage</Link></div>
              <div className="panel__body document-list">
                <div className="document-item"><span className="document-icon"><Icon name="file" /></span><span className="document-item__copy"><strong>Membership certificate</strong><span>Issued 2 Apr 2026 · PDF</span></span><Icon name="download" /></div>
                <div className="document-item"><span className="document-icon"><Icon name="file" /></span><span className="document-item__copy"><strong>Renewal receipt</strong><span>2026 / 2027 · PDF</span></span><Icon name="download" /></div>
                <div className="document-item"><span className="document-icon"><Icon name="upload" /></span><span className="document-item__copy"><strong>COREN evidence</strong><span>Update requested</span></span><Icon name="arrow" /></div>
              </div>
            </section>

            <section className="panel" id="payments">
              <div className="panel__head"><div><h2>Payment standing</h2><p>No outstanding balance</p></div><span className="status-chip status-chip--success">Paid</span></div>
              <div className="panel__body"><div className="progress-meta"><strong>2026 / 2027 dues</strong><span>Receipt NIM-R-00684</span></div></div>
            </section>
          </div>
        </div>
      </div>
    </PortalFrame>
  );
}
