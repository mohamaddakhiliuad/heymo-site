// components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Alijan Alijanpour', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Connect', href: '/connect' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-[#fff8f2] border-b border-[#e2d4c6] text-[#5e4033] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-serif font-bold">
          RumiLander Art Gallery
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-sm">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline hover:text-[#3e2e22] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm hover:underline hover:text-[#3e2e22]"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
