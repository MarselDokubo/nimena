import type { MetadataRoute } from "next";

const publicRoutes = [
  "",
  "/apply",
  "/verify-member",
  "/community",
  "/learning",
  "/conferences",
  "/conferences/cfp",
  "/research",
  "/journals",
  "/journals/about",
  "/journals/ajomena",
  "/journals/jbesed",
  "/journals/call-for-papers",
  "/journals/announcements",
  "/journals/policies",
  "/journals/contact",
  "/library",
  "/recognition",
  "/careers",
  "/partners",
  "/governance",
  "/programmes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portal.nimena.org.ng";
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/verify-member" ? 0.9 : 0.7,
  }));
}
