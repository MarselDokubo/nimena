"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { technicalResources } from "@/lib/institutional-data";

export function ResourceLibrary() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All resources");

  const resources = useMemo(() => technicalResources.filter((resource) => {
    const matchesType = type === "All resources" || resource.type === type;
    const haystack = `${resource.title} ${resource.topic} ${resource.id}`.toLowerCase();
    return matchesType && haystack.includes(query.trim().toLowerCase());
  }), [query, type]);

  return (
    <section className="panel">
      <div className="panel__head"><div><h2>Technical resource catalogue</h2><p>Reports, standards, policy papers and conference proceedings.</p></div></div>
      <div className="filter-bar">
        <label className="search-box"><Icon name="search" /><span className="sr-only">Search resources</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search title, topic or document number" type="search" value={query} /></label>
        <select aria-label="Filter resource type" className="filter-select" onChange={(event) => setType(event.target.value)} value={type}>
          <option>All resources</option>
          <option>Technical report</option>
          <option>Standard &amp; guidance</option>
          <option>Conference proceedings</option>
          <option>Policy paper</option>
        </select>
      </div>
      <div className="resource-catalogue">
        {resources.map((resource) => (
          <article key={resource.id}>
            <span className="resource-catalogue__icon"><Icon name="file" /></span>
            <div>
              <small>{resource.id} · {resource.type}</small>
              <h3>{resource.title}</h3>
              <p>{resource.topic} · {resource.year} · {resource.access}</p>
            </div>
            <button className="button button--small button--outline" type="button"><Icon name="eye" /> View record</button>
          </article>
        ))}
        {resources.length === 0 && <p className="table-empty">No resource matches the current search.</p>}
      </div>
    </section>
  );
}
