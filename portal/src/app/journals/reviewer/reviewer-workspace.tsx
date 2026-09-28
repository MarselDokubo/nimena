"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { reviewerAssignment } from "@/lib/journal-data";

type InvitationState = "pending" | "accepted" | "declined";

export function ReviewerWorkspace() {
  const [invitation, setInvitation] = useState<InvitationState>("pending");
  const [conflictConfirmed, setConflictConfirmed] = useState(false);
  const [fileMessage, setFileMessage] = useState("");
  const [scores, setScores] = useState([4, 3, 4, 3]);
  const [authorComments, setAuthorComments] = useState("");
  const [editorComments, setEditorComments] = useState("");
  const [recommendation, setRecommendation] = useState("Major revisions");
  const [submitted, setSubmitted] = useState(false);
  const total = scores.reduce((sum, score) => sum + score, 0);

  function updateScore(index: number, value: number) {
    setScores((current) => current.map((score, scoreIndex) => scoreIndex === index ? value : score));
  }

  if (invitation === "declined") {
    return <section className="workflow-success"><span><Icon name="check" /></span><small>Invitation response recorded</small><h1>Review declined</h1><p>No manuscript file was accessed. In production, the editor would be notified and the invitation audit trail retained.</p><div><button className="button button--primary" onClick={() => setInvitation("pending")} type="button">Reset demonstration</button><Link className="button button--outline" href="/journals">Return to journals</Link></div></section>;
  }

  if (submitted) {
    return <section className="workflow-success"><span><Icon name="check" /></span><small>Confidential review preview completed</small><h1>Recommendation recorded</h1><p>Your fictional recommendation—{recommendation.toLowerCase()}—has been returned to the assigned editor. Nothing was transmitted.</p><div><button className="button button--primary" onClick={() => { setSubmitted(false); setInvitation("accepted"); }} type="button">Review submission again</button><Link className="button button--outline" href="/journals/editor">View editor workflow</Link></div></section>;
  }

  return (
    <div className="journal-workspace-page">
      <section className="workflow-heading">
        <div><span>Reviewer workspace · Confidential preview</span><h1>Peer review</h1><p>Assess one fictional blinded manuscript and record an editorial recommendation.</p></div>
        <div className="workflow-profile"><span>KO</span><div><strong>Dr Kelechi Obi</strong><small>Sample reviewer account</small></div></div>
      </section>

      {invitation === "pending" ? (
        <section className="review-invitation">
          <div className="review-invitation__main">
            <span>New review invitation</span><h2>{reviewerAssignment.title}</h2><p>{reviewerAssignment.abstract}</p>
            <div className="keyword-list">{reviewerAssignment.keywords.map((keyword) => <em key={keyword}>{keyword}</em>)}</div>
            <dl><div><dt>Journal</dt><dd>{reviewerAssignment.journal}</dd></div><div><dt>Review round</dt><dd>{reviewerAssignment.round}</dd></div><div><dt>Due date</dt><dd>{reviewerAssignment.due}</dd></div></dl>
          </div>
          <aside>
            <Icon name="shield" /><h3>Before accepting</h3><ul><li>Confirm relevant expertise.</li><li>Declare any conflict of interest.</li><li>Confirm availability before the deadline.</li><li>Keep the manuscript confidential.</li></ul>
            <label className="declaration"><input checked={conflictConfirmed} onChange={(event) => setConflictConfirmed(event.target.checked)} type="checkbox" /><span>I have reviewed the conflict and confidentiality requirements.</span></label>
            <div><button className="button button--primary" disabled={!conflictConfirmed} onClick={() => setInvitation("accepted")} type="button">Accept review</button><button className="button button--outline" onClick={() => setInvitation("declined")} type="button">Decline</button></div>
          </aside>
        </section>
      ) : (
        <div className="review-workspace-layout">
          <section className="workflow-panel review-form-panel">
            <header><div><span>{reviewerAssignment.reference} · {reviewerAssignment.round}</span><h2>{reviewerAssignment.title}</h2></div><em>Due {reviewerAssignment.due}</em></header>
            <div className="workflow-panel__body review-form-body">
              <div className="review-manuscript-summary"><span>Blinded manuscript</span><p>{reviewerAssignment.abstract}</p><div>{reviewerAssignment.files.map((file) => <button key={file} onClick={() => setFileMessage(`${file} opened as a protected demonstration record.`)} type="button"><Icon name="file" />{file}<Icon name="eye" /></button>)}</div>{fileMessage && <div className="prototype-toast"><Icon name="check" />{fileMessage}</div>}</div>
              <div className="review-score-block"><div><span>Assessment</span><strong>{total}/20</strong></div>{["Original contribution", "Technical quality", "Clarity and structure", "Relevance to journal scope"].map((label, index) => <label key={label}><span>{label}</span><input max="5" min="1" onChange={(event) => updateScore(index, Number(event.target.value))} type="range" value={scores[index]} /><strong>{scores[index]}/5</strong></label>)}</div>
              <div className="form-field"><label htmlFor="review-author-comments">Comments for the author</label><textarea className="form-control review-comments" id="review-author-comments" onChange={(event) => setAuthorComments(event.target.value)} placeholder="Constructive comments that may be shared with the author" value={authorComments} /></div>
              <div className="form-field"><label htmlFor="review-editor-comments">Confidential comments for the editor</label><textarea className="form-control" id="review-editor-comments" onChange={(event) => setEditorComments(event.target.value)} placeholder="Concerns or context for the editor only" value={editorComments} /></div>
              <div className="form-field"><label htmlFor="review-recommendation">Recommendation</label><select className="form-control" id="review-recommendation" onChange={(event) => setRecommendation(event.target.value)} value={recommendation}><option>Accept</option><option>Minor revisions</option><option>Major revisions</option><option>Resubmit for review</option><option>Reject</option></select></div>
            </div>
            <footer><div><span className="save-state">Responses remain in this browser.</span></div><div><button className="button button--outline" onClick={() => setInvitation("pending")} type="button">Return invitation</button><button className="button button--primary" disabled={authorComments.trim().length < 20} onClick={() => setSubmitted(true)} type="button">Submit recommendation <Icon name="arrow" /></button></div></footer>
          </section>

          <aside className="review-guidance">
            <section><span>Review standard</span><h3>Evidence before preference.</h3><p>Assess the work on its contribution, technical quality, clarity and relevance. Avoid identifying the authors or using confidential material outside this assignment.</p></section>
            <section><span>Reviewer checklist</span><ul><li><Icon name="check" />Methods support the claims</li><li><Icon name="check" />Figures and tables are understandable</li><li><Icon name="check" />Limitations are acknowledged</li><li><Icon name="check" />References are appropriate</li><li><Icon name="check" />Ethics concerns are reported privately</li></ul></section>
            <section><span>Recognition</span><p>Production may issue review acknowledgement and approved CPD recognition without revealing the manuscript or confidential recommendation.</p></section>
          </aside>
        </div>
      )}
    </div>
  );
}
