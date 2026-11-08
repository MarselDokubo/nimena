"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import type { PublicMemberRecord } from "@/lib/institutional-data";

type VerificationResponse =
  | { found: true; member: PublicMemberRecord }
  | { found: false; message: string };

export function MemberVerification() {
  const [memberId, setMemberId] = useState("");
  const [result, setResult] = useState<VerificationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/members/verify?memberId=${encodeURIComponent(memberId)}`);
      const payload = (await response.json()) as VerificationResponse;
      setResult(payload);
    } catch {
      setResult({ found: false, message: "Verification is temporarily unavailable. Please contact Member Services." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="verification-workspace">
      <form className="verification-form" onSubmit={verify}>
        <label htmlFor="memberId">NIMENA membership number</label>
        <div>
          <input
            autoComplete="off"
            id="memberId"
            onChange={(event) => setMemberId(event.target.value)}
            placeholder="Example: NIMENA/GM/0742"
            required
            type="text"
            value={memberId}
          />
          <button className="button button--primary" disabled={loading} type="submit">
            <Icon name="shield" /> {loading ? "Checking…" : "Verify member"}
          </button>
        </div>
        <small>Presentation records: NIMENA/GM/0742, NIMENA/FM/0087 or NIMENA/SM/1294.</small>
      </form>

      {result?.found === false && (
        <section className="verification-result verification-result--empty" aria-live="polite">
          <span><Icon name="search" /></span>
          <div>
            <h2>Record not verified</h2>
            <p>{result.message}</p>
          </div>
        </section>
      )}

      {result?.found && (
        <section className="verification-result verification-result--success" aria-live="polite">
          <header>
            <span className="verification-seal"><Icon name="check" /></span>
            <div>
              <small>Verified active member</small>
              <h2>{result.member.name}, {result.member.postNominals}</h2>
              <p>{result.member.memberId}</p>
            </div>
            <strong>Active</strong>
          </header>

          <dl className="verification-facts">
            <div><dt>Membership grade</dt><dd>{result.member.grade}</dd></div>
            <div><dt>Professional rank</dt><dd>{result.member.professionalRank}</dd></div>
            <div><dt>Chapter</dt><dd>{result.member.chapter}</dd></div>
            <div><dt>Valid through</dt><dd>{result.member.validThrough}</dd></div>
          </dl>

          <div className="verification-details">
            <article>
              <h3>Qualifications</h3>
              <ul>{result.member.degrees.map((degree) => <li key={degree}>{degree}</li>)}</ul>
            </article>
            <article>
              <h3>Professional focus</h3>
              <ul>{result.member.disciplines.map((discipline) => <li key={discipline}>{discipline}</li>)}</ul>
            </article>
            <article>
              <h3>Verified accomplishments</h3>
              <ul>{result.member.accomplishments.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>
      )}
    </div>
  );
}
