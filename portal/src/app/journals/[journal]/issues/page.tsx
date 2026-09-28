import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { getJournal, journalList } from "@/lib/journal-data";

type IssuesPageProps = { params: Promise<{ journal: string }> };

export function generateStaticParams() {
  return journalList.map((journal) => ({ journal: journal.slug }));
}

export async function generateMetadata({ params }: IssuesPageProps): Promise<Metadata> {
  const journal = getJournal((await params).journal);
  return { title: journal ? `${journal.acronym} Issues` : "Issues" };
}

export default async function IssuesPage({ params }: IssuesPageProps) {
  const journal = getJournal((await params).journal);
  if (!journal) notFound();

  return (
    <div>
      <section className="journal-page-heading">
        <div><span>{journal.acronym}</span><h1>Issues & archives</h1><p>Browse the current demonstration issue and proposed future collections.</p></div>
        <Link className="button button--primary" href="/journals/author">Submit to {journal.acronym}</Link>
      </section>

      <section className="journal-section issue-browser">
        <article className="issue-cover">
          <div className="issue-cover__art"><span>{journal.acronym}</span><strong>01</strong><small>2026</small></div>
          <div className="issue-cover__copy">
            <span>Current prototype issue</span>
            <h2>{journal.issue.title}</h2>
            <p>{journal.issue.label}</p>
            <small>{journal.issue.published}</small>
            <div>
              <Link className="button button--secondary" href={`/journals/${journal.slug}`}>View issue <Icon name="arrow" /></Link>
              <span>{journal.issue.articles.length} sample articles</span>
            </div>
          </div>
        </article>

        <aside className="archive-list">
          <div className="archive-list__head"><span>Planned collections</span><strong>Not yet published</strong></div>
          {journal.archives.map((issue) => (
            <article key={issue.title}><span>{issue.label}</span><h3>{issue.title}</h3><p>{issue.published}</p></article>
          ))}
          <p className="archive-list__note">Archive dates and titles remain proposals until approved by the journal&apos;s editorial leadership.</p>
        </aside>
      </section>
    </div>
  );
}
