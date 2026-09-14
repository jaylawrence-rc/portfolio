import { Suspense } from "react";
import { WorkFilter } from "@/components/work-filter";

export const metadata = { title: "Work", description: "Selected product engineering, AI workflow, design system, and frontend work by Jay Lawrence." };
export default function WorkPage() { return <section className="page-shell shell"><header className="page-intro"><p className="eyebrow">The work archive · 07 projects</p><h1>Good questions.<br />Useful software.</h1><p>Products, platforms, and the decisions behind them. Explore my work across music data, AI workflows, and client systems.</p></header><Suspense><WorkFilter/></Suspense></section>; }
