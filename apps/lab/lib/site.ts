import type { Metadata } from "next";

export const siteUrl = "https://lab.jaylawrence.me";
export const siteTitle = "Jay's Lab";
export const siteDescription = "Jay Lawrence Dimaano's independent lab for technical learning, explicit standards, experiments, and agent guidance.";

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function pageMetadata({ title, description, path, type = "website", publishedTime }: PageMetadataOptions): Metadata {
  const socialTitle = path === "/" ? title : `${title} — Jay's Lab`;
  const image = absoluteUrl("/opengraph-image");
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteTitle,
      locale: "en_US",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
      ...(type === "article" ? { publishedTime, authors: ["Jay Lawrence Dimaano"] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image, alt: socialTitle }],
    },
  };
}
