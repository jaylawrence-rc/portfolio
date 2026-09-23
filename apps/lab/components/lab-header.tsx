import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedEntries } from "@/lib/content";
import { LabMobileNav } from "./lab-mobile-nav";
import { ThemeControl } from "./theme-control";

const baseNav = [
  { href: "/showcase", label: "Showcase" },
  { href: "/experiments", label: "Experiments" },
];

export function LabHeader() {
  const nav = getPublishedEntries().length ? [...baseNav, { href: "/library", label: "Library" }] : baseNav;
  return <header className="lab-header"><div className="lab-shell lab-header-inner">
    <Link className="lab-wordmark" href="/" aria-label="Jay's Lab home"><span className="lab-mark" aria-hidden="true">J<span>·</span>L</span><span>Jay&apos;s Lab</span></Link>
    <nav className="lab-primary-nav" aria-label="Primary navigation">{nav.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
    <div className="lab-header-actions"><ThemeControl /><a className="lab-portfolio-link" href="https://jaylawrence.me">Portfolio <ArrowUpRight size={15} aria-hidden="true" /></a></div>
    <LabMobileNav items={nav} />
  </div></header>;
}
