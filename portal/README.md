# NIMENA Member Services

A reviewable member and secretariat portal prototype for the Nigerian Institution of Marine Engineers and Naval Architects.

This directory is intentionally separate from the existing static public website. It demonstrates the complete service journey before live authentication, payments, file storage or production member data are connected.

## Prototype routes

| Route | Purpose |
| --- | --- |
| `/` | Choose a member, applicant or secretariat journey |
| `/apply` | Five-step membership application based on the current NIMENA form |
| `/dashboard` | Member record, renewal, CPD, documents and events |
| `/research` | Member research profile, OJS-linked activity and reviewer recognition |
| `/conferences` | Conference catalogue, sample registration, attendance and CPD journey |
| `/conferences/cfp` | Conference abstract/full-paper submission workspace |
| `/secretariat` | Application queue, operational metrics and review activity |
| `/secretariat/applications/NIM-2026-0142` | Detailed application review and recommendation workspace |
| `/secretariat/conferences` | Conference review, decisions, scheduling and attendance operations |

All displayed identities, credentials, payments and documents are fictional sample data. The application draft is stored only in the visitor's browser under the versioned key `nimena.portal.application.v1`. Selecting a file does not upload or transmit it.

## Run locally

```bash
npm install
npm run dev -- --hostname 127.0.0.1
```

Open `http://127.0.0.1:3000`.

Quality checks:

```bash
npm run lint
npm run build
```

## Product basis

The application fields and membership pathways were mapped from `assets/documents/NIMENA-Membership-Application-Form.docx` in the parent project. The form currently identifies these pathways:

- Corporate
- Associate
- Graduate
- Student
- Corporate Firm

It also identifies Lagos and Eastern chapters, professional-body registration, engineering registration, qualifications, employment history, a declaration and a staged institutional review.

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

See [docs/SCHOLARLY_SERVICES_BLUEPRINT.md](docs/SCHOLARLY_SERVICES_BLUEPRINT.md), [docs/OJS_AUDIT_2026-09-27.md](docs/OJS_AUDIT_2026-09-27.md) and [docs/scholarly-services-schema.sql](docs/scholarly-services-schema.sql). All displayed conference, research and journal-status records are fictional and browser-only.


## Institutional programme prototype

The review build now includes four connected workflows:

- `/programmes` — member/applicant workspace for accreditation and endorsement, innovation and technology transfer, magazine pitches, and industry partnership or sponsorship proposals.
- `/secretariat/programmes` — sample screening queue, evidence checklist and routing decisions.
- `docs/INSTITUTIONAL_PROGRAMMES_BLUEPRINT.md` — governance, roles, states and production boundary.
- `docs/institutional-programmes-schema.sql` — proposed PostgreSQL entities for a production implementation.

All programme records and file controls remain prototype-only. The member workspace stores sample activity in browser local storage; it does not transmit or upload data.
