import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Contact NIMENA Journals",
  description: "Find the correct route for manuscript, editorial and institutional publishing enquiries.",
};

export default function JournalContactPage() {
  return (
    <div>
      <section className="journal-page-heading journal-page-heading--image">
        <div><span>Journal support</span><h1>Contact the right team.</h1><p>Use OJS for manuscript records and the NIMENA Secretariat for institutional or publishing enquiries.</p></div>
        <a className="button button--primary" href="mailto:info@nimenajournals.com">Email the publishing office</a>
      </section>

      <section className="journal-section journal-contact-grid">
        <article>
          <span><Icon name="book" /></span>
          <small>Authors & reviewers</small>
          <h2>Manuscript support</h2>
          <p>Keep submissions, revisions, reviewer reports and decision correspondence attached to the scholarly record in OJS.</p>
          <a href="https://nimenajournals.com/index/login" rel="noreferrer" target="_blank">Sign in to live OJS <Icon name="arrow" /></a>
        </article>
        <article>
          <span><Icon name="mail" /></span>
          <small>Institutional enquiries</small>
          <h2>Publishing office</h2>
          <p>For journal partnerships, permissions or general publication enquiries, contact the NIMENA Journals publishing office.</p>
          <a href="mailto:info@nimenajournals.com">info@nimenajournals.com <Icon name="arrow" /></a>
        </article>
        <article>
          <span><Icon name="shield" /></span>
          <small>Policies & integrity</small>
          <h2>Editorial governance</h2>
          <p>Review the policy framework before raising questions about authorship, conflicts, appeals, corrections or ethics.</p>
          <Link href="/journals/policies">Review journal policies <Icon name="arrow" /></Link>
        </article>
      </section>

      <section className="journal-section journal-section--tint journal-contact-route">
        <div><span>NIMENA ecosystem</span><h2>Looking for another service?</h2></div>
        <nav aria-label="Other NIMENA contacts">
          <a href="https://nimena.org.ng/contact/" rel="noreferrer" target="_blank"><strong>Main institution</strong><span>General, chapter and professional enquiries</span></a>
          <Link href="/"><strong>Member services</strong><span>Applications, renewals, CPD and member records</span></Link>
          <Link href="/journals/call-for-papers"><strong>Publishing guidance</strong><span>Scope, requirements and submission pathway</span></Link>
        </nav>
      </section>
    </div>
  );
}
