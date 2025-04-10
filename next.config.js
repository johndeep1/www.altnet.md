/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

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
    formats: ['image/webp'], // Prefer WebP format for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Responsive image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Icon sizes
  },

  // i18n configuration for Romanian language
  i18n: {
    locales: ['ro-MD'],
    defaultLocale: 'ro-MD',
  },

  // Performance optimizations
  experimental: {
    optimizeServerReact: true,
  },

  // Compression for better performance
  compress: true,

  // Disable X-Powered-By header for security
  poweredByHeader: false,

  // Set trailing slash consistency for SEO
  trailingSlash: false,

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
