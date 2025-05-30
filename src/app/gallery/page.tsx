// app/gallery/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { getAllProductsPaginated } from '@/services/shopify'
import ProductGrid from '@/components/product/ProductGrid'
import { Product } from '@/types/product'
import { SHOPIFY_DOMAIN } from '@/config/settings'

export default function GalleryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProductsPaginated(1).then((res) => {
      setProducts(res)
      setLoading(false)
    })
  }, [])

  return (
    <main className="min-h-screen bg-[#fff8f2] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Hero Title */}
        <section className="text-center mb-14">
          <h1 className="text-5xl font-serif text-[#5e4033] mb-4">The Gallery of Light</h1>
          <p className="text-[#7b5e4a] text-lg max-w-2xl mx-auto">
            Explore our curated selection of mystical and timeless artworks.
          </p>
        </section>

        {/* Product Grid */}
        <ProductGrid
          title=""
          products={products}
        shopUrl={SHOPIFY_DOMAIN}
          isLoading={loading}
        />

      </div>
    </main>
  )
}
