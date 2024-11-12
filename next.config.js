/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/jiaqihe.github.io' : '',
  assetPrefix: isProd ? '/jiaqihe.github.io' : '',
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "punycode": false,
    };
    return config;
  },
};

module.exports = nextConfig;
