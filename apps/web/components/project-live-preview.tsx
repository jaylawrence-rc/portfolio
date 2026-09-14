"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function ProjectLivePreview({ url, label }: { url: string; label: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const link = element.closest("a");
    const media = element.closest("[data-project-hover-media]") ?? element;
    const warmPreview = () => setMounted(true);
    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") warmPreview();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        warmPreview();
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(media);
    link?.addEventListener("pointerenter", onPointerEnter);
    link?.addEventListener("focus", warmPreview);

    // Preserve the public page's desktop composition at every preview size.
    const resize = new ResizeObserver(([entry]) => {
      const scale = Math.min(entry.contentRect.width / 1280, entry.contentRect.height / 720);
      element.style.setProperty("--live-preview-scale", String(scale));
    });
    resize.observe(element);
    return () => {
      observer.disconnect();
      resize.disconnect();
      link?.removeEventListener("pointerenter", onPointerEnter);
      link?.removeEventListener("focus", warmPreview);
    };
  }, []);

  return <>
    <div className="project-live-viewport" ref={viewport} data-loaded={loaded}>
      <div className="project-live-loading"><strong>{label}</strong><span>Loading preview…</span></div>
      {mounted ? <iframe src={url} title={`${label} live preview`} width={1280} height={720} tabIndex={-1} inert sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" onLoad={() => setLoaded(true)} /> : null}
    </div>
    <div className="project-hover-sheet-footer"><span>{label}</span><span>Live interface <ArrowUpRight size={14} /></span></div>
  </>;
}
