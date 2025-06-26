'use client'
import Hero from "@/components/home/Hero"
import AboutPreview from "@/components/home/AboutPreview" 
import GalleryPreview from "@/components/home/GalleryPreview"
import { useEffect, useState } from 'react'
import { getAllProductsPaginated } from '@/components/services/shopify'
import { Product } from '@/types/product'
import LegacyPreview from "@/components/home/LegacyPreview"


export default function Home() {
  
 

  return (
    <main>
      <Hero />
      <AboutPreview></AboutPreview>
      <GalleryPreview></GalleryPreview>
      <LegacyPreview></LegacyPreview>
    
   
    </main>
  )
}
