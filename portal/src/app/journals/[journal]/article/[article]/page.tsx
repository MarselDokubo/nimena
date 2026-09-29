import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getJournal, journalList } from "@/lib/journal-data";
import { ArticleActions } from "./article-actions";

type ArticlePageProps = { params: Promise<{ journal: string; article: string }> };

export function generateStaticParams() {
  return journalList.flatMap((journal) => journal.issue.articles.map((article) => ({ journal: journal.slug, article: article.slug })));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { journal: journalSlug, article: articleSlug } = await params;
  const article = getArticle(journalSlug, articleSlug);
  return { title: article?.title ?? "Article not found", description: article?.abstract };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { journal: journalSlug, article: articleSlug } = await params;
  const journal = getJournal(journalSlug);
  const article = getArticle(journalSlug, articleSlug);
  if (!journal || !article) notFound();

  const citation = `${article.authors.join(", ")} (2026). ${article.title}. ${journal.name}, 1(1), ${article.pages}. ${article.doi}.`;

  return (
    <article className="journal-article-page">
      <div className="article-breadcrumbs"><Link href="/journals">Journals</Link><span>/</span><Link href={`/journals/${journal.slug}`}>{journal.acronym}</Link><span>/</span><span>Article</span></div>

      <header className="article-heading">
        <div className="article-heading__meta"><span>{journal.acronym}</span><em>{article.section}</em><small>Prototype article</small></div>
        <h1>{article.title}</h1>
        <p className="article-authors">{article.authors.join(" · ")}</p>
        <p className="article-affiliations">{article.affiliations.join(" | ")}</p>
        <ArticleActions citation={citation} />
      </header>

      <div className="article-layout">
        <div className="article-body">
          <section><h2>Abstract</h2><p>{article.abstract}</p></section>
          <section><h2>Introduction</h2><p>This full-text area demonstrates the reading experience that can be implemented through the NIMENA OJS theme. The presentation uses original placeholder prose and does not represent a published paper.</p></section>
          <section><h2>Method and approach</h2><p>The proposed article template supports structured headings, tables, figures, equations, references and supplementary files. Production content would be generated from the accepted manuscript after copyediting and author proof approval.</p></section>
          <aside className="article-placeholder-figure"><span>Figure 1</span><div><i /><i /><i /><i /><i /></div><p>Demonstration figure area for technical charts or engineering diagrams.</p></aside>
          <section><h2>Findings and professional relevance</h2><p>Clear metadata and accessible HTML improve discovery while the downloadable galley preserves the citable version of record. In production, every statement, figure and reference would come from the approved article files in OJS.</p></section>
          <section><h2>References</h2><ol><li>Demonstration reference. Replace with the copyedited reference list.</li><li>Prototype source record. No external work is being represented here.</li></ol></section>
        </div>

        <aside className="article-sidebar">
          <section><span>Article details</span><dl><div><dt>Pages</dt><dd>{article.pages}</dd></div><div><dt>Published</dt><dd>{article.published}</dd></div><div><dt>Received</dt><dd>{article.received}</dd></div><div><dt>Accepted</dt><dd>{article.accepted}</dd></div><div><dt>DOI</dt><dd>{article.doi}</dd></div></dl></section>
          <section><span>Keywords</span><div className="keyword-list">{article.keywords.map((keyword) => <em key={keyword}>{keyword}</em>)}</div></section>
          <section><span>How to cite</span><p>{citation}</p><small>The DOI and publication record are placeholders.</small></section>
          <Link className="button button--outline button--wide" href={`/journals/${journal.slug}`}>Return to {journal.acronym}</Link>
        </aside>
      </div>
    </article>
  );
}
