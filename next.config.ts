import type { NextConfig } from "next";

// Allow next/image to optimize media served from the WordPress backend.
const wordpressUrl = process.env.WORDPRESS_GRAPHQL_URL
  ? new URL(process.env.WORDPRESS_GRAPHQL_URL)
  : undefined;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: wordpressUrl
      ? [
          {
            // http is allowed so a LocalWP site (http://garnet-cms.local) works in development.
            protocol: wordpressUrl.protocol.replace(":", "") as "http" | "https",
            hostname: wordpressUrl.hostname,
            pathname: "/wp-content/uploads/**",
          },
        ]
      : [],
    // LocalWP resolves *.local to 127.0.0.1, which next/image blocks by default.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
