import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product/category images are remote (CDNs) + generated assets. We render them
  // with plain <img> for simplicity, so no next/image domain config is required.
  // If you switch to next/image, add the hosts here under images.remotePatterns.
  reactStrictMode: true,
};

export default nextConfig;
