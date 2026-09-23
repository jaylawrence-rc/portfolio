import Link from "next/link";

export default function NotFound() {
  return <section className="lab-shell" style={{ paddingBlock: "clamp(6rem, 12vw, 10rem)" }}><p className="eyebrow">404 / No entry here</p><h1 style={{ maxWidth: 850, margin: "1.2rem 0", fontSize: "clamp(3.4rem, 8vw, 7rem)", lineHeight: .95, letterSpacing: "-.07em", fontWeight: 550 }}>The trail ends here.</h1><p style={{ maxWidth: 520, color: "var(--muted)" }}>This page may have moved, or it may never have been published.</p><Link className="lab-link" href="/">Return to Jay&apos;s Lab ↗</Link></section>;
}
