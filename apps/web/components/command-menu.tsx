"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";

const searchItems = [
  { title: "Work archive", href: "/work", meta: "All projects" },
  { title: "About", href: "/about", meta: "Story and principles" },
  { title: "Journal", href: "/blog", meta: "Engineering notes" },
  { title: "Résumé", href: "/resume", meta: "Experience" },
  { title: "Contact", href: "/contact", meta: "Start a conversation" },
  ...projects.map(project => ({ title: project.title, href: `/work/${project.slug}`, meta: `${project.industry} · ${project.disciplines.join(", ")}` })),
  ...posts.map(post => ({ title: post.title, href: `/blog/${post.slug}`, meta: post.topics.join(" · ") })),
];

export function NavigationDialog({ children, className, id, initialFocus, label, onClose }: {
  children: ReactNode;
  className: string;
  id?: string;
  initialFocus?: RefObject<HTMLInputElement | null>;
  label: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    initialFocus?.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [initialFocus]);

  return <dialog
    ref={dialogRef}
    id={id}
    className={`folio-nav-dialog ${className}`}
    aria-label={label}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onPointerDown={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
    }}
  >{children}</dialog>;
}

function CommandSearch({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const listId = useId();
  const normalizedQuery = query.trim().toLowerCase();
  const items = searchItems.filter(item => `${item.title} ${item.meta}`.toLowerCase().includes(normalizedQuery)).slice(0, 8);

  function moveSelection(direction: number) {
    if (!items.length) return;
    const next = (activeIndex + direction + items.length) % items.length;
    setActiveIndex(next);
    resultRefs.current[next]?.scrollIntoView({ block: "nearest" });
  }

  return <NavigationDialog className="folio-nav-search-dialog" initialFocus={inputRef} label="Search portfolio" onClose={onClose}>
    <div className="folio-nav-search-input">
      <Search size={19} aria-hidden="true" />
      <input
        ref={inputRef}
        value={query}
        onChange={event => { setQuery(event.target.value); setActiveIndex(0); }}
        onKeyDown={event => {
          if (event.nativeEvent.isComposing) return;
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            moveSelection(event.key === "ArrowDown" ? 1 : -1);
          } else if (event.key === "Enter" && items[activeIndex]) {
            event.preventDefault();
            router.push(items[activeIndex].href);
            onClose();
          }
        }}
        type="text"
        role="combobox"
        aria-label="Search projects or pages"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={listId}
        aria-activedescendant={items.length ? `${listId}-${activeIndex}` : undefined}
        placeholder="Search projects or pages…"
        autoComplete="off"
        spellCheck={false}
      />
      <button type="button" className="folio-nav-control" onClick={onClose} aria-label="Close search"><X size={19} aria-hidden="true" /></button>
    </div>
    <div className="folio-nav-search-results" id={listId} role="listbox" aria-label="Search results">
      {items.map((item, index) => <Link
        key={item.href}
        id={`${listId}-${index}`}
        ref={element => { resultRefs.current[index] = element; }}
        href={item.href}
        role="option"
        aria-selected={index === activeIndex}
        tabIndex={-1}
        onPointerMove={() => setActiveIndex(index)}
        onClick={onClose}
      ><span><strong>{item.title}</strong><small>{item.meta}</small></span><ArrowUpRight size={18} aria-hidden="true" /></Link>)}
      {!items.length ? <p className="folio-nav-empty">No matches. Try a project name or “résumé”.</p> : null}
    </div>
    <div className="folio-nav-search-footer"><span>↑ ↓ to choose · Enter to open</span><span>Esc to close</span></div>
    <span className="folio-nav-sr-only" role="status">{items.length} {items.length === 1 ? "result" : "results"}</span>
  </NavigationDialog>;
}

export function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return open ? <CommandSearch onClose={onClose} /> : null;
}
