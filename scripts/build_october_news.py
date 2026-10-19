#!/usr/bin/env python3
"""Build the October 2026 NIMENA news pages from the shared site shell."""

from __future__ import annotations

from html import escape
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "news-blue-economy-reforms" / "index.html"

RECENT_UPDATES = """<div class="sidebar__widget mb-40">
<h3 class="sidebar__widget-title">Recent Updates</h3>
<div class="sidebar__widget-content">
<div class="sidebar__post rc__post"><div class="rc__post mb-20 d-flex align-items-center"><div class="rc__post-thumb mr-20"><a href="../news-maritime-energy-ecm/"><img alt="NIMENA Maritime and Energy ECM" src="../assets/img/nimena/archive/hero-shipyard.webp"/></a></div><div class="rc__post-content"><h3 class="rc__post-title"><a href="../news-maritime-energy-ecm/">NIMENA launches Maritime and Energy ECM</a></h3><div class="rc__meta"><span>October 14, 2026</span></div></div></div>
<div class="rc__post mb-20 d-flex align-items-center"><div class="rc__post-thumb mr-20"><a href="../news-eferebo-maritime-innovation-award/"><img alt="Engr. Eferebo I. Sylvanus receives the Maritime Innovation Award" src="../assets/img/nimena/news/eferebo-maritime-innovation-award.webp"/></a></div><div class="rc__post-content"><h3 class="rc__post-title"><a href="../news-eferebo-maritime-innovation-award/">Eferebo receives Maritime Innovation Award</a></h3><div class="rc__meta"><span>October 12, 2026</span></div></div></div>
<div class="rc__post mb-20 d-flex align-items-center"><div class="rc__post-thumb mr-20"><a href="../news-call-for-papers/"><img alt="NIMENA Conference 2026 Call for Papers poster" src="../assets/img/nimena/news/nimena-conference-2026-call-for-papers.jpeg"/></a></div><div class="rc__post-content"><h3 class="rc__post-title"><a href="../news-call-for-papers/">Call for Papers: NIMENA’s two maritime journals</a></h3><div class="rc__meta"><span>August 17, 2026</span></div></div></div>
</div>
</div>
</div>"""


ARTICLES = [
    {
        "slug": "news-maritime-energy-ecm",
        "title": "NIMENA launches Maritime and Energy ECM, calls for united national innovation agenda",
        "description": (
            "NIMENA has launched a Maritime and Energy Ecosystem Capability Model to assess Nigeria’s "
            "innovation readiness and guide coordinated action across industry, government and academia."
        ),
        "article": """<article class="postbox__item-single format-image mb-50 transition-3">
<div class="postbox__thumb m-img">
<img alt="Nigeria's maritime and energy innovation ecosystem" decoding="async" loading="eager" src="../assets/img/nimena/archive/hero-shipyard.webp"/>
</div>
<div class="postbox__content">
<div class="postbox__meta"><span><i class="far fa-calendar-check"></i> October 14, 2026</span><span><i class="far fa-newspaper"></i> NIMENA / Media Coverage</span></div>
<h3 class="postbox__title">NIMENA launches Maritime and Energy ECM, calls for united national innovation agenda</h3>
<div class="postbox__text"><p class="lead">NIMENA has launched the Maritime and Energy Ecosystem Capability Model (ECM), an evidence-led framework developed with Plug and Play to assess Nigeria’s innovation readiness and guide coordinated national action.</p><p>The assessment examines five connected dimensions—capital, networks, society, initiatives and regulation—and places Nigeria’s maritime and energy innovation ecosystem at an emerging stage, with an overall score of 43.75 out of 100.</p><p>The findings identify regulation as a relative strength while highlighting gaps in industry networks, public engagement, commercialisation pathways, early-stage funding and the connection between research institutions and market needs.</p><p>NIMENA’s proposed response includes a national Maritime and Energy Innovation Hub, clearer testing and regulatory pathways, stronger skills development, coordinated financing and a five-year roadmap intended to move the ecosystem toward an advanced level by 2030.</p><p>The initiative calls on government, industry, academia, investors and professional bodies to work from a shared national innovation agenda capable of converting Nigeria’s maritime and energy potential into jobs, technology, enterprise growth and sustainable economic value.</p><blockquote><p>This NIMENA summary consolidates the institutional announcement and independent media reports. Follow the publisher links below for their complete accounts.</p><cite>NIMENA News Desk</cite></blockquote>
<h4>Media coverage</h4><div class="nimena-source-list" aria-label="Media coverage of the NIMENA Maritime and Energy Ecosystem Capability Model"><a href="https://thesun.ng/nimena-launches-maritime-and-energy-ecm-calls-for-united-national-innovation-agenda/" rel="noopener noreferrer" target="_blank">The Sun <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://www.thisdaylive.com/2026/10/14/nimena-launches-maritime-and-energy-ecm-calls-for-united-national-innovation-agenda/" rel="noopener noreferrer" target="_blank">ThisDay <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://championnews.com.ng/nimena-launches-maritime-and-energy-ecm-calls-for-united-national-innovation-agenda/" rel="noopener noreferrer" target="_blank">Champion News <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://independent.ng/nimena-launches-maritime-and-energy-ecm-calls-for-united-national-innovation-agenda/" rel="noopener noreferrer" target="_blank">Independent <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://thenationonlineng.net/nimena-launches-ecm-assessment-for-nigerias-maritime-energy-sectors/" rel="noopener noreferrer" target="_blank">The Nation <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://leadership.ng/nimena-calls-for-national-innovation-agenda-for-maritime-energy-sectors/" rel="noopener noreferrer" target="_blank">Leadership <i class="fa-light fa-arrow-up-right-from-square"></i></a></div></div>
<div class="postbox__tag tagcloud"><span>Themes: </span><a href="../blog/">Innovation</a><a href="../blog/">Maritime &amp; Energy</a><a href="../blog/">Technology</a><a href="../blog/">National Capability</a></div>
</div>
</article>""",
    },
    {
        "slug": "news-eferebo-maritime-innovation-award",
        "title": "Engr. Eferebo receives Maritime Innovation and Technology Leadership Award",
        "description": (
            "NIMENA National Chairman Engr. Eferebo I. Sylvanus received the Maritime Innovation and "
            "Technology Leadership Award at the 15th Democracy Heroes Award Africa ceremony in Abuja."
        ),
        "image": "https://nimena.org.ng/assets/img/nimena/news/eferebo-maritime-innovation-award.webp",
        "image_alt": "Engr. Eferebo I. Sylvanus receives the Maritime Innovation and Technology Leadership Award in Abuja",
        "article": """<article class="postbox__item-single format-image mb-50 transition-3">
<div class="postbox__thumb m-img">
<img alt="Engr. Eferebo I. Sylvanus receives the Maritime Innovation and Technology Leadership Award in Abuja" decoding="async" loading="eager" src="../assets/img/nimena/news/eferebo-maritime-innovation-award.webp"/>
</div>
<div class="postbox__content">
<div class="postbox__meta"><span><i class="far fa-calendar-check"></i> October 12, 2026</span><span><i class="far fa-newspaper"></i> NIMENA / Media Coverage</span></div>
<h3 class="postbox__title">Engr. Eferebo receives Maritime Innovation and Technology Leadership Award</h3>
<div class="postbox__text"><p class="lead">NIMENA National Chairman Engr. Eferebo I. Sylvanus, PhD, FNSE, received the Maritime Innovation and Technology Leadership Award at the 15th Democracy Heroes Award Africa ceremony in Abuja.</p><p>The recognition was presented during the “Elevate” ceremony held on October 9, 2026 at the Congress Hall, Transcorp Hilton, and acknowledged his work in marine engineering, technology-led sector development and professional leadership.</p><p>Independent reports connected the award to his advocacy for indigenous maritime technology, stronger engineering capability, research, standards and innovation systems that can retain more value within Nigeria’s maritime and energy sectors.</p><p>The honour also reinforces NIMENA’s wider institutional agenda: connecting professional competence, industry collaboration, policy reform and innovation to practical national development.</p><blockquote><p>This NIMENA summary consolidates the institutional announcement and independent media reports. Follow the publisher links below for their complete accounts.</p><cite>NIMENA News Desk</cite></blockquote>
<h4>Media coverage</h4><div class="nimena-source-list" aria-label="Media coverage of Engr. Eferebo's Maritime Innovation and Technology Leadership Award"><a href="https://dailytrust.com/nimena-national-chair-eferebo-bags-democracy-heroes-award/" rel="noopener noreferrer" target="_blank">Daily Trust <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://leadership.ng/nimena-chairman-eferebo-bags-maritime-innovation-award/" rel="noopener noreferrer" target="_blank">Leadership <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://www.thisdaylive.com/2026/10/11/floodgates-of-congratulations-as-nimena-national-chairman-eferebo-bags-democracy-heroes-award/" rel="noopener noreferrer" target="_blank">ThisDay Recognition <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://www.thisdaylive.com/2026/10/12/eferebo-receives-maritime-innovation-award-at-abuja-ceremony/" rel="noopener noreferrer" target="_blank">ThisDay Ceremony <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://independent.ng/eferebo-advocates-indigenous-maritime-technology-as-he-bags-innovation-award/" rel="noopener noreferrer" target="_blank">Independent <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://blueprint.ng/maritime-expert-bags-innovation-and-technology-leadership-award/" rel="noopener noreferrer" target="_blank">Blueprint <i class="fa-light fa-arrow-up-right-from-square"></i></a><a href="https://peoplesdaily.ng/nigerias-maritime-technology-challenge-takes-centre-stage-as-engineer-wins-africa-award/" rel="noopener noreferrer" target="_blank">Peoples Daily <i class="fa-light fa-arrow-up-right-from-square"></i></a></div></div>
<div class="postbox__tag tagcloud"><span>Themes: </span><a href="../blog/">Recognition</a><a href="../blog/">Leadership</a><a href="../blog/">Maritime Innovation</a><a href="../blog/">Technology</a></div>
</div>
</article>""",
    },
]


def replace_meta(html: str, attribute: str, key: str, value: str) -> str:
    pattern = rf'<meta content="[^"]*" {attribute}="{re.escape(key)}"/>'
    replacement = f'<meta content="{escape(value, quote=True)}" {attribute}="{key}"/>'
    return re.sub(pattern, replacement, html, count=1)


def build(article: dict[str, str]) -> None:
    html = TEMPLATE.read_text(encoding="utf-8")
    title = article["title"]
    description = article["description"]
    url = f'https://nimena.org.ng/{article["slug"]}/'

    html = re.sub(
        r"<title>.*?</title>",
        f"<title>{escape(title)} | NIMENA</title>",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = replace_meta(html, "name", "description", description)
    html = re.sub(
        r'<link href="[^"]+" rel="canonical"/>',
        f'<link href="{url}" rel="canonical"/>',
        html,
        count=1,
    )
    html = replace_meta(html, "property", "og:type", "article")
    html = replace_meta(html, "property", "og:title", f"{title} | NIMENA")
    html = replace_meta(html, "property", "og:description", description)
    html = replace_meta(html, "property", "og:url", url)
    if article.get("image"):
        html = replace_meta(html, "property", "og:image", article["image"])
        html = replace_meta(html, "property", "og:image:secure_url", article["image"])
        html = replace_meta(html, "property", "og:image:type", "image/webp")
        html = replace_meta(html, "property", "og:image:width", "1010")
        html = replace_meta(html, "property", "og:image:height", "730")
        html = replace_meta(html, "property", "og:image:alt", article["image_alt"])
    html = replace_meta(html, "name", "twitter:title", f"{title} | NIMENA")
    html = replace_meta(html, "name", "twitter:description", description)
    html = replace_meta(html, "name", "twitter:url", url)
    if article.get("image"):
        html = replace_meta(html, "name", "twitter:image", article["image"])
        html = replace_meta(html, "name", "twitter:image:alt", article["image_alt"])

    html = re.sub(
        r'(<h3 class="breadcrumb__title-2">News &amp; Insights</h3>\s*)<p>.*?</p>',
        rf"\1<p>{escape(description)}</p>",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'<article class="postbox__item-single.*?</article>',
        article["article"],
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'<div class="sidebar__widget mb-40">\s*<h3 class="sidebar__widget-title">Recent Updates</h3>.*?(?=<div class="sidebar__widget mb-40">\s*<h3 class="sidebar__widget-title">Topics</h3>)',
        RECENT_UPDATES + "\n",
        html,
        count=1,
        flags=re.DOTALL,
    )

    destination = ROOT / article["slug"] / "index.html"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(html, encoding="utf-8")
    print(f"Built {destination.relative_to(ROOT)}")


if __name__ == "__main__":
    for item in ARTICLES:
        build(item)
