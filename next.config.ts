import type { NextConfig } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/api/public/media/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pileperde.com.tr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.s3.eu-central-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/admin/:path*',
        destination: `${apiBaseUrl}/api/admin/:path*`,
      },
      {
        source: '/api/public/:path*',
        destination: `${apiBaseUrl}/api/public/:path*`,
      },
    ];
  },
};

export default nextConfig;
