"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";

const publicLinks = [
  { href: "/journals", label: "Home" },
  { href: "/journals/about", label: "About" },
  { href: "/journals#journals", label: "Our journals" },
  { href: "/journals/call-for-papers", label: "Publish with us" },
  { href: "/journals/announcements", label: "Announcements" },
  { href: "/journals/contact", label: "Contact" },
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
    if (href === "/journals#journals") {
      return pathname.startsWith("/journals/ajomena") || pathname.startsWith("/journals/jbesed");
    }
    return pathname.startsWith(href);
  }

  return (
    <div className="journal-site">
      <div className="journal-ecosystem-bar">
        <span>NIMENA digital services</span>
        <nav aria-label="NIMENA digital services">
          <a href="https://nimena.org.ng/" rel="noreferrer" target="_blank">Main website</a>
          <Link href="/">Member portal</Link>
          <Link aria-current="page" href="/journals">Journals</Link>
          <a href="https://nimenajournals.com/index/login" rel="noreferrer" target="_blank">OJS sign in</a>
        </nav>
      </div>

      <header className="journal-header">
        <div className="journal-header__main">
          <Brand href="/journals" subtitle="Research & Journals" />
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
          <span><i /> Presentation build · sample records only</span>
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
          <Brand href="/journals" subtitle="Research & Journals" />
          <p>Two journals. One clear route from research discovery to responsible scholarly publication.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <Link href="/journals/ajomena">AJOMENA</Link>
          <Link href="/journals/jbesed">JBESED</Link>
          <Link href="/journals/call-for-papers">Call for papers</Link>
        </div>
        <div>
          <strong>Publishing</strong>
          <Link href="/journals/call-for-papers">Publish with us</Link>
          <Link href="/journals/policies">Editorial policies</Link>
          <a href="https://nimenajournals.com/index/login" rel="noreferrer" target="_blank">Live OJS sign in</a>
        </div>
        <div>
          <strong>Institution</strong>
          <a href="https://nimena.org.ng/research/" rel="noreferrer" target="_blank">NIMENA main website</a>
          <Link href="/research">Member research profile</Link>
          <Link href="/">Member services</Link>
        </div>
        <small className="journal-footer__legal">Presentation build. Demonstration articles and workflow records are fictional; verified journal records and live submissions remain in OJS.</small>
      </footer>
    </div>
  );
}
