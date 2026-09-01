"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { CommandMenu } from "./command-menu";
import { LivePresence } from "./live-presence";
import { SoundToggle } from "./sound-toggle";
import { usePresenceCount } from "./use-presence";

export function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [command, setCommand] = useState(false);
  const presenceCount = usePresenceCount();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    const onKey = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCommand(true); } };
    onScroll(); window.addEventListener("scroll", onScroll); window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  const current = path.startsWith("/work") ? "Work" : path.startsWith("/blog") ? "Blog" : path.slice(1) || "Home";
  return <>
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="wordmark" aria-label="Jay Lawrence home"><span>JL</span><b>Jay Lawrence</b></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className={path.startsWith("/work") ? "active" : ""} href="/work">Work</Link>
          <Link className={path.startsWith("/blog") ? "active" : ""} href="/blog">Blog</Link>
          <Link className={path === "/about" ? "active" : ""} href="/about">About</Link>
          <Link className={path === "/resume" ? "active" : ""} href="/resume">Résumé</Link>
        </nav>
        <div className="header-actions">
          {presenceCount !== null ? <LivePresence count={presenceCount} /> : null}
          <button className="command-trigger" onClick={() => setCommand(true)} aria-label="Open command menu"><Search size={15}/><span>⌘K</span></button>
          <SoundToggle />
          <ThemeToggle />
          <Link className="button small desktop-talk" href="/contact">Let’s talk</Link>
          <span className="mobile-current">{current}</span>
          <button className="icon-button mobile-menu-button" onClick={() => setMobile(!mobile)} aria-expanded={mobile} aria-label="Toggle menu">{mobile ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {mobile && <nav className="mobile-nav" aria-label="Mobile navigation">{presenceCount !== null ? <LivePresence count={presenceCount} mobile /> : null}{[["Work","/work"],["Blog","/blog"],["About","/about"],["Résumé","/resume"],["Contact","/contact"]].map(([label,href]) => <Link onClick={() => setMobile(false)} key={href} href={href}>{label}<span>↗</span></Link>)}</nav>}
    </header>
    <CommandMenu open={command} onClose={() => setCommand(false)} />
  </>;
}
