import { SignalAtlasCase } from "@/components/showcase";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Signal Atlas — Showcase",
  description: "Inspect Signal Atlas, a manually assembled, fictional city-operations prototype and its motion-led design decisions.",
  path: "/showcase/signal-atlas",
});

export default function SignalAtlasCasePage() {
  return <SignalAtlasCase />;
}
