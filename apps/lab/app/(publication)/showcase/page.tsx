import { ShowcaseGallery } from "@/components/showcase-gallery";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: "Showcase", description: "Three navigable Jay-built public prototypes with disclosed process, manual edits, design choices, and checks.", path: "/showcase" });

export default function ShowcasePage() { return <ShowcaseGallery />; }
