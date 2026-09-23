"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

export function LabMobileNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return <details className="lab-mobile-nav" key={pathname}>
    <summary aria-label="Open navigation">Menu <span aria-hidden="true">+</span></summary>
    <nav aria-label="Mobile navigation">
      {items.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      <a href="https://jaylawrence.me">Portfolio ↗</a>
    </nav>
  </details>;
}
