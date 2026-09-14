import type { NextConfig } from "next";
import { siteUrl } from "./lib/site";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "www.jaylawrence.me" }],
      destination: `${siteUrl}/:path*`,
      permanent: true,
    }];
  },
};

export default nextConfig;
