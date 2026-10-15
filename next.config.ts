import type { NextConfig } from "next";

// STATIC_EXPORT=1 → static HTML in out/ (test deploys, e.g. GitHub Pages; images unoptimised).
// NEXT_PUBLIC_BASE_PATH="/repo-name" when served from a sub-path (GitHub Pages project sites).
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport && { output: "export", trailingSlash: true }),
  ...(basePath && { basePath }),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(staticExport && { unoptimized: true }),
  },
};

export default nextConfig;
