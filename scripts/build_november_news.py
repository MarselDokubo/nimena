#!/usr/bin/env python3
"""Build the November 2026 Asia-Pacific media story from the shared site shell."""

from __future__ import annotations

from html import escape
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "news-blue-economy-reforms" / "index.html"
SLUG = "news-asia-pacific-opportunities"
TITLE = "NIMENA connects Nigerian startups and maritime stakeholders to Asia-Pacific opportunities"
DESCRIPTION = (
    "NIMENA's 2026 Asia-Pacific engagement connected Nigerian maritime and energy startups, "
    "professionals and industry stakeholders with investment, technology and collaboration opportunities."
)
IMAGE = "https://nimena.org.ng/assets/img/current/singapore.jpeg"
IMAGE_ALT = "NIMENA delegates and international partners at the 2026 Asia-Pacific Summit in Singapore"

SOURCES = [
    (
        "ThisDay",
        "https://www.thisdaylive.com/2026/11/12/nimena-connects-nigerian-startups-maritime-players-to-asia-pacific-opportunities/",
    ),
    (
        "Vanguard",
        "https://www.vanguardngr.com/2026/11/singapore-summit-critical-to-nigerias-maritime-sector-devt-eferebo/",
    ),
    (
        "Peoples Daily",
        "https://peoplesdaily.ng/nimena-connects-nigerian-startups-maritime-players-to-asia-pacific-investment-opportunities/",
    ),
    (
        "Leadership",
        "https://leadership.ng/nimena-opens-up-asia-pacific-market-for-nigerian-startups/",
    ),
    (
        "Independent",
        "https://independent.ng/nigeria-seeks-asian-investment-technology-to-accelerate-blue-economy-growth/",
    ),
    (
        "Daily Times",
        "https://dailytimesng.com/nimena-opens-up-asia-pacific-market-for-nigerian-startups-maritime-industry-workers/",
    ),
    (
        "The Nation",
        "https://thenationonlineng.net/nimena-seeks-stronger-government-industry-collaboration-to-develop-blue-economy/",
    ),
    (
        "New Telegraph",
        "https://newtelegraphng.com/nimena-opens-up-asia-pacific-market-for-nigerian-start-ups/",
    ),
    (
        "Press Icon",
        "https://pressicon123.com/nimena-opens-up-asia-pacific-market-for-nigerian-start-upsby-philip-nyamabuja/",
    ),
    (
        "Champion News",
        "https://championnews.com.ng/nimena-opens-up-asia-pacific-market-for-nigerian-startups-maritime-industry-stakeholders/",
    ),
]


def source_links(*, icons: bool = True) -> str:
    icon = ' <i class="fa-light fa-arrow-up-right-from-square"></i>' if icons else ""
    return "".join(
        f'<a href="{escape(url, quote=True)}" rel="noopener noreferrer" target="_blank">'
        f"{escape(name)}{icon}</a>"
        for name, url in SOURCES
    )


RECENT_UPDATES = """<div class="sidebar__widget mb-40">
<h3 class="sidebar__widget-title">Recent Updates</h3>
<div class="sidebar__widget-content">
<div class="sidebar__post rc__post"><div class="rc__post mb-20 d-flex align-items-center"><div class="rc__post-thumb mr-20"><a href="../news-asia-pacific-opportunities/"><img alt="NIMENA Asia-Pacific engagement" src="../assets/img/current/singapore.jpeg"/></a></div><div class="rc__post-content"><h3 class="rc__post-title"><a href="../news-asia-pacific-opportunities/">NIMENA opens Asia-Pacific opportunities</a></h3><div class="rc__meta"><span>November 12, 2026</span></div></div></div>
<div class="rc__post mb-20 d-flex align-items-center"><div class="rc__post-thumb mr-20"><a href="../news-maritime-energy-ecm/"><img alt="NIMENA Maritime and Energy ECM" src="../assets/img/nimena/archive/hero-shipyard.webp"/></a></div><div class="rc__post-content"><h3 class="rc__post-title"><a href="../news-maritime-energy-ecm/">NIMENA launches Maritime and Energy ECM</a></h3><div class="rc__meta"><span>October 14, 2026</span></div></div></div>
<div class="rc__post mb-20 d-flex align-items-center"><div class="rc__post-thumb mr-20"><a href="../news-eferebo-maritime-innovation-award/"><img alt="Engr. Eferebo I. Sylvanus receives the Maritime Innovation Award" src="../assets/img/nimena/news/eferebo-maritime-innovation-award.webp"/></a></div><div class="rc__post-content"><h3 class="rc__post-title"><a href="../news-eferebo-maritime-innovation-award/">Eferebo receives Maritime Innovation Award</a></h3><div class="rc__meta"><span>October 12, 2026</span></div></div></div>
</div>
</div>
</div>"""


ARTICLE = f"""<article class="postbox__item-single format-image mb-50 transition-3">
<div class="postbox__thumb m-img">
<img alt="{escape(IMAGE_ALT, quote=True)}" decoding="async" loading="eager" src="../assets/img/current/singapore.jpeg"/>
</div>
<div class="postbox__content">
<div class="postbox__meta"><span><i class="far fa-calendar-check"></i> November 12, 2026</span><span><i class="far fa-newspaper"></i> NIMENA / Global Engagement</span></div>
<h3 class="postbox__title">{escape(TITLE)}</h3>
<div class="postbox__text">
<p class="lead">NIMENA's 2026 Asia-Pacific engagement in Singapore connected Nigerian maritime and energy startups, industry professionals and institutional stakeholders with international investors, technology partners and market opportunities.</p>
<p>The engagement brought together NIMENA and Plug and Play Asia Pacific around a practical objective: help Nigerian innovators build relationships that can support investment, technology transfer, commercialisation and access to the wider Asia-Pacific maritime ecosystem.</p>
<p>For Nigeria's blue economy, the opportunity extends beyond individual startups. Stronger links among government, industry, academia, investors and professional bodies can improve the pathway from local research and engineering ideas to tested solutions, scalable enterprises and maritime jobs.</p>
<p>NIMENA National Chairman Engr. Eferebo I. Sylvanus, PhD, FNSE, described the Singapore platform as an important bridge between Nigeria's maritime potential and the capital, expertise and partnerships needed to accelerate sector development.</p>
<p>The initiative reinforces NIMENA's wider agenda of indigenous capacity, professional standards, technical innovation and international collaboration—while keeping Nigerian talent and enterprise at the centre of blue-economy growth.</p>
<blockquote><p>This NIMENA summary consolidates the institutional engagement and independent media reports. Every publisher supplied to NIMENA is listed below for direct access to its complete report.</p><cite>NIMENA News Desk</cite></blockquote>
<h4>Coverage across 10 media organisations</h4>
<p>Open any publication below to read its full report in a new tab.</p>
<div class="nimena-source-list" aria-label="Ten media reports covering NIMENA's 2026 Asia-Pacific engagement">{source_links()}</div>
</div>
<div class="postbox__tag tagcloud"><span>Themes: </span><a href="../blog/">Asia-Pacific</a><a href="../blog/">Blue Economy</a><a href="../blog/">Startups</a><a href="../blog/">Investment</a><a href="../blog/">Technology Transfer</a></div>
</div>
</article>"""


def replace_meta(html: str, attribute: str, key: str, value: str) -> str:
    pattern = rf'<meta content="[^"]*" {attribute}="{re.escape(key)}"/>'
    replacement = f'<meta content="{escape(value, quote=True)}" {attribute}="{key}"/>'
    return re.sub(pattern, replacement, html, count=1)


def build() -> None:
    html = TEMPLATE.read_text(encoding="utf-8")
    url = f"https://nimena.org.ng/{SLUG}/"

    html = re.sub(
        r"<title>.*?</title>",
        f"<title>{escape(TITLE)} | NIMENA</title>",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = replace_meta(html, "name", "description", DESCRIPTION)
    html = re.sub(
        r'<link href="[^"]+" rel="canonical"/>',
        f'<link href="{url}" rel="canonical"/>',
        html,
        count=1,
    )
    html = replace_meta(html, "property", "og:type", "article")
    html = replace_meta(html, "property", "og:title", f"{TITLE} | NIMENA")
    html = replace_meta(html, "property", "og:description", DESCRIPTION)
    html = replace_meta(html, "property", "og:url", url)
    html = replace_meta(html, "property", "og:image", IMAGE)
    html = replace_meta(html, "property", "og:image:secure_url", IMAGE)
    html = replace_meta(html, "property", "og:image:type", "image/jpeg")
    html = replace_meta(html, "property", "og:image:width", "1536")
    html = replace_meta(html, "property", "og:image:height", "1152")
    html = replace_meta(html, "property", "og:image:alt", IMAGE_ALT)
    html = replace_meta(html, "name", "twitter:title", f"{TITLE} | NIMENA")
    html = replace_meta(html, "name", "twitter:description", DESCRIPTION)
    html = replace_meta(html, "name", "twitter:url", url)
    html = replace_meta(html, "name", "twitter:image", IMAGE)
    html = replace_meta(html, "name", "twitter:image:alt", IMAGE_ALT)

    html = re.sub(
        r'(<h3 class="breadcrumb__title-2">News &amp; Insights</h3>\s*)<p>.*?</p>',
        rf"\1<p>{escape(DESCRIPTION)}</p>",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'<article class="postbox__item-single.*?</article>',
        ARTICLE,
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

    destination = ROOT / SLUG / "index.html"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(html, encoding="utf-8")
    print(f"Built {destination.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
