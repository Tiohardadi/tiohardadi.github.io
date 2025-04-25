const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: '/tiohardadis',
  // assetPrefix: '/tiohardadis/',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['contentlayer', 'next-contentlayer'],
  reactStrictMode: true,
  swcMinify: true,
  exportTrailingSlash: true,
};

module.exports = withContentlayer(nextConfig);
