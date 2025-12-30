/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optimized image handling
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
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Compression for better performance
  compress: true,

  // Disable X-Powered-By header for security
  poweredByHeader: false,

  // Set trailing slash consistency for SEO
  trailingSlash: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
