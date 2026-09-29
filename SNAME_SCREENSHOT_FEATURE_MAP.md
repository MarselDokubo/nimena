# SNAME screenshot feature map for the NIMENA remodel

This document records the public-site patterns visible in the supplied SNAME screenshots and the NIMENA equivalent implemented in this branch. It is a structural reference, not permission to copy SNAME text, branding, data, awards, partners, event details, or member statistics.

## Visible SNAME information architecture

### Global navigation and access

- Utility links for About, merchandise, communities, careers, account access, joining and login.
- Five primary subject areas: Membership & Communities; Education & Careers; Conferences & Events; Recognition & Awards; Research & Publications.
- Global search and persistent account/login access.
- Large multi-column footer with policies, find-information links, publications, contact, social links and membership actions.

### Homepage

- Mission-led hero with timely news, events and support/donation actions.
- Prominent Join and Renew membership calls to action.
- Featured programme and event cards.
- Magazine and latest technical-paper promotion.
- Organisation reach/impact statistics.
- A visual directory of membership, education, events, publications, networking and career services.
- Member-dashboard login panel.
- Corporate affiliate and media-partner promotion.

### Membership and communities

- Membership benefits, types, fees, join and renew journeys.
- Geographic sections, committees and interest communities.
- Member testimonials and community value statements.
- Account/dashboard access.

### Education and careers

- Expandable groups for education, careers and professional resources.
- Webinars, professional development hours, review courses and learning libraries.
- Career centre and career spotlights/member stories.

### Conferences and events

- Main convention promotion plus partner-event directory.
- Dates, venues, descriptions, event identity and registration links.
- Event calendar and webinar access.

### Recognition and awards

- Scholarships, medals, awards and winners archive.
- Nomination actions for medals, Fellowship and scholarships.
- Individual medal/programme detail pages.

### Research and publications

- Journal and transaction catalogue.
- Technical and research programmes, reports and papers.
- Magazine subscriptions and digital issues.
- Purchased-publication access, author opportunities and advertising opportunities.

### Corporate and institutional participation

- Corporate affiliate programme with participation tiers.
- Academic affiliate route.
- Media partners and advertising opportunities.
- Partner recognition and a non-member conversion call to action.

## NIMENA implementation

| SNAME pattern | NIMENA equivalent | Route |
| --- | --- | --- |
| Membership & Communities | Benefits, current NIMENA membership pathways, application/renewal steps and community routes | `/membership/` |
| Communities directory | Chapters, technical participation, students/young professionals and volunteering | `/community/` |
| Education & Careers | CPD, courses, webinars, learning records, mentoring and career pathways | `/education-careers/` |
| Conferences & Events | Event catalogue, delegate journey, conference CFP, past activities and sponsorship | `/conferences/` |
| Recognition & Awards | Proposed awards, Fellowship, scholarships, nomination governance and future archive | `/recognition/` |
| Research & Publications | AJOMENA, JBESED, calls, conference research, magazine and member research services | `/research/` |
| Professional magazine | Accessible commentary and industry stories distinct from peer-reviewed journals | `/magazine/` |
| Corporate affiliate programme | Corporate, academic, programme and knowledge/media partnerships | `/partnerships/` |
| Member dashboard | Existing membership and scholarly-services prototype entry | `/login/` |
| Join and renew | Public application and member-login routes | `/register/`, `/login/` |
| Site search | Functional client-side public resource search | `/search/` |
| News and timely content | Existing news, media coverage, reports and Call for Papers | `/blog/`, `/news-call-for-papers/` |

## Accuracy boundaries

- No SNAME text, images, event data, award names, membership counts, partner names or programme claims are reused.
- Membership categories follow the NIMENA application material already used by the portal prototype.
- Unapproved fees, event dates, award criteria, scholarship values and partnership benefits are not invented.
- Empty directories and future archives remain visibly pending until the Secretariat approves and supplies records.
- Journal submission and peer review continue to belong to OJS; the public site explains and links to that workflow.

