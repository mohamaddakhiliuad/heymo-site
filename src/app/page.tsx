'use client'
import Hero from "@/components/Hero"
import { useEffect, useState } from 'react'
import { getAllProductsPaginated } from '@/services/shopify'
import ProductGrid from '@/components/product/ProductGrid'
import { Product } from '@/types/product'
import { SHOPIFY_DOMAIN } from '@/config/settings'

export default function Home() {
   const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProductsPaginated(1).then((res) => {
      setProducts(res)
      setLoading(false)
    })
  }, [])

  return (
    <main>
      <Hero />
   <ProductGrid
           title=""
           products={products}
         shopUrl={SHOPIFY_DOMAIN}
           isLoading={loading}
         />
  
    </main>
  )
}
