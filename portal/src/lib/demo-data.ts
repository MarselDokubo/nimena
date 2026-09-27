export const membershipCategories = [
  "Corporate",
  "Associate",
  "Graduate",
  "Student",
  "Corporate Firm",
] as const;

export const chapters = ["Lagos Chapter", "Eastern Chapter", "Not sure"] as const;

export const memberNavigation = [
  { href: "/dashboard", label: "Overview", icon: "home" },
  { href: "/dashboard#membership", label: "Membership", icon: "card" },
  { href: "/dashboard#payments", label: "Payments", icon: "wallet" },
  { href: "/dashboard#development", label: "CPD & events", icon: "calendar" },
  { href: "/research", label: "Research profile", icon: "book" },
  { href: "/conferences", label: "Conferences", icon: "calendar" },
  { href: "/dashboard#documents", label: "Documents", icon: "file" },
  { href: "/dashboard#community", label: "Community", icon: "users" },
  { href: "/programmes", label: "Programmes", icon: "shield" },
] as const;

export const secretariatNavigation = [
  { href: "/secretariat", label: "Overview", icon: "home" },
  { href: "/secretariat#applications", label: "Applications", icon: "file" },
  { href: "/secretariat#members", label: "Members", icon: "users" },
  { href: "/secretariat#renewals", label: "Renewals", icon: "wallet" },
  { href: "/secretariat#reports", label: "Reports", icon: "chart" },
  { href: "/secretariat/programmes", label: "Programme reviews", icon: "shield" },
  { href: "/secretariat/conferences", label: "Conference management", icon: "calendar" },
  { href: "/secretariat#settings", label: "Settings", icon: "settings" },
] as const;

export type ApplicationStatus =
  | "New"
  | "Under review"
  | "Corrections requested"
  | "Committee review"
  | "Council consideration";

export type DemoApplication = {
  id: string;
  name: string;
  initials: string;
  category: (typeof membershipCategories)[number];
  chapter: string;
  received: string;
  age: string;
  status: ApplicationStatus;
  completeness: number;
};

export const demoApplications: DemoApplication[] = [
  {
    id: "NIM-2026-0142",
    name: "Chinedu Okafor",
    initials: "CO",
    category: "Corporate",
    chapter: "Lagos Chapter",
    received: "12 Sep 2026",
    age: "3 days",
    status: "Under review",
    completeness: 92,
  },
  {
    id: "NIM-2026-0141",
    name: "Boma George",
    initials: "BG",
    category: "Graduate",
    chapter: "Eastern Chapter",
    received: "11 Sep 2026",
    age: "4 days",
    status: "Corrections requested",
    completeness: 76,
  },
  {
    id: "NIM-2026-0139",
    name: "Tomi Adeyemi",
    initials: "TA",
    category: "Associate",
    chapter: "Lagos Chapter",
    received: "10 Sep 2026",
    age: "5 days",
    status: "Committee review",
    completeness: 100,
  },
  {
    id: "NIM-2026-0138",
    name: "Iniobong Ekanem",
    initials: "IE",
    category: "Student",
    chapter: "Eastern Chapter",
    received: "10 Sep 2026",
    age: "5 days",
    status: "New",
    completeness: 88,
  },
  {
    id: "NIM-2026-0135",
    name: "Maryam Bello",
    initials: "MB",
    category: "Corporate Firm",
    chapter: "Lagos Chapter",
    received: "8 Sep 2026",
    age: "7 days",
    status: "Council consideration",
    completeness: 100,
  },
];

export const applicationDetail = {
  id: "NIM-2026-0142",
  name: "Chinedu Okafor",
  category: "Corporate",
  chapter: "Lagos Chapter",
  status: "Under review",
  submitted: "12 September 2026 at 10:42",
  personal: [
    ["Full name", "Chinedu Emeka Okafor"],
    ["Email", "chinedu.okafor@example.com"],
    ["Telephone", "+234 800 000 0142"],
    ["Date of birth", "18 May 1988"],
    ["Sex", "Male"],
    ["Nationality", "Nigerian"],
    ["Permanent address", "Sample address, Lagos, Nigeria"],
  ],
  registration: [
    ["Engineering council", "COREN"],
    ["Registration number", "R.00,000"],
    ["Other professional body", "Nigerian Society of Engineers"],
    ["Membership type", "Corporate Member"],
    ["Membership number", "SAMPLE-001"],
    ["Effective date", "March 2020"],
  ],
  education: [
    {
      institution: "Rivers State University",
      qualification: "B.Tech",
      course: "Marine Engineering",
      year: "2012",
    },
    {
      institution: "Sample Maritime Academy",
      qualification: "PGD",
      course: "Naval Architecture",
      year: "2018",
    },
  ],
  employment: [
    {
      employer: "Sample Marine Services Ltd",
      position: "Senior Marine Engineer",
      projects: "Vessel maintenance and dry-dock planning",
      dates: "2019 – present",
    },
    {
      employer: "Example Shipyard Nigeria",
      position: "Marine Engineer",
      projects: "New-build supervision and machinery commissioning",
      dates: "2013 – 2019",
    },
  ],
  documents: [
    { name: "Passport photograph", type: "JPG", state: "Verified" },
    { name: "COREN certificate", type: "PDF", state: "Verified" },
    { name: "Academic certificates", type: "PDF", state: "Review needed" },
    { name: "Professional membership evidence", type: "PDF", state: "Verified" },
    { name: "Signature", type: "PNG", state: "Verified" },
  ],
} as const;


export type InstitutionalProgrammeKey =
  | "accreditation"
  | "innovation"
  | "magazine"
  | "partnerships";

export const institutionalProgrammes = [
  {
    key: "accreditation",
    title: "Accreditation & Endorsement",
    shortTitle: "Accreditation",
    description: "Apply for assessment of a training provider, course, laboratory or academic programme.",
    action: "Start an assessment request",
    evidence: "Curriculum, facilities, faculty, quality controls and supporting approvals",
  },
  {
    key: "innovation",
    title: "Innovation & Technology Transfer",
    shortTitle: "Innovation",
    description: "Submit an industry challenge, solution, startup, patent or commercialisation opportunity.",
    action: "Submit an innovation opportunity",
    evidence: "Problem statement, solution maturity, ownership, partners and support requested",
  },
  {
    key: "magazine",
    title: "Professional Magazine",
    shortTitle: "Magazine",
    description: "Pitch accessible technical commentary, interviews, chapter stories or industry lessons.",
    action: "Pitch a magazine contribution",
    evidence: "Working title, audience, synopsis, author profile and available media",
  },
  {
    key: "partnerships",
    title: "Industry Partnerships & Sponsorships",
    shortTitle: "Partnerships",
    description: "Propose a technical collaboration, programme partnership, sponsorship or institutional alliance.",
    action: "Propose a partnership",
    evidence: "Organisation profile, shared objective, contribution, beneficiaries and expected outcomes",
  },
] as const;

export type ProgrammeSubmissionStatus =
  | "Draft"
  | "Submitted for screening"
  | "Evidence review"
  | "Technical review"
  | "Decision pending";

export type DemoProgrammeSubmission = {
  id: string;
  programme: InstitutionalProgrammeKey;
  title: string;
  organisation: string;
  submitted: string;
  status: ProgrammeSubmissionStatus;
};

export const demoProgrammeSubmissions: DemoProgrammeSubmission[] = [
  {
    id: "ACC-2026-004",
    programme: "accreditation",
    title: "Marine Machinery Maintenance Diploma",
    organisation: "Sample Maritime Training Institute",
    submitted: "16 Sep 2026",
    status: "Evidence review",
  },
  {
    id: "INN-2026-011",
    programme: "innovation",
    title: "Low-cost vessel fuel monitoring challenge",
    organisation: "Example Coastal Logistics Ltd",
    submitted: "18 Sep 2026",
    status: "Technical review",
  },
  {
    id: "MAG-2026-007",
    programme: "magazine",
    title: "Lessons from preventable machinery failures",
    organisation: "Engr. Amina Yusuf",
    submitted: "19 Sep 2026",
    status: "Submitted for screening",
  },
  {
    id: "PAR-2026-003",
    programme: "partnerships",
    title: "Young Marine Engineers Skills Programme",
    organisation: "Demo Offshore Services",
    submitted: "20 Sep 2026",
    status: "Decision pending",
  },
];

export type ResearchSubmissionStatus =
  | "Editorial screening"
  | "Under review"
  | "Revision requested"
  | "Accepted";

export const demoResearchSubmissions = [
  {
    reference: "AJM-2026-184",
    journal: "AJOMENA",
    title: "Reliability-centred maintenance for coastal support vessels",
    status: "Under review" as ResearchSubmissionStatus,
    updated: "18 Sep 2026",
    ojsUrl: "https://nimenajournals.com/ajomena/login",
  },
  {
    reference: "JBS-2026-096",
    journal: "JBESED",
    title: "Port electrification pathways for emerging blue economies",
    status: "Revision requested" as ResearchSubmissionStatus,
    updated: "20 Sep 2026",
    ojsUrl: "https://nimenajournals.com/jbesed/login",
  },
] as const;

export const demoPublications = [
  {
    title: "Energy-efficiency opportunities in small vessel operations",
    journal: "Sample external publication",
    year: "2025",
    doi: "10.xxxx/sample-doi",
  },
  {
    title: "Digital inspection methods for marine machinery",
    journal: "Sample conference proceedings",
    year: "2024",
    doi: "Not supplied",
  },
] as const;

export type ConferenceSubmissionStatus =
  | "Administrative screening"
  | "Reviewer assignment"
  | "Under review"
  | "Revision requested"
  | "Accepted";

export const demoConferences = [
  {
    id: "CONF-DEMO-2027",
    title: "NIMENA Annual Technical Conference",
    label: "Demonstration event",
    date: "Date to be confirmed",
    venue: "Venue to be confirmed",
    mode: "In person with online sessions",
    registrationState: "Prototype registration open",
    abstractDeadline: "Deadline to be confirmed",
    memberFee: 45000,
    nonMemberFee: 65000,
    studentFee: 20000,
    tracks: [
      "Marine engineering systems",
      "Naval architecture and ship design",
      "Offshore engineering and energy",
      "Blue economy, policy and sustainability",
    ],
  },
] as const;

export const demoConferenceSubmissions = [
  {
    reference: "CFP-2027-031",
    title: "Condition monitoring for medium-speed marine engines",
    presenter: "Engr. Chinedu Okafor",
    track: "Marine engineering systems",
    type: "Full paper",
    status: "Under review" as ConferenceSubmissionStatus,
    score: 78,
  },
  {
    reference: "CFP-2027-029",
    title: "Modular hull concepts for inland passenger transport",
    presenter: "Tomi Adeyemi",
    track: "Naval architecture and ship design",
    type: "Extended abstract",
    status: "Reviewer assignment" as ConferenceSubmissionStatus,
    score: 0,
  },
  {
    reference: "CFP-2027-024",
    title: "Financing coastal resilience through blue-economy instruments",
    presenter: "Maryam Bello",
    track: "Blue economy, policy and sustainability",
    type: "Abstract",
    status: "Revision requested" as ConferenceSubmissionStatus,
    score: 64,
  },
] as const;
