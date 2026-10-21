import "./editorial-refresh.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { journalList } from "@/lib/journal-data";

export const metadata: Metadata = {
  title: "Research & Journals",
  description: "Discover AJOMENA and JBESED: NIMENA's maritime engineering and blue-economy research journals.",
};

const stages = [
  ["01", "Submit", "Prepare your manuscript and supporting details."],
  ["02", "Screen", "Scope, completeness and research ethics checks."],
  ["03", "Review", "Independent editorial and peer assessment."],
  ["04", "Decide", "Editorial decisions, revisions and responses."],
  ["05", "Publish", "Final production and publication through OJS."],
];

export default function JournalsHomePage() {
  const featured = journalList.flatMap((journal) =>
    journal.issue.articles.slice(0, 2).map((article) => ({ ...article, journal })),
  );
  const photography = [
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&w=900&q=85",
  ];
  return (
    <main className="nj-home">
      <section className="nj-hero" aria-labelledby="nj-hero-title">
        <div className="nj-hero__image" aria-hidden="true" />
        <div className="nj-container nj-hero__inner">
          <div className="nj-hero__content">
            <span className="nj-eyebrow">NIMENA Research &amp; Journals</span>
            <h1 id="nj-hero-title">Engineering Knowledge for <em>Maritime Progress.</em></h1>
            <p>Advancing research in offshore and marine engineering, naval architecture, the blue economy and sustainable energy — from rigorous scholarship to real-world impact.</p>
            <div className="nj-actions">
              <Link className="nj-btn nj-btn--orange" href="/journals/author">Submit a manuscript <Icon name="arrow" /></Link>
              <Link className="nj-btn nj-btn--outline" href="#journals">Explore the journals</Link>
            </div>
          </div>
          <span className="nj-hero__signature">Research · People · Innovation · A sustainable ocean</span>
        </div>
      </section>

      <section className="nj-event" aria-labelledby="nj-event-title">
        <div className="nj-container nj-event__layout">
          <div className="nj-event__date" aria-label="20 November 2026"><strong>20</strong><span>NOV</span><small>2026</small></div>
          <div className="nj-event__body">
            <div className="nj-event__topline"><span className="nj-event__live"><span aria-hidden="true" /> Upcoming conference</span><span className="nj-event__edition">NIMENA Conference 2026 · MARVEL NIGERIA 2026</span></div>
            <h2 id="nj-event-title">Advancing Maritime Sovereignty</h2>
            <p className="nj-event__subtitle">Maritime advancement through resilience, vessel development, energy transition &amp; local capacity.</p>
            <div className="nj-event__meta">
              <span><Icon name="calendar" /> Friday, 20 November 2026</span>
              <span><Icon name="home" /> Naval Dockyard Event Hall, Ahmadu Bello Way, Victoria Island, Lagos</span>
              <span className="nj-event__deadline"><Icon name="clock" /> Abstract deadline: 17 November 2026</span>
            </div>
            <div className="nj-event__actions">
              <a className="nj-btn nj-btn--orange" href="#conference-details">Explore conference details <Icon name="arrow" /></a>
              <Link className="nj-event__textlink" href="/journals/call-for-papers">Publication &amp; submission guidance →</Link>
            </div>
          </div>
          <a className="nj-event__flyer" href="/media/nimena-conference-2026.png" target="_blank" rel="noopener noreferrer" aria-label="Open official NIMENA Conference 2026 flyer"><img src="/media/nimena-conference-2026.png" alt="Official NIMENA Conference 2026 Call for Papers flyer" /><span>View official flyer ↗</span></a>
        </div>
      </section>

      <section className="nj-section nj-conference" id="conference-details" aria-labelledby="nj-conference-heading">
        <div className="nj-container">
          <div className="nj-heading">
            <div><span className="nj-eyebrow">NIMENA Conference 2026 · Call for papers</span><h2 id="nj-conference-heading">Four tracks. One maritime future.</h2></div>
            <p>Researchers, engineers and maritime professionals are invited to contribute original research, technical studies and evidence-based policy papers.</p>
          </div>
          <div className="nj-conference__tracks">
            {[
              ["01", "Classification & standards", "Local inspection capacity, vessel safety and structural requirements for West African waters."],
              ["02", "Green shipping", "Vessel retrofits, alternative fuels, emissions reduction and cleaner operations."],
              ["03", "Cabotage & shipbuilding", "Domestic fleet development, shipyard capacity, materials and modular construction."],
              ["04", "Hydrodynamics of domestic craft", "Hull design, resistance, propulsion and stability of coastal, inland and shallow-draught vessels."],
            ].map(([number, title, copy]) => (
              <article className="nj-conference__track" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="nj-conference__bottom">
            <div><strong>Abstracts: 150–200 words</strong><span>Deadline: 17 November 2026 · Manuscript deadline: 27 November 2026</span><span>Submissions: Journal portal · Enquiries: editorialoffice@nimenajournals.com</span></div>
            <div><Link className="nj-btn nj-btn--orange" href="/journals/author">Submission workspace <Icon name="arrow" /></Link><Link className="nj-conference__guidance" href="/journals/call-for-papers">Read submission guidance →</Link></div>
          </div>
          <p className="nj-conference__note">Selected conference authors may be invited to submit expanded papers to AJOMENA or JBESED, subject to independent journal editorial assessment and peer review. The prototype submission workspace does not upload files to the live journal portal.</p>
        </div>
      </section>

      <div className="nj-statbar">
        <div className="nj-container nj-statbar__grid">
          <div><span className="nj-stat-icon" aria-hidden="true">✦</span><strong>02</strong><span>Scholarly journals<small>Distinct editorial scopes</small></span></div>
          <div><span className="nj-stat-icon" aria-hidden="true">◇</span><strong>05</strong><span>Editorial stages<small>From submission to publication</small></span></div>
          <div><span className="nj-stat-icon" aria-hidden="true">◎</span><strong>03</strong><span>Role-based workspaces<small>Authors, reviewers and editors</small></span></div>
          <div><span className="nj-stat-icon" aria-hidden="true">↗</span><strong>OJS</strong><span>Publishing platform<small>Live records remain in OJS</small></span></div>
        </div>
      </div>

      <section className="nj-section nj-container" id="journals">
        <div className="nj-heading"><div><span className="nj-eyebrow">Our journals</span><h2>Two distinct scholarly conversations.</h2></div><p>Individual research identities. One connected NIMENA publishing experience.</p></div>
        <div className="nj-journals">
          {journalList.map((journal, index) => (
            <article className="nj-journal" key={journal.slug}>
              <div className={`nj-journal__visual nj-journal__visual--${index + 1}`} role="img" aria-label={index === 0 ? "Ocean and marine engineering imagery" : "Renewable energy at sea"} />
              <div className="nj-journal__body"><span className="nj-decorative-symbol" aria-hidden="true">✦</span>
                <span className="nj-journal__index"><b>{String(index + 1).padStart(2, "0")}</b> {journal.acronym}</span>
                <h3>{journal.name}</h3>
                <p>{journal.description}</p>
                <ul>{journal.scope.slice(0, 3).map((scope) => <li key={scope}>{scope}</li>)}</ul>
                <div className="nj-journal__links">
                  <Link className="nj-btn nj-btn--orange" href={`/journals/${journal.slug}`}>Visit journal <Icon name="arrow" /></Link>
                  <Link href={`/journals/${journal.slug}/issues`}>Browse issues</Link>
                  <a href={journal.liveUrl} target="_blank" rel="noopener noreferrer">Live OJS ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nj-section nj-section--mist">
        <div className="nj-container">
          <div className="nj-heading"><div><span className="nj-eyebrow">Featured research</span><h2>Recent publications.</h2></div><p>Explore sample article presentations from across our two journals. <Link href="/journals/ajomena/issues">Browse journal issues →</Link></p></div>
          <div className="nj-articles">
            {featured.map((article, index) => (
              <article className="nj-article" key={`${article.journal.slug}-${article.slug}`}>
                <div className="nj-article__labels"><strong>{article.journal.acronym}</strong><span>{article.section}</span></div>
                <Link className="nj-article__image" href={`/journals/${article.journal.slug}/article/${article.slug}`} style={{ backgroundImage: `url("${photography[index % photography.length]}")` }} aria-label={`Read ${article.title}`} />
                <h3><Link href={`/journals/${article.journal.slug}/article/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.authors.join(" · ")}</p>
                <div className="nj-article__bottom"><span>Pages {article.pages}</span><Link href={`/journals/${article.journal.slug}/article/${article.slug}`}>Read article →</Link></div>
              </article>
            ))}
          </div>
          <p className="nj-disclaimer">Presentation preview: article records shown here are illustrative; verified journal records and manuscripts remain in OJS.</p>
        </div>
      </section>

      <section className="nj-section nj-container nj-process">
        <div className="nj-heading"><div><span className="nj-eyebrow">Editorial journey</span><h2>A transparent path to publication.</h2></div><p>Clear milestones guide the journey from manuscript to discovery. <Link href="/journals/policies">Review proposed policies →</Link></p></div>
        <ol className="nj-stages">{stages.map(([number, title, description]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{description}</p></li>)}</ol>
      </section>

      <section className="nj-section nj-section--ecosystem">
        <div className="nj-container">
          <div className="nj-heading"><div><span className="nj-eyebrow">One institution · connected services</span><h2>Move confidently between NIMENA services.</h2></div><p>Research, membership and public information brought together in one coherent experience.</p></div>
          <div className="nj-services">
            <a href="https://nimena.org.ng/" target="_blank" rel="noopener noreferrer"><span className="nj-services__icon" aria-hidden="true"><Icon name="home" /></span><span className="nj-services__number">01 / Public</span><h3>Main website</h3><p>Institutional news, programmes and public resources.</p><b>Visit website →</b></a>
            <Link href="/"><span className="nj-services__icon" aria-hidden="true"><Icon name="users" /></span><span className="nj-services__number">02 / Members</span><h3>Member portal</h3><p>Membership, CPD, conferences and professional records.</p><b>Open portal →</b></Link>
            <Link href="/journals/about"><span className="nj-services__icon" aria-hidden="true"><Icon name="book" /></span><span className="nj-services__number">03 / Research</span><h3>Journal platform</h3><p>Discover scholarship, editorial journeys and live OJS publishing.</p><b>Explore journals →</b></Link>
          </div>
        </div>
      </section>

      <section className="nj-cta"><div className="nj-container nj-cta__inner"><div><span className="nj-eyebrow">Call for papers</span><h2>Bring your research to the maritime conversation.</h2></div><Link className="nj-btn nj-btn--orange" href="/journals/call-for-papers">View call for papers <Icon name="arrow" /></Link></div></section>
    </main>
  );
}
