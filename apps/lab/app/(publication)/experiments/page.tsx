import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import "@/components/configurator.css";

export const metadata = pageMetadata({ title: "Experiments", description: "Interactive investigations from Jay's Lab, beginning with the Design Profile Configurator.", path: "/experiments" });

export default function ExperimentsPage() {
  return <section className="configurator-index lab-shell">
    <p className="configurator__kicker">Experiments / 01 published</p>
    <h1>Ideas you can handle.</h1>
    <p>Small working tools expose the decisions behind a design or engineering technique.</p>
    <Link href="/experiments/design-profile" className="configurator-index__entry">
      <span className="configurator-index__number">01 / Interactive</span>
      <span><strong>Design Profile Configurator</strong><small>Tune semantic color, type, corners, and spacing on two working site prototypes. Inspect readability and export your choices.</small></span>
      <span aria-hidden="true">↗</span>
    </Link>
  </section>;
}
