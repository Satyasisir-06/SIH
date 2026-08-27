// Official SIH 2026 Internal Hackathon details. Edit here to update the whole site.

export const EVENT = {
  name: "SMART INDIA HACKATHON (SIH) 2026 – INTERNAL HACKATHON",
  shortName: "SIH 2026",
  subtitle: "INTERNAL HACKATHON",
  tagline: "Innovate. Collaborate. Solve.",
  description:
    "An opportunity for students to develop technology-driven solutions for real-world problems through innovation, creativity, teamwork and problem-solving.",
  objective:
    "The programme aims to promote innovation, creativity, teamwork and problem-solving skills by providing students with an opportunity to develop technology-based solutions for real-world problems.",
  datesShort: "08 SEP — 10 SEP 2026",
  datesLong: "08 September 2026 – 10 September 2026",
  venue: "Seminar Hall, Abdul Kalam Block",
  teamSize: 6,
  femaleMemberRule: "At least 1 female member is mandatory per team.",
  fee: 0,
  feeLabel: "Free Registration",
  eligibility: "All 2nd, 3rd and 4th year students are eligible to participate.",
  deadlineLabel: "01 SEPTEMBER 2026",
  deadlineISO: "2026-09-01T23:59:59+05:30",
  // Placeholder — replace with the official college name when supplied.
  collegeName: "CEC",
} as const;

export const COORDINATORS = [
  {
    role: "SPOC / Faculty In-Charge",
    name: "Ch. Rama Chandra Reddy",
    detail: "AI Department",
    phone: "9573144854",
  },
  {
    role: "Student Coordinator",
    name: "P. Akhil",
    detail: "CSE & Allied Branches",
    phone: "7013432177",
  },
  {
    role: "Student Coordinator",
    name: "K. Vikash",
    detail: "ECE, EEE, MECH & CIVIL",
    phone: "7702202906",
  },
] as const;

export const SKILL_OPTIONS = [
  "Python",
  "Java",
  "C",
  "C++",
  "JavaScript",
  "React",
  "Node.js",
  "AI/ML",
  "Data Science",
  "IoT",
  "Robotics",
  "Cloud",
  "Cybersecurity",
  "UI/UX",
  "Database",
  "Hardware",
  "Other",
] as const;

export const YEAR_OPTIONS = ["2nd Year", "3rd Year", "4th Year"] as const;

export const FAQS = [
  { q: "Who can participate?", a: "All 2nd, 3rd and 4th year students." },
  { q: "What is the maximum team size?", a: "Up to 6 members." },
  {
    q: "Is a female member mandatory?",
    a: "Yes. At least 1 female member is mandatory per team.",
  },
  {
    q: "How is the payment completed?",
    a: "Payment can be completed by scanning the official QR code displayed on the hackathon poster.",
  },
  { q: "When is the registration deadline?", a: "01 September 2026." },
  { q: "When is the internal hackathon?", a: "08 September 2026 to 10 September 2026." },
  { q: "Where will it be conducted?", a: "Seminar Hall, Abdul Kalam Block." },
];
