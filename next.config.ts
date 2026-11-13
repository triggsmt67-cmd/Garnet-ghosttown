import type { NextConfig } from "next";

// Allow next/image to optimize media served from the WordPress backend.
const wordpressUrl = process.env.WORDPRESS_GRAPHQL_URL
  ? new URL(process.env.WORDPRESS_GRAPHQL_URL)
  : undefined;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.php", destination: "/" },
      { source: "/about.php", destination: "/association" },
      { source: "/contact.php", destination: "/faq" },
      { source: "/gold-mining.php", destination: "/about" },
      { source: "/history.php", destination: "/about" },
      { source: "/directions.php", destination: "/visit" },
      { source: "/education.php", destination: "/events" },
      { source: "/membership.php", destination: "/preserve#membership" },
      { source: "/things-to-do.php", destination: "/explore" },
      { source: "/cabin-rentals.php", destination: "/cabin-rentals" },
      { source: "/photo-gallery.php", destination: "/gallery" },
      { source: "/license-plate-grant.php", destination: "/license-plate" },
      { source: "/license-plate-grant", destination: "/license-plate" },
      { source: "/assets/files/membership-application.pdf", destination: "/preserve#membership" },
      { source: "/assets/files/Updated_GPA-Transportation-Grant-Form.docx", destination: "/downloads/Updated_GPA-Transportation-Grant-Form.docx" },
      { source: "/assets/files/License-plate-grant-application-2024.pdf", destination: "/downloads/License-plate-grant-application-2024.pdf" },
      { source: "/assets/files/grant-application-cover-ltr-2024.pdf", destination: "/downloads/grant-application-cover-ltr-2024.pdf" },
    ].map(redirect => ({ ...redirect, permanent: true }));
  },
  images: {
    formats: ["image/webp"],
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
