import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AttentionTitle } from "@/components/attention-title";
import "./globals.css";
import "./editorial.css";
import "@/components/navigation.css";
import "@/components/case-study.css";
import "@/components/project-hover.css";

export const metadata: Metadata = { title: { default: "Jay Lawrence — Product Engineer", template: "%s — Jay Lawrence" }, description: "Product engineer turning complex workflows into clear, scalable software across AI, healthcare, music data, recruitment, and B2B products." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem('theme')||'light'}catch(e){}`}}/></head><body><AttentionTitle/><a className="skip-link" href="#content">Skip to content</a><Header/><main id="content">{children}</main><Footer/></body></html>;
}
