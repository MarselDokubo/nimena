import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "About NIMENA Journals",
  description: "Learn about NIMENA's journals, audiences and publishing governance.",
};

export default function JournalsAboutPage() {
  return (
    <div>
      <section className="journal-page-heading journal-page-heading--image">
        <div>
          <span>About NIMENA Journals</span>
          <h1>Research with professional purpose.</h1>
          <p>NIMENA&apos;s publishing programme connects scholarly evidence with the engineers, institutions and industries shaping Africa&apos;s maritime future.</p>
        </div>
        <Link className="button button--primary" href="/journals#journals">Explore the journals</Link>
      </section>

      <section className="journal-section journal-about-story">
        <div>
          <span>Our role</span>
          <h2>A home for rigorous maritime and blue-economy knowledge.</h2>
        </div>
        <div className="journal-prose">
          <p>The NIMENA Journals platform brings together AJOMENA and JBESED under one publishing identity. Each journal retains a distinct scope while sharing clear author guidance, ethical safeguards and a consistent reader experience.</p>
          <p>Authors do not need to be NIMENA members. Membership may provide professional benefits, research-profile services and approved support, but editorial decisions must remain independent and based on the scholarly record.</p>
        </div>
      </section>

      <section className="journal-section journal-section--tint journal-principles">
        {[
          ["01", "Editorial independence", "Publication decisions remain separate from membership, sponsorship and conference participation."],
          ["02", "Research integrity", "Authorship, conflicts, ethics, originality, data and corrections require clear published policies."],
          ["03", "Useful scholarship", "The journals connect sound research to maritime engineering, policy and professional practice."],
          ["04", "Open discovery", "Readers should be able to find issues, articles, metadata and policies without unnecessary barriers."],
        ].map(([number, title, copy]) => (
          <article key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>
        ))}
      </section>

      <section className="journal-section journal-governance-grid">
        <div>
          <span>Publishing governance</span>
          <h2>Roles with clear responsibility.</h2>
          <p>A credible journal site should identify its publisher, editorial leadership, boards, reviewers&apos; responsibilities, decision authority and routes for appeals or corrections.</p>
          <Link className="journal-text-link" href="/journals/policies">Review the policy framework <Icon name="arrow" /></Link>
        </div>
        <ol>
          <li><strong>Publisher</strong><span>NIMENA provides institutional oversight and publishing infrastructure.</span></li>
          <li><strong>Editors</strong><span>Editorial teams screen manuscripts, select reviewers and make documented decisions.</span></li>
          <li><strong>Reviewers</strong><span>Qualified specialists provide confidential, evidence-based technical assessment.</span></li>
          <li><strong>Authors</strong><span>Contributors remain accountable for originality, accuracy, declarations and revisions.</span></li>
        </ol>
      </section>

      <section className="journal-cfp-banner journal-cfp-banner--compact">
        <div><span>Ready to contribute?</span><h2>Choose the journal that fits your work.</h2></div>
        <p>Compare AJOMENA and JBESED, review the requirements and preview the submission journey.</p>
        <Link className="button journal-button--light" href="/journals/call-for-papers">Publish with us <Icon name="arrow" /></Link>
      </section>
    </div>
  );
}
