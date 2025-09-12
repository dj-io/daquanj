import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  async redirects() {
    return isProd
      ? [
          {
            source: '/privacy',
            destination: '/_not-found',   // or '/404'
            permanent: false,
          },
          {
            source: '/terms',
            destination: '/_not-found',
            permanent: false,
          },
        ]
      : []
  },
}

export default nextConfig;
