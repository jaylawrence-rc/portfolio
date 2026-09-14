export const profile = {
  name: "Jay Lawrence Dimaano",
  title: "Product Engineer / Frontend-Leaning Full-Stack Engineer",
  location: "Cainta, Rizal, Philippines",
  timezone: "GMT+8",
  email: "jaydimaano@proton.me",
  github: "https://github.com/JayLawrence23",
  linkedin: "https://linkedin.com/in/jaylawrencee",
  resumePath: "/jay-lawrence-dimaano-resume.pdf",
} as const;

export const companyUrls = {
  chartmetric: "https://chartmetric.com/",
  captivateChat: "https://www.captivatechat.ai/",
  evelan: "https://evelan.de/en",
} as const;

export const experience = [
  {
    company: "Healthcare AI SaaS Platform for Skilled Nursing Facilities",
    companyUrl: null,
    role: "Full-Stack Engineer & Team Lead",
    period: "Sep 2025 — Present",
    location: "Startup company",
    summary:
      "Turned complex clinical requirements into a launched AI platform and a more predictable product-delivery system.",
    bullets: [
      "Led the platform from ambiguous founder and clinical requirements to a client-ready launch across a multi-agent AI pipeline.",
      "Made PDPM projection, HIPPS code generation, and clinical compliance workflows more reliable through a nurse-correction critic loop.",
      "Improved delivery consistency by aligning product, design, and backend engineering around a scalable frontend Turborepo and shared design system.",
    ],
  },
  {
    company: "Chartmetric",
    companyUrl: companyUrls.chartmetric,
    role: "Product Engineer",
    period: "Jun 2024 — Dec 2025",
    location: "New York City/San Mateo, California, USA · Remote",
    summary:
      "Expanded Chartmetric’s analytics product and global reach while strengthening the frontend system behind faster feature delivery.",
    bullets: [
      "Built core features for artist and track analytics pages used daily by music industry professionals across labels and management firms, including playlist overlap analysis, sortable and searchable data tables, and TikTok influencer ranking views.",
      "Improved frontend developer experience by extracting reusable components and table primitives, refactoring legacy UI toward the design system, and upgrading core dependencies including Tailwind CSS—reducing duplication and speeding up feature delivery across the team.",
      "Developed public-facing artist and track pages and led internationalization across 7+ languages, expanding platform accessibility to global markets.",
      "Shipped approximately 2,000 commits over 17 months as a top-four contributor, owning features end to end from implementation through QA sweeps and design-system refactors.",
      "Built Music Stats, a public music-tech platform that made Chartmetric’s data capabilities immediately useful and encouraged users to explore the paid product.",
    ],
  },
  {
    company: "Captivate Chat · Xoots",
    companyUrl: companyUrls.captivateChat,
    role: "Full-Stack Engineer · Contract",
    period: "Nov 2023 — Sep 2026",
    location: "Remote",
    summary:
      "Enabled Captivate Chat to hire top talent internally while giving clients a focused way to find top-tier candidates.",
    bullets: [
      "Built the frontend from scratch across Interview-X, Talent-X, Academy-X, and Search-X, using SSR or TanStack Query according to each workflow’s rendering and server-state needs.",
      "Unified search, interview, assessment, and learning workflows in a platform that supported 100+ hires across client organizations and helped Captivate Chat hire top talent internally.",
    ],
  },
  {
    company: "Evelan GmbH",
    companyUrl: companyUrls.evelan,
    role: "Full-Stack Engineer",
    period: "Jul 2023 — Jun 2024",
    location: "Hamburg, Germany · Remote",
    summary:
      "Improved publishing speed and content accessibility across client websites through a reusable Sanity CMS foundation.",
    bullets: [
      "Reduced repeated implementation work by building reusable, dynamic website foundations around Sanity.",
      "Made client content easier to discover and maintain through accessible blog features and flexible editorial sections.",
    ],
  },
  {
    company: "T.E.A.M DAO",
    companyUrl: null,
    role: "Full-Stack Web3 Engineer · Part-time",
    period: "Aug 2023 — Nov 2023",
    location: "Remote",
    summary:
      "Turned live market data into an interactive Web3 game experience delivered directly through Telegram.",
    bullets: [
      "Built and shipped the REKT Telegram bot, giving players immediate access to live coin-price gameplay.",
      "Used Socket.IO to keep chart data current inside the bot and make the experience responsive to market movement.",
    ],
  },
  {
    company: "Reclaim Healthcare Administrative Services",
    companyUrl: null,
    role: "Software Engineer",
    period: "Nov 2022 — Jul 2023",
    location: null,
    summary:
      "Shipped two healthcare applications and simplified rate updates with an Excel upload workflow.",
    bullets: [
      "Led frontend development for two projects and deployed both in eight months. No AI agents!",
      "Recreated the full functionality of the PDPM Calculator within a custom web application.",
      "Replaced manual area-rate and wage-index adjustments with dynamic updates from CMS.gov Excel uploads.",
    ],
  },
] as const;

export const skillGroups = [
  {
    label: "Product & frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Design systems",
      "Framer Motion",
      "CSS animation",
      "Storybook",
      "Tailwind CSS",
      "Radix UI",
      "shadcn/ui",
    ],
  },
  {
    label: "Backend & data",
    skills: [
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Sanity",
    ],
  },
  {
    label: "AI & infrastructure",
    skills: [
      "OpenAI",
      "Anthropic",
      "Azure AI",
      "AWS",
      "Vercel",
      "Netlify",
      "S3",
      "RDS",
      "Turborepo",
    ],
  },
] as const;

export const education = [
  {
    school: "Polytechnic University of the Philippines",
    program: "Bachelor of Science in Information Technology",
    detail:
      "Object-oriented programming, data structures and algorithms, and database development.",
  },
  {
    school: "STI College — Ortigas Cainta",
    program: "Information and Communication Technology",
    detail:
      "Basic programming, object-oriented programming, and mobile development.",
  },
] as const;
