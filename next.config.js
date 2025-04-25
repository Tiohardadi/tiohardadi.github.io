const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: './',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['contentlayer', 'next-contentlayer'],
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  basePath: '', 
};

module.exports = withContentlayer(nextConfig);
