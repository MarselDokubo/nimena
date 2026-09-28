import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { getJournal, journalList } from "@/lib/journal-data";

type JournalPageProps = { params: Promise<{ journal: string }> };

export function generateStaticParams() {
  return journalList.map((journal) => ({ journal: journal.slug }));
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { journal: slug } = await params;
  const journal = getJournal(slug);
  if (!journal) return { title: "Journal not found" };
  return { title: journal.acronym, description: journal.description };
}

export default async function JournalPage({ params }: JournalPageProps) {
  const { journal: slug } = await params;
  const journal = getJournal(slug);
  if (!journal) notFound();

  return (
    <div>
      <section className={`journal-title-hero journal-title-hero--${journal.slug}`}>
        <div className="journal-title-hero__number">{journal.acronym.slice(0, 1)}</div>
        <div className="journal-title-hero__copy">
          <span>{journal.acronym}</span>
          <h1>{journal.name}</h1>
          <p>{journal.strapline}</p>
          <div>
            <Link className="button button--primary" href="/journals/author">Submit to {journal.acronym} <Icon name="arrow" /></Link>
            <Link className="button journal-button--light" href={`/journals/${journal.slug}/issues`}>Browse issues</Link>
          </div>
        </div>
        <dl className="journal-title-hero__facts">
          <div><dt>Review model</dt><dd>{journal.proposedReview}<small>Proposed</small></dd></div>
          <div><dt>Publication</dt><dd>{journal.publicationModel}<small>Proposed</small></dd></div>
          <div><dt>Access</dt><dd>Reader access model<small>To be approved</small></dd></div>
        </dl>
      </section>

      <nav className="journal-local-nav" aria-label={`${journal.acronym} sections`}>
        <a href="#about">About</a>
        <a href="#current">Current issue</a>
        <Link href={`/journals/${journal.slug}/issues`}>Archives</Link>
        <a href="#scope">Aims & scope</a>
        <Link href="/journals/policies">Policies</Link>
        <Link href="/journals/author">Submit</Link>
      </nav>

      <section className="journal-section journal-about-grid" id="about">
        <div className="journal-prose">
          <span>About the journal</span>
          <h2>{journal.strapline}</h2>
          <p>{journal.description}</p>
          <p>This presentation version shows how the journal can communicate its purpose, readership and publication process without making unverified claims about indexing, accreditation or metrics.</p>
        </div>
        <aside className="journal-information-card">
          <span>Journal information</span>
          <dl>
            <div><dt>Publisher</dt><dd>NIMENA</dd></div>
            <div><dt>ISSN</dt><dd>To be verified</dd></div>
            <div><dt>DOI prefix</dt><dd>To be configured</dd></div>
            <div><dt>Frequency</dt><dd>To be approved</dd></div>
            <div><dt>Language</dt><dd>English</dd></div>
          </dl>
        </aside>
      </section>

      <section className="journal-section journal-section--tint" id="current">
        <div className="issue-heading">
          <div><span>Current prototype issue</span><h2>{journal.issue.title}</h2><p>{journal.issue.label} · {journal.issue.published}</p></div>
          <Link className="button button--outline" href={`/journals/${journal.slug}/issues`}>View all issues</Link>
        </div>
        <div className="issue-article-list">
          {journal.issue.articles.map((article, index) => (
            <article key={article.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <em>{article.section}</em>
                <h3><Link href={`/journals/${journal.slug}/article/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.authors.join(" · ")}</p>
                <small>Pages {article.pages} · {article.doi}</small>
              </div>
              <Link aria-label={`Read ${article.title}`} href={`/journals/${journal.slug}/article/${article.slug}`}><Icon name="arrow" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="journal-section journal-scope-grid" id="scope">
        <div>
          <div className="journal-section__head journal-section__head--compact"><div><span>Aims & scope</span><h2>Topics welcomed by {journal.acronym}.</h2></div></div>
          <ol className="journal-scope-list">
            {journal.scope.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
          </ol>
        </div>
        <aside>
          <span>Article sections</span>
          <ul>{journal.sections.map((section) => <li key={section}>{section}</li>)}</ul>
          <Link href="/journals/policies">Read author and review policies <Icon name="arrow" /></Link>
        </aside>
      </section>
    </div>
  );
}
