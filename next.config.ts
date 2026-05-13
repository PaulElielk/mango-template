import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // local public/ images are always allowed; add remote domains here if needed
    remotePatterns: [],
  },
};

export default nextConfig;
