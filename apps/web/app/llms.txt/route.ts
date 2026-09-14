import { posts } from "@/lib/posts";
import { profile } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const content = [
    `# ${profile.name}`,
    "",
    `> Personal portfolio of ${profile.name}, a ${profile.title.toLowerCase()} based in ${profile.location}. His work spans product engineering, frontend architecture, AI workflows, music data, healthcare, recruitment, and content systems.`,
    "",
    `Canonical website: ${absoluteUrl("/")}`,
    `Contact: ${profile.email}. Time zone: ${profile.timezone}.`,
    "",
    "The pages below contain readable HTML. The résumé describes employment history; case studies distinguish personal contributions, product outcomes, and supporting evidence. Some case studies explicitly mark dates or contribution boundaries as unconfirmed. Employment dates do not establish individual project dates.",
    "",
    "## Profile and navigation",
    "",
    `- [Home](${absoluteUrl("/")}): Introduction and selected work.`,
    `- [About](${absoluteUrl("/about")}): Background, engineering focus, and working approach.`,
    `- [Résumé](${absoluteUrl("/resume")}): Employment history, skills, and education.`,
    `- [Work](${absoluteUrl("/work")}): Complete project archive, with links to every case study.`,
    `- [Journal](${absoluteUrl("/blog")}): Articles about product and software engineering.`,
    `- [Contact](${absoluteUrl("/contact")}): Professional contact details.`,
    "",
    "## Case studies",
    "",
    ...projects.map((project) =>
      `- [${project.title}](${absoluteUrl(`/work/${project.slug}`)}): ${project.summary} Role: ${project.role}. Period: ${project.period}.`,
    ),
    "",
    "## Writing",
    "",
    ...posts.map((post) =>
      `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description} Published ${post.publishedAt}.`,
    ),
    "",
    "## Optional",
    "",
    `- [Résumé PDF](${absoluteUrl(profile.resumePath)}): Downloadable résumé.`,
    `- [GitHub](${profile.github}): Public code profile.`,
    `- [LinkedIn](${profile.linkedin}): Professional profile.`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")}): Canonical page URLs.`,
    `- [Crawler policy](${absoluteUrl("/robots.txt")}): Public crawling rules.`,
    "",
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
