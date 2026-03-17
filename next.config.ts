import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ask',
        destination: '/qr',
        permanent: true,
      },
      {
        source: '/qa',
        destination: '/qr',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
