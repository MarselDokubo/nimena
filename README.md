# NIMENA Website — Miiler Customized Production Build

Open `index.html` to start the site.

This build keeps the Miiler template's visual system and adapts the content, imagery and navigation for the Nigerian Institution of Marine Engineers and Naval Architects (NIMENA).

## Main pages
- `index.html` — Home (canonical homepage)
- `about.html` — About NIMENA
- `services.html` — Professional Services
- `services-details.html` — Membership
- `team.html` — National Leadership
- `team-details.html` — Leadership / Institution detail
- `portfolio.html` — Gallery & Activities
- `portfolio-details.html` — Activity detail
- `blog.html` — News & Insights
- `blog-details.html` — Shipbuilding trend report (latest featured article)
- `news-singapore-local-capacity.html` — Singapore Maritime Week / local-capacity coverage
- `news-blue-economy-standards.html` — Standards and blue-economy coverage
- `news-blue-economy-reforms.html` — Technical reform and blue-economy coverage
- `news-local-content.html` — Local-content and indigenous-capacity coverage
- `faq.html` — Frequently Asked Questions
- `contact.html` — Contact
- `login.html` / `register.html` — Member portal interface placeholders pending backend integration

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
