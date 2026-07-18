export interface WorkItem {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  icon: string; // lucide icon name, e.g. "building-2" — used until a company logo is provided
  logo?: string; // optional path to a company logo under /public
  bullets: string[];
  link?: string;
}

export const workData: WorkItem[] = [
  {
    role: "Cyber Technology Researcher",
    company: "Leonardo",
    location: "Rome, Italy",
    period: "Jun. 2026 - Current",
    current: true,
    icon: "shield-check",
    logo: "/leonardo.webp",
    bullets: [
      "Focusing on advanced security architectures and threat mitigation strategies.",
      "Contributing by evolving and integrating open-source projects into our products and security pipelines.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Daikin Applied Europe",
    location: "Rome, Italy",
    period: "Sep. 2025 - Jun. 2026",
    icon: "factory",
    logo: "/daikin.webp",
    bullets: [
      "Redesigned the MSSQL database and invented a custom tracking algorithm that cut duplicate occurrences by over 90%.",
      "Leveraged LLMs to reverse-engineer proprietary communication protocols, building a custom client for a closed-source PLC.",
      "Automated CI/CD on-premise deployments with GitHub Actions, NSSM, and Nginx, cutting deployment overhead by 86%.",
      "Engineered computer vision pipelines that fully automated video processing and camera interaction for industrial testing.",
      "Executed a CRA-aligned security assessment to identify system vulnerabilities and implement architectural mitigation strategies.",
    ],
  },
];
