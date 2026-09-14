"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { CompanyPreview } from "@/lib/company-previews";

export function CompanyPreviewCard({ preview, href, onVisit }: { preview: CompanyPreview; href: string; onVisit: () => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <a className="company-preview-visit" href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1} onClick={onVisit}>
      <div className="company-preview-heading"><span>Company preview</span><span>{preview.domain}</span></div>
      <div className="company-preview-image">
        {failed ? <div className="company-preview-unavailable"><strong>{preview.name}</strong><span>Visit the website to explore.</span></div> : <Image {...preview.image} alt={preview.image.alt} sizes="(max-width: 420px) calc(100vw - 32px), 368px" loading="eager" onError={() => setFailed(true)} />}
      </div>
      <div className="company-preview-caption"><div><strong>{preview.name}</strong><span>{preview.label} · Published by the company</span></div><ArrowUpRight size={20} aria-hidden="true" /></div>
    </a>
  );
}
