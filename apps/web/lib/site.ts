import type { Metadata } from "next";

export const siteUrl = "https://jaylawrence.me";
export const labUrl = "https://lab.jaylawrence.me";
export const siteTitle = "Jay Lawrence — Product Engineer";
export const siteDescription = "Product engineer turning complex workflows into clear, scalable software across AI, healthcare, music data, recruitment, and B2B products.";

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

export const personId = absoluteUrl("/#person");
export const websiteId = absoluteUrl("/#website");

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: PageMetadataOptions): Metadata {
  const socialTitle = path === "/" ? title : `${title} — Jay Lawrence`;
  const imageUrl = absoluteUrl(image ?? `/og/${path.split("/").filter(Boolean).at(-1) ?? "home"}`);

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteTitle,
      locale: "en_US",
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: socialTitle }],
      ...(type === "article" ? { publishedTime, authors: [absoluteUrl("/about")] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: imageUrl, alt: socialTitle }],
    },
  };
}
