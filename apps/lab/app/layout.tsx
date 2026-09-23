import type { Metadata } from "next";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "@jay/design-system/tokens.css";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s — ${siteTitle}` },
  description: siteDescription,
  authors: [{ name: "Jay Lawrence Dimaano", url: "https://jaylawrence.me" }],
  robots: { index: true, follow: true },
  openGraph: { siteName: siteTitle, type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}><head><link rel="alternate" type="application/rss+xml" title="Jay's Lab RSS" href="/feed.xml" /><script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.theme=localStorage.getItem('theme')||'light'}catch(e){}" }} /></head><body>{children}</body></html>;
}
