import type { Project } from "@/lib/projects";

type VisualProject = Pick<Project, "title" | "industry" | "accent">;

export function ProjectVisual({ project, compact = false }: { project: VisualProject; compact?: boolean }) {
  return (
    <div className={`project-visual ${compact ? "compact" : ""}`} style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="visual-toolbar"><i /><i /><i /><span>{project.title.toLowerCase().replace(".ai", "")}.product</span></div>
      <div className="visual-content">
        <div className="visual-sidebar"><b>JL</b><span /><span /><span /></div>
        <div className="visual-main">
          <span className="eyebrow">{project.industry}</span>
          <strong>{project.title}</strong>
          <div className="visual-lines"><i /><i /><i /></div>
          <div className="visual-data"><span /><span /><span /><span /></div>
        </div>
      </div>
      <span className="reconstructed">Reconstructed product view</span>
    </div>
  );
}
