import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "./project-visual";
import type { Project } from "@/lib/projects";

export function ProjectRow({ project, index, compact = false }: { project: Project; index: number; compact?: boolean }) {
  return <article>
    <Link
      href={`/work/${project.slug}`}
      className={`project-row ${compact ? "compact-row" : ""}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
      aria-label={`Read the ${project.title} case study`}
      transitionTypes={["project-expand"]}
      data-project-cursor
    >
      <div className="project-copy"><span className="project-number">{String(index + 1).padStart(2,"0")}</span><p className="eyebrow">{project.industry}</p><h3>{project.title}<ArrowUpRight aria-hidden="true"/></h3><p className="project-summary">{project.summary}</p><p className="project-meta">{project.role} <i/> {project.period}</p><div className="tags">{project.disciplines.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div></div>
      <ViewTransition name={`project-visual-${project.slug}`} share="project-expand" default="none">
        <div className="project-media"><ProjectVisual project={project} compact={compact}/></div>
      </ViewTransition>
    </Link>
  </article>;
}
