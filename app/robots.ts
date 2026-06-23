import type { MetadataRoute } from "next";

function getSiteUrl() {
  const fallbackUrl = "http://localhost:3000";
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl;

  try {
    return new URL(configuredUrl).origin;
  } catch {
    return fallbackUrl;
  }
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
