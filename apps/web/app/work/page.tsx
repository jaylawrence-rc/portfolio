import { Suspense } from "react";
import { WorkFilter } from "@/components/work-filter";

export const metadata = { title: "Work", description: "Selected product engineering, AI workflow, design system, and frontend work by Jay Lawrence." };
export default function WorkPage() { return <section className="page-shell shell"><header className="page-intro"><p className="eyebrow">Work archive · seven public products</p><h1>Evidence of decisions, not a gallery of screens.</h1><p>Filter by the kind of problem. Every case study separates my contribution from team outcomes and labels reconstructed evidence plainly.</p></header><Suspense><WorkFilter/></Suspense></section>; }
