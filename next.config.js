/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  },
  experimental: {
    emotion: true,
  },
};

module.exports = nextConfig;
