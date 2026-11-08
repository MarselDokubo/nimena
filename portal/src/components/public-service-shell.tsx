import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "@/components/brand";

export function PublicServiceShell({ children }: { children: ReactNode }) {
  return (
    <div className="public-service-shell">
      <header className="public-service-header">
        <Brand />
        <nav aria-label="NIMENA digital services">
          <a href="https://nimena.org.ng/">Main website</a>
          <Link href="/apply">Apply for membership</Link>
          <Link href="/journals">Journals</Link>
          <Link className="public-service-header__button" href="/">Member portal</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="public-service-footer">
        <div>
          <strong>NIMENA Member Services</strong>
          <span>Public verification discloses only approved professional information.</span>
        </div>
        <nav aria-label="Verification support links">
          <a href="https://nimena.org.ng/contact/">Contact Secretariat</a>
          <Link href="/governance">Privacy & governance</Link>
        </nav>
      </footer>
    </div>
  );
}
