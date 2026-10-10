import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/**': ['./src/content/**/*'],
  },
  images: {
    loader: 'custom',
    loaderFile: './cloudinary-loader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

};

export default nextConfig;