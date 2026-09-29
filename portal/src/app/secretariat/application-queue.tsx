"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { demoApplications, membershipCategories, type ApplicationStatus } from "@/lib/demo-data";

const statusClass: Record<ApplicationStatus, string> = {
  New: "status-chip--info",
  "Under review": "status-chip--warning",
  "Corrections requested": "status-chip--warning",
  "Committee review": "status-chip--info",
  "Council consideration": "status-chip--neutral",
};

export function ApplicationQueue() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const normalizedQuery = query.trim().toLowerCase();
  const applications = demoApplications.filter((application) => {
    const matchesQuery = !normalizedQuery || `${application.name} ${application.id}`.toLowerCase().includes(normalizedQuery);
    const matchesStatus = status === "all" || application.status === status;
    const matchesCategory = category === "all" || application.category === category;
    return matchesQuery && matchesStatus && matchesCategory;
  });

  function exportCsv() {
    const rows = [
      ["Reference", "Applicant", "Category", "Chapter", "Status", "Received", "Completeness"],
      ...applications.map((application) => [
        application.id,
        application.name,
        application.category,
        application.chapter,
        application.status,
        application.received,
        `${application.completeness}%`,
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "nimena-sample-application-queue.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="panel" id="applications">
      <div className="panel__head">
        <div><h2>Application review queue</h2><p>Sample applications ordered by review priority</p></div>
        <button className="panel__action" onClick={exportCsv} type="button">Export list</button>
      </div>
      <div className="filter-bar">
        <label className="search-box">
          <Icon name="search" />
          <span className="sr-only">Search applications</span>
          <input onChange={(event) => setQuery(event.target.value)} placeholder="Search name or reference" type="search" value={query} />
        </label>
        <select aria-label="Filter by status" className="filter-select" onChange={(event) => setStatus(event.target.value)} value={status}>
          <option value="all">All statuses</option>
          {Object.keys(statusClass).map((option) => <option key={option}>{option}</option>)}
        </select>
        <select aria-label="Filter by category" className="filter-select" onChange={(event) => setCategory(event.target.value)} value={category}>
          <option value="all">All categories</option>
          {membershipCategories.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Applicant</th><th>Category</th><th>Status</th><th>Received</th><th>Complete</th><th><span className="sr-only">Actions</span></th></tr></thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>
                  <div className="applicant-cell">
                    <span className="avatar">{application.initials}</span>
                    <div><strong>{application.name}</strong><small>{application.id} · {application.chapter}</small></div>
                  </div>
                </td>
                <td>{application.category}</td>
                <td><span className={`status-chip ${statusClass[application.status]}`}>{application.status}</span></td>
                <td>{application.received}<br /><small style={{ color: "var(--ink-500)" }}>{application.age}</small></td>
                <td>{application.completeness}%</td>
                <td><Link className="table-action" href={`/secretariat/applications/${application.id}`}><span>Review</span><Icon name="arrow" /></Link></td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr><td className="table-empty" colSpan={6}>No sample applications match these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
