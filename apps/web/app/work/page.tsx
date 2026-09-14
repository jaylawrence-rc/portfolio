import { WorkFilter } from "@/components/work-filter";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Work",
  description: "Selected product engineering, AI workflow, design system, and frontend work by Jay Lawrence.",
  path: "/work",
});

export default async function WorkPage({ searchParams }: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  const { filter } = await searchParams;

  return (
    <section className="page-shell shell">
      <header className="page-intro">
        <p className="eyebrow">The work archive · 07 projects</p>
        <h1>Good questions.<br />Useful software.</h1>
        <p>Products, platforms, and the decisions behind them. Explore my work across music data, AI workflows, and client systems.</p>
      </header>
      <WorkFilter filter={Array.isArray(filter) ? filter[0] : filter} />
    </section>
  );
}
