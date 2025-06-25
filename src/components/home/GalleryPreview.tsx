// components/home/GalleryPreview.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ArtworkCard from '@/components/artwork/ArtworkCard'
import { museumArtworks } from '@/data/artworks/museumArtworks'

export default function GalleryPreview() {
  const featuredArtworks = museumArtworks.slice(3, 9) // آثار ۴ تا ۹

  return (
    <section className="bg-[#fff8f2] py-16 px-6 md:px-20 text-[#5e4033]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 🧠 Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-serif font-semibold">Selected Works</h2>
          <p className="text-base text-[#7c6f63] max-w-2xl mx-auto">
            A glimpse into the spiritual and poetic world of Master Alijanpour.  
            Each painting invites you into a universe of detail, color, and meaning.
          </p>
        </motion.div>

        {/* 🖼️ Grid of Artworks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {featuredArtworks.map((art, idx) => (
            <ArtworkCard key={idx} artwork={art} />
          ))}
        </motion.div>

        {/* 🔗 Call-to-Action */}
        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-block px-6 py-2 text-sm rounded-full border border-[#5e4033] text-[#5e4033] hover:bg-[#eee3da] transition"
          >
            View Full Gallery →
          </Link>
        </div>
      </div>
    </section>
  )
}
