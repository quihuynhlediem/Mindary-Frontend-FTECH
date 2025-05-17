import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mindary.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'libraryitems.insighttimer.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
