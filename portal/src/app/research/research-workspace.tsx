"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import { demoPublications, demoResearchSubmissions } from "@/lib/demo-data";

const storageKey = "nimena.portal.research-profile.v1";

type ResearchProfile = {
  orcid: string;
  affiliation: string;
  position: string;
  interests: string;
  biography: string;
  reviewerAvailable: boolean;
};

const defaultProfile: ResearchProfile = {
  orcid: "0000-0000-0000-0000",
  affiliation: "Sample Maritime Research Institute",
  position: "Marine Engineering Researcher",
  interests: "Marine machinery; vessel energy efficiency; condition monitoring",
  biography: "Sample biography for prototype review only.",
  reviewerAvailable: true,
};

export function ResearchWorkspace() {
  const [profile, setProfile] = useState<ResearchProfile>(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const localProfile = window.localStorage.getItem(storageKey);
        if (localProfile) setProfile(JSON.parse(localProfile) as ResearchProfile);
      } catch {
        setProfile(defaultProfile);
      }
    }, 0);

    return () => window.clearTimeout(restore);
  }, []);

  function update<K extends keyof ResearchProfile>(key: K, value: ResearchProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem(storageKey, JSON.stringify(profile));
    setSaved(true);
  }

  return (
    <div className="page-stack">
      <div className="welcome-row">
        <div>
          <h2>Your research identity, connected.</h2>
          <p>Maintain one member research profile while OJS remains the system for manuscripts and peer review.</p>
        </div>
        <span className="status-chip status-chip--info">OJS connection planned</span>
      </div>

      <div className="notice-strip">
        <Icon name="shield" />
        <p><strong>Prototype boundary:</strong> the records below are fictional and are not being read from nimenajournals.com.</p>
        <a className="button button--small button--outline" href="https://nimenajournals.com" rel="noreferrer" target="_blank">Open OJS</a>
      </div>

      <section className="research-metrics" aria-label="Research activity summary">
        <article><span>ORCID</span><strong>{profile.orcid || "Not supplied"}</strong><small>Identity identifier</small></article>
        <article><span>Publications</span><strong>{demoPublications.length}</strong><small>Sample linked outputs</small></article>
        <article><span>Reviews</span><strong>03</strong><small>Sample completed reviews</small></article>
        <article><span>Reviewer CPD</span><strong>06 hrs</strong><small>Pending policy approval</small></article>
      </section>

      <div className="research-layout">
        <div className="dashboard-column">
          <section className="panel">
            <div className="panel__head">
              <div><h2>Research identity</h2><p>Information NIMENA may use to verify benefits and recommend opportunities</p></div>
            </div>
            <form onSubmit={saveProfile}>
              <div className="panel__body research-profile-form">
                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="research-orcid">ORCID iD</label>
                    <input className="form-control" id="research-orcid" onChange={(event) => update("orcid", event.target.value)} pattern="[0-9Xx-]{19}" placeholder="0000-0000-0000-0000" value={profile.orcid} />
                    <span className="form-hint">Production will use ORCID OAuth rather than trusting typed identifiers.</span>
                  </div>
                  <div className="form-field">
                    <label htmlFor="research-position">Position or role</label>
                    <input className="form-control" id="research-position" onChange={(event) => update("position", event.target.value)} value={profile.position} />
                  </div>
                  <div className="form-field form-field--full">
                    <label htmlFor="research-affiliation">Primary affiliation</label>
                    <input className="form-control" id="research-affiliation" onChange={(event) => update("affiliation", event.target.value)} value={profile.affiliation} />
                  </div>
                  <div className="form-field form-field--full">
                    <label htmlFor="research-interests">Research and reviewing interests</label>
                    <textarea className="form-control" id="research-interests" onChange={(event) => update("interests", event.target.value)} value={profile.interests} />
                  </div>
                  <div className="form-field form-field--full">
                    <label htmlFor="research-biography">Short professional biography</label>
                    <textarea className="form-control" id="research-biography" onChange={(event) => update("biography", event.target.value)} value={profile.biography} />
                  </div>
                </div>
                <label className="declaration">
                  <input checked={profile.reviewerAvailable} onChange={(event) => update("reviewerAvailable", event.target.checked)} type="checkbox" />
                  <span>I am willing to receive relevant reviewer invitations. Every invitation must still be accepted or declined in OJS.</span>
                </label>
                {saved && <div className="prototype-toast"><Icon name="check" />Research profile saved in this browser.</div>}
              </div>
              <div className="form-actions"><span className="save-state">No profile information leaves this browser.</span><button className="button button--primary" type="submit">Save profile</button></div>
            </form>
          </section>

          <section className="panel">
            <div className="panel__head"><div><h2>Journal activity</h2><p>Status summaries will link back to the authoritative OJS record</p></div><a href="https://nimenajournals.com/ajomena/login" rel="noreferrer" target="_blank">OJS sign in</a></div>
            <div className="panel__body research-submissions">
              {demoResearchSubmissions.map((submission) => (
                <article key={submission.reference}>
                  <span>{submission.journal} · {submission.reference}</span>
                  <strong>{submission.title}</strong>
                  <div><em>{submission.status}</em><small>Updated {submission.updated}</small></div>
                  <a href={submission.ojsUrl} rel="noreferrer" target="_blank">Continue in OJS <Icon name="arrow" /></a>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panel__head"><div><h2>Linked publications</h2><p>Sample research outputs associated with the member profile</p></div></div>
            <div className="panel__body research-publications">
              {demoPublications.map((publication) => (
                <article key={publication.title}><span>{publication.year}</span><div><strong>{publication.title}</strong><small>{publication.journal} · {publication.doi}</small></div></article>
              ))}
            </div>
          </section>
        </div>

        <aside className="dashboard-column">
          <section className="panel research-ojs-card">
            <div className="panel__head"><div><h2>NIMENA Journals</h2><p>Submission and peer review remain open to members and non-members</p></div></div>
            <div className="panel__body">
              <a href="https://nimenajournals.com/ajomena/index" rel="noreferrer" target="_blank"><strong>AJOMENA</strong><span>Offshore, marine engineering and naval architecture</span><Icon name="arrow" /></a>
              <a href="https://nimenajournals.com/jbesed/index" rel="noreferrer" target="_blank"><strong>JBESED</strong><span>Blue economy and sustainable energy development</span><Icon name="arrow" /></a>
            </div>
          </section>

          <section className="panel">
            <div className="panel__head"><div><h2>Reviewer recognition</h2><p>Sample record pending NIMENA CPD policy</p></div></div>
            <div className="panel__body reviewer-history">
              <article><span className="event-date"><strong>2</strong><small>hrs</small></span><div><strong>Technical review completed</strong><small>AJOMENA · Anonymous manuscript</small></div></article>
              <article><span className="event-date"><strong>4</strong><small>hrs</small></span><div><strong>Two reviews completed</strong><small>JBESED · Anonymous manuscripts</small></div></article>
            </div>
          </section>

          <section className="panel">
            <div className="panel__head"><div><h2>Member research benefits</h2><p>Subject to formal policy approval</p></div></div>
            <div className="panel__body"><ul className="portal-list"><li>Verified member identity in journal workflows</li><li>Possible APC benefit or waiver rules</li><li>Research and reviewer opportunity alerts</li><li>Reviewer CPD recognition</li><li>Publication and conference history</li></ul></div>
          </section>
        </aside>
      </div>
    </div>
  );
}
