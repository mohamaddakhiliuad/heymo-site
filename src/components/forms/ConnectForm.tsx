// components/forms/ConnectForm.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ConnectForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Gallery Visit',
    message: '',
    subscribe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.')
      return
    }

    console.log('Form submitted:', formData)
    // TODO: connect to API, EmailJS, or webhook
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white text-[#5e4033] p-8 rounded-xl shadow-lg max-w-xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-serif font-semibold text-center">Connect with Master Alijanpour</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option>Gallery Visit</option>
          <option>Masterclass Request</option>
          <option>Commission an Artwork</option>
          <option>General Inquiry</option>
        </select>

        <textarea
          name="message"
          rows={4}
          placeholder="Your message or request..."
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
          />
          Subscribe to gallery updates and events
        </label>
      </div>

      <button
        type="submit"
        className="bg-[#5e4033] text-white px-6 py-2 rounded-full hover:bg-[#3e2e22] transition"
      >
        Send Message
      </button>
    </motion.form>
  )
}
