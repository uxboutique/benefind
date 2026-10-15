/**
 * Prefixes a /public path with the deploy base path (e.g. "/benefind-web" on GitHub Pages).
 * next/image string sources and plain <img> tags don't get basePath automatically.
 */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
