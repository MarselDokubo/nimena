# NIMENA Scholarly Services Blueprint

## Purpose

NIMENA's scholarly services should feel connected without forcing one system to do every job. The public website explains and publishes opportunities, Open Journal Systems (OJS) manages journals, and the member portal manages professional identity and conferences.

## System boundary

| Function | Authoritative system |
| --- | --- |
| Journal information, latest issues, policies and calls | Public website, linked to OJS |
| Manuscript submission, editorial screening and peer review | OJS at `nimenajournals.com` |
| Member research identity, ORCID, benefits and reviewer recognition | Member portal |
| Conference catalogue, registration, payment and attendance | Conference module in the portal |
| Conference CFP, abstract/full-paper review and programme scheduling | Conference module in the portal |
| Conference proceedings | OJS or an approved public proceedings collection |

The portal must not store a second copy of a journal manuscript, confidential reviewer report or editorial decision. It may store an OJS identifier and a limited status summary so a user can continue in OJS.

## Access principles

- Journal submission remains available to members and non-members.
- Conference registration and CFP submission may be available to members and non-members.
- Membership may provide verified identity, reduced fees or approved benefits, but never editorial preference.
- Conference acceptance is not journal acceptance. An invited paper enters OJS as a new submission and receives normal editorial screening and peer review.
- Reviewer identity and confidential reports remain restricted to the appropriate editorial or conference-review roles.

## Journal workflow in OJS

`Author registration → Submission → Administrative/editorial screening → Reviewer assignment → Review → Revision/decision → Copyediting → Production → Proof approval → Issue publication`

Required public journal information:

- Aims, scope and article sections
- Editorial and advisory boards with verified affiliations
- Author and reviewer instructions
- Peer-review model and timelines
- Research-integrity, conflicts, plagiarism, complaints, appeals, corrections and retraction policies
- Copyright, licensing, privacy, data and fee policies
- Current issue, archives, announcements and Calls for Papers
- Verified ISSN, DOI, indexing and preservation statements only

## Member research profile

The portal research profile should include:

- Verified member identity and membership standing
- ORCID connection using OAuth in production
- Affiliations, position, biography and research interests
- Reviewer-interest and availability settings
- OJS-linked submission summaries that deep-link to OJS
- Publications claimed by the member, with a verification state
- Reviewer activity and CPD recognition under an approved policy
- Research opportunities and relevant notifications

## Conference services

### Delegate journey

`Browse conference → Choose category → Register → Pay → Receive receipt → Check in → Attendance audit → CPD/certificate`

Production requires server-created payment transactions, signed provider webhooks, refund rules, QR tokens that cannot be reused, and auditable certificate issuance.

### CFP journey

`Draft → Submitted → Administrative screening → Reviewer assignment → Blind review → Revision/decision → Speaker confirmation → Programme scheduling → Presentation → Proceedings decision`

Each submission should capture authors, affiliations, track, type, abstract, keywords, files, conflicts, originality and AI-use declarations. Review criteria and decision authority must be versioned for each event.

### Secretariat roles

- Conference manager
- Programme chair
- Track or section chair
- Blind reviewer
- Finance officer
- Registration/check-in officer
- Certificate or CPD approver
- System administrator

Conflicts must exclude a person from assignment, review and decision actions for the affected submission.

## OJS integration sequence

1. **Deep links:** store the OJS submission identifier and direct users to OJS for all actions.
2. **Verified status sync:** read only the minimum status, journal and last-updated fields using a supported OJS API or controlled integration account.
3. **Identity matching:** match verified email and ORCID; do not silently merge accounts.
4. **Benefits:** apply approved member benefits through explicit eligibility rules and an auditable exchange.
5. **Notifications:** surface journal notifications in the portal while preserving the complete message and action in OJS.
6. **Single sign-on, if justified:** introduce only after OJS compatibility, logout, account recovery and role mapping have been security-tested.

Never screen-scrape OJS, copy session cookies, expose an OJS administrator key to the browser or let portal roles create editorial permissions automatically.

## Production controls

- Verified accounts, staff MFA and server-side role checks
- Private files, type/size validation, malware scanning and expiring access links
- Append-only status, review, payment and certificate audit events
- Conflict-of-interest declarations and enforced recusal
- Signed/idempotent payment webhooks and reconciliation
- Rate limits, backups, restoration tests, logs and incident procedures
- Consent, retention and privacy rules for authors, delegates and reviewers
- Accessibility, mobile, email and end-to-end workflow tests
- Separate preview, staging and production environments

## Decisions NIMENA must approve

- Journal identity, ISSNs, DOI prefix/registrant and preservation provider
- Editorial boards, roles, peer-review model and decision authority
- Publication ethics, fees, waivers, copyright and data policies
- Conference names, dates, venues, tracks, submission types and deadlines
- Member/non-member/student prices, refunds and taxes
- Review rubric, anonymity model, conflicts and programme-chair authority
- CPD calculation, attendance threshold and certificate signatory
- Proceedings policy and route into any journal special issue
- OJS integration owner, account matching and data-retention rules

The current implementation is a browser-only review prototype. It demonstrates these boundaries and workflows but does not authenticate users, transmit files, take payments or write to OJS.
