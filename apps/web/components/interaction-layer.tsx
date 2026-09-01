"use client";

import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { playInteractionTick, preloadInteractionTick } from "./interaction-sound";

export function InteractionLayer() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    preloadInteractionTick();

    const cursorQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let cursorEnabled = cursorQuery.matches;

    const projectTarget = (target: EventTarget | null) => target instanceof Element ? target.closest("[data-project-cursor]") : null;
    const hideCursor = () => { cursor.dataset.visible = "false"; cursor.dataset.pressed = "false"; };
    const syncCursorCapability = () => { cursorEnabled = cursorQuery.matches; if (!cursorEnabled) hideCursor(); };
    const moveCursor = (event: PointerEvent) => {
      if (!cursorEnabled) return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.dataset.visible = String(Boolean(projectTarget(event.target)));
    };
    const pressCursor = (event: PointerEvent) => {
      if (cursorEnabled && projectTarget(event.target)) cursor.dataset.pressed = "true";
    };
    const releaseCursor = () => { cursor.dataset.pressed = "false"; };
    const playClick = (event: MouseEvent) => {
      if (projectTarget(event.target)) playInteractionTick();
    };

    document.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerdown", pressCursor, { passive: true });
    document.addEventListener("pointerup", releaseCursor, { passive: true });
    document.addEventListener("pointercancel", releaseCursor, { passive: true });
    document.addEventListener("click", playClick, { capture: true });
    document.documentElement.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    cursorQuery.addEventListener("change", syncCursorCapability);

    return () => {
      document.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerdown", pressCursor);
      document.removeEventListener("pointerup", releaseCursor);
      document.removeEventListener("pointercancel", releaseCursor);
      document.removeEventListener("click", playClick, { capture: true });
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      cursorQuery.removeEventListener("change", syncCursorCapability);
    };
  }, []);

  return <div ref={cursorRef} className="project-cursor" data-visible="false" data-pressed="false" aria-hidden="true">
    <div className="project-cursor-inner">
      <MousePointer2 className="project-cursor-pointer" size={19}/>
      <span>View <ArrowUpRight size={12}/></span>
    </div>
  </div>;
}
