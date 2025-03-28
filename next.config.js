/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.kopis.or.kr"],
  },
  webpack: (config) => {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
