export type Post = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  publishedAtISO: string;
  readingTime: string;
  topics: string[];
  continueReading: {
    title: string;
    href: string;
    label: string;
  };
};

export const posts: Post[] = [
  {
    slug: "frontend-hipaa-readiness-protecting-phi-in-the-browser",
    title: "Frontend HIPAA readiness: protecting PHI in the browser",
    description: "What a frontend security review taught me about keeping clinical data out of telemetry, URLs, durable browser storage, caches, and unprotected deployments.",
    publishedAt: "September 18, 2026",
    publishedAtISO: "2026-09-18",
    readingTime: "9 min read",
    topics: ["Frontend security", "HIPAA compliance", "Healthcare software"],
    continueReading: {
      title: "See how these boundaries connect to the larger data architecture.",
      href: "/blog/structuring-product-data-for-ai-agents-with-hipaa-in-mind",
      label: "Read the AI data architecture entry",
    },
  },
  {
    slug: "structuring-product-data-for-ai-agents-with-hipaa-in-mind",
    title: "How we structure product data for AI agents with HIPAA in mind",
    description: "How we separate the product source of truth, referral documents, AI job persistence, corrections, and PHI-safe progress across an agentic healthcare workflow.",
    publishedAt: "September 17, 2026",
    publishedAtISO: "2026-09-17",
    readingTime: "10 min read",
    topics: ["AI agent architecture", "Healthcare data", "HIPAA compliance"],
    continueReading: {
      title: "Follow the broader journey behind these decisions.",
      href: "/blog/learning-hipaa-compliance-as-a-software-engineer",
      label: "Read my HIPAA learning journey",
    },
  },
  {
    slug: "learning-hipaa-compliance-as-a-software-engineer",
    title: "My journey learning HIPAA compliance as a software engineer",
    description: "What learning HIPAA changed about the way I think about health data, product decisions, and the everyday responsibility of building software people can trust.",
    publishedAt: "September 16, 2026",
    publishedAtISO: "2026-09-16",
    readingTime: "7 min read",
    topics: ["HIPAA compliance", "Healthcare software", "Engineering practice"],
    continueReading: {
      title: "See how I bring the same care to product engineering.",
      href: "/work",
      label: "Explore the case studies",
    },
  },
  {
    slug: "how-i-use-ai-in-my-development-workflow",
    title: "How I use AI in my development workflow as a software engineer",
    description: "A practical system for using AI to understand codebases, shape ambiguous work, implement carefully, and verify what ships—without outsourcing engineering judgment.",
    publishedAt: "September 1, 2026",
    publishedAtISO: "2026-09-01",
    readingTime: "8 min read",
    topics: ["AI-assisted development", "Engineering workflow", "Product judgment"],
    continueReading: {
      title: "See how that workflow appears in shipped product work.",
      href: "/work",
      label: "Explore the case studies",
    },
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
