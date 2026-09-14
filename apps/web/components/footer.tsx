import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="editorial-footer shell">
      <div className="editorial-footer-top"><p className="editorial-label">The next chapter</p><p className="availability-note"><span aria-hidden="true" /> Open to selected product engineering roles</p></div>
      <div className="editorial-footer-invitation"><h2>Let’s build<br />something useful.</h2><Link className="footer-contact-link" href="/contact" aria-label="Start a conversation"><ArrowUpRight aria-hidden="true" /></Link></div>
      <div className="editorial-footer-contact"><a className="editorial-link" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={17} aria-hidden="true" /></a><p>Good problems. Thoughtful teams. Software that makes a difference.</p></div>
      <div className="editorial-footer-bottom"><span>© {new Date().getFullYear()} Jay Lawrence Dimaano</span><nav aria-label="Footer navigation"><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/blog">Journal</Link><Link href="/resume">Résumé <ArrowUpRight size={13} aria-hidden="true" /></Link><Link href="/contact">Contact</Link><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a></nav><span>Philippines · GMT+8</span></div>
    </footer>
  );
}
