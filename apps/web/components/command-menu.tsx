"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";

export function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { setQuery(""); setTimeout(() => input.current?.focus(), 0); } }, [open]);
  useEffect(() => { const key = (e: KeyboardEvent) => e.key === "Escape" && onClose(); document.addEventListener("keydown", key); return () => document.removeEventListener("keydown", key); }, [onClose]);
  if (!open) return null;
  const staticItems = [{title:"Work archive",href:"/work", meta:"All projects"},{title:"Blog",href:"/blog",meta:"Engineering notes"},{title:"About",href:"/about",meta:"Story and principles"},{title:"Résumé",href:"/resume",meta:"Experience"},{title:"Contact",href:"/contact",meta:"Start a conversation"}];
  const items = [...staticItems, ...projects.map(p => ({ title: p.title, href: `/work/${p.slug}`, meta: `${p.industry} · ${p.disciplines.join(", ")}` })), ...posts.map(post => ({title:post.title,href:`/blog/${post.slug}`,meta:post.topics.join(" · ")}))].filter(x => `${x.title} ${x.meta}`.toLowerCase().includes(query.toLowerCase())).slice(0, 7);
  return <div className="dialog-backdrop" onMouseDown={onClose} role="presentation"><div className="command-dialog" role="dialog" aria-modal="true" aria-label="Navigate portfolio" onMouseDown={e => e.stopPropagation()}>
    <label className="command-input"><span>⌘</span><input ref={input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects or pages…" aria-label="Search"/><kbd>esc</kbd></label>
    <div className="command-results">{items.length ? items.map(item => <Link key={item.href} href={item.href} onClick={onClose}><span><b>{item.title}</b><small>{item.meta}</small></span><i>↗</i></Link>) : <p>No matching work yet.</p>}</div>
  </div></div>;
}
