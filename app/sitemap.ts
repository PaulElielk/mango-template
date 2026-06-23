import type { MetadataRoute } from "next";

const staticRoutes = [
  "/",
  "/shop",
  "/contact",
  "/faq",
  "/livraison-retours",
  "/politique-confidentialite",
  "/conditions-generales",
];

function getSiteUrl() {
  const fallbackUrl = "http://localhost:3000";
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl;

  try {
    return new URL(configuredUrl).origin;
  } catch {
    return fallbackUrl;
  }
}

function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  return staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" || route === "/shop" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/shop" ? 0.9 : 0.7,
  }));
}
