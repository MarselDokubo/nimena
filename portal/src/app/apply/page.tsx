import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationWizard } from "@/app/apply/application-wizard";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "Membership application" };

export default function ApplicationPage() {
  return (
    <main className="application-page">
      <header className="application-topbar">
        <Brand />
        <Link className="application-topbar__link" href="/">
          <Icon name="arrow" /><span>Back to portal previews</span>
        </Link>
      </header>
      <ApplicationWizard />
    </main>
  );
}
