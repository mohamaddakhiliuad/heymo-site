// app/connect/page.tsx
'use client'

import ConnectForm from '@/components/forms/ConnectForm'
import { motion } from 'framer-motion'

export default function ConnectPage() {
  return (
    <main className="bg-[#fff8f2] text-[#5e4033] min-h-screen py-16 px-6 md:px-20">

      {/* 🏠 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-serif font-semibold mb-4">
          Experience Noura — Connect with Master Alijanpour
        </h1>
        <p className="text-[#7c6f63] text-base leading-relaxed">
          Whether you wish to visit the gallery, commission a new work, attend a masterclass, or simply reach out — this form is your gateway.
        </p>
      </motion.div>

      {/* ✉️ Contact Form Section */}
      <ConnectForm />

    </main>
  )
}
