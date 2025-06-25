'use client'

import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/plugins/captions.css'

import { useState } from 'react'
import clsx from 'clsx'

interface GalleryImage {
  src: string
  caption?: string
}

interface ExhibitionCardProps {
  title: string
  year: string
  location: string
  type: string
  description: string
  image: string // main image always exists
  gallery?: GalleryImage[] // optional
  className?: string
}

/**
 * ExhibitionCard with smart Lightbox handling
 * --------------------------------------------
 * If gallery exists, it shows all images. If not, fallback to main image in Lightbox.
 */
export default function ExhibitionCard({
  title,
  year,
  location,
  type,
  description,
  image,
  gallery,
  className
}: ExhibitionCardProps) {
  const [open, setOpen] = useState(false)

  // ✅ build slides for Lightbox (from gallery or fallback to image)
  const slides = gallery && gallery.length > 0
    ? gallery
    : [{ src: image }]

  const previewImage = slides[0].src // always exists

  return (
    <>
      <div
        className={clsx(
          'bg-white rounded-2xl overflow-hidden border border-[#ddd0c2] shadow-sm hover:shadow-md transition flex flex-col h-full',
          className
        )}
      >
        {/* ✅ Image preview */}
        <div
          className="relative aspect-[3/4] w-full cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Image
            src={previewImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover rounded-t-2xl"
          />
        </div>

        {/* ✅ Details */}
        <div className="flex flex-col justify-between p-4 flex-grow">
          <h3 className="text-md font-serif text-[#5e4033] mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{location} • {year}</p>
          <p className="text-xs text-amber-700 italic mt-1">{type}</p>
          <p className="text-sm text-gray-800 mt-2 line-clamp-4">{description}</p>
        </div>
      </div>

      {/* ✅ Lightbox (always based on `slides`) */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: 'center' }}
      />
    </>
  )
}
