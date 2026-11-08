"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { careerOpportunities } from "@/lib/institutional-data";

export function CareerCentre() {
  const [type, setType] = useState("All opportunities");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [mentorRequested, setMentorRequested] = useState(false);

  const opportunities = useMemo(() => careerOpportunities.filter((opportunity) => {
    const matchesType = type === "All opportunities" || opportunity.type === type;
    return matchesType && `${opportunity.title} ${opportunity.organisation} ${opportunity.location}`.toLowerCase().includes(query.trim().toLowerCase());
  }), [query, type]);

  return (
    <div className="institutional-two-column institutional-two-column--wide">
      <section className="panel">
        <div className="panel__head"><div><h2>Maritime opportunities</h2><p>Jobs, internships, fellowships and volunteer positions.</p></div></div>
        <div className="filter-bar">
          <label className="search-box"><Icon name="search" /><span className="sr-only">Search opportunities</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search roles, organisations or locations" type="search" value={query} /></label>
          <select className="filter-select" onChange={(event) => setType(event.target.value)} value={type}>
            <option>All opportunities</option><option>Full-time</option><option>Internship</option><option>Fellowship</option>
          </select>
        </div>
        <div className="career-list">
          {opportunities.map((opportunity) => {
            const isSaved = saved.includes(opportunity.title);
            return (
              <article key={opportunity.title}>
                <div><small>{opportunity.type} · {opportunity.location}</small><h3>{opportunity.title}</h3><p>{opportunity.organisation} · Closes {opportunity.closes}</p></div>
                <button className={`button button--small ${isSaved ? "button--soft" : "button--outline"}`} onClick={() => setSaved((current) => isSaved ? current.filter((item) => item !== opportunity.title) : [...current, opportunity.title])} type="button">{isSaved ? <><Icon name="check" /> Saved</> : "Save role"}</button>
              </article>
            );
          })}
        </div>
      </section>

      <div className="dashboard-column">
        <section className="panel">
          <div className="panel__head"><div><h2>Mentoring</h2><p>Structured member-to-member development</p></div></div>
          <div className="panel__body mentor-card">
            <span><Icon name="users" /></span>
            <h3>{mentorRequested ? "Mentor request recorded" : "Find a professional mentor"}</h3>
            <p>{mentorRequested ? "The Secretariat will match your discipline, career stage and development goals." : "Choose a discipline, career objective and preferred meeting format. NIMENA will propose an appropriate volunteer mentor."}</p>
            <button className="button button--primary" onClick={() => setMentorRequested(true)} type="button" disabled={mentorRequested}>{mentorRequested ? <><Icon name="check" /> Request submitted</> : "Request a mentor"}</button>
          </div>
        </section>
        <section className="panel">
          <div className="panel__head"><div><h2>My career profile</h2><p>Visibility is controlled by you</p></div></div>
          <div className="panel__body">
            <div className="progress-meta"><strong>Profile readiness</strong><span>72%</span></div>
            <div className="progress-line"><span style={{ width: "72%" }} /></div>
            <ul className="compact-checklist"><li><Icon name="check" /> Qualifications verified</li><li><Icon name="check" /> Professional interests added</li><li><Icon name="clock" /> CV and availability required</li></ul>
          </div>
        </section>
      </div>
    </div>
  );
}
