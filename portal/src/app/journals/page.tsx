import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { journalList } from "@/lib/journal-data";

export const metadata: Metadata = {
  title: "Research & Journals",
  description: "Explore the AJOMENA and JBESED journal experience and proposed scholarly publishing workflows.",
};

export default function JournalsHomePage() {
  const featuredArticles = journalList.flatMap((journal) =>
    journal.issue.articles.slice(0, 2).map((article) => ({ ...article, journal })),
  );

  return (
    <div>
      <section className="journal-hero">
        <div className="journal-hero__copy">
          <span className="kicker kicker--light">NIMENA Research & Journals</span>
          <h1>Maritime research built for practice.</h1>
          <p>Explore the proposed home of AJOMENA and JBESED, from discovery and submission to review, production and publication.</p>
          <div className="journal-hero__actions">
            <Link className="button button--primary" href="/journals/author">Submit a manuscript <Icon name="arrow" /></Link>
            <Link className="button journal-button--light" href="#journals">Explore the journals</Link>
          </div>
        </div>
        <div className="journal-hero__issue">
          <span>Featured prototype issue</span>
          <strong>Marine systems, energy transition and local technical capacity</strong>
          <p>Volume 1 · Number 1 · 2026</p>
          <div>
            <Link href="/journals/ajomena">AJOMENA</Link>
            <Link href="/journals/jbesed">JBESED</Link>
          </div>
        </div>
      </section>

      <section className="journal-trust-strip" aria-label="Prototype publishing features">
        <article><strong>02</strong><span>Journal pathways</span></article>
        <article><strong>05</strong><span>Editorial stages</span></article>
        <article><strong>03</strong><span>Workflow previews</span></article>
        <article><strong>100%</strong><span>Fictional review data</span></article>
      </section>

      <section className="journal-section" id="journals">
        <div className="journal-section__head">
          <div>
            <span>Our journals</span>
            <h2>Two distinct scholarly conversations.</h2>
          </div>
          <p>Each journal has its own scope, sections and editorial identity while sharing one clear NIMENA publishing experience.</p>
        </div>
        <div className="journal-cards">
          {journalList.map((journal, index) => (
            <article className={`journal-card journal-card--${index + 1}`} key={journal.slug}>
              <div className="journal-card__mark"><span>{String(index + 1).padStart(2, "0")}</span><strong>{journal.acronym}</strong></div>
              <h3>{journal.name}</h3>
              <p>{journal.description}</p>
              <ul>
                {journal.scope.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="journal-card__actions">
                <Link href={`/journals/${journal.slug}`}>Visit journal <Icon name="arrow" /></Link>
                <Link href={`/journals/${journal.slug}/issues`}>Browse issues</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="journal-section journal-section--tint">
        <div className="journal-section__head">
          <div>
            <span>Featured research</span>
            <h2>Read the prototype issue.</h2>
          </div>
          <p>These records are deliberately fictional. They demonstrate article discovery, metadata, citation and full-text presentation.</p>
        </div>
        <div className="article-grid">
          {featuredArticles.map((article) => (
            <article className="article-card" key={`${article.journal.slug}-${article.slug}`}>
              <div className="article-card__meta"><span>{article.journal.acronym}</span><em>{article.section}</em></div>
              <h3><Link href={`/journals/${article.journal.slug}/article/${article.slug}`}>{article.title}</Link></h3>
              <p>{article.authors.join(" · ")}</p>
              <div className="article-card__footer"><span>Pages {article.pages}</span><Link href={`/journals/${article.journal.slug}/article/${article.slug}`}>Read article <Icon name="arrow" /></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="journal-section">
        <div className="journal-section__head">
          <div>
            <span>Editorial journey</span>
            <h2>A transparent path to publication.</h2>
          </div>
          <Link className="journal-text-link" href="/journals/policies">Review proposed policies <Icon name="arrow" /></Link>
        </div>
        <ol className="publication-steps">
          {[
            ["01", "Submit", "Author details, manuscript files, declarations and metadata."],
            ["02", "Screen", "Scope, completeness, ethics and similarity checks."],
            ["03", "Review", "Proposed double-blind assessment by suitable experts."],
            ["04", "Decide", "Editorial decision, revision and author response."],
            ["05", "Publish", "Copyediting, proofing, issue scheduling and discovery metadata."],
          ].map(([number, title, copy]) => (
            <li key={number}><span>{number}</span><strong>{title}</strong><p>{copy}</p></li>
          ))}
        </ol>
      </section>

      <section className="journal-cfp-banner">
        <div><span>Call for papers</span><h2>Submit research to AJOMENA or JBESED.</h2></div>
        <p>Review the themes, proposed process, manuscript requirements and sponsorship notice in one place.</p>
        <Link className="button journal-button--light" href="/journals/call-for-papers">View call for papers <Icon name="arrow" /></Link>
      </section>
    </div>
  );
}
