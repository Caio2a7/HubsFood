import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  typescript: {
    ignoreBuildErrors: true, // Ignora erros de TypeScript no build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros do ESLint no build
  },
};


export default nextConfig;
