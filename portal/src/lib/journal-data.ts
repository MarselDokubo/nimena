export type JournalSlug = "ajomena" | "jbesed";

export type JournalArticle = {
  slug: string;
  title: string;
  authors: string[];
  affiliations: string[];
  abstract: string;
  keywords: string[];
  pages: string;
  section: string;
  received: string;
  accepted: string;
  published: string;
  doi: string;
};

export type JournalIssue = {
  slug: string;
  label: string;
  title: string;
  published: string;
  articles: JournalArticle[];
};

export type Journal = {
  slug: JournalSlug;
  acronym: string;
  name: string;
  strapline: string;
  description: string;
  scope: string[];
  sections: string[];
  proposedReview: string;
  publicationModel: string;
  issue: JournalIssue;
  archives: Array<{ label: string; title: string; published: string }>;
};

const ajomenaArticles: JournalArticle[] = [
  {
    slug: "condition-monitoring-coastal-support-vessels",
    title: "Condition-monitoring strategies for coastal support-vessel machinery",
    authors: ["Engr. Chinedu E. Okafor", "Dr Boma George"],
    affiliations: ["Sample Marine Research Centre, Lagos", "Department of Marine Engineering, Example University"],
    abstract:
      "This fictional demonstration article evaluates a practical condition-monitoring framework for medium-speed engines operating in coastal support service. It illustrates how vibration, lubricant and operating-history records could be combined to prioritise maintenance interventions without interrupting vessel availability.",
    keywords: ["condition monitoring", "marine engines", "maintenance", "coastal vessels"],
    pages: "1–14",
    section: "Original research",
    received: "12 May 2026",
    accepted: "18 August 2026",
    published: "30 September 2026",
    doi: "10.xxxx/ajomena.demo.001",
  },
  {
    slug: "modular-hull-inland-passenger-transport",
    title: "A modular hull concept for safer inland passenger transport",
    authors: ["Tomi Adeyemi", "Engr. Iniobong Ekanem"],
    affiliations: ["Sample Naval Architecture Laboratory", "Example Inland Waterways Institute"],
    abstract:
      "A fictional design study is used to demonstrate the journal article interface. The paper compares modular hull arrangements against selected stability, construction and maintainability criteria for inland passenger operations.",
    keywords: ["naval architecture", "inland waterways", "passenger vessel", "stability"],
    pages: "15–28",
    section: "Design study",
    received: "21 May 2026",
    accepted: "26 August 2026",
    published: "30 September 2026",
    doi: "10.xxxx/ajomena.demo.002",
  },
  {
    slug: "dry-dock-planning-local-shipyards",
    title: "Improving dry-dock planning capacity in local shipyards",
    authors: ["Maryam Bello"],
    affiliations: ["Demo Offshore Services, Port Harcourt"],
    abstract:
      "This sample professional paper presents a structured planning model covering inspection readiness, materials, workforce allocation and documentation during a vessel dry-docking cycle.",
    keywords: ["dry docking", "shipyard", "planning", "local capacity"],
    pages: "29–39",
    section: "Professional practice",
    received: "4 June 2026",
    accepted: "2 September 2026",
    published: "30 September 2026",
    doi: "10.xxxx/ajomena.demo.003",
  },
];

const jbesedArticles: JournalArticle[] = [
  {
    slug: "port-electrification-emerging-blue-economies",
    title: "Port-electrification pathways for emerging blue economies",
    authors: ["Dr Amina Yusuf", "Ifeanyi Nwosu"],
    affiliations: ["Sample Maritime Energy Institute", "Example School of Sustainable Infrastructure"],
    abstract:
      "This fictional demonstration article compares phased shore-power pathways for developing ports. It considers demand profiling, grid readiness, operational emissions and the institutional coordination required for credible implementation.",
    keywords: ["port electrification", "shore power", "blue economy", "energy transition"],
    pages: "1–16",
    section: "Original research",
    received: "8 April 2026",
    accepted: "14 August 2026",
    published: "30 September 2026",
    doi: "10.xxxx/jbesed.demo.001",
  },
  {
    slug: "financing-coastal-resilience",
    title: "Financing coastal resilience through blue-economy instruments",
    authors: ["Maryam Bello", "Dr Kelechi Obi"],
    affiliations: ["Demo Blue Finance Initiative", "Example Coastal Policy Centre"],
    abstract:
      "A sample policy study illustrates how blended finance, risk guarantees and measurable resilience outcomes may be structured for coastal infrastructure programmes.",
    keywords: ["coastal resilience", "blue finance", "infrastructure", "policy"],
    pages: "17–31",
    section: "Policy and practice",
    received: "16 April 2026",
    accepted: "22 August 2026",
    published: "30 September 2026",
    doi: "10.xxxx/jbesed.demo.002",
  },
  {
    slug: "energy-efficiency-small-vessel-operations",
    title: "Energy-efficiency opportunities in small-vessel operations",
    authors: ["Engr. Boma George"],
    affiliations: ["Sample Maritime Research Centre, Lagos"],
    abstract:
      "This fictional technical note demonstrates a concise journal format for operational research. It groups potential efficiency interventions into voyage planning, machinery condition, loading and crew practice.",
    keywords: ["energy efficiency", "small vessels", "operations", "emissions"],
    pages: "32–41",
    section: "Technical note",
    received: "2 June 2026",
    accepted: "5 September 2026",
    published: "30 September 2026",
    doi: "10.xxxx/jbesed.demo.003",
  },
];

export const journals: Record<JournalSlug, Journal> = {
  ajomena: {
    slug: "ajomena",
    acronym: "AJOMENA",
    name: "African Journal of Marine Engineering and Naval Architecture",
    strapline: "Engineering knowledge for safer, stronger maritime systems",
    description:
      "A proposed peer-reviewed platform for research and professional practice in marine engineering, naval architecture, shipbuilding and related maritime technologies.",
    scope: [
      "Marine machinery, propulsion and vessel systems",
      "Ship design, hydrodynamics and naval architecture",
      "Shipbuilding, repair, inspection and classification",
      "Offshore structures, subsea systems and operations",
      "Maritime safety, reliability and technical standards",
      "Digitalisation, autonomy and emerging marine technologies",
    ],
    sections: ["Original research", "Design study", "Technical note", "Professional practice", "Review article"],
    proposedReview: "Double-blind peer review",
    publicationModel: "Continuous publication with scheduled issues",
    issue: {
      slug: "vol-1-no-1-2026",
      label: "Volume 1 · Number 1 · 2026",
      title: "Marine systems, design and local technical capacity",
      published: "Prototype issue · 30 September 2026",
      articles: ajomenaArticles,
    },
    archives: [
      { label: "Forthcoming", title: "Offshore integrity and asset reliability", published: "Issue schedule to be approved" },
      { label: "Special issue concept", title: "Indigenous standards and technical sovereignty", published: "Guest editors to be confirmed" },
    ],
  },
  jbesed: {
    slug: "jbesed",
    acronym: "JBESED",
    name: "Journal of Blue Economy and Sustainable Energy Development",
    strapline: "Evidence for an inclusive and sustainable ocean economy",
    description:
      "A proposed interdisciplinary journal connecting blue-economy development, sustainable energy, coastal resilience, policy and responsible maritime investment.",
    scope: [
      "Blue-economy policy, governance and measurement",
      "Marine renewable energy and low-carbon shipping",
      "Port sustainability, logistics and electrification",
      "Coastal resilience, climate adaptation and communities",
      "Ocean finance, investment and technology transfer",
      "Environmental protection and responsible resource use",
    ],
    sections: ["Original research", "Policy and practice", "Technical note", "Case study", "Review article"],
    proposedReview: "Double-blind peer review",
    publicationModel: "Continuous publication with scheduled issues",
    issue: {
      slug: "vol-1-no-1-2026",
      label: "Volume 1 · Number 1 · 2026",
      title: "Ports, energy transition and coastal resilience",
      published: "Prototype issue · 30 September 2026",
      articles: jbesedArticles,
    },
    archives: [
      { label: "Forthcoming", title: "Marine energy and just transition pathways", published: "Issue schedule to be approved" },
      { label: "Special issue concept", title: "Unlocking Nigeria's blue-economy potential", published: "Guest editors to be confirmed" },
    ],
  },
};

export const journalList = Object.values(journals);

export function getJournal(slug: string) {
  return journals[slug as JournalSlug];
}

export function getArticle(journalSlug: string, articleSlug: string) {
  return getJournal(journalSlug)?.issue.articles.find((article) => article.slug === articleSlug);
}

export const editorialPipeline = [
  { reference: "AJM-2026-184", journal: "AJOMENA", title: "Reliability-centred maintenance for coastal support vessels", stage: "Under review", owner: "Section Editor", age: "8 days" },
  { reference: "JBS-2026-096", journal: "JBESED", title: "Port electrification pathways for emerging blue economies", stage: "Revision requested", owner: "Author", age: "3 days" },
  { reference: "AJM-2026-179", journal: "AJOMENA", title: "Composite repair methods for small craft hulls", stage: "Editorial screening", owner: "Editor-in-Chief", age: "2 days" },
  { reference: "JBS-2026-089", journal: "JBESED", title: "Community indicators for coastal adaptation projects", stage: "Copyediting", owner: "Production Editor", age: "5 days" },
] as const;

export const reviewerAssignment = {
  reference: "AJM-2026-184-R2",
  journal: "AJOMENA",
  title: "Reliability-centred maintenance for coastal support vessels",
  abstract:
    "This fictional blinded manuscript proposes a risk-ranked maintenance model combining failure history, condition observations and operational criticality for coastal support vessels.",
  keywords: ["maintenance", "reliability", "support vessels", "risk ranking"],
  due: "5 October 2026",
  round: "Round 1",
  files: ["Blinded manuscript · PDF", "Review form · online"],
} as const;
