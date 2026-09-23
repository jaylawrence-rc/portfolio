import Link from "next/link";
import { getPublishedEntries } from "@/lib/content";

export function LabFooter() {
  const hasLibrary = getPublishedEntries().length > 0;
  return <footer className="lab-footer"><div className="lab-shell">
    <div className="lab-footer-top"><p className="eyebrow">Jay&apos;s Lab / Keep exploring</p><p>Reusable thinking for building things worth keeping.</p></div>
    <div className="lab-footer-bottom"><span>© {new Date().getFullYear()} Jay Lawrence Dimaano</span><nav aria-label="Footer navigation"><Link href="/showcase">Showcase</Link><Link href="/experiments">Experiments</Link>{hasLibrary ? <Link href="/library">Library</Link> : null}<a href="https://jaylawrence.me/blog">Portfolio Journal ↗</a></nav><span>Independent publication · Manila</span></div>
  </div></footer>;
}
