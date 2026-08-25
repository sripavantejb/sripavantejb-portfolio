import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// A stray package-lock.json in the home directory makes Turbopack's automatic
// root detection ambiguous, so pin the root to this project explicitly.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "framer-motion"],
  },
};

export default nextConfig;
