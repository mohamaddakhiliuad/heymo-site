'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ArtworkLightboxProps {
  isOpen: boolean
  onClose: () => void
  image: string
  title: string
}

/**
 * ArtworkLightbox (Enhanced)
 * ----------------------------------------------------------
 * Displays an enlarged image with zoom and external link
 */
export default function ArtworkLightbox({ isOpen, onClose, image, title }: ArtworkLightboxProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
      <div className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4e3a2f] text-2xl z-10 hover:text-red-600"
          aria-label="Close lightbox"
        >
          ✕
        </button>

        {/* Zoomable Image */}
        <div className="relative w-full h-[80vh] overflow-auto">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>

        {/* Footer: Title + Download/Open */}
        <div className="text-center p-4">
          <p className="text-[#4e3a2f] italic mb-2">{title}</p>
          <Link
            href={image}
            target="_blank"
            className="text-sm text-[#5e4033] underline hover:text-[#2f2017]"
          >
            Open image in new tab ↗
          </Link>
        </div>
      </div>
    </div>
  )
}
