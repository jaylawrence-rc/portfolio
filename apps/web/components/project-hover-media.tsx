import Image from "next/image";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "./project-visual";

export function ProjectHoverArrow() {
  return <span className="project-hover-arrow" aria-hidden="true"><span><ArrowUpRight /></span><span><ArrowUpRight /></span></span>;
}

export function ProjectHoverMedia({ project, compact = false }: { project: Project; compact?: boolean }) {
  const detail = project.detailImage;
  const decision = project.decisions[0];

  return (
    <div className="project-hover-media" data-project-hover-media>
      <ViewTransition name={`project-visual-${project.slug}`} share="project-expand" default="none"><ProjectVisual project={project} compact={compact} /></ViewTransition>
      <div className="project-hover-scrim" aria-hidden="true" />
      {/* The case study exposes this evidence or its public link to every input. */}
      <div className={`project-hover-sheet ${detail ? "project-hover-sheet--image" : "project-hover-sheet--decision"}`} aria-hidden="true">
        {detail ? <><Image src={detail.src} alt="" width={detail.width} height={detail.height} sizes="(max-width: 780px) 75vw, (max-width: 1200px) 50vw, 720px" /><div className="project-hover-sheet-footer"><span>{detail.label}</span><span>Inside the project <ArrowUpRight size={14} /></span></div></> : <>
          <span className="project-hover-eyebrow">A decision behind the work <span>01</span></span>
          <strong className="project-hover-decision-title">{decision.title}</strong>
          <p className="project-hover-decision-body">{decision.body}</p>
          <span className="project-hover-decision-footer">Explore {project.title} <ArrowUpRight size={18} /></span>
        </>}
      </div>
      <span className="project-hover-cursor" data-project-hover-cursor aria-hidden="true"><span>View project <ArrowUpRight size={16} /></span></span>
    </div>
  );
}
