#!/usr/bin/env python3
"""Synchronise navigation, search, footer links and contact details across static pages."""

from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def prefix_for(path: Path) -> str:
    return "" if path.parent == ROOT else "../"


def main_navigation(prefix: str) -> str:
    home = prefix or "./"
    return f'''<nav id="mobile-menu"><ul>
<li><a href="{home}">Home</a></li>
<li class="has-dropdown"><a href="{prefix}membership/">Membership</a><ul class="submenu">
<li><a href="{prefix}membership/">Membership Overview</a></li><li><a href="{prefix}membership/#benefits">Member Benefits</a></li><li><a href="{prefix}membership/#pathways">Membership Pathways</a></li><li><a href="{prefix}community/">Chapters &amp; Communities</a></li><li><a href="{prefix}register/">Apply for Membership</a></li><li><a href="{prefix}login/">Member Portal</a></li></ul></li>
<li class="has-dropdown"><a href="{prefix}education-careers/">Education &amp; Careers</a><ul class="submenu">
<li><a href="{prefix}education-careers/">Learning &amp; CPD</a></li><li><a href="{prefix}education-careers/#careers">Careers &amp; Mentoring</a></li><li><a href="{prefix}programmes/#accreditation">Accreditation &amp; Endorsement</a></li><li><a href="{prefix}services/">Professional Services</a></li></ul></li>
<li class="has-dropdown"><a href="{prefix}conferences/">Conferences</a><ul class="submenu">
<li><a href="{prefix}conferences/">Event Directory</a></li><li><a href="{prefix}conferences/#delegate">Delegate Registration</a></li><li><a href="{prefix}conferences/#cfp">Conference CFP</a></li><li><a href="{prefix}portfolio/">Past Activities</a></li></ul></li>
<li class="has-dropdown"><a href="{prefix}recognition/">Recognition</a><ul class="submenu">
<li><a href="{prefix}recognition/">Recognition Programmes</a></li><li><a href="{prefix}recognition/#programmes">Medals, Awards &amp; Fellowship</a></li><li><a href="{prefix}recognition/#archive">Recipients Archive</a></li><li><a href="{prefix}team/">National Leadership</a></li></ul></li>
<li class="has-dropdown"><a href="{prefix}research/">Research &amp; Publications</a><ul class="submenu">
<li><a href="{prefix}research/">Research &amp; Journals</a></li><li><a href="{prefix}news-call-for-papers/">Call for Papers</a></li><li><a href="{prefix}magazine/">NIMENA Magazine</a></li><li><a href="{prefix}blog/">News &amp; Media</a></li><li><a href="{prefix}partnerships/">Author &amp; Industry Opportunities</a></li></ul></li>
</ul></nav>'''


def utility_links(prefix: str, variant: bool) -> str:
    extra = " header__link-2" if variant else ""
    return f'''<div class="header__link{extra}">
<a href="{prefix}about/">About NIMENA</a>
<a href="{prefix}community/">Communities</a>
<a href="{prefix}education-careers/#careers">Careers</a>
<a href="{prefix}magazine/">Magazine</a>
<a href="{prefix}contact/">Contact</a>
</div>'''


def footer_navigation(prefix: str) -> str:
    return f'''<ul class="nimena-footer-nav">
<li><a href="{prefix}about/">About NIMENA</a></li><li><a href="{prefix}membership/">Membership</a></li><li><a href="{prefix}community/">Chapters &amp; Communities</a></li><li><a href="{prefix}education-careers/">Education, CPD &amp; Careers</a></li><li><a href="{prefix}conferences/">Conferences &amp; Events</a></li><li><a href="{prefix}recognition/">Recognition &amp; Awards</a></li><li><a href="{prefix}research/">Research &amp; Publications</a></li><li><a href="{prefix}magazine/">NIMENA Magazine</a></li><li><a href="{prefix}partnerships/">Industry Partnerships</a></li><li><a href="{prefix}programmes/">Institutional Programmes</a></li><li><a href="{prefix}blog/">News &amp; Media</a></li><li><a href="{prefix}portfolio/">Gallery &amp; Activities</a></li><li><a href="{prefix}search/">Search</a></li><li><a href="{prefix}contact/">Contact</a></li>
</ul>'''


for path in sorted(ROOT.rglob("index.html")):
    if "portal" in path.parts:
        continue

    html = path.read_text(encoding="utf-8")
    prefix = prefix_for(path)
    variant = "header__link header__link-2" in html

    html = re.sub(r'<nav id="mobile-menu">.*?</nav>', main_navigation(prefix), html, count=1, flags=re.S)
    html = re.sub(
        r'<div class="header__link(?: header__link-2)?">.*?</div>',
        utility_links(prefix, variant),
        html,
        count=1,
        flags=re.S,
    )
    html = re.sub(
        r'<ul class="header__lang-list">.*?</ul>',
        f'<ul class="header__lang-list"><li><a href="{prefix}register/">Join NIMENA</a></li><li><a href="{prefix}login/">Member Portal</a></li><li><a href="{prefix}research/">Journals</a></li><li><a href="{prefix}partnerships/">Partnerships</a></li></ul>',
        html,
        count=1,
        flags=re.S,
    )
    html = re.sub(
        r'<ul class="nimena-footer-nav">.*?</ul>',
        footer_navigation(prefix),
        html,
        count=1,
        flags=re.S,
    )

    # Make both global search entry points useful.
    html = re.sub(
        r'(<div class="offcanvas__search mb-25">\s*)<form action="#">\s*<input placeholder="What are you searching for\?" type="text"/>',
        rf'\1<form action="{prefix}search/" method="get">\n<input name="q" placeholder="What are you searching for?" type="search"/>',
        html,
        count=1,
        flags=re.S,
    )
    html = re.sub(
        r'(<div class="search__modal-form text-center">.*?<form) action="#"(>.*?<input) placeholder="Enter your keyword\.\.\." type="text"/>',
        rf'\1 action="{prefix}search/" method="get"\2 name="q" placeholder="Enter your keyword..." type="search"/>',
        html,
        count=1,
        flags=re.S,
    )
    html = re.sub(
        r'(<div class="sidebar__search">\s*)<form action="#">(\s*<div class="sidebar__search-input-2">\s*)<input placeholder="Search your keyword\.\.\." type="text"/>',
        rf'\1<form action="{prefix}search/" method="get">\2<input name="q" placeholder="Search your keyword..." type="search"/>',
        html,
        count=1,
        flags=re.S,
    )

    # Add a visible join action beside search/account without changing the mobile drawer.
    join_link = f'<a class="nimena-header-join" href="{prefix}register/">Join</a>'
    if "nimena-header-join" not in html:
        html = re.sub(
            rf'(<a href="{re.escape(prefix)}login/"><i class="fa-regular fa-user"></i></a>)',
            rf'\1\n{join_link}',
            html,
            count=1,
        )

    html = html.replace(
        '<a data-bs-target="#searchmodal" data-bs-toggle="modal" href="#"><i class="fa-regular fa-magnifying-glass"></i></a>',
        '<a aria-label="Search NIMENA" data-bs-target="#searchmodal" data-bs-toggle="modal" href="#"><i class="fa-regular fa-magnifying-glass"></i></a>',
    )
    html = html.replace(
        f'<a href="{prefix}login/"><i class="fa-regular fa-user"></i></a>',
        f'<a aria-label="Open Member Portal" href="{prefix}login/"><i class="fa-regular fa-user"></i></a>',
    )
    html = html.replace(
        'class="portfolio-view-btn popup-image"',
        'aria-label="View gallery image" class="portfolio-view-btn popup-image"',
    )

    html = html.replace("nimenahqt@nimena.com.ng", "nimenahqt@nimena.org.ng")
    html = html.replace('href="services-details/"', 'href="membership/"')
    html = html.replace('href="../services-details/"', 'href="../membership/"')
    html = re.sub(r'assets/css/style\.css\?v=[^"\']+', 'assets/css/style.css?v=20260929-5', html)
    path.write_text(html, encoding="utf-8")
    print(path.relative_to(ROOT))
