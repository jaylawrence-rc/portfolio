"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ProjectVisual } from "./project-visual";
import type { Project } from "@/lib/projects";

export function ProjectRow({ project, index, compact = false }: { project: Project; index: number; compact?: boolean }) {
  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [livePreviewReady, setLivePreviewReady] = useState(false);
  const canEmbedLiveSite = Boolean(project.liveUrl && project.allowsEmbedding === true);

  useEffect(() => () => {
    if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
  }, []);

  function queueLivePreview() {
    if (!canEmbedLiveSite || !window.matchMedia("(min-width: 781px) and (hover: hover) and (pointer: fine)").matches) return;
    if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
    setLivePreviewReady(false);
    previewTimerRef.current = setTimeout(() => {
      setShowLivePreview(true);
      previewTimerRef.current = null;
    }, 180);
  }

  function showLivePreviewOnFocus() {
    if (!canEmbedLiveSite || !window.matchMedia("(min-width: 781px) and (hover: hover) and (pointer: fine)").matches) return;
    if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
    previewTimerRef.current = null;
    setLivePreviewReady(false);
    setShowLivePreview(true);
  }

  function hideLivePreview() {
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    setShowLivePreview(false);
  }

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") queueLivePreview();
  }

  return <article>
    <div
      className={`project-row ${compact ? "compact-row" : ""}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={hideLivePreview}
      onFocus={showLivePreviewOnFocus}
      onBlur={hideLivePreview}
    >
      <Link
        href={`/work/${project.slug}`}
        className="project-row-hit-area"
        aria-label={`Read the ${project.title} case study`}
        transitionTypes={["project-expand"]}
        data-project-cursor
      />
      <div className="project-copy"><span className="project-number">{String(index + 1).padStart(2,"0")}</span><p className="eyebrow">{project.industry}</p><h3>{project.title}<ArrowUpRight aria-hidden="true"/></h3><p className="project-summary">{project.summary}</p><p className="project-meta">{project.role} <i/> {project.period}</p><div className="tags">{project.disciplines.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div></div>
      <div className="project-media">
        <ViewTransition name={`project-visual-${project.slug}`} share="project-expand" default="none">
          <ProjectVisual project={project} compact={compact}/>
        </ViewTransition>
        {showLivePreview && canEmbedLiveSite && project.liveUrl ? (
          <div className="project-list-live-preview" aria-hidden="true">
            <iframe
              className="project-list-live-frame"
              data-status={livePreviewReady ? "ready" : "loading"}
              src={project.liveUrl}
              title={`${project.title} live website preview`}
              tabIndex={-1}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              onLoad={() => setLivePreviewReady(true)}
              onError={hideLivePreview}
            />
            <span className="project-list-live-status" data-ready={livePreviewReady}>
              <i /> {livePreviewReady ? "Live site preview" : "Loading live site"}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  </article>;
}
