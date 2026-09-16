import Link from "next/link";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";

export default function PortalEntry() {
  return (
    <main className="entry-page">
      <section className="entry-intro">
        <div className="entry-intro__lines" aria-hidden="true" />
        <Brand />
        <div className="entry-intro__content">
          <span className="kicker kicker--light">NIMENA member portal</span>
          <h1>One professional record. Every member service.</h1>
          <p>
            A connected workspace for applications, membership, development,
            documents, events and support.
          </p>
        </div>
        <div className="entry-intro__foot">
          <span className="entry-stat"><strong>05</strong> membership pathways</span>
          <span className="entry-stat"><strong>02</strong> chapter options in the current form</span>
          <span className="entry-stat"><strong>01</strong> verified member record</span>
        </div>
      </section>

      <section className="entry-access">
        <div className="entry-access__inner">
          <div className="preview-notice">
            <span className="preview-notice__dot" />
            Review build
          </div>
          <h2>Choose a preview</h2>
          <p className="entry-lead">
            This prototype uses sample profiles. Do not enter real personal or
            payment information yet.
          </p>

          <div className="access-options">
            <Link className="access-card access-card--primary" href="/dashboard">
              <span className="access-card__icon"><Icon name="card" /></span>
              <span>
                <strong>Member workspace</strong>
                <small>Membership, payments, CPD and documents</small>
              </span>
              <Icon className="access-card__arrow" name="arrow" />
            </Link>

            <Link className="access-card" href="/secretariat">
              <span className="access-card__icon"><Icon name="shield" /></span>
              <span>
                <strong>Secretariat workspace</strong>
                <small>Applications, reviews and member records</small>
              </span>
              <Icon className="access-card__arrow" name="arrow" />
            </Link>
          </div>

          <div className="entry-divider"><span>New applicant</span></div>

          <Link className="button button--outline button--wide" href="/apply">
            Start membership application <Icon name="arrow" />
          </Link>

          <div className="entry-security">
            <Icon name="shield" />
            <p><strong>Production authentication comes next.</strong> Email verification, access controls and administrator MFA will be connected after the workflow is approved.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
