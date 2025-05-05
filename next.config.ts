import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Allow scripts from self, inline scripts, eval, and Kaspersky
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://gc.kis.v2.scr.kaspersky-labs.com ws://gc.kis.v2.scr.kaspersky-labs.com; object-src 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
