# NIMENA Institutional Platform V1

This review build connects the public website, member services and scholarly services into one coherent institutional model.

## New member-facing services

| Route | Purpose |
| --- | --- |
| `/verify-member` | Public membership-number verification with privacy-controlled professional information |
| `/renewals` | Annual dues, arrears, payment route, receipts and standing |
| `/community` | Chapters, student chapters, Young Professionals and committee directory |
| `/learning` | Course and webinar catalogue, enrolment, CPD ledger and certificates |
| `/library` | Searchable technical reports, standards, policy papers and proceedings |
| `/recognition` | Fellowship, award and scholarship applications or nominations |
| `/careers` | Jobs, internships, fellowships, career profiles and mentoring |
| `/partners` | Corporate affiliates, academic affiliates, sponsors and proposals |
| `/governance` | Governance-document library and responsibility-based Secretariat directory |

The existing `/conferences`, `/conferences/cfp`, `/research`, `/journals` and `/programmes` areas remain part of the same portal.

## Secretariat control

`/secretariat/services` presents one operational control centre across all institutional services. Production roles should separate:

- Membership and public-register administration
- Finance and payment reconciliation
- Chapter and community administration
- CPD and certificate administration
- Conference and CFP review
- Recognition and scholarship review
- Career-opportunity moderation
- Partnership and sponsorship review
- Governance publication
- Journal/OJS administration

## Membership verification policy

The public service must:

1. Require an exact membership number.
2. Return only active, public and consented records.
3. Never return personal contact data, payment history, private documents, disciplinary detail or dates of birth.
4. Display degrees and accomplishments only after Secretariat verification and member consent.
5. Rate-limit automated searches and record privacy-preserving verification events.
6. Provide a formal verification-letter route for employers and regulators.

The presentation IDs and people in the prototype are fictional. They must be replaced by a cleansed and reconciled membership register before launch.

### Presentation walkthrough

Start at `/`, then use this sequence to demonstrate one connected NIMENA platform:

1. Open `/verify-member` and verify `NIMENA/GM/0742` to show the privacy-controlled public register.
2. Open `/dashboard` for the member home, then `/renewals`, `/community` and `/learning` for the membership lifecycle.
3. Open `/conferences` and `/conferences/cfp` for booking, paper submission and attendance services.
4. Open `/research`, `/library` and `/journals` for the research profile, technical library and OJS-connected journal experience.
5. Open `/recognition`, `/careers`, `/partners` and `/governance` for the wider professional ecosystem.
6. Finish at `/secretariat/services` to show how the Secretariat supervises the same services operationally.

Additional fictional verification records are `NIMENA/FM/0087` and `NIMENA/SM/1294`. An unknown number should return a neutral not-found response without disclosing whether a private or inactive record exists.

## Production boundary

The routes and interactions are presentation-ready; they are not yet permitted to receive real records or money. Production activation requires:

- Verified authentication, account recovery and staff MFA
- PostgreSQL migrations based on `institutional-platform-schema.sql`
- Role and scope checks on every server mutation
- Private object storage, upload validation and malware scanning
- Paystack server initialization, signed webhooks and amount verification
- Approved membership grades, fees, chapter list and approval authorities
- Consent, privacy, retention and dispute procedures
- OJS staging access and an agreed identity/status integration method
- Email/SMS templates and an operational support process
- Backup, restoration, monitoring and incident-response testing

OJS remains authoritative for journal submissions, peer review, editorial decisions and publication. The portal may synchronise member identity, benefits, ORCID, reviewer recognition and status links, but it must not create a competing journal-review database.
