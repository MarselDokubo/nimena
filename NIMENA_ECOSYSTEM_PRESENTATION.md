# NIMENA Digital Ecosystem — Presentation Guide

## The three connected services

| Service | Presentation role | Production responsibility |
| --- | --- | --- |
| Main NIMENA website | Public identity, programmes, news, membership information and research discovery | `https://nimena.org.ng/` |
| Member portal | Applications, member records, renewals, CPD, conferences and research profiles | Planned for `https://portal.nimena.org.ng/` |
| NIMENA Journals | AJOMENA/JBESED discovery, author guidance and editorial journey | OJS remains authoritative at `https://nimenajournals.com/` |

The journal presentation routes are implemented inside the portal application so they can be reviewed safely before the design is ported into an OJS theme. No prototype action writes to live OJS.

## Run the presentation locally

```bash
cd portal
npm install
npm run dev
```

Open `http://localhost:3000/`.

No credentials are required. Choose **Member workspace**, **Secretariat workspace**, or **NIMENA Journals** from the entry screen.

## Recommended presentation sequence

1. Open `/` and explain the single entry point for member, Secretariat and journal demonstrations.
2. Open `/dashboard` to show the member record and the links to research, conferences and journals.
3. Open `/journals` and use the top service switcher to explain the relationship between the three platforms.
4. Compare `/journals/ajomena` and `/journals/jbesed`.
5. Open `/journals/call-for-papers` and show journal selection and manuscript preparation.
6. Demonstrate `/journals/author`, `/journals/reviewer` and `/journals/editor` as the target OJS experience.
7. Return to `/research` to show how a member profile can complement OJS without duplicating confidential journal records.

## Journal routes to review

- `/journals`
- `/journals/about`
- `/journals/ajomena`
- `/journals/jbesed`
- `/journals/ajomena/issues`
- `/journals/jbesed/issues`
- `/journals/call-for-papers`
- `/journals/announcements`
- `/journals/contact`
- `/journals/policies`
- `/journals/author`
- `/journals/reviewer`
- `/journals/editor`

## Important presentation boundary

- Journal articles, authors, DOI values and workflow records in the prototype are fictional.
- Selected files are not uploaded.
- Drafts stay in the local browser.
- Live author accounts, manuscripts, reviews and decisions remain in OJS.
- ISSNs, DOI configuration, indexing, editorial boards, fees and policy wording must be verified before the OJS redesign is released.
