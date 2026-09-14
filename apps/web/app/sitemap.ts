import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/work",
    "/blog",
    "/about",
    "/resume",
    "/contact",
    ...projects.map((project) => `/work/${project.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
  ];

  // Omit lastModified until actual content update dates are recorded.
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
