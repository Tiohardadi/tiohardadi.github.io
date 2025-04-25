const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: './',
  basePath:'tiohardadi.github.io',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  transpilePackages: ['contentlayer', 'next-contentlayer'],
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  basePath: '', 
  webpack: (config, { isServer }) => {
    // Konfigurasi untuk menangani font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    
    return config;
  },
};

module.exports = withContentlayer(nextConfig);
