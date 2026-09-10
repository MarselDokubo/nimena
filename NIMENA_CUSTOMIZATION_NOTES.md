# NIMENA Miiler Customization

## Design direction
- `index.html` is the canonical homepage and preserves the Miiler template's design language, spacing, animation system, navy/orange/white palette, typography and component architecture.
- `index-nimena.html` remains only in the working source as an earlier draft/reference. It is intentionally excluded from the clean production package.
- The original NIMENA project was used as a content guide, not as a design source.

## Content work
- Rewrote the core public pages around NIMENA: marine engineering, naval architecture, professional development, membership, research, technical knowledge, standards, leadership, blue-economy development and industry collaboration.
- Reused useful historical/institutional material from the supplied NIMENA project while avoiding blind copying of outdated or weak content.
- Added stronger organization-oriented copy where the supplied project did not provide enough suitable content.
- Retained the current Miiler visual compositions rather than redesigning the site into a different theme.

## Final cleanup completed
- Removed the leftover Miiler construction/video block from the homepage.
- Removed unrelated YouTube/demo video links.
- Replaced visible template placeholder images (e.g. dimension placeholders such as 630x520, 894x382, 50x50 and 100x80) with optimized NIMENA imagery.
- Replaced old construction-oriented icons/text where they were still visible in NIMENA content.
- Rebuilt the duplicated FAQ column with distinct, NIMENA-relevant questions and answers.
- Replaced breadcrumb, footer-news, blog, testimonial and activity placeholder imagery with NIMENA assets while preserving the original Miiler layouts.
- Replaced remaining template brand/logo placeholders with NIMENA-oriented values and themes.
- Corrected breadcrumb Home links and service-card links that still pointed to `#`.
- Changed the generic `Pages` navigation label to `Community` without changing the menu structure.
- Removed obsolete cart-mini markup and corrected inherited social/action icons.
- Normalized the embedded map to Port Harcourt, Rivers State rather than exposing an unconfirmed historical street address.

## Assets
- Optimized WebP assets are in `assets/img/nimena/`.
- `assets/img/logo/nimena-logo.svg` is a path-based SVG trace of the supplied NIMENA web logo for crisp header use.
- The original membership application document is included in `assets/documents/`.

## Production package
The clean production ZIP contains only the NIMENA-facing pages required by the current navigation plus the assets needed to render them. Unused Miiler shop/cart/checkout/product pages, alternate demo homepages and the `index-nimena.html` draft are not included in the production build.

## Items to confirm before public launch
- Confirm the preferred official public headquarters/address and any central telephone number. The supplied legacy project contains more than one historical office address.
- Connect Member Portal/Login/Registration to the approved membership backend before production use.
- Connect newsletter/contact interactions to the approved mail/form service if browser email behaviour is not desired.
- Confirm official social media URLs and add any additional channels NIMENA wants to publish.

## Visual QA correction pass — 6 September 2026

Based on review of the production screenshots, the following presentation defects were corrected without changing the Miiler visual system:

- Removed the remaining Miiler/Construction Co. header logo asset and replaced every live reference with the NIMENA SVG emblem.
- Preserved the characteristic raised central header-logo block on inner pages, now styled in the existing navy palette around the NIMENA emblem.
- Improved readability of every inner-page photographic hero by applying a stronger navy overlay and white heading/body copy.
- Repaired the footer layout by constraining the Current Focus thumbnails and the Get in Touch image to the dimensions expected by the original Miiler footer components.
- Confirmed that the production package contains no live `Miller`, `Construction Co.` or `logo-black.png` references.
- Re-ran local-reference QA: 14 HTML pages, zero broken local asset/page references.
- Header refinement: the NIMENA emblem now remains at the far left before navigation on every public page; the old central blue logo block is removed.
- Breadcrumb refinement: inner pages now use a floating navy/orange breadcrumb ribbon with non-duplicated hierarchy and mobile overflow handling.

### Header emblem alignment refinement — 6 September 2026
- Removed Miiler's original `margin-top: -35px` logo overlap behavior from the NIMENA header.
- The NIMENA SVG emblem is now vertically centered inside the main navigation row on every page.
- The same centered position is preserved when the header becomes sticky.
- The far-left logo placement and existing responsive navigation structure remain unchanged.


## 2026-09-10 Content & Asset Update
- `assets/img/executives/` is now the source of truth for named executive portraits.
- Added web-optimised executive images with safe filenames; the original named files remain untouched.
- Replaced distracting backgrounds for the National Treasurer and Ex Officio portraits with neutral studio backgrounds.
- `assets/img/current/` is used for current 2025–2026 activity imagery. The two Singapore images are now featured in the homepage gallery, gallery page, news and current-focus areas.
- Older NIMENA photographs remain under `assets/img/nimena/archive/` and are labelled as archive highlights when displayed in gallery contexts.
- Updated News & Insights using the five user-supplied media reports from Vanguard, Independent, Punch, The Guardian Nigeria and Abuja Press. Each local article summary links to the publisher’s original coverage.
- Preserved Miiler’s navy/orange/white visual system and retained the soft dark gallery overlay.

## Refinements — 10 September 2026 (Executive Carousel / Focus / Footer / Overflow)
- Restored Engr. Eziwho Wike's supplied original photograph so his real face is preserved. No generative face replacement is used in the website asset.
- Executive carousel is constrained to the viewport and now auto-advances every 3.4 seconds, pauses on hover, and resumes after manual interaction.
- Executive portrait cards use consistent 4:5 geometry and equal sizing.
- Homepage "NIMENA in Action" cards now use equal image/body heights and aligned CTAs.
- Homepage "Member Value" cards now use equal-height tiles regardless of line wrapping.
- Replaced the generic circular "Our Focus" progress graphics with three bespoke angular SVG illustrations for Professional Competence, Research & Innovation, and Industry Collaboration.
- Reworked the Explore NIMENA footer navigation into a clean two-column grid with improved spacing and hover behavior.
- Removed page-wide horizontal overflow on the About page while retaining the Miiler layered history composition.


## Refinements — 10 September 2026 (layout/UI pass)
- Redesigned the About-page institutional milestone band.
- Equalised About news cards and history milestone cards.
- Equalised all What We Do service cards and added the supplied industrial-visit image.
- Replaced circular NIMENA Focus graphics with purpose-built SVG line illustrations.
- Equalised Professional Value slider cards.
- Made the News sidebar sticky on desktop.
- Added manual previous/next navigation to the Executive Leadership carousel while retaining autoplay.
- Vertically aligned the homepage Who We Are and National Chairman split sections.
- Replaced placeholder Behance/YouTube footer icons with NIMENA LinkedIn, Instagram, Facebook and email links across the site.
- Login and registration remain front-end placeholders and require an authentication/member database backend before production use.
