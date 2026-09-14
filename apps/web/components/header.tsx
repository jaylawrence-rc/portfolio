"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { CommandMenu, NavigationDialog } from "./command-menu";
import { SoundToggle } from "./sound-toggle";

const navigation = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
];

function HeaderNavigation({ path }: { path: string }) {
  const [overlay, setOverlay] = useState<"menu" | "search" | null>(null);
  const closeOverlay = useCallback(() => setOverlay(null), []);

  useEffect(() => {
    function openSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOverlay("search");
      }
    }
    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 960px)");
    const dismissMobileMenu = () => {
      if (desktop.matches) setOverlay(current => current === "menu" ? null : current);
    };
    desktop.addEventListener("change", dismissMobileMenu);
    return () => desktop.removeEventListener("change", dismissMobileMenu);
  }, []);

  const isCurrent = (href: string) => path === href || path.startsWith(`${href}/`);

  return <>
    <nav className="folio-nav-links" aria-label="Primary navigation">
      {navigation.map(item => <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>{item.label}</Link>)}
    </nav>
    <div className="folio-nav-actions">
      <Link className="folio-nav-resume" href="/resume" aria-current={path === "/resume" ? "page" : undefined}>Résumé</Link>
      <div className="folio-nav-preferences"><SoundToggle /><ThemeToggle /></div>
      <button type="button" className="folio-nav-control folio-nav-search" onClick={() => setOverlay("search")} aria-label="Search portfolio" aria-haspopup="dialog" aria-keyshortcuts="Meta+K Control+K" title="Search portfolio (⌘K / Ctrl K)"><Search size={17} aria-hidden="true" /></button>
      <Link className="folio-nav-contact" href="/contact">Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></Link>
      <button type="button" className="folio-nav-control folio-nav-menu-trigger" onClick={() => setOverlay("menu")} aria-label="Open navigation" aria-expanded={overlay === "menu"} aria-controls="folio-mobile-menu" aria-haspopup="dialog"><Menu size={21} aria-hidden="true" /></button>
    </div>
    {overlay === "menu" ? <NavigationDialog className="folio-nav-mobile-dialog" id="folio-mobile-menu" label="Navigation" onClose={closeOverlay}>
      <div className="folio-nav-mobile-heading"><span>Explore</span><button type="button" className="folio-nav-control" aria-label="Close navigation" onClick={closeOverlay}><X size={21} aria-hidden="true" /></button></div>
      <nav className="folio-nav-mobile-links" aria-label="Mobile navigation">
        {[...navigation, { label: "Résumé", href: "/resume" }, { label: "Contact", href: "/contact" }].map(item => <Link key={item.href} href={item.href} onClick={closeOverlay} aria-current={isCurrent(item.href) ? "page" : undefined}>{item.label}<ArrowUpRight size={22} aria-hidden="true" /></Link>)}
      </nav>
      <div className="folio-nav-mobile-footer"><span>Make yourself at home.</span><div><SoundToggle /><ThemeToggle /></div></div>
    </NavigationDialog> : null}
    <CommandMenu open={overlay === "search"} onClose={closeOverlay} />
  </>;
}

export function Header() {
  const path = usePathname();

  return <header className="folio-nav-header">
    <div className="folio-nav-inner">
      <Link href="/" className="folio-nav-wordmark" aria-label="Jay Lawrence home" onClick={() => { if (path === "/") window.scrollTo({ top: 0, behavior: "instant" }); }}><span aria-hidden="true">JL</span><b>Jay Lawrence</b></Link>
      {/* Route changes reset navigation state, including browser back/forward. */}
      <HeaderNavigation key={path} path={path} />
    </div>
  </header>;
}
