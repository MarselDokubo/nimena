# NIMENA Website — Miiler Customized Production Build

Open `index.html` to start the site.

This build keeps the Miiler template's visual system and adapts the content, imagery and navigation for the Nigerian Institution of Marine Engineers and Naval Architects (NIMENA).

## Main pages
- `index.html` — Home (canonical homepage)
- `about/index.html` — About NIMENA
- `membership/index.html` — membership benefits, pathways, application, renewal and community entry
- `community/index.html` — chapters, technical participation, students, mentoring and volunteering
- `education-careers/index.html` — education, CPD, careers, mentoring and professional resources
- `conferences/index.html` — event directory, delegate journey and conference CFP
- `recognition/index.html` — awards, Fellowship, scholarships, nomination governance and future archive
- `research/index.html` — Research & Journals hub, journal pathways and conference services
- `programmes/index.html` — Institutional programmes
- `magazine/index.html` — NIMENA professional magazine
- `partnerships/index.html` — corporate, academic, programme, knowledge and sponsorship routes
- `search/index.html` — functional public resource search
- `services/index.html` — Professional Services
- `services-details/index.html` — legacy membership detail route retained for compatibility
- `team/index.html` — National Leadership
- `team-details/index.html` — Leadership / Institution detail
- `portfolio/index.html` — Gallery & Activities
- `portfolio-details/index.html` — Activity detail
- `blog/index.html` — News & Insights
- `blog-details/index.html` — Shipbuilding trend report (latest featured article)
- `news-singapore-local-capacity/index.html` — Singapore Maritime Week / local-capacity coverage
- `news-blue-economy-standards/index.html` — Standards and blue-economy coverage
- `news-blue-economy-reforms/index.html` — Technical reform and blue-economy coverage
- `news-local-content/index.html` — Local-content and indigenous-capacity coverage
- `faq/index.html` — Frequently Asked Questions
- `contact/index.html` — Contact
- `login/index.html` / `register/index.html` — transition pages for the single secure member portal planned at `portal.nimena.org.ng`

The earlier `index-nimena.html` draft and unused Miiler commerce/demo pages are intentionally not part of this production build.

See `NIMENA_CUSTOMIZATION_NOTES.md` for cleanup and launch notes.

### September 2026 visual QA fixes
The current build includes the follow-up corrections for the inner-page header brand, breadcrumb/hero readability, and footer image sizing. The obsolete Miiler logo image is no longer included in the production assets.


### September 10, 2026 content and asset refresh
- Executive cards now use the named files in `assets/img/executives/` as the source of truth. Web-optimised, safe-filename copies are included for reliable browser loading.
- Distracting backgrounds on the National Treasurer and Ex Officio portraits were replaced with neutral studio backgrounds for a consistent executive presentation.
- `assets/img/current/` contains the current 2025–2026 activity photographs used in the gallery and news sections.
- Previous NIMENA photographs remain in `assets/img/nimena/archive/` and are presented as archive highlights rather than current activities.
- News & Insights now includes five source-grounded NIMENA media stories supplied for this update, with links back to the original publishers.
- The soft dark gallery overlay and Miiler navy/orange/white visual language are preserved.

## Clean URL structure for GitHub Pages

This build has been restructured so public pages no longer require `.html` in their URLs. Each page now lives in its own directory as `index.html`. Examples:

- `/about/` → `about/index.html`
- `/services/` → `services/index.html`
- `/team/` → `team/index.html`
- `/blog/` → `blog/index.html`
- `/news-singapore-local-capacity/` → `news-singapore-local-capacity/index.html`

The site uses relative links so it can work both as a GitHub Pages project site (for example `https://<user>.github.io/nimena/`) and later behind a custom domain. A `.nojekyll` file is included for direct static serving by GitHub Pages.


## Institutional programme additions

- `programmes/index.html` — public accreditation and endorsement, innovation and technology transfer, professional magazine, and industry partnership/sponsorship hub.
- `magazine/index.html` — public professional magazine distinct from AJOMENA and JBESED peer-reviewed journals.
- `portal/src/app/programmes/` — browser-only prototype submission workspace.
- `portal/src/app/secretariat/programmes/` — prototype Secretariat screening queue.
- `portal/src/app/journals/` — presentation prototype for AJOMENA, JBESED, author submission, peer review and editorial production.
- `portal/docs/INSTITUTIONAL_PROGRAMMES_BLUEPRINT.md` — governance and production requirements.

The public accreditation directory is deliberately empty until NIMENA formally approves criteria, assessors and publishing authority.

## Research, journals and conferences

- `research/index.html` is the public route to AJOMENA, JBESED, author guidance, researcher services, conference pathways and the current Call for Papers.
- Journal manuscript submission and peer review remain in OJS at `nimenajournals.com`; the public site and portal link to those records rather than duplicating them.
- `portal/src/app/research/` demonstrates a member research profile and OJS-linked status summaries.
- `portal/src/app/conferences/` demonstrates conference registration, CFP submission, attendance and CPD.
- `portal/src/app/secretariat/conferences/` demonstrates abstract review, decisions and programme scheduling.
- `portal/docs/OJS_AUDIT_2026-09-27.md` records the public OJS audit and staging prerequisites.

All new research and conference records are fictional prototype data. No real payment, upload, OJS write or editorial decision is performed.

## SNAME-informed public ecosystem remodel

The September 29 remodel adopts the useful structural ideas visible in the supplied SNAME screenshots while retaining NIMENA's own content, navy/orange identity and existing site design. It adds connected public routes for membership, community, education/careers, conferences, recognition and industry partnerships; a functional site search; join/renew shortcuts; and a clearer homepage directory.

See `SNAME_SCREENSHOT_FEATURE_MAP.md` for the screenshot inventory, route mapping and accuracy boundaries. Run `python3 scripts/build_public_ecosystem_pages.py` to regenerate the new public hubs from the shared page template, followed by `python3 scripts/refresh_public_site_shell.py` to synchronise navigation, search routes, footer links and public contact details across the static site.
