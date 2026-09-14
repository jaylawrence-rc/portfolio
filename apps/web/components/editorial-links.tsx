"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { forwardRef, useEffect, useId, useRef, useState, type ComponentProps, type FocusEvent, type PointerEvent, type ReactNode } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { companyPreviews } from "@/lib/company-previews";
import { CompanyPreviewCard } from "./company-preview-card";
import { playInteractionTick } from "./interaction-sound";
import "./editorial-links.css";

const interaction = {
  onPointerEnter(event: PointerEvent<HTMLAnchorElement>) {
    delete event.currentTarget.dataset.keyboard;
    if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      playInteractionTick();
    }
  },
  onFocus(event: FocusEvent<HTMLAnchorElement>) {
    if (event.currentTarget.matches(":focus-visible")) event.currentTarget.dataset.keyboard = "true";
  },
};

export function ActionLink({ href, children, download = false }: { href: string; children: ReactNode; download?: boolean }) {
  const content = <><span className="action-link-label">{children}</span><span className="action-link-disc" aria-hidden="true"><span className="action-link-dot" /><span className="action-link-arrow">{download ? <ArrowDown size={19} /> : <ArrowUpRight size={19} />}</span></span></>;
  const className = `action-link${download ? " action-link--download" : ""}`;

  return download
    ? <a {...interaction} className={className} href={href} download>{content}</a>
    : <Link {...interaction} className={className} href={href}>{content}</Link>;
}

export function CompanyLink({ href, children, hideArrow = false }: { href: string; children: ReactNode; hideArrow?: boolean }) {
  const [open, setOpen] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const id = useId();
  const link = useRef<HTMLAnchorElement>(null);
  const intent = useRef({ pointer: false, focus: false, dismissed: false });
  const reduceMotion = useReducedMotion();
  const preview = companyPreviews[href];
  const linkContent = <><span className="company-link-label">{children}</span>{!hideArrow && <span className="company-link-arrow" aria-hidden="true"><ArrowUpRight /></span>}<span className="company-link-hint"> (opens in a new tab)</span></>;

  useEffect(() => {
    function closeOtherPreview(event: Event) {
      if ((event as CustomEvent<string>).detail === id) return;
      intent.current.dismissed = true;
      setOpen(false);
    }
    window.addEventListener("portfolio:company-preview", closeOtherPreview);
    return () => window.removeEventListener("portfolio:company-preview", closeOtherPreview);
  }, [id]);

  if (!preview) return <a {...interaction} className="company-link" href={href} target="_blank" rel="noopener noreferrer">{linkContent}</a>;

  const visibleTransform = "translateY(0px) scale(1)";
  const restingTransform = reduceMotion ? visibleTransform : "translateY(4px) scale(0.98)";

  function dismiss() {
    intent.current.dismissed = true;
    setOpen(false);
  }

  function changeOpen(next: boolean) {
    const current = intent.current;
    if (next && (current.dismissed || (!current.pointer && !current.focus))) return;
    // A keyboard scroll can move another company under a stationary pointer.
    const focusedCompany = document.activeElement?.matches(".company-link:focus-visible");
    if (next && focusedCompany && document.activeElement !== link.current) return;
    if (!next && current.focus && !current.dismissed) return;
    if (next) window.dispatchEvent(new CustomEvent("portfolio:company-preview", { detail: id }));
    setOpen(next);
  }

  return (
    <HoverCard.Root open={open} onOpenChange={changeOpen} openDelay={180} closeDelay={120}>
      <HoverCard.Trigger asChild>
        <CompanyHoverAnchor ref={link} className="company-link" href={href} target="_blank" rel="noopener noreferrer"
          onPointerEnter={(event) => {
            if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) { event.preventDefault(); return; }
            intent.current.pointer = true;
            intent.current.dismissed = false;
            interaction.onPointerEnter(event);
            if (intent.current.focus) event.currentTarget.dataset.keyboard = "true";
            else setKeyboard(false);
          }}
          onPointerLeave={() => { intent.current.pointer = false; }}
          onFocus={(event) => {
            event.preventDefault();
            if (event.currentTarget.matches(":focus-visible")) {
              interaction.onFocus(event);
              intent.current.focus = true;
              intent.current.dismissed = false;
              setKeyboard(true);
              window.dispatchEvent(new CustomEvent("portfolio:company-preview", { detail: id }));
              setOpen(true);
            }
          }}
          onBlur={() => { intent.current.focus = false; if (keyboard) setOpen(false); }}
          onClick={dismiss}>
          {linkContent}
        </CompanyHoverAnchor>
      </HoverCard.Trigger>
      <AnimatePresence>
        {open ? <HoverCard.Portal forceMount>
          <HoverCard.Content forceMount asChild side="top" align="start" sideOffset={12} collisionPadding={16} hideWhenDetached
            onEscapeKeyDown={dismiss} onPointerDownOutside={dismiss}
            onPointerEnter={() => { intent.current.pointer = true; if (!intent.current.focus) setKeyboard(false); }}
            onPointerLeave={() => { intent.current.pointer = false; }}
            onPointerDown={(event) => { if (event.button === 0) event.preventDefault(); }}>
            <motion.div className="company-preview-card" aria-hidden="true" data-keyboard={keyboard || undefined}
              initial={keyboard ? false : { opacity: 0, transform: restingTransform }}
              animate={{ opacity: 1, transform: visibleTransform }}
              exit={{ opacity: 0, transform: restingTransform, transition: { duration: keyboard ? 0 : .12 } }}
              transition={{ duration: keyboard ? 0 : .2, ease: [.16, 1, .3, 1] }}>
              <CompanyPreviewCard preview={preview} href={href} onVisit={dismiss} />
            </motion.div>
          </HoverCard.Content>
        </HoverCard.Portal> : null}
      </AnimatePresence>
    </HoverCard.Root>
  );
}

// Radix cancels touchstart by default; leave native link activation intact.
const CompanyHoverAnchor = forwardRef<HTMLAnchorElement, ComponentProps<"a">>((props, ref) => <a {...props} ref={ref} onTouchStart={undefined} />);
CompanyHoverAnchor.displayName = "CompanyHoverAnchor";
