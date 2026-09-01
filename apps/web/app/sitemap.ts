import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";
export default function sitemap():MetadataRoute.Sitemap{const base="https://jaylawrence.dev";return ["","/work","/blog","/about","/resume","/contact",...projects.map(p=>`/work/${p.slug}`),...posts.map(post=>`/blog/${post.slug}`)].map(url=>({url:`${base}${url}`,lastModified:new Date()}));}
