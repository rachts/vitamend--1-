/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "localhost", 
      "vitamend.com", 
      "vercel.app",
      "vercel-storage.com",
      "blob.vercel-storage.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com"
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.vercel.app"]
    },
  },

  // ✅ Static Export for GitHub Pages
  output: 'export',

  // GitHub Pages requires trailing slashes for routing
  trailingSlash: true,

  compress: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
