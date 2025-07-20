'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'

export default function ConnectForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Private Gallery Visit',
    message: '',
    subscribe: false,
    whatsapp: false,
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.')
      return
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          inquiry_type: formData.type,
          message: formData.message,
          subscribe: formData.subscribe ? 'Yes' : 'No',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => setSubmitted(true))
      .catch(err => {
        console.error('EmailJS error:', err)
        alert('Something went wrong. Please try again.')
      })
  }

  const whatsappLink = `https://wa.me/16474820073?text=Hello%20Rumilander%20Studio,%20I%20have%20a%20${encodeURIComponent(
    formData.type
  )}%20inquiry.%20Name:%20${encodeURIComponent(
    formData.name
  )}%20Email:%20${encodeURIComponent(formData.email)}`

  if (submitted) {
    return (
      <div className="bg-white text-[#5e4033] p-8 rounded-xl shadow-lg max-w-xl mx-auto space-y-6 text-center">
        <h2 className="text-2xl font-serif font-semibold">Message Sent</h2>
        <p>
          Thank you for contacting Rumilander Studio. We will respond within 48 hours.
        </p>
        {formData.whatsapp && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Continue on WhatsApp
          </a>
        )}
      </div>
    )
  }

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white text-[#5e4033] p-8 rounded-xl shadow-lg max-w-xl mx-auto space-y-6"
      >
        <h2 className="text-2xl font-serif font-semibold text-center">Contact Rumilander Studio</h2>
        <p className="text-sm text-center text-gray-500">
          For gallery visits, commissions, or press inquiries related to Master Alijanpour, please complete the form below.
        </p>

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
          <input
            type="tel"
            name="phone"
            placeholder="Your phone number (optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option>Private Gallery Visit</option>
            <option>Request a Masterclass</option>
            <option>Commission a Custom Artwork</option>
            <option>Media / Press Inquiry</option>
            <option>Other</option>
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
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="whatsapp"
              checked={formData.whatsapp}
              onChange={handleChange}
            />
            I’d like to be contacted via WhatsApp
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#5e4033] text-white px-6 py-2 rounded-full hover:bg-[#3e2e22] transition"
        >
          Send Message
        </button>
      </motion.form>

      {/* 🌐 Contact Information Section */}
      <div className="mt-10 bg-[#fff8f2] border-t border-gray-200 pt-6 text-sm text-[#5e4033] text-center space-y-2">
        {/* Studio Address */}
        <p className="flex items-center justify-center gap-2">
          <span>📍</span>
          <span>7163 Yonge Street, Suite 228 – Thornhill, ON, L3T 0C6</span>
        </p>

        {/* Phone & WhatsApp */}
        <p className="flex items-center justify-center gap-2">
          <span>📞</span>
          <span>
            Office: <a href="tel:+14168903132" className="underline hover:text-[#3e2e22]">(416) 890-3132</a> &nbsp;|&nbsp;
            WhatsApp: <a href="https://wa.me/16474820073" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#3e2e22]">(647) 482-0073</a>
          </span>
        </p>

        {/* Email */}
        <p className="flex items-center justify-center gap-2">
          <span>✉️</span>
          <span>
            Email: <a href="mailto:contact@rumilander.art" className="underline hover:text-[#3e2e22]">contact@rumilander.art</a>
          </span>
        </p>

        {/* Global Reach */}
        <p className="text-xs text-gray-500 pt-2">
          Based in Toronto — available worldwide 🌍
        </p>
      </div>
    </>
  )
}
