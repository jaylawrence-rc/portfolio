import { SignalAtlasSite } from "@/components/demo-signal-atlas";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Signal Atlas — working prototype",
  description: "Explore a fictional city-operations interface with an original network map, scroll narrative, and three sample scenarios.",
  path: "/sites/signal-atlas",
});

export default function SignalAtlasPage() {
  return <SignalAtlasSite />;
}
