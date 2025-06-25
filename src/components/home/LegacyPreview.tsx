// components/home/LegacyPreview.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import MasterQuote from '@/components/artist/shared/MasterQuote'

export default function LegacyPreview() {
  return (
    <section className="bg-[#fef6e4] py-16 px-6 md:px-20 text-[#5e4033]">
      <div className="max-w-4xl mx-auto space-y-10 text-center">

        {/* 🧠 Legacy Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-serif font-semibold">Legacy & Recognition</h2>
          <p className="text-[#7c6f63] text-base leading-relaxed max-w-2xl mx-auto">
            From founding an art school in Toronto to being honored by Canadian officials and cultural institutions, Master Alijanpour’s legacy spans generations, borders, and traditions.
          </p>
        </motion.div>

        {/* 🖋️ Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
             <MasterQuote
                    text="Mr. Alijanpour is a painter who has a curious vision, and through his innovative works..."
                    author="Mahmoud Farshchian"
                    subtitle="Master of Persian Miniature"
                    authorUrl='https://en.wikipedia.org/wiki/Mahmoud_Farshchian'
                    avatarUrl="/avatars/farshchian.jpg"
                  />
         
        </motion.div>

        {/* 🔗 CTA */}
        <div className="pt-4">
          <Link
            href="/about"
            className="inline-block text-sm text-[#5e4033] underline hover:text-[#3a2a21] transition"
          >
            View Full Legacy →
          </Link>
        </div>
      </div>
    </section>
  )
}
