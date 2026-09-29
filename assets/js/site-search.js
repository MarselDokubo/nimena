(function () {
  "use strict";

  const records = [
    { title: "About NIMENA", url: "../about/", type: "Institution", description: "History, purpose, vision, mission and institutional information.", keywords: "about history vision mission institution governance" },
    { title: "National Leadership", url: "../team/", type: "Institution", description: "National and chapter leaders guiding NIMENA.", keywords: "leadership executives chairman secretary council governance" },
    { title: "Membership & Professional Community", url: "../membership/", type: "Membership", description: "Benefits, grades, application, renewals and member services.", keywords: "join apply renew benefits corporate associate graduate student member" },
    { title: "Chapters, Committees & Communities", url: "../community/", type: "Community", description: "Local professional activity, technical participation, students, mentoring and volunteering.", keywords: "chapters sections committees community students young professionals mentors volunteer" },
    { title: "Member Portal", url: "../login/", type: "Member services", description: "Access the NIMENA member-services portal preview.", keywords: "portal login dashboard member records cpd renew application" },
    { title: "Apply for Membership", url: "../register/", type: "Membership", description: "Begin a NIMENA membership application.", keywords: "register registration apply join membership" },
    { title: "Education, CPD & Careers", url: "../education-careers/", type: "Professional development", description: "Courses, webinars, CPD records, mentoring and career resources.", keywords: "education training cpd webinar course career jobs mentoring certificate" },
    { title: "Conferences & Events", url: "../conferences/", type: "Events", description: "Conferences, webinars, chapter events, registration and conference calls for papers.", keywords: "conference event webinar calendar register ticket abstract cfp proceedings" },
    { title: "Recognition, Awards & Scholarships", url: "../recognition/", type: "Recognition", description: "Professional awards, Fellowship, scholarships, nominations and verified records.", keywords: "recognition awards medals fellowship scholarship grants nominations winners" },
    { title: "Research & Journals", url: "../research/", type: "Research", description: "AJOMENA, JBESED, scholarly publishing, author guidance and research services.", keywords: "research journals ajomena jbesed publication paper author reviewer ojs" },
    { title: "Call for Papers", url: "../news-call-for-papers/", type: "Research", description: "Current information about submitting research to NIMENA journals.", keywords: "call papers submission manuscript ajomena jbesed research" },
    { title: "NIMENA Magazine", url: "../magazine/", type: "Publication", description: "Accessible technical commentary, interviews, chapter stories and industry trends.", keywords: "magazine commentary interview stories insight article media" },
    { title: "Industry Partnerships & Sponsorships", url: "../partnerships/", type: "Partnerships", description: "Corporate, academic, programme, media and knowledge collaboration.", keywords: "partners partnership sponsorship corporate academic affiliate media advertise" },
    { title: "Institutional Programmes", url: "../programmes/", type: "Programmes", description: "Accreditation, innovation, technology transfer, magazine and partnerships.", keywords: "accreditation endorsement innovation technology transfer programmes" },
    { title: "Professional Services", url: "../services/", type: "Services", description: "NIMENA professional, technical and industry services.", keywords: "services professional standards technical consulting" },
    { title: "News & Insights", url: "../blog/", type: "News", description: "Institutional news, maritime insight and independent media coverage.", keywords: "news media updates insight press articles" },
    { title: "Gallery & Activities", url: "../portfolio/", type: "Activities", description: "Current and archived NIMENA conferences, engagements and professional activities.", keywords: "gallery photos activities singapore conference events archive" },
    { title: "Frequently Asked Questions", url: "../faq/", type: "Help", description: "Answers to common questions about NIMENA.", keywords: "faq help questions membership contact" },
    { title: "Contact NIMENA", url: "../contact/", type: "Contact", description: "Contact the National Headquarters and regional offices.", keywords: "contact email phone office abuja lagos port harcourt secretariat" },
    { title: "Blue Economy Technical Reforms", url: "../news-blue-economy-reforms/", type: "Insight", description: "NIMENA perspectives on technical reform and Nigeria's blue-economy potential.", keywords: "blue economy reform revenue policy standards" },
    { title: "Maritime Standards & Local Capability", url: "../news-blue-economy-standards/", type: "Insight", description: "Technical sovereignty, standards, classification and local capability.", keywords: "standards local capability classification sovereignty" },
    { title: "Singapore Maritime Collaboration", url: "../news-singapore-local-capacity/", type: "Global engagement", description: "NIMENA's maritime innovation and local-capacity engagement in Singapore.", keywords: "singapore innovation capacity investors startup global" }
  ];

  const form = document.getElementById("nimena-site-search");
  const input = document.getElementById("nimena-search-query");
  const summary = document.getElementById("nimena-search-summary");
  const results = document.getElementById("nimena-search-results");

  if (!form || !input || !summary || !results) return;

  const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);

  const search = (rawQuery) => {
    const query = rawQuery.trim().toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);

    if (!terms.length) {
      summary.textContent = "Enter a keyword to search NIMENA's public resources.";
      results.innerHTML = "";
      return;
    }

    const matches = records.filter((record) => {
      const haystack = `${record.title} ${record.type} ${record.description} ${record.keywords}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });

    summary.textContent = matches.length
      ? `${matches.length} result${matches.length === 1 ? "" : "s"} for “${rawQuery.trim()}”`
      : `No public resources matched “${rawQuery.trim()}”. Try a broader term.`;

    results.innerHTML = matches.map((record) => `
      <article class="nimena-search-result">
        <span>${escapeHtml(record.type)}</span>
        <h2><a href="${record.url}">${escapeHtml(record.title)}</a></h2>
        <p>${escapeHtml(record.description)}</p>
        <a class="nimena-search-result__link" href="${record.url}">Open resource</a>
      </article>
    `).join("");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value;
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
    search(query);
  });

  input.addEventListener("input", () => search(input.value));

  const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
  input.value = initialQuery;
  search(initialQuery);
})();

