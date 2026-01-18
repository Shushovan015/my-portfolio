import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://your-domain.com"; // replace after deploy

  const routes = ["", "/projects", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...projectRoutes];
}
