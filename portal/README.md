# NIMENA Member Services

A reviewable member and secretariat portal prototype for the Nigerian Institution of Marine Engineers and Naval Architects.

This directory is intentionally separate from the existing static public website. It demonstrates the complete service journey before live authentication, payments, file storage or production member data are connected.

## Prototype routes

| Route | Purpose |
| --- | --- |
| `/` | Choose a member, applicant or secretariat journey |
| `/apply` | Five-step membership application based on the current NIMENA form |
| `/dashboard` | Member record, renewal, CPD, documents and events |
| `/secretariat` | Application queue, operational metrics and review activity |
| `/secretariat/applications/NIM-2026-0142` | Detailed application review and recommendation workspace |

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
