import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";

type VisualProject = Pick<Project, "title" | "industry" | "accent"> & Partial<Pick<Project, "slug" | "image">>;

export function ProjectVisual({ project, compact = false, eager = false }: { project: VisualProject; compact?: boolean; eager?: boolean }) {
  if (project.image) {
    return <div className={`project-art project-art--image ${compact ? "project-art--compact" : ""}`} style={{ aspectRatio: `${project.image.width} / ${project.image.height}` }}><Image loading={eager ? "eager" : "lazy"} src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 780px) calc(100vw - 40px), (max-width: 1200px) 90vw, 1120px" /><span className="project-art-caption">{project.image.caption}</span></div>;
  }

  const isXoots = project.slug === "xoots-ai" || project.title === "Xoots.ai";
  return (
    <div className={`project-art project-art--overview ${isXoots ? "project-art--xoots" : ""} ${compact ? "project-art--compact" : ""}`} style={{ "--art-accent": project.accent } as CSSProperties}>
      <div className="project-art-top"><span>Project overview</span><span>{project.industry}</span></div>
      <div className="project-art-wordmark">{project.title}<span aria-hidden="true">↗</span></div>
      {isXoots ? <div className="project-art-flow" aria-label="Recruitment workflow: search, interview, human review"><span><i>01</i>Search</span><span><i>02</i>Interview</span><span><i>03</i>Human review</span></div> : <div className="project-art-bottom"><span>{project.industry}</span><span>Product & engineering</span></div>}
    </div>
  );
}
