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
  { href: "/dashboard#documents", label: "Documents", icon: "file" },
  { href: "/dashboard#community", label: "Community", icon: "users" },
] as const;

export const secretariatNavigation = [
  { href: "/secretariat", label: "Overview", icon: "home" },
  { href: "/secretariat#applications", label: "Applications", icon: "file" },
  { href: "/secretariat#members", label: "Members", icon: "users" },
  { href: "/secretariat#renewals", label: "Renewals", icon: "wallet" },
  { href: "/secretariat#reports", label: "Reports", icon: "chart" },
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
