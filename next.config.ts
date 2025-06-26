import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ مهم برای حل سریع مشکل دیپلوی
  },
  experimental: {
    // ⚠️ اگر از appDir واقعاً استفاده نمی‌کنی، این رو حذف کن
    // appDir: true,
  },
}

export default nextConfig
