import Link from "next/link";
import { profile } from "@/lib/profile";

export function Footer() {
  return <footer className="site-footer shell"><div><p className="eyebrow">Open to the right product team</p><h2>Building a product where engineering judgment matters? <Link href="/contact">Let’s talk.</Link></h2></div><div className="footer-bottom"><span>{profile.name} · {profile.location} / {profile.timezone}</span><nav><Link href="/blog">Blog</Link><a href={`mailto:${profile.email}`}>Email</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><Link href="/resume">Résumé</Link></nav></div></footer>;
}
