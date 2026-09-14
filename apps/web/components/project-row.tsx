import { ArrowUpRight } from "lucide-react";
import { ProjectHoverLink } from "./project-hover-link";
import { ProjectHoverArrow, ProjectHoverMedia } from "./project-hover-media";
import type { Project } from "@/lib/projects";

export function ProjectRow({ project, index, compact = false }: { project: Project; index: number; compact?: boolean }) {
  return (
    <article className={`work-entry ${compact ? "work-entry--compact" : ""}`}>
      <ProjectHoverLink href={`/work/${project.slug}`} className="work-entry-link" transitionTypes={["project-expand"]}>
        <div className="work-entry-copy">
          <span className="editorial-label">{String(index + 1).padStart(2, "0")} / {project.industry}</span>
          <h2>{project.title}<ProjectHoverArrow /></h2>
          <p>{project.summary}</p>
          <div className="work-entry-meta"><span>{project.role}</span><span>{project.period}</span></div>
          <span className="work-entry-action">Read case study <ArrowUpRight size={16} aria-hidden="true" /></span>
        </div>
        <div className="work-entry-media"><ProjectHoverMedia project={project} compact={compact} /></div>
      </ProjectHoverLink>
    </article>
  );
}
