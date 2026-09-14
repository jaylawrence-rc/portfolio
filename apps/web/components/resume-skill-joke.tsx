"use client";

import { useEffect, useId, useRef, useState } from "react";
import { playInteractionTick } from "./interaction-sound";
import "./resume-skill-joke.css";

export function ResumeSkillJoke() {
  const id = useId();
  const root = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    if (!open) return;
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }
    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open]);

  function reveal(fromKeyboard: boolean) {
    setKeyboard(fromKeyboard);
    if (!open) playInteractionTick();
    setOpen(true);
  }

  return (
    <span ref={root} className="resume-skill-joke" data-open={open} data-keyboard={keyboard}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") reveal(false); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse" && !keyboard) setOpen(false); }}>
      <button type="button" aria-expanded={open} aria-controls={id} aria-describedby={open ? id : undefined}
        onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) reveal(true); }}
        onBlur={() => setOpen(false)}
        onClick={(event) => { if (open) setOpen(false); else reveal(event.detail === 0); }}>
        <span className="resume-joke-hover-label">Hover me!</span>
        <span className="resume-joke-tap-label">Tap me!</span>
      </button>
      <span id={id} role="tooltip" aria-hidden={!open} className="resume-joke-message"><span>Jk, I’m just using Codex. Kidding! 😭</span></span>
    </span>
  );
}
