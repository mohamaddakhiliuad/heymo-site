import { getAllProductsPaginated } from '@/components/services/shopify'
import { NextResponse } from 'next/server'

// 🔒 جلوگیری کامل از prerender و caching در زمان build
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET() {
  const baseUrl = 'https://rumilander.art'

  const products = await getAllProductsPaginated(1)

  const productUrls = products.map(product => {
    return `
      <url>
        <loc>${baseUrl}/products/${product.handle}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
  })

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
