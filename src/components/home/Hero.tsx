// components/home/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { heroContent } from '@/data/content/homeContent'

export default function Hero() {
  const { title, subtitle, image, buttons } = heroContent

  return (
    <section className="relative bg-[#fff8f2] text-[#5e4033] py-16 px-6 md:px-20 flex flex-col-reverse lg:flex-row items-center gap-10">
      
      {/* 💬 Text Block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-tight">
          {title}
        </h1>

        <p className="text-lg text-[#7c6f63]">
          {subtitle}
        </p>

        <div className="flex gap-4 mt-6">
          {buttons.map((btn, idx) => (
            <Link
              key={idx}
              href={btn.href}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                idx === 0
                  ? 'bg-[#5e4033] text-white hover:bg-[#4a362a]'
                  : 'border border-[#5e4033] text-[#5e4033] hover:bg-[#eee3da]'
              }`}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 🖼️ Image Block */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl"
      >
        <Image
          src={image}
          alt="Master Alijanpour Portrait"
          width={500}
          height={700}
          className="object-cover rounded-xl"
          priority
        />
      </motion.div>
    </section>
  )
}
