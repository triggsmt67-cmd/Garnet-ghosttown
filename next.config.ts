import type { NextConfig } from "next";

// Allow next/image to optimize media served from the WordPress backend.
const wordpressHost = process.env.WORDPRESS_GRAPHQL_URL
  ? new URL(process.env.WORDPRESS_GRAPHQL_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: wordpressHost
      ? [{ protocol: "https", hostname: wordpressHost, pathname: "/wp-content/uploads/**" }]
      : [],
  },
};

export default nextConfig;
