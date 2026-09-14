"use client";

import Link from "next/link";
import { useEffect, useRef, type ComponentProps, type PointerEvent } from "react";
import { playInteractionTick, preloadInteractionTick } from "./interaction-sound";

type Props = Omit<ComponentProps<typeof Link>, "onPointerEnter" | "onPointerMove" | "onPointerLeave" | "onPointerCancel" | "onFocus" | "onBlur">;

export function ProjectHoverLink({ children, className = "", ...props }: Props) {
  const link = useRef<HTMLAnchorElement>(null);
  const frame = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const motionQuery = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    preloadInteractionTick();
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    motionQuery.current = query;
    const element = link.current;
    const clear = () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
      element?.querySelector("[data-project-hover-media]")?.removeAttribute("data-pointer-active");
    };
    query.addEventListener("change", clear);
    window.addEventListener("scroll", clear, { passive: true, capture: true });
    return () => {
      clear();
      query.removeEventListener("change", clear);
      window.removeEventListener("scroll", clear, true);
    };
  }, []);

  function handlePointerEnter(event: PointerEvent<HTMLAnchorElement>) {
    trackPointer(event);
    if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      playInteractionTick();
    }
  }

  function trackPointer(event: PointerEvent<HTMLAnchorElement>) {
    link.current?.removeAttribute("data-keyboard-preview");
    if (event.pointerType !== "mouse" || !motionQuery.current?.matches) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (frame.current !== null) return;

    // Batch reads before writes; pointer movement never renders the React tree.
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const media = link.current?.querySelector<HTMLElement>("[data-project-hover-media]");
      const cursor = media?.querySelector<HTMLElement>("[data-project-hover-cursor]");
      if (!media || !cursor) return;
      const bounds = media.getBoundingClientRect();
      const x = pointer.current.x - bounds.left;
      const y = pointer.current.y - bounds.top;
      if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) {
        media.removeAttribute("data-pointer-active");
        return;
      }
      const left = Math.max(12, Math.min(x + 18, bounds.width - cursor.offsetWidth - 12));
      const top = Math.max(12, Math.min(y + 18, bounds.height - cursor.offsetHeight - 12));
      cursor.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      media.setAttribute("data-pointer-active", "");
    });
  }

  function resetPointer() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    link.current?.querySelector("[data-project-hover-media]")?.removeAttribute("data-pointer-active");
  }

  function handleFocus() {
    if (link.current?.matches(":focus-visible")) link.current.setAttribute("data-keyboard-preview", "");
  }

  return <Link {...props} ref={link} className={`project-hover-link ${className}`} onPointerEnter={handlePointerEnter} onPointerMove={trackPointer} onPointerLeave={resetPointer} onPointerCancel={resetPointer} onFocus={handleFocus} onBlur={resetPointer}>{children}</Link>;
}
