'use client'
import Hero from "@/components/home/Hero"
import AboutPreview from "@/components/home/AboutPreview" 
import GalleryPreview from "@/components/home/GalleryPreview"
import { useEffect, useState } from 'react'
import { getAllProductsPaginated } from '@/components/services/shopify'
import ProductGrid from '@/components/product/ProductGrid'
import { Product } from '@/types/product'
import { SHOPIFY_DOMAIN } from '@/config/settings'
import LegacyPreview from "@/components/home/LegacyPreview"
import Footer from "@/components/shared/Footer"

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
      <AboutPreview></AboutPreview>
      <GalleryPreview></GalleryPreview>
      <LegacyPreview></LegacyPreview>
    
   
    </main>
  )
}
