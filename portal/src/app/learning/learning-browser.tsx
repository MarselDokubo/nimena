"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { learningCatalogue } from "@/lib/institutional-data";

export function LearningBrowser() {
  const [format, setFormat] = useState("All formats");
  const [query, setQuery] = useState("");
  const [enrolled, setEnrolled] = useState<string[]>([]);

  const courses = useMemo(() => learningCatalogue.filter((course) => {
    const matchesFormat = format === "All formats" || course.format === format;
    const matchesQuery = course.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchesFormat && matchesQuery;
  }), [format, query]);

  return (
    <section className="panel">
      <div className="panel__head"><div><h2>Learning catalogue</h2><p>Search live, hybrid and on-demand professional development.</p></div></div>
      <div className="filter-bar">
        <label className="search-box"><Icon name="search" /><span className="sr-only">Search courses</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search courses and webinars" type="search" value={query} /></label>
        <select aria-label="Filter learning format" className="filter-select" onChange={(event) => setFormat(event.target.value)} value={format}>
          <option>All formats</option>
          <option>Live webinar</option>
          <option>On-demand course</option>
          <option>Hybrid workshop</option>
        </select>
      </div>
      <div className="learning-list">
        {courses.map((course) => {
          const isEnrolled = enrolled.includes(course.id);
          return (
            <article key={course.id}>
              <span className="learning-list__hours"><strong>{course.hours}</strong><small>CPD hours</small></span>
              <div>
                <small>{course.id} · {course.format} · {course.level}</small>
                <h3>{course.title}</h3>
                <p>{course.date} · {course.access}</p>
              </div>
              <button
                className={`button button--small ${isEnrolled ? "button--soft" : "button--outline"}`}
                onClick={() => setEnrolled((current) => isEnrolled ? current.filter((id) => id !== course.id) : [...current, course.id])}
                type="button"
              >
                {isEnrolled ? <><Icon name="check" /> Enrolled</> : <>View & enrol <Icon name="arrow" /></>}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
