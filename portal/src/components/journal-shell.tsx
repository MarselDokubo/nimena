"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";

const publicLinks = [
  { href: "/journals", label: "Journals home" },
  { href: "/journals/ajomena", label: "AJOMENA" },
  { href: "/journals/jbesed", label: "JBESED" },
  { href: "/journals/call-for-papers", label: "Call for papers" },
  { href: "/journals/policies", label: "Policies" },
] as const;

const workflowLinks = [
  { href: "/journals/author", label: "Author" },
  { href: "/journals/reviewer", label: "Reviewer" },
  { href: "/journals/editor", label: "Editor" },
] as const;

export function JournalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/journals") return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="journal-site">
      <div className="journal-preview-bar">
        <span><i /> Interactive presentation prototype</span>
        <p>Fictional articles and records · No live OJS data</p>
        <Link href="/">Return to portal previews</Link>
      </div>

      <header className="journal-header">
        <div className="journal-header__main">
          <Brand subtitle="Research & Journals" />
          <button
            aria-expanded={menuOpen}
            aria-label="Toggle journal navigation"
            className="journal-menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
          <nav className={`journal-nav${menuOpen ? " is-open" : ""}`} aria-label="Journal navigation">
            {publicLinks.map((item) => (
              <Link
                aria-current={isActive(item.href) ? "page" : undefined}
                className={isActive(item.href) ? "is-active" : ""}
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="button button--primary journal-submit-button" href="/journals/author">Submit a manuscript</Link>
        </div>

        <div className="journal-workflow-nav">
          <span>Workflow previews</span>
          <nav aria-label="Journal workflow previews">
            {workflowLinks.map((item) => (
              <Link className={isActive(item.href) ? "is-active" : ""} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="journal-footer">
        <div className="journal-footer__brand">
          <Brand subtitle="Research & Journals" />
          <p>A review prototype for NIMENA&apos;s proposed scholarly publishing experience.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <Link href="/journals/ajomena">AJOMENA</Link>
          <Link href="/journals/jbesed">JBESED</Link>
          <Link href="/journals/call-for-papers">Call for papers</Link>
        </div>
        <div>
          <strong>Workflows</strong>
          <Link href="/journals/author">Author preview</Link>
          <Link href="/journals/reviewer">Reviewer preview</Link>
          <Link href="/journals/editor">Editor preview</Link>
        </div>
        <div>
          <strong>Institution</strong>
          <a href="https://nimena.org.ng/research/" rel="noreferrer" target="_blank">NIMENA Research</a>
          <Link href="/research">Member research profile</Link>
          <Link href="/">Member-services previews</Link>
        </div>
        <small className="journal-footer__legal">Prototype for review only. Journal titles, policies, fees, boards, ISSNs, DOI registration and indexing claims require formal approval.</small>
      </footer>
    </div>
  );
}
