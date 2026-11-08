export type PublicMemberRecord = {
  memberId: string;
  name: string;
  postNominals: string;
  grade: string;
  professionalRank: string;
  chapter: string;
  status: "Active" | "Inactive";
  validThrough: string;
  disciplines: string[];
  degrees: string[];
  accomplishments: string[];
};

export const publicMemberRecords: PublicMemberRecord[] = [
  {
    memberId: "NIMENA/GM/0742",
    name: "Engr. Amina Yusuf",
    postNominals: "GNIMENA",
    grade: "Graduate Member",
    professionalRank: "Graduate Member",
    chapter: "Lagos Chapter",
    status: "Active",
    validThrough: "31 March 2027",
    disciplines: ["Marine Engineering", "Offshore Systems"],
    degrees: ["B.Eng. Marine Engineering", "M.Sc. Offshore Engineering"],
    accomplishments: [
      "NIMENA Emerging Professional Recognition, 2026",
      "18 verified CPD hours in the current cycle",
    ],
  },
  {
    memberId: "NIMENA/FM/0087",
    name: "Engr. Chinedu Okafor",
    postNominals: "FNIMENA, FNSE",
    grade: "Fellow",
    professionalRank: "Fellow of NIMENA",
    chapter: "Eastern Chapter",
    status: "Active",
    validThrough: "31 March 2027",
    disciplines: ["Naval Architecture", "Ship Production"],
    degrees: ["B.Tech. Marine Engineering", "PGD Naval Architecture"],
    accomplishments: [
      "Fellowship conferred for professional service and technical leadership",
      "Chair, Ship Production Technical Panel, 2025–2026",
    ],
  },
  {
    memberId: "NIMENA/SM/1294",
    name: "Ifeoma Nwankwo",
    postNominals: "SNIMENA",
    grade: "Student Member",
    professionalRank: "Student Member",
    chapter: "Eastern Chapter",
    status: "Active",
    validThrough: "31 March 2027",
    disciplines: ["Naval Architecture"],
    degrees: ["B.Tech. Naval Architecture — in progress"],
    accomplishments: ["Finalist, NIMENA Student Design Challenge, 2026"],
  },
];

export const chapterDirectory = [
  {
    name: "Lagos Chapter",
    region: "South West",
    chair: "Engr. T. Adeyemi",
    members: 286,
    nextEvent: "Port systems technical forum · 18 November 2026",
  },
  {
    name: "Eastern Chapter",
    region: "South South / South East",
    chair: "Engr. B. George",
    members: 214,
    nextEvent: "Marine machinery reliability workshop · 3 December 2026",
  },
  {
    name: "Abuja Emerging Chapter",
    region: "North Central",
    chair: "Interim coordinating committee",
    members: 68,
    nextEvent: "Policy and blue-economy roundtable · Date to be confirmed",
  },
];

export const professionalCommunities = [
  {
    name: "Young Professionals Network",
    type: "Career community",
    members: 148,
    purpose: "Mentoring, early-career learning, site visits and leadership development.",
  },
  {
    name: "Student Chapters Council",
    type: "Student community",
    members: 203,
    purpose: "Campus chapters, design challenges, internships and faculty-adviser support.",
  },
  {
    name: "Technical Standards Committee",
    type: "Standing committee",
    members: 24,
    purpose: "Codes, standards, classification, technical guidance and policy submissions.",
  },
  {
    name: "Research & Publications Committee",
    type: "Standing committee",
    members: 19,
    purpose: "Journals, proceedings, research ethics and knowledge dissemination.",
  },
];

export const learningCatalogue = [
  {
    id: "CPD-2026-041",
    title: "Marine Machinery Reliability and Failure Analysis",
    format: "Live webinar",
    level: "Intermediate",
    hours: 3,
    date: "19 November 2026",
    access: "Members: complimentary",
  },
  {
    id: "CPD-2026-044",
    title: "Naval Architecture Design Review Fundamentals",
    format: "On-demand course",
    level: "Foundation",
    hours: 6,
    date: "Available now",
    access: "Members: ₦12,500",
  },
  {
    id: "CPD-2026-047",
    title: "Blue Economy Project Appraisal",
    format: "Hybrid workshop",
    level: "Advanced",
    hours: 8,
    date: "5 December 2026",
    access: "Member and non-member rates",
  },
  {
    id: "CPD-2026-051",
    title: "Engineering Ethics, Safety and Professional Responsibility",
    format: "On-demand course",
    level: "All levels",
    hours: 4,
    date: "Available now",
    access: "Members: complimentary",
  },
];

export const technicalResources = [
  {
    id: "NIM-TR-2026-01",
    title: "Shipbuilding Industrialisation Trend Report",
    type: "Technical report",
    topic: "Ship Production",
    year: 2026,
    access: "Open access",
  },
  {
    id: "NIM-STD-2026-03",
    title: "Guidance for Marine Engineering Workshop Competence Assessment",
    type: "Standard & guidance",
    topic: "Professional Standards",
    year: 2026,
    access: "Member access",
  },
  {
    id: "NIM-PROC-2026-12",
    title: "Proceedings of the NIMENA Maritime Innovation Forum",
    type: "Conference proceedings",
    topic: "Innovation",
    year: 2026,
    access: "Open access",
  },
  {
    id: "NIM-WP-2025-07",
    title: "Indigenous Classification and Nigeria's Technical Sovereignty",
    type: "Policy paper",
    topic: "Classification",
    year: 2025,
    access: "Open access",
  },
  {
    id: "NIM-TR-2025-09",
    title: "Blue Economy Technical Capacity Baseline",
    type: "Technical report",
    topic: "Blue Economy",
    year: 2025,
    access: "Member access",
  },
];

export const recognitionProgrammes = [
  {
    title: "NIMENA Fellowship",
    type: "Professional grade",
    deadline: "31 January 2027",
    description: "Peer-nominated recognition for sustained distinction, leadership and service.",
  },
  {
    title: "Marine Engineering Excellence Medal",
    type: "Institutional award",
    deadline: "28 February 2027",
    description: "Recognition for an exceptional technical or professional contribution.",
  },
  {
    title: "Student Research Scholarship",
    type: "Scholarship",
    deadline: "15 March 2027",
    description: "Research support for eligible student members in marine and naval disciplines.",
  },
];

export const careerOpportunities = [
  {
    title: "Graduate Naval Architect",
    organisation: "Sample Ship Design Nigeria Ltd",
    type: "Full-time",
    location: "Lagos",
    closes: "24 November 2026",
  },
  {
    title: "Marine Engineering Internship",
    organisation: "Example Offshore Services",
    type: "Internship",
    location: "Port Harcourt",
    closes: "30 November 2026",
  },
  {
    title: "Technical Standards Research Assistant",
    organisation: "NIMENA Secretariat",
    type: "Fellowship",
    location: "Hybrid",
    closes: "12 December 2026",
  },
];

export const partnershipTiers = [
  {
    name: "Academic Affiliate",
    audience: "Universities, academies and research institutions",
    benefits: ["Student chapter support", "Research collaboration", "CPD and faculty engagement"],
  },
  {
    name: "Corporate Affiliate",
    audience: "Shipyards, operators, energy companies and service providers",
    benefits: ["Employee membership allocation", "Technical programme participation", "Partner directory profile"],
  },
  {
    name: "Strategic Sponsor",
    audience: "Institutions funding national programmes and major events",
    benefits: ["Programme naming opportunities", "Executive visibility", "Impact and outcome reporting"],
  },
];

export const governanceDocuments = [
  { title: "NIMENA Constitution and Governance Framework", category: "Governance", edition: "Current approved edition" },
  { title: "Strategic Plan 2027–2030", category: "Strategy", edition: "Draft for Council review" },
  { title: "Annual Report and Financial Summary 2026", category: "Reporting", edition: "Publication scheduled" },
  { title: "Professional Code of Conduct", category: "Policy", edition: "Member guidance" },
  { title: "Privacy and Records Retention Policy", category: "Policy", edition: "Portal launch requirement" },
];

export const secretariatDirectory = [
  { role: "National Chairman", office: "National leadership", contact: "chairman@nimena.org.ng" },
  { role: "National Secretary", office: "Governance and Council", contact: "secretary@nimena.org.ng" },
  { role: "Member Services", office: "Applications and renewals", contact: "membership@nimena.org.ng" },
  { role: "Research & Publications", office: "Journals and technical resources", contact: "publications@nimena.org.ng" },
  { role: "Conferences & CPD", office: "Events and professional development", contact: "events@nimena.org.ng" },
  { role: "Partnerships", office: "Corporate, academic and sponsorship enquiries", contact: "partnerships@nimena.org.ng" },
];

export function normalizeMemberId(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function findPublicMember(memberId: string) {
  const normalized = normalizeMemberId(memberId);
  return publicMemberRecords.find((member) => normalizeMemberId(member.memberId) === normalized && member.status === "Active");
}
