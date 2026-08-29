/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  
  // Enable compression
  compress: true,
  
  // Bundle analyzer (uncomment to analyze bundle size)
  // ...(process.env.ANALYZE === 'true' && { bundleAnalyzer: { enabled: true } }),
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      }
    ],
  },
  
  // Note: Custom headers don't work with static export
  // These would need to be configured at the server/CDN level (e.g., Netlify _headers file)
  
  // Experimental features for better performance
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion', 'react-player', 'swiper', '@sanity/image-url'],
    serverComponentsExternalPackages: ['@sanity/client'],
  },
  
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Reduce bundle size by using lighter alternatives
        'framer-motion': 'framer-motion',
      }
    }
    
    return config
  },
}

module.exports = nextConfig