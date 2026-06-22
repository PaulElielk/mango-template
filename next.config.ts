import type { NextConfig } from "next";

function getSupabaseImageRemotePatterns() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) return [];

  try {
    const { protocol, hostname } = new URL(supabaseUrl);

    return [
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    // Local public/ images are always allowed; this also permits Supabase-hosted product images.
    remotePatterns: getSupabaseImageRemotePatterns(),
  },
};

export default nextConfig;
