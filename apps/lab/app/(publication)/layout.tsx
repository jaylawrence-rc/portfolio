import { LabHeader } from "@/components/lab-header";
import { LabFooter } from "@/components/lab-footer";

export default function PublicationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="lab-publication"><a className="skip-link" href="#main">Skip to content</a><LabHeader /><main id="main">{children}</main><LabFooter /></div>;
}
