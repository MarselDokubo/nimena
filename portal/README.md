# NIMENA Member Services

A reviewable member and secretariat portal prototype for the Nigerian Institution of Marine Engineers and Naval Architects.

This directory is intentionally separate from the existing static public website. It demonstrates the complete service journey before live authentication, payments, file storage or production member data are connected.

## Prototype routes

| Route | Purpose |
| --- | --- |
| `/` | Choose a member, applicant or secretariat journey |
| `/apply` | Seven-section digital version of NIMENA Form No. 1 (Rev. 09 — April 2021) |
| `/dashboard` | Member record, renewal, CPD, documents and events |
| `/profile` | Branded member/applicant profile with PDF print-save and data download |
| `/research` | Member research profile, OJS-linked activity and reviewer recognition |
| `/conferences` | Conference catalogue, sample registration, attendance and CPD journey |
| `/conferences/cfp` | Conference abstract/full-paper submission workspace |
| `/secretariat` | Application queue, operational metrics and review activity |
| `/secretariat/applications/NIM-2026-0142` | Detailed application review and recommendation workspace |
| `/secretariat/conferences` | Conference review, decisions, scheduling and attendance operations |
| `/journals` | Branded NIMENA Journals presentation site and ecosystem entry point |
| `/journals/about` | Publishing purpose, principles and governance |
| `/journals/ajomena` | AJOMENA public journal and prototype current issue |
| `/journals/jbesed` | JBESED public journal and prototype current issue |
| `/journals/call-for-papers` | Journal Call for Papers and preparation guidance |
| `/journals/announcements` | Calls, author notices and journal developments |
| `/journals/contact` | Manuscript, editorial and institutional support routes |
| `/journals/policies` | Proposed author, reviewer and editorial policy architecture |
| `/journals/author` | Interactive manuscript-submission preview |
| `/journals/reviewer` | Interactive confidential peer-review preview |
| `/journals/editor` | Editorial pipeline, decisions, production and setup preview |

All displayed identities, credentials, payments and documents are fictional sample data. The Form No. 1 application draft is stored only in the visitor's browser under the versioned key `nimena.portal.application.form01.v2`. Selecting a file does not upload or transmit it. Submitting the preview creates a browser-local profile record that can be opened at `/profile`, saved through the browser as a PDF and downloaded as a JSON data copy.

The journals prototype follows the same boundary. Author drafts remain in browser storage, selected manuscript files are never uploaded, and reviewer/editor actions affect only temporary on-screen state. See [`docs/JOURNALS_PROTOTYPE_GUIDE.md`](docs/JOURNALS_PROTOTYPE_GUIDE.md).

## Run locally

```bash
npm install
npm run dev -- --hostname 127.0.0.1
```

Open `http://127.0.0.1:3000`. Start at `/` to present all portal journeys, or open `/journals` to begin with the journal website.

Quality checks:

```bash
npm run lint
npm run build
```

## Product basis

The application fields and membership pathways were mapped directly from the supplied **NIMENA Form No. 1, Rev. 09 — April 2021**. The form currently identifies these pathways:

- Corporate
- Associate
- Graduate
- Student
- Corporate Firm

It also identifies Lagos and Eastern chapters, country of origin and residence, professional-body evidence, COREN/other engineering-council registration, academic certificates, employment/project history, signature and declaration, Membership Committee review and National Chairman approval.

## Before production

The prototype deliberately does not contain a real login, database, payment processor or public file bucket. Production requires:

1. NIMENA confirmation of eligibility, fees, evidence and approvers for each grade.
2. Managed authentication with verified email, account recovery and MFA for staff.
3. PostgreSQL persistence with role-based authorization and an immutable audit trail.
4. Private object storage, upload validation, malware scanning and retention rules.
5. Payment provider integration using server-verified webhooks and reconciled receipts.
6. Transactional email/SMS templates, privacy notices, consent language and support procedures.
7. Migration and reconciliation of the existing membership register.

See [docs/PRODUCT_BLUEPRINT.md](docs/PRODUCT_BLUEPRINT.md) and [docs/phase-1-schema.sql](docs/phase-1-schema.sql) for the proposed workflow and data model.

## Scholarly services prototype

The review build separates journal and conference responsibilities:

- `/research` maintains a sample member research identity and links back to OJS.
- `/conferences` demonstrates delegate registration, sample fees and attendance evidence.
- `/conferences/cfp` demonstrates conference abstracts, declarations and draft saving.
- `/secretariat/conferences` demonstrates blind-review assignment, scoring, decisions and programme scheduling.
- OJS remains the authoritative system for journal manuscripts, peer review, production and publication.
- `/journals` now demonstrates the approved-design target for a later OJS theme and workflow configuration; it does not replace or write to the existing OJS installation.

See [docs/SCHOLARLY_SERVICES_BLUEPRINT.md](docs/SCHOLARLY_SERVICES_BLUEPRINT.md), [docs/OJS_AUDIT_2026-09-27.md](docs/OJS_AUDIT_2026-09-27.md) and [docs/scholarly-services-schema.sql](docs/scholarly-services-schema.sql). All displayed conference, research and journal-status records are fictional and browser-only.

The public conference photo/video archive is defined in [docs/CONFERENCE_ARCHIVE_BLUEPRINT.md](docs/CONFERENCE_ARCHIVE_BLUEPRINT.md), with a proposed production data model in [docs/conference-archive-schema.sql](docs/conference-archive-schema.sql). Large supplied conference recordings remain external source files in the prototype and are not committed to GitHub.


## Institutional programme prototype

The review build now includes four connected workflows:

- `/programmes` — member/applicant workspace for accreditation and endorsement, innovation and technology transfer, magazine pitches, and industry partnership or sponsorship proposals.
- `/secretariat/programmes` — sample screening queue, evidence checklist and routing decisions.
- `docs/INSTITUTIONAL_PROGRAMMES_BLUEPRINT.md` — governance, roles, states and production boundary.
- `docs/institutional-programmes-schema.sql` — proposed PostgreSQL entities for a production implementation.

All programme records and file controls remain prototype-only. The member workspace stores sample activity in browser local storage; it does not transmit or upload data.
