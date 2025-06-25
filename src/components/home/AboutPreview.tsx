// components/home/AboutPreview.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { museumArtworks } from '@/data/artworks/museumArtworks'
import ArtworkCard from '@/components/artwork/ArtworkCard'

export default function AboutPreview() {
  const previewArtworks = museumArtworks.slice(0, 3)

  return (
    <section className="bg-[#fef6e4] py-16 px-6 md:px-20 text-[#5e4033]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* 🎖️ Summary Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <h2 className="text-3xl font-serif font-semibold">About the Artist</h2>
          <p className="text-base text-[#7c6f63] leading-relaxed">
            Master Alijanpour is recognized as one of the five leading masters of Persian miniature. His paintings are housed in national museums in Iran and Canada, and collected by royal patrons and art collectors in the UAE.
          </p>
          <Link
            href="/about"
            className="text-sm underline text-[#5e4033] hover:text-[#3a2a21] transition"
          >
            Read full biography →
          </Link>
        </motion.div>

        {/* 🖼️ Mini Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {previewArtworks.map((art, idx) => (
            <ArtworkCard key={idx} artwork={art} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
