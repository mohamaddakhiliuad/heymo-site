// components/shared/Footer.tsx
'use client'

import Link from 'next/link'
import { FaInstagram, FaLinkedin, FaYoutube, FaPinterest } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#5e4033] text-[#fff8f2] px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start text-sm">
        
        {/* 1. Brand */}
<div>
  <h3 className="text-xl font-serif font-semibold mb-3">Rumilander Art Gallery</h3>
  <p className="text-[#ddd0c2]">
    Celebrating the timeless mastery of Persian miniature by Alijan Alijanpour.  
    A digital sanctuary honoring sacred art, spiritual beauty, and the enduring soul of Iranian artistry.
  </p>
</div>

        {/* 2. Navigation */}
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-[#f0e7da]">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/gallery" className="hover:underline">Gallery</Link></li>
             <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/about" className="hover:underline">About the Artist</Link></li>
            <li><Link href="/services" className="hover:underline">Servise</Link></li>
             <li><Link href="/connect" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* 3. Social */}
        <div>
          <h4 className="font-semibold mb-3">Follow</h4>
          <div className="flex gap-4 text-[#f0e7da]">
            <Link href="https://instagram.com" target="_blank" className="hover:text-amber-300" aria-label="Instagram">
              <FaInstagram size={20} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-amber-300" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </Link>
            <Link href="https://youtube.com" target="_blank" className="hover:text-amber-300" aria-label="YouTube">
              <FaYoutube size={20} />
            </Link>
            <Link href="https://pinterest.com" target="_blank" className="hover:text-amber-300" aria-label="Pinterest">
              <FaPinterest size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-xs text-[#d9cfc3]">
        © {new Date().getFullYear()} Rumilander. All rights reserved.
      </div>
    </footer>
  )
}
