import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationQueue } from "@/app/secretariat/application-queue";
import { Icon } from "@/components/icon";
import { PortalFrame } from "@/components/portal-frame";

export const metadata: Metadata = { title: "Secretariat dashboard" };

const metrics = [
  { label: "New applications", value: "18", note: "+5 received this week", icon: "file" as const },
  { label: "In review", value: "12", note: "4 assigned to you", icon: "eye" as const },
  { label: "Corrections", value: "7", note: "Waiting for applicants", icon: "clock" as const },
  { label: "Ready for council", value: "5", note: "Next cycle: 29 September", icon: "shield" as const },
];

export default function SecretariatDashboard() {
  return (
    <PortalFrame eyebrow="Secretariat workspace" role="secretariat" title="Membership operations">
      <div className="page-stack">
        <div className="welcome-row">
          <div>
            <h2>Membership operations at a glance.</h2>
            <p>Review applications, resolve exceptions and prepare the next approval cycle.</p>
          </div>
          <Link className="button button--secondary" href="#applications"><Icon name="file" /> Review queue</Link>
        </div>

        <section className="metrics-grid" aria-label="Application summary">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <div className="metric-card__top"><span>{metric.label}</span><span className="metric-card__icon"><Icon name={metric.icon} /></span></div>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </article>
          ))}
        </section>

        <div className="dashboard-grid">
          <ApplicationQueue />

          <div className="dashboard-column">
            <section className="panel">
              <div className="panel__head"><div><h2>Next approval cycle</h2><p>Membership Committee and National Chairman review</p></div></div>
              <div className="panel__body">
                <div className="stat-split">
                  <div className="mini-stat"><strong>29 Sep</strong><span>Review date</span></div>
                  <div className="mini-stat"><strong>5</strong><span>Applications ready</span></div>
                </div>
                <div style={{ marginTop: 16 }} className="progress-meta"><strong>Agenda readiness</strong><span>72%</span></div>
                <div className="progress-line"><span style={{ width: "72%" }} /></div>
              </div>
            </section>

            <section className="panel">
              <div className="panel__head"><div><h2>Review workload</h2><p>Current assignments</p></div></div>
              <div className="panel__body">
                <div className="progress-meta"><strong>Assigned to you</strong><span>4 of 12</span></div>
                <div className="progress-line"><span style={{ width: "33%" }} /></div>
                <div style={{ marginTop: 18 }} className="progress-meta"><strong>Older than 7 days</strong><span>2 applications</span></div>
                <div className="progress-line"><span style={{ width: "16%", background: "var(--orange-500)" }} /></div>
              </div>
            </section>

            <section className="panel">
              <div className="panel__head"><div><h2>Recent activity</h2><p>Actions across the membership team</p></div></div>
              <div className="panel__body activity-list">
                <div className="activity-item"><span className="activity-item__dot" /><div><p><strong>Ada Nwosu</strong> requested academic evidence from NIM-2026-0141.</p><time>34 minutes ago</time></div></div>
                <div className="activity-item"><span className="activity-item__dot" /><div><p><strong>Committee Chair</strong> recommended two applications for council.</p><time>2 hours ago</time></div></div>
                <div className="activity-item"><span className="activity-item__dot" /><div><p><strong>Finance Desk</strong> verified three application payments.</p><time>Yesterday</time></div></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PortalFrame>
  );
}
