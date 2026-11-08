import type { Metadata } from "next";
import { PublicServiceShell } from "@/components/public-service-shell";
import { MemberVerification } from "@/app/verify-member/member-verification";

export const metadata: Metadata = {
  title: "Verify a NIMENA member",
  description: "Confirm the public professional standing of a NIMENA member using a membership number.",
};

export default function VerifyMemberPage() {
  return (
    <PublicServiceShell>
      <section className="public-service-hero">
        <span>Public professional register</span>
        <h1>Verify a NIMENA member</h1>
        <p>
          Enter a membership number to confirm active standing and view the professional information the member has approved for public verification.
        </p>
      </section>

      <section className="public-service-content">
        <MemberVerification />
        <aside className="verification-guidance">
          <div>
            <span>01</span>
            <h2>What this confirms</h2>
            <p>Membership number, active standing, grade, chapter and selected verified credentials.</p>
          </div>
          <div>
            <span>02</span>
            <h2>Privacy protection</h2>
            <p>Personal addresses, telephone numbers, payment history and private documents are never displayed.</p>
          </div>
          <div>
            <span>03</span>
            <h2>Need formal confirmation?</h2>
            <p>Employers and regulators can request a signed verification letter from the NIMENA Secretariat.</p>
          </div>
        </aside>
      </section>
    </PublicServiceShell>
  );
}
