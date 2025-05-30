import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com'], // اجازه بارگذاری تصویر از دامنه Shopify
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
