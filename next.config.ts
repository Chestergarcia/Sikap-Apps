import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  distDir: isGithubPages ? "pages-build" : ".next",
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: "/Sikap-Apps",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  /* config options here */
  ...(!isGithubPages
    ? {
        cacheComponents: true,
        partialPrefetching: true,
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
