// app/sitemap.xml/route.ts

import { getAllProductsPaginated } from '@/components/services/shopify'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://rumilander.art'

  // ⛳️ فراخوانی همه محصولات از Shopify
  const products = await getAllProductsPaginated(1) // صفحه اول فعلاً، بعداً می‌شه کامل‌ترش کرد

  // 🎯 ساخت URL برای هر محصول
  const productUrls = products.map(product => {
    return `
      <url>
        <loc>${baseUrl}/products/${product.handle}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
  })

  // 🧱 صفحات استاتیک سایت مثل gallery و contact
  const staticUrls = [
    '',
    '/gallery',
    '/connect',
    '/about',
    '/artists/alijan-alijanpour'
  ].map(page => {
    return `
      <url>
        <loc>${baseUrl}${page}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `
  })

  // 📦 نهایی: ساخت XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls.join('')}
    ${productUrls.join('')}
  </urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
