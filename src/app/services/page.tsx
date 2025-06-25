// app/services/page.tsx
'use client'

import { motion } from 'framer-motion'
import { services } from '@/data/content/servicesContent'
import ServiceCard from '@/components/services/ServiceCard'

export default function ServicesPage() {
  return (
    <main className="bg-[#fff8f2] text-[#5e4033] py-16 px-6 md:px-20 min-h-screen">
      <section className="max-w-7xl mx-auto space-y-16">

        {/* 🏠 Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-serif font-semibold mb-4">Our Offerings</h1>
          <p className="text-base text-[#7c6f63]">
            At Noura, art is more than viewing — it's experiencing. Explore the services designed to help you connect, learn, and collaborate with Master Alijanpour.
          </p>
        </motion.div>

        {/* 🏋️ Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((srv, idx) => (
            <ServiceCard key={idx} {...srv} />
          ))}
        </motion.div>
      </section>
    </main>
  )
}
