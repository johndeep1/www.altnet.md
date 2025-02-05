/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  eslint: {
    // Warning: only add this if you want to ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: only add this if you want to ignore TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
