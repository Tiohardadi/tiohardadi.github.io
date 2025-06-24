const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['contentlayer', 'next-contentlayer'],
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
};

module.exports = withContentlayer(nextConfig);
