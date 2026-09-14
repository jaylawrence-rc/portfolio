import { ImageResponse } from "next/og";
import { getPost, posts } from "@/lib/posts";
import { getProject, projects } from "@/lib/projects";
import { siteDescription, siteUrl } from "@/lib/site";

const pages: Record<string, { title: string; description: string }> = {
  home: { title: "Jay Lawrence", description: siteDescription },
  work: { title: "Selected work", description: "Product engineering, AI workflows, design systems, and frontend craft." },
  about: { title: "About Jay Lawrence", description: "Product engineering with frontend depth. From ambiguous problems to software people can trust." },
  resume: { title: "Résumé", description: "Jay Lawrence Dimaano · Product Engineer / Frontend-Leaning Full-Stack Engineer" },
  contact: { title: "Let’s talk", description: "Product engineering opportunities · Based in the Philippines, working globally." },
  blog: { title: "Engineering decisions, written down.", description: "Field notes on product engineering, frontend systems, and AI-assisted development." },
};

export function generateStaticParams() {
  return [...Object.keys(pages), ...projects.map(project => project.slug), ...posts.map(post => post.slug)].map(slug => ({ slug }));
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const post = getPost(slug);
  const page = Object.hasOwn(pages, slug) ? pages[slug] : undefined;
  const content = project ? { title: project.title, description: project.summary } : post ?? page;
  if (!content) return new Response("Image not found", { status: 404 });

  const { title, description } = content;
  const category = project?.industry ?? (post ? "Engineering field notes" : "Product engineering");
  const accent = project?.accent ?? "#527bd8";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#f4f3ef", color: "#1c1d21", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span>JL · Jay Lawrence</span><span>{category}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: title.length > 65 ? 58 : title.length > 30 ? 72 : 88, fontWeight: 700, lineHeight: 1.06, letterSpacing: -3 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 28, lineHeight: 1.3, color: "#575b62", maxWidth: 1000 }}>{description}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ height: 10, width: 160, background: accent }} />
        <span style={{ fontSize: 22, color: "#575b62" }}>{new URL(siteUrl).hostname}</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
