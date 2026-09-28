# NIMENA Journals Prototype Guide

## Purpose

This route family is a presentation-ready, browser-only prototype for the future AJOMENA and JBESED experience. It allows NIMENA to review the information architecture, visual identity and editorial journeys before any change is made to the live OJS installation at `nimenajournals.com`.

## Presentation routes

| Route | Demonstrates |
| --- | --- |
| `/journals` | Shared NIMENA Journals homepage, discovery and publishing journey |
| `/journals/ajomena` | AJOMENA identity, scope and current issue |
| `/journals/jbesed` | JBESED identity, scope and current issue |
| `/journals/ajomena/issues` | AJOMENA current issue and archive design |
| `/journals/jbesed/issues` | JBESED current issue and archive design |
| `/journals/call-for-papers` | Call for Papers, journal selection and manuscript preparation |
| `/journals/policies` | Proposed policy and research-integrity structure |
| `/journals/author` | Five-stage manuscript submission |
| `/journals/reviewer` | Invitation, confidential review and recommendation |
| `/journals/editor` | Screening, reviewer assignment, decisions, production and launch readiness |

## Safe testing boundary

- All people, manuscripts, issues, dates, DOI values and affiliations are fictional.
- Author drafts are stored only in the current browser under `nimena.journals.author-draft.v1`.
- Selecting a manuscript file records only its filename in React state; the file is not uploaded or transmitted.
- Reviewer and editor decisions are temporary interface state and disappear after a reload.
- The prototype does not connect to the live OJS database, email service, Crossref, ORCID or payment gateway.
- No indexing, ISSN, DOI, fee, peer-review or publication-frequency claim should be treated as approved policy.

## Migration to OJS

Once approved, the prototype becomes the implementation specification for the existing OJS installation:

1. Back up the OJS database, `files_dir`, public files and `config.inc.php`.
2. Clone production to a protected staging environment.
3. Recreate the approved public interface as a supported OJS 3.5 theme or child theme.
4. Configure AJOMENA and JBESED as separate journals within the installation.
5. Enter the approved scopes, sections, policies, boards, email templates, forms and decision options.
6. Configure DOI, ORCID, preservation, SMTP and indexing integrations only after verification.
7. Run a complete fictional submission through author, editor, reviewer, copyediting, proofing and publication.
8. Complete security, permissions, backup and recovery tests before replacing the live theme or opening submissions.
