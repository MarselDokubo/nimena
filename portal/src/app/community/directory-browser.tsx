"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { chapterDirectory, professionalCommunities } from "@/lib/institutional-data";

export function DirectoryBrowser() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"chapters" | "communities">("chapters");

  const records = useMemo(() => {
    const source = view === "chapters" ? chapterDirectory : professionalCommunities;
    const normalized = query.trim().toLowerCase();
    return source.filter((record) => JSON.stringify(record).toLowerCase().includes(normalized));
  }, [query, view]);

  return (
    <section className="panel">
      <div className="panel__head">
        <div><h2>Professional network directory</h2><p>Locate chapters, student groups, committees and professional communities.</p></div>
      </div>
      <div className="directory-toolbar">
        <div className="segmented-control" aria-label="Directory type">
          <button className={view === "chapters" ? "is-active" : ""} onClick={() => setView("chapters")} type="button">Chapters</button>
          <button className={view === "communities" ? "is-active" : ""} onClick={() => setView("communities")} type="button">Communities</button>
        </div>
        <label className="search-box">
          <Icon name="search" />
          <span className="sr-only">Search directory</span>
          <input onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, region or focus" type="search" value={query} />
        </label>
      </div>

      <div className="directory-grid">
        {records.map((record) => "region" in record ? (
          <article className="directory-card" key={record.name}>
            <span className="directory-card__type">{record.region}</span>
            <h3>{record.name}</h3>
            <dl><div><dt>Chair</dt><dd>{record.chair}</dd></div><div><dt>Members</dt><dd>{record.members}</dd></div></dl>
            <p>{record.nextEvent}</p>
            <button className="button button--small button--outline" type="button">View chapter <Icon name="arrow" /></button>
          </article>
        ) : (
          <article className="directory-card" key={record.name}>
            <span className="directory-card__type">{record.type}</span>
            <h3>{record.name}</h3>
            <strong>{record.members} participating members</strong>
            <p>{record.purpose}</p>
            <button className="button button--small button--outline" type="button">Explore community <Icon name="arrow" /></button>
          </article>
        ))}
      </div>
    </section>
  );
}
