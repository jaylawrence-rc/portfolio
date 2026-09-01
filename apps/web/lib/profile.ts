export const profile = {
  name: "Jay Lawrence Dimaano",
  title: "Product Engineer / Frontend-Leaning Full-Stack Engineer",
  location: "Cainta, Rizal, Philippines",
  timezone: "GMT+8",
  phone: "+639774539951",
  phoneDisplay: "+63 977 453 9951",
  email: "jaydimaano@proton.me",
  github: "https://github.com/JayLawrence23",
  linkedin: "https://linkedin.com/in/jaylawrencee",
  resumePath: "/jay-lawrence-dimaano-resume.pdf",
} as const;

export const experience = [
  {
    company: "Healthcare AI SaaS Platform for Skilled Nursing Facilities",
    role: "Full-Stack Engineer & Team Lead",
    period: "Sep 2025 — Present",
    location: "Startup company",
    summary: "Leading product and engineering for an AI-powered skilled-nursing referral and clinical compliance platform.",
    bullets: [
      "Translate founder and clinical stakeholder requirements into technical and product specifications across a multi-agent AI pipeline.",
      "Own technical direction for PDPM projection, HIPPS code generation, clinical compliance workflows, and a nurse-correction critic loop.",
      "Bridge product, design, and backend engineering while leading the frontend Turborepo and platform design system.",
    ],
  },
  {
    company: "Chartmetric",
    role: "Product Engineer",
    period: "Jun 2024 — Dec 2025",
    location: "New York City, USA · Remote",
    summary: "Developed Music Stats and improved Chartmetric’s core music-intelligence product.",
    bullets: [
      "Built Music Stats, a public music-tech platform that showcases key Chartmetric capabilities and creates a path into the main product.",
      "Implemented new core-product features, resolved critical bugs, and improved frontend performance and user experience.",
    ],
  },
  {
    company: "Captivate Chat · Xoots",
    role: "Full-Stack Engineer · Contract",
    period: "Nov 2023 — Sep 2026",
    location: "Remote",
    summary: "Led end-to-end frontend development for a connected AI recruitment platform.",
    bullets: [
      "Built product experiences across Interview-X, Talent-X, Academy-X, and Search-X.",
      "Shipped the platform for internal use, where it supported the successful hiring of multiple key talents.",
    ],
  },
  {
    company: "Evelan GmbH",
    role: "Full-Stack Engineer",
    period: "Jul 2023 — Jun 2024",
    location: "Hamburg, Germany · Remote",
    summary: "Built dynamic, maintainable web experiences on a reusable Sanity CMS foundation.",
    bullets: [
      "Developed dynamic websites and web pages using Sanity as a headless CMS.",
      "Designed blog features and flexible content sections to improve content visibility, accessibility, and interaction.",
    ],
  },
  {
    company: "T.E.A.M DAO",
    role: "Full-Stack Web3 Engineer · Part-time",
    period: "Aug 2024 — Nov 2024",
    location: "Remote",
    summary: "Built REKT, a Web3 game delivered through a real-time Telegram bot experience.",
    bullets: [
      "Developed the REKT Telegram bot and integrated real-time coin prices.",
      "Used Socket.IO to display live chart data directly inside the bot interface.",
    ],
  },
] as const;

export const skillGroups = [
  {
    label: "Product & frontend",
    skills: ["React", "Next.js", "TypeScript", "Design systems", "Framer Motion", "CSS animation", "Storybook", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  },
  {
    label: "Backend & data",
    skills: ["Node.js", "NestJS", "Express", "PostgreSQL", "MySQL", "MongoDB", "Redis", "BullMQ", "Sanity"],
  },
  {
    label: "AI & infrastructure",
    skills: ["LangChain", "OpenAI", "Anthropic", "Azure AI", "AWS", "Vercel", "Netlify", "S3", "RDS", "Turborepo"],
  },
] as const;

export const education = [
  {
    school: "Polytechnic University of the Philippines",
    program: "Bachelor of Science in Information Technology",
    detail: "Object-oriented programming, data structures and algorithms, and database development.",
  },
  {
    school: "STI College — Ortigas Cainta",
    program: "Information and Communication Technology",
    detail: "Basic programming, object-oriented programming, and mobile development.",
  },
] as const;
