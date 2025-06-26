'use client'

import Hero from "@/components/home/Hero"
import AboutPreview from "@/components/home/AboutPreview" 
import GalleryPreview from "@/components/home/GalleryPreview"
import LegacyPreview from "@/components/home/LegacyPreview"

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutPreview />
      <GalleryPreview />
      <LegacyPreview />
    </main>
  )
}
