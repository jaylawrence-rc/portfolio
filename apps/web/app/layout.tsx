import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { profile } from "@/lib/profile";
import { absoluteUrl, personId, siteDescription, siteTitle, siteUrl, websiteId } from "@/lib/site";
import "./globals.css";
import "./editorial.css";
import "@/components/navigation.css";
import "@/components/case-study.css";
import "@/components/project-hover.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s — Jay Lawrence" },
  description: siteDescription,
  authors: [{ name: profile.name, url: absoluteUrl("/about") }],
  robots: { index: true, follow: true },
};

const identity = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: "Jay Lawrence",
      jobTitle: profile.title,
      url: absoluteUrl("/about"),
      email: profile.email,
      homeLocation: { "@type": "Place", name: profile.location },
      sameAs: [profile.github, profile.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteTitle,
      url: absoluteUrl("/"),
      description: siteDescription,
      inLanguage: "en",
      author: { "@id": personId },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><link rel="describedby" href="/llms.txt" type="text/plain" /><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem('theme')||'light'}catch(e){}`}}/></head><body><JsonLd data={identity} /><a className="skip-link" href="#content">Skip to content</a><Header/><main id="content">{children}</main><Footer/></body></html>;
}
