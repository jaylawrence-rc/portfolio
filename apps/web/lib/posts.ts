export type Post = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  topics: string[];
};

export const posts: Post[] = [
  {
    slug: "how-i-use-ai-in-my-development-workflow",
    title: "How I use AI in my development workflow as a software engineer",
    description: "A practical system for using AI to understand codebases, shape ambiguous work, implement carefully, and verify what ships—without outsourcing engineering judgment.",
    publishedAt: "September 1, 2026",
    readingTime: "8 min read",
    topics: ["AI-assisted development", "Engineering workflow", "Product judgment"],
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
