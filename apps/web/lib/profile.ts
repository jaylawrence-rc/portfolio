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
    summary: "Turned complex clinical requirements into a launched AI platform and a more predictable product-delivery system.",
    bullets: [
      "Led the platform from ambiguous founder and clinical requirements to a client-ready launch across a multi-agent AI pipeline.",
      "Made PDPM projection, HIPPS code generation, and clinical compliance workflows more reliable through a nurse-correction critic loop.",
      "Improved delivery consistency by aligning product, design, and backend engineering around a scalable frontend Turborepo and shared design system.",
    ],
  },
  {
    company: "Chartmetric",
    role: "Product Engineer",
    period: "Jun 2024 — Dec 2025",
    location: "New York City, USA · Remote",
    summary: "Created a public acquisition surface that helped Chartmetric attract new clients and turn product interest into paid subscriptions.",
    bullets: [
      "Built Music Stats, a public music-tech platform that made Chartmetric’s data capabilities immediately useful and encouraged users to explore the paid product.",
      "Strengthened the core platform by shipping new features, resolving critical bugs, and improving frontend performance and usability.",
    ],
  },
  {
    company: "Captivate Chat · Xoots",
    role: "Full-Stack Engineer · Contract",
    period: "Nov 2023 — Sep 2026",
    location: "Remote",
    summary: "Enabled Captivate Chat to hire top talent internally while giving clients a focused way to find top-tier candidates.",
    bullets: [
      "Connected Interview-X, Talent-X, Academy-X, and Search-X so clients could search, assess, and identify top-tier talent in one recruitment workflow.",
      "Led end-to-end frontend delivery through launch; Captivate Chat then used Xoots internally to identify and successfully hire top talent.",
    ],
  },
  {
    company: "Evelan GmbH",
    role: "Full-Stack Engineer",
    period: "Jul 2023 — Jun 2024",
    location: "Hamburg, Germany · Remote",
    summary: "Improved publishing speed and content accessibility across client websites through a reusable Sanity CMS foundation.",
    bullets: [
      "Reduced repeated implementation work by building reusable, dynamic website foundations around Sanity.",
      "Made client content easier to discover and maintain through accessible blog features and flexible editorial sections.",
    ],
  },
  {
    company: "T.E.A.M DAO",
    role: "Full-Stack Web3 Engineer · Part-time",
    period: "Aug 2024 — Nov 2024",
    location: "Remote",
    summary: "Turned live market data into an interactive Web3 game experience delivered directly through Telegram.",
    bullets: [
      "Built and shipped the REKT Telegram bot, giving players immediate access to live coin-price gameplay.",
      "Used Socket.IO to keep chart data current inside the bot and make the experience responsive to market movement.",
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
